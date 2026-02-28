import { useCallback } from 'react';

interface UseDownloadReturn {
  downloadFile: (url: string, filename: string) => void;
}

export const useDownload = (): UseDownloadReturn => {
  const downloadFile = useCallback((url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return { downloadFile };
};
