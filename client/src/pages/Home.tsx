import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import PromptInput from '@/components/PromptInput';
import ContextFilesUpload from '@/components/ContextFilesUpload';
import ModelSettings from '@/components/ModelSettings';
import GenerateButton from '@/components/GenerateButton';
import LoadingState from '@/components/LoadingState';
import ResultDisplay from '@/components/ResultDisplay';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState('');
  const [contextFiles, setContextFiles] = useState<File[]>([]);
  const [model, setModel] = useState('gigachat-2-max');
  const [temperature, setTemperature] = useState(1.0);
  const [topP, setTopP] = useState(1.0);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerate = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setIsComplete(false);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setIsComplete(true);
      }, 500);
    }, 3000);
  };

  const handleDownload = () => {
    if (!selectedFile) return;
    
    const url = URL.createObjectURL(selectedFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedFile.name.replace('.docx', '_generated.docx');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPrompt('');
    setContextFiles([]);
    setIsComplete(false);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Генератор Документов
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Загрузите документ и получите готовый результат
            </p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
        {isLoading ? (
          <LoadingState progress={progress} />
        ) : isComplete ? (
          <ResultDisplay
            filename={selectedFile?.name.replace('.docx', '_generated.docx') || 'document.docx'}
            onDownload={handleDownload}
            onReset={handleReset}
          />
        ) : (
          <div className="space-y-8">
            <FileUpload 
              selectedFile={selectedFile} 
              onFileSelect={setSelectedFile} 
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PromptInput 
                value={prompt} 
                onChange={setPrompt} 
              />

              <ContextFilesUpload 
                files={contextFiles}
                onFilesChange={setContextFiles}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-end">
              <ModelSettings
                model={model}
                temperature={temperature}
                topP={topP}
                onModelChange={setModel}
                onTemperatureChange={setTemperature}
                onTopPChange={setTopP}
              />
              <GenerateButton
                onClick={handleGenerate}
                disabled={!selectedFile}
                isLoading={isLoading}
              />
            </div>
          </div>
        )}

        {!isLoading && !isComplete && (
          <div className="mt-20 text-center">
            <p className="text-sm text-muted-foreground">
              Загрузите Word документ с промптами внутри, добавьте уточнения и нажмите «Сгенерировать»
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
