import { useState } from 'react';
import GenerateButton from '../GenerateButton';

export default function GenerateButtonExample() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      <GenerateButton 
        onClick={handleClick}
        disabled={false}
        isLoading={isLoading}
      />
      <GenerateButton 
        onClick={() => {}}
        disabled={true}
        isLoading={false}
      />
    </div>
  );
}
