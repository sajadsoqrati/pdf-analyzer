import { NextRequest, NextResponse } from 'next/server'
import { parsePDF, truncateText } from '@/app/lib/pdfParser'
import OpenAI from 'openai'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json(
                { error: 'فایل PDF یافت نشد' },
                { status: 400 }
            )
        }

        if (file.type !== 'application/pdf') {
            return NextResponse.json(
                { error: 'فقط فایل‌های PDF پشتیبانی می‌شوند' },
                { status: 400 }
            )
        }

        // استخراج متن از PDF
        const pdfResult = await parsePDF(file)

        // محدود کردن متن برای کاهش هزینه API
        const truncatedText = truncateText(pdfResult.text, 3000)

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                { error: 'کلید API OpenAI تنظیم نشده است' },
                { status: 500 }
            )
        }

        // ایجاد OpenAI client در runtime (پشتیبانی از OpenRouter از طریق baseURL)
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
            baseURL: process.env.OPENAI_BASE_URL || undefined,
            defaultHeaders: process.env.OPENAI_BASE_URL?.includes('openrouter.ai') ? {
                'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
                'X-Title': 'PDF AI Analyzer',
            } : undefined,
        })

        // ارسال به OpenAI برای تحلیل
        const completion = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL || (process.env.OPENAI_BASE_URL?.includes('openrouter.ai') ? 'openai/gpt-4o-mini' : 'gpt-4o-mini'),
            messages: [
                {
                    role: "system",
                    content: `شما یک تحلیلگر هوشمند متون هستید و باید فقط و فقط به زبان فارسی پاسخ دهید. لطفاً متن ارائه‌شده را به‌صورت جامع و مفصل تحلیل کنید.
          تحلیل شما باید شامل موارد زیر باشد:
          1) خلاصه کلی محتوا
          2) نکات کلیدی و مهم
          3) موضوعات اصلی مطرح‌شده
          4) نتیجه‌گیری و پیشنهادات
          
          پاسخ را کاملاً به زبان فارسی و به صورت ساختاریافته ارائه دهید و از زبان‌های دیگر استفاده نکنید.`
                },
                {
                    role: "user",
                    content: `لطفاً این متن را تحلیل کنید:\n\n${truncatedText}`
                }
            ],
            max_tokens: 1000,
            temperature: 0.7,
        })

        const analysis = completion.choices[0]?.message?.content || 'خطا در تحلیل متن'

        return NextResponse.json({
            success: true,
            analysis,
            fileName: file.name,
            pages: pdfResult.pages,
            textLength: pdfResult.text.length
        })

    } catch (error) {
        console.error('Error analyzing PDF:', error)
        return NextResponse.json(
            { error: 'خطا در تحلیل فایل: ' + (error as Error).message },
            { status: 500 }
        )
    }
}
