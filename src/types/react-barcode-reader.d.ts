declare module 'react-barcode-reader' {
  interface BarcodeReaderProps {
    onError?: (error: any) => void;
    onScan: (data: string) => void;
    onLoad?: () => void;
    onImageLoad?: (e: any) => void;
    delay?: number;
    facingMode?: string;
    legacyMode?: boolean;
    resolution?: number;
    style?: React.CSSProperties;
  }

  const BarcodeReader: React.FC<BarcodeReaderProps>;
  export default BarcodeReader;
}
