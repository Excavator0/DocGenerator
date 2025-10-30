import { useRef } from 'react';
import { Upload, X, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ContextFilesUploadProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
}

export default function ContextFilesUpload({ files, onFilesChange }: ContextFilesUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files;
    if (newFiles && newFiles.length > 0) {
      const validFiles = Array.from(newFiles).filter(file => {
        const extension = file.name.toLowerCase();
        return extension.endsWith('.pdf') || extension.endsWith('.docx');
      });

      if (validFiles.length !== newFiles.length) {
        alert('Некоторые файлы были пропущены. Поддерживаются только .pdf и .docx');
      }

      onFilesChange([...files, ...validFiles]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} КБ`;
    }
    return `${(bytes / 1024 / 1024).toFixed(2)} МБ`;
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium uppercase tracking-wide text-foreground">
        Контекст
      </label>
      
      <div className="rounded-xl border-2 border-border overflow-hidden">
        <div
          onClick={handleClick}
          className="min-h-24 flex flex-col items-center justify-center gap-3 p-6 cursor-pointer transition-all hover:bg-muted/30 border-b border-border"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          
          <Upload className="h-8 w-8 text-muted-foreground" />
          <div className="text-center space-y-1">
            <p className="text-sm font-medium text-foreground">
              Загрузить файлы контекста
            </p>
            <p className="text-xs text-muted-foreground">
              .pdf и .docx файлы
            </p>
          </div>
        </div>

        {files.length > 0 && (
          <ScrollArea className="h-64">
            <div className="p-3 space-y-2">
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center gap-3 bg-card border border-border rounded-lg px-3 py-2 transition-all hover:bg-muted/30"
                >
                  <FileText className="h-6 w-6 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(index);
                    }}
                    className="flex-shrink-0 h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        {files.length === 0 && (
          <div className="p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Файлы не загружены
            </p>
          </div>
        )}
      </div>

      {files.length > 0 && (
        <p className="text-xs text-muted-foreground text-right">
          Загружено файлов: {files.length}
        </p>
      )}
    </div>
  );
}

