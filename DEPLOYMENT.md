# راهنمای Deployment در Netlify

## مرحله 1: آماده‌سازی پروژه

پروژه شما آماده است! تمام فایل‌های لازم ایجاد شده‌اند:

- ✅ `package.json` - وابستگی‌های پروژه
- ✅ `next.config.js` - پیکربندی Next.js
- ✅ `netlify.toml` - تنظیمات Netlify
- ✅ `tailwind.config.ts` - پیکربندی Tailwind CSS
- ✅ `README.md` - راهنمای کامل

## مرحله 2: آپلود به GitHub

```bash
# اگر هنوز git repository ندارید
git init
git add .
git commit -m "Initial commit: PDF AI Analyzer"

# اضافه کردن remote repository
git remote add origin https://github.com/yourusername/pdf-ai-analyzer.git
git push -u origin main
```

## مرحله 3: Deployment در Netlify

### گزینه 1: GitHub Integration (پیشنهادی)

1. **ورود به Netlify**: به [netlify.com](https://netlify.com) بروید و وارد شوید

2. **ایجاد سایت جدید**: 
   - روی "New site from Git" کلیک کنید
   - "GitHub" را انتخاب کنید
   - Repository خود را انتخاب کنید

3. **تنظیمات Build**:
   ```
   Build command: npm run build
   Publish directory: .next
   ```

4. **متغیرهای محیطی**:
   - به بخش "Site settings" > "Environment variables" بروید
   - متغیر زیر را اضافه کنید:
     ```
     OPENAI_API_KEY = your_openai_api_key_here
     ```

5. **Deploy**: روی "Deploy site" کلیک کنید

### گزینه 2: Manual Deploy

1. **Build پروژه**:
   ```bash
   npm run build
   ```

2. **آپلود فایل‌ها**:
   - فایل‌های build شده را در Netlify drag & drop کنید
   - یا از CLI استفاده کنید:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=.next
   ```

## مرحله 4: تنظیم کلید API OpenAI

1. **دریافت کلید API**:
   - به [OpenAI Platform](https://platform.openai.com) بروید
   - حساب کاربری ایجاد کنید یا وارد شوید
   - به بخش "API Keys" بروید
   - کلید جدید ایجاد کنید

2. **تنظیم در Netlify**:
   - در dashboard Netlify، به "Site settings" بروید
   - "Environment variables" را انتخاب کنید
   - متغیر `OPENAI_API_KEY` را اضافه کنید

## مرحله 5: تست نهایی

1. **بررسی عملکرد**:
   - سایت را باز کنید
   - یک فایل PDF آپلود کنید
   - منتظر تحلیل بمانید

2. **مشکلات احتمالی**:
   - اگر خطای API دریافت کردید، کلید OpenAI را بررسی کنید
   - اگر فایل آپلود نمی‌شود، اندازه فایل را بررسی کنید (حداکثر 10MB)

## هزینه‌ها

- **Netlify**: رایگان (برای پروژه‌های کوچک)
- **OpenAI API**: بر اساس استفاده (حدود $0.002 برای هر 1000 token)

## نکات مهم

1. **امنیت**: هرگز کلید API را در کد قرار ندهید
2. **محدودیت‌ها**: فایل‌های بزرگ ممکن است کندتر پردازش شوند
3. **بهینه‌سازی**: متن PDF به 3000 کاراکتر محدود می‌شود تا هزینه کاهش یابد

## پشتیبانی

اگر مشکلی داشتید:
1. Console مرورگر را بررسی کنید
2. Logs Netlify را چک کنید
3. مطمئن شوید کلید API درست تنظیم شده است

---

**موفق باشید! 🚀**
