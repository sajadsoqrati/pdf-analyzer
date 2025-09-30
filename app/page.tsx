"use client";

import { useEffect, useState } from "react";
import PDFUpload from "./components/PDFUpload";
import AnalysisResult from "./components/AnalysisResult";
import PDFPreview from "./components/PDFPreview";
import { Brain, FileText, Zap } from "lucide-react";

interface AnalysisData {
  analysis: string;
  fileName: string;
  pages: number;
  textLength: number;
}

export default function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    // مدیریت پیش‌نمایش
    setSelectedFile(file);
    setError(null);
    setAnalysisData(null);
    setIsAnalyzing(true);

    // ساختن object URL برای پیش‌نمایش و آزادسازی قبلی
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "خطا در تحلیل فایل");
      }

      setAnalysisData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطای نامشخص");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setAnalysisData(null);
    setError(null);
    setSelectedFile(null);
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
  };

  // آزادسازی URL هنگام خروج از صفحه
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Brain className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              PDF AI Analyzer
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            فایل PDF خود را آپلود کنید و هوش مصنوعی آن را برای شما تحلیل کند
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-16">
        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/90 dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center space-x-3 mb-3">
              <FileText className="w-6 h-6 text-pink-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">آپلود آسان</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              فایل PDF خود را به راحتی drag & drop کنید یا کلیک کنید تا انتخاب کنید
            </p>
          </div>

          <div className="bg-white/90 dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Brain className="w-6 h-6 text-purple-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">تحلیل هوشمند</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              هوش مصنوعی پیشرفته محتوای PDF شما را به صورت کامل تحلیل می‌کند
            </p>
          </div>

          <div className="bg-white/90 dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Zap className="w-6 h-6 text-green-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">نتایج سریع</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              در کمترین زمان ممکن نتایج تحلیل جامع و مفصل دریافت کنید
            </p>
          </div>
        </div>
        {/* Upload Section */}
        {!selectedFile && (
          <div className="mb-8">
            <PDFUpload
              onFileSelect={handleFileSelect}
              isLoading={isAnalyzing}
            />
          </div>
        )}

        {/* Side-by-side Preview + Analysis */}
        {selectedFile && (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              {previewUrl && (
                <PDFPreview fileUrl={previewUrl} fileName={selectedFile.name} />
              )}
            </div>

            <div className="space-y-6">
              <AnalysisResult
                fileName={selectedFile.name}
                analysis={analysisData?.analysis || ""}
                isLoading={isAnalyzing}
              />

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-red-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                        خطا در تحلیل فایل
                      </h3>
                      <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                        {error}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="text-center">
                <button
                  onClick={resetAnalysis}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  <FileText className="w-5 h-5" />
                  <span>آپلود فایل جدید</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Only show the new two-column grid (handled above when selectedFile exists) */}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>ساخته شده با TypeScript ,React و Next.js و Tailwind CSS</p>
            <p className="text-xl font-bold mt-2">رسا هوش آتیه</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
