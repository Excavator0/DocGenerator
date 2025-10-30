import { useState, useRef } from 'react';
import { Upload, X, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
}

export default function FileUpload({ onFileSelect, selectedFile }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.name.endsWith('.docx')) {
        onFileSelect(file);
      } else {
        alert('Пожалуйста, загрузите файл формата .docx');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.name.endsWith('.docx')) {
        onFileSelect(file);
      } else {
        alert('Пожалуйста, загрузите файл формата .docx');
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium uppercase tracking-wide text-foreground">
        Документ Word
      </label>
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          min-h-48 md:min-h-64 rounded-xl border-2 border-dashed 
          flex flex-col items-center justify-center gap-4 p-8
          cursor-pointer transition-all hover-elevate
          ${isDragging ? 'border-primary bg-primary/5' : 'border-border'}
          ${selectedFile ? 'bg-muted/30' : ''}
        `}
        data-testid="file-upload-zone"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".docx"
          onChange={handleFileChange}
          className="hidden"
          data-testid="input-file"
        />
        
        {selectedFile ? (
          <>
            <div className="flex items-center gap-3 bg-card border border-card-border rounded-lg px-4 py-3 w-full max-w-md">
              <FileText className="h-8 w-8 text-primary flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate" data-testid="text-filename">
                  {selectedFile.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} МБ
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleRemove}
                className="flex-shrink-0"
                data-testid="button-remove-file"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Нажмите или перетащите для замены файла
            </p>
          </>
        ) : (
          <>
            <Upload className="h-12 w-12 text-muted-foreground" />
            <div className="text-center space-y-1">
              <p className="text-base font-medium text-foreground">
                Перетащите Word документ сюда
              </p>
              <p className="text-sm text-muted-foreground">
                или нажмите для выбора файла
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              .docx до 10МБ
            </p>
          </>
        )}
      </div>
    </div>
  );
}
