import { Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface LoadingStateProps {
  progress?: number;
}

export default function LoadingState({ progress }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12">
      <Loader2 className="h-12 w-12 text-primary animate-spin" />
      <div className="text-center space-y-2">
        <p className="text-lg font-medium text-foreground" data-testid="text-loading-status">
          Генерация документа...
        </p>
        <p className="text-sm text-muted-foreground">
          Обычно занимает 10-15 секунд
        </p>
      </div>
      {progress !== undefined && (
        <div className="w-full max-w-md">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground text-center mt-2">
            {progress}%
          </p>
        </div>
      )}
    </div>
  );
}
