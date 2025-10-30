import { useState, useEffect } from 'react';
import LoadingState from '../LoadingState';

export default function LoadingStateExample() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 10;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <LoadingState />
      <LoadingState progress={progress} />
    </div>
  );
}
