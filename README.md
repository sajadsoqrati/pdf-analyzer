# PDF AI Analyzer

یک وب اپلیکیشن مدرن برای آپلود و تحلیل فایل‌های PDF با استفاده از هوش مصنوعی.

## ویژگی‌ها

- ✅ آپلود آسان فایل‌های PDF با drag & drop
- ✅ استخراج خودکار متن از PDF
- ✅ تحلیل هوشمند با OpenAI GPT-3.5
- ✅ رابط کاربری زیبا و مدرن با Tailwind CSS
- ✅ پشتیبانی از تم تاریک
- ✅ قابلیت کپی و دانلود نتایج
- ✅ آماده برای deployment در Netlify

## تکنولوژی‌های استفاده شده

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **PDF Processing**: pdf-parse
- **AI Integration**: OpenAI API
- **Icons**: Lucide React
- **Deployment**: Netlify

## نصب و راه‌اندازی

### 1. کلون کردن پروژه

```bash
git clone <repository-url>
cd pdf-ai-analyzer
```

### 2. نصب وابستگی‌ها

```bash
npm install
```

### 3. تنظیم متغیرهای محیطی

فایل `env.example` را کپی کرده و به `.env.local` تغییر نام دهید:

```bash
cp env.example .env.local
```

سپس کلید API OpenAI خود را در فایل `.env.local` وارد کنید:

```
OPENAI_API_KEY=your_openai_api_key_here
```

### 4. اجرای پروژه

```bash
npm run dev
```

پروژه در آدرس `http://localhost:3000` در دسترس خواهد بود.

## Deployment در Netlify

### روش 1: GitHub Integration

1. پروژه خود را در GitHub push کنید
2. به [Netlify](https://netlify.com) بروید و وارد حساب کاربری خود شوید
3. روی "New site from Git" کلیک کنید
4. GitHub repository خود را انتخاب کنید
5. تنظیمات build را به صورت زیر وارد کنید:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: `18`
6. متغیرهای محیطی را در بخش "Environment variables" اضافه کنید:
   - `OPENAI_API_KEY`: کلید API OpenAI شما
7. روی "Deploy site" کلیک کنید

### روش 2: Manual Deploy

1. پروژه را build کنید:
```bash
npm run build
```

2. فایل‌های build شده را در Netlify drag & drop کنید

## استفاده

1. فایل PDF خود را آپلود کنید
2. منتظر بمانید تا هوش مصنوعی فایل را تحلیل کند
3. نتایج تحلیل را مشاهده کنید
4. در صورت نیاز، نتایج را کپی یا دانلود کنید

## محدودیت‌ها

- حداکثر اندازه فایل PDF: 10MB
- حداکثر طول متن برای تحلیل: 3000 کاراکتر
- نیاز به کلید API OpenAI

## مشارکت

برای مشارکت در پروژه:

1. Fork کنید
2. شاخه جدید ایجاد کنید
3. تغییرات خود را commit کنید
4. Pull Request ارسال کنید

## لایسنس

MIT License
