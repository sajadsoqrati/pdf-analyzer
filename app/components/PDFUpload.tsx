'use client'

import { useState, useCallback } from 'react'
import { Upload, FileText, Loader2 } from 'lucide-react'

interface PDFUploadProps {
  onFileSelect: (file: File) => void
  isLoading: boolean
}

export default function PDFUpload({ onFileSelect, isLoading }: PDFUploadProps) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type === 'application/pdf') {
        onFileSelect(file)
      }
    }
  }, [onFileSelect])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0])
    }
  }

  return (
    <div
      className={`relative w-full max-w-2xl mx-auto p-10 rounded-2xl transition-colors border-2 border-dashed ${
        dragActive
          ? 'border-pink-400 bg-[#fde7f3] dark:bg-[#2a1d25]'
          : 'border-pink-200 dark:border-pink-900 hover:border-pink-300 dark:hover:border-pink-800 bg-white/70 dark:bg-gray-800/60'
      } ${isLoading ? 'pointer-events-none opacity-60' : ''}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        disabled={isLoading}
      />
      
      <div className="flex flex-col items-center justify-center space-y-5">
        {isLoading ? (
          <Loader2 className="w-12 h-12 text-pink-500 animate-spin" />
        ) : (
          <div className="p-5 bg-pink-100 dark:bg-pink-900/30 rounded-full shadow-sm">
            <Upload className="w-8 h-8 text-pink-600 dark:text-pink-300" />
          </div>
        )}
        
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {isLoading ? 'در حال پردازش...' : 'فایل PDF خود را آپلود کنید'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            فایل را اینجا بکشید یا کلیک کنید تا انتخاب کنید
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <FileText className="w-4 h-4" />
            <span>فقط فایل‌های PDF پشتیبانی می‌شوند</span>
          </div>
        </div>
      </div>
    </div>
  )
}
