import { useState } from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface ModelSettingsProps {
  model: string;
  temperature: number;
  topP: number;
  onModelChange: (model: string) => void;
  onTemperatureChange: (temperature: number) => void;
  onTopPChange: (topP: number) => void;
}

export default function ModelSettings({
  model,
  temperature,
  topP,
  onModelChange,
  onTemperatureChange,
  onTopPChange,
}: ModelSettingsProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full md:w-auto md:min-w-48 text-base font-semibold rounded-lg px-6 py-6"
        >
          <Settings className="h-5 w-5" />
          Параметры модели
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Параметры модели</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-8 py-6">
          <div className="space-y-3">
            <label className="text-base font-medium text-foreground">
              Модель
            </label>
            <Select value={model} onValueChange={onModelChange}>
              <SelectTrigger className="w-full h-12 text-base">
                <SelectValue placeholder="Выберите модель" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gigachat-2-max">GigaChat-2-Max</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-base font-medium text-foreground">
                  Температура
                </label>
                <span className="text-base text-muted-foreground font-mono">
                  {temperature.toFixed(2)}
                </span>
              </div>
              <Slider
                value={[temperature]}
                onValueChange={(values) => onTemperatureChange(values[0])}
                min={0}
                max={2}
                step={0.01}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0.00</span>
                <span>2.00</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-base font-medium text-foreground">
                  Предсказуемость
                </label>
                <span className="text-base text-muted-foreground font-mono">
                  {topP.toFixed(2)}
                </span>
              </div>
              <Slider
                value={[topP]}
                onValueChange={(values) => onTopPChange(values[0])}
                min={0}
                max={1}
                step={0.01}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0.00</span>
                <span>1.00</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

