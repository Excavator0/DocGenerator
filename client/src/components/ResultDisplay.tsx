import { CheckCircle2, Download, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ResultDisplayProps {
  filename: string;
  onDownload: () => void;
  onReset: () => void;
}

export default function ResultDisplay({ filename, onDownload, onReset }: ResultDisplayProps) {
  return (
    <Card className="p-8 space-y-6">
      <div className="flex items-center gap-3">
        <CheckCircle2 className="h-8 w-8 text-green-500 flex-shrink-0" />
        <div>
          <h3 className="text-xl font-semibold text-foreground" data-testid="text-success">
            Документ успешно сгенерирован!
          </h3>
          <p className="text-sm text-muted-foreground" data-testid="text-result-filename">
            {filename}
          </p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={onDownload}
          className="flex-1 text-base font-semibold rounded-lg px-6 py-6"
          data-testid="button-download"
        >
          <Download className="h-5 w-5" />
          Скачать документ
        </Button>
        <Button
          onClick={onReset}
          variant="outline"
          className="flex-1 sm:flex-none text-base font-semibold rounded-lg px-6 py-6"
          data-testid="button-reset"
        >
          <RotateCcw className="h-5 w-5" />
          Создать новый
        </Button>
      </div>
    </Card>
  );
}
