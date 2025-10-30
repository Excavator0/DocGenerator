import { useState } from 'react';
import PromptInput from '../PromptInput';

export default function PromptInputExample() {
  const [prompt, setPrompt] = useState('');

  return (
    <PromptInput 
      value={prompt} 
      onChange={setPrompt} 
    />
  );
}
