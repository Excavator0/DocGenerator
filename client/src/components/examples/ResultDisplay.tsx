import ResultDisplay from '../ResultDisplay';

export default function ResultDisplayExample() {
  const handleDownload = () => {
    console.log('Download triggered');
  };

  const handleReset = () => {
    console.log('Reset triggered');
  };

  return (
    <ResultDisplay 
      filename="generated_document.docx"
      onDownload={handleDownload}
      onReset={handleReset}
    />
  );
}
