import { Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GenerateButtonProps {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
}

export default function GenerateButton({ onClick, disabled, isLoading }: GenerateButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || isLoading}
      className="w-full md:w-auto md:min-w-64 text-base font-semibold rounded-lg px-8 py-6 bg-green-600 hover:bg-green-700 text-white"
      data-testid="button-generate"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Генерация...
        </>
      ) : (
        <>
          <Sparkles className="h-5 w-5" />
          Сгенерировать документ
        </>
      )}
    </Button>
  );
}
