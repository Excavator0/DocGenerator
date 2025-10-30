import { Textarea } from '@/components/ui/textarea';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function PromptInput({ value, onChange }: PromptInputProps) {
  return (
    <div className="space-y-2">
      <label 
        htmlFor="prompt-input" 
        className="text-sm font-medium uppercase tracking-wide text-foreground"
      >
        Уточнения для генерации
      </label>
      <Textarea
        id="prompt-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Опишите желаемые изменения или дополнительные инструкции..."
        className="min-h-32 md:min-h-40 resize-none rounded-lg text-base"
        data-testid="input-prompt"
      />
      {value.length > 0 && (
        <p className="text-xs text-muted-foreground text-right" data-testid="text-char-count">
          {value.length} символов
        </p>
      )}
    </div>
  );
}
