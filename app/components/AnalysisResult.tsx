'use client'

import { FileText, Download, Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface AnalysisResultProps {
  fileName: string
  analysis: string
  isLoading: boolean
}

export default function AnalysisResult({ fileName, analysis, isLoading }: AnalysisResultProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(analysis)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const downloadAnalysis = () => {
    const blob = new Blob([analysis], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${fileName.replace('.pdf', '')}_analysis.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white/90 dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <FileText className="w-6 h-6 text-pink-500" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            در حال تحلیل فایل...
          </h2>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-pink-100 dark:bg-pink-900/30 rounded animate-pulse"></div>
          <div className="h-4 bg-pink-100 dark:bg-pink-900/30 rounded animate-pulse w-5/6"></div>
          <div className="h-4 bg-pink-100 dark:bg-pink-900/30 rounded animate-pulse w-4/6"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/90 dark:bg-gray-800 rounded-2xl shadow-lg">
      <div className="p-6 border-b border-pink-100 dark:border-pink-900/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="w-6 h-6 text-pink-500" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                تحلیل فایل: {fileName}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                تحلیل شده توسط هوش مصنوعی
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={copyToClipboard}
              className="flex items-center space-x-2 px-3 py-2 text-sm bg-pink-50 dark:bg-pink-900/30 hover:bg-pink-100 dark:hover:bg-pink-900/40 text-pink-700 dark:text-pink-200 rounded-lg transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span>{copied ? 'کپی شد!' : 'کپی'}</span>
            </button>
            <button
              onClick={downloadAnalysis}
              className="flex items-center space-x-2 px-3 py-2 text-sm bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/40 text-purple-700 dark:text-purple-200 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>دانلود</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed">
            {analysis}
          </div>
        </div>
      </div>
    </div>
  )
}
