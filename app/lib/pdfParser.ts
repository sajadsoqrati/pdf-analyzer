import pdf from 'pdf-parse'

export interface PDFParseResult {
    text: string
    pages: number
    info: any
}

export async function parsePDF(file: File): Promise<PDFParseResult> {
    try {
        const arrayBuffer = await file.arrayBuffer()
        const pdfBuffer = Buffer.from(arrayBuffer)
        const pdfData = await pdf(pdfBuffer)

        return {
            text: pdfData.text,
            pages: pdfData.numpages,
            info: pdfData.info
        }
    } catch (error) {
        throw new Error('خطا در پردازش فایل PDF: ' + (error as Error).message)
    }
}

export function truncateText(text: string, maxLength: number = 3000): string {
    if (text.length <= maxLength) {
        return text
    }

    // سعی می‌کنیم متن را در یک کلمه کامل قطع کنیم
    const truncated = text.substring(0, maxLength)
    const lastSpaceIndex = truncated.lastIndexOf(' ')

    if (lastSpaceIndex > maxLength * 0.8) {
        return truncated.substring(0, lastSpaceIndex) + '...'
    }

    return truncated + '...'
}
