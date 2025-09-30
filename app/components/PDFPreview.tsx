'use client'

interface PDFPreviewProps {
  fileUrl: string
  fileName?: string
}

export default function PDFPreview({ fileUrl, fileName }: PDFPreviewProps) {
  return (
    <div className="w-full bg-white/90 dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      <div className="p-4 border-b border-pink-100 dark:border-pink-900/40 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
          پیش‌نمایش PDF{fileName ? `: ${fileName}` : ''}
        </h3>
        <a
          href={fileUrl}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-pink-600 dark:text-pink-300 hover:underline"
        >
          باز کردن در تب جدید
        </a>
      </div>
      <div className="h-[75vh] bg-white dark:bg-gray-900">
        <iframe
          src={fileUrl}
          title={fileName || 'PDF preview'}
          className="w-full h-full"
        />
      </div>
    </div>
  )
}


