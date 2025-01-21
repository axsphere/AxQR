import React, { useState, useEffect, useRef } from 'react';
import { 
  IonPage, 
  IonContent, 
  IonModal, 
  IonButton, 
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardTitle, 
  IonToast 
} from '@ionic/react';
import jsQR from 'jsqr';
import './QRScanner.css';

const QRScannerScreen: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    checkCameraPermission();
    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (isScanning) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [isScanning]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        videoRef.current.play();
        requestAnimationFrame(tick);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setToastMessage('Failed to access camera. Please try again.');
      setShowToast(true);
      setIsScanning(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const tick = () => {
    if (!isScanning) return;
    
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        const width = video.videoWidth;
        const height = video.videoHeight;
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, width, height);
          const imageData = ctx.getImageData(0, 0, width, height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          
          if (code) {
            handleScan(code.data);
            return;
          }
        }
      }
      requestAnimationFrame(tick);
    }
  };

  const checkCameraPermission = async () => {
    try {
      // First check if we already have permission
      const permissions = await navigator.mediaDevices.getUserMedia({ video: true });
      permissions.getTracks().forEach(track => track.stop());
      setHasPermission(true);
      return true;
    } catch (err) {
      console.error('Camera permission error:', err);
      setHasPermission(false);
      if (err instanceof DOMException) {
        if (err.name === 'NotAllowedError') {
          setToastMessage('Camera access was denied. Please enable it in your browser settings.');
        } else if (err.name === 'NotFoundError') {
          setToastMessage('No camera found on your device.');
        } else {
          setToastMessage('Error accessing camera. Please check your permissions.');
        }
      }
      setShowToast(true);
      return false;
    }
  };

  const handleScan = (data: string) => {
    if (data) {
      setScanResult(data);
      setIsScanning(false);
      setShowResult(true);
    }
  };

  const handleScanClick = async () => {
    const hasAccess = await checkCameraPermission();
    if (hasAccess) {
      setIsScanning(true);
    }
  };

  return (
    <IonPage>
      <IonContent className="scanner-parent">
        <div className="h-full w-full flex flex-col items-center justify-center bg-gray-50 scanner-parent">
          <div className="text-center max-w-md w-full p-6 bg-white rounded-lg  scanner-parent-wrap">
            <img
              src="assets/images/qrcode.png"
              alt="QR Code"
              className="w-48 h-48 object-contain mx-auto mb-6"
            />
            <button
              onClick={handleScanClick}
              className="font-semibold w-30 scan-btn"
              
            >
              {hasPermission === false ? 'Grant Camera Permission' : 'Click to Scan QR'}
            </button>
          </div>

          {/* QR Scanner Modal */}
          <IonModal
            isOpen={isScanning}
            onDidDismiss={() => setIsScanning(false)}
            className="scanner-modal"
          >
            <div className="h-full flex flex-col items-center justify-center p-4 bg-black">
              <div className="relative w-full max-w-lg aspect-square">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover rounded-lg"
                  playsInline
                  muted
                />
                <canvas
                  ref={canvasRef}
                  className="hidden"
                />
                <div className="scanner-overlay absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              <IonButton
                onClick={() => setIsScanning(false)}
                className="mt-4"
                color="light"
                >
                Cancel Scan
              </IonButton>
            </div>
          </IonModal>

          {/* Result Modal */}
          <IonModal
            isOpen={showResult}
            onDidDismiss={() => setShowResult(false)}
            className="result-modal"
          >
            <IonCard className='scan-result-parent'>
              <IonCardHeader>
                <IonCardTitle className='scan-result-header'>Scan Result</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p className="text-lg break-all scan-result">{scanResult}</p>
                <div className="button-group">
                  <IonButton
                    expand="block"
                    onClick={() => navigator.clipboard.writeText(scanResult)}
                    className="mt-4 result-btn"
                    color="green"
                  >
                    Copy to Clipboard
                  </IonButton>
                  <IonButton
                    expand="block"
                    onClick={() => setShowResult(false)}
                    className="mt-4 result-btn"
                    color="green"
                  >
                    Close
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          </IonModal>

          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message={toastMessage}
            duration={3000}
            position="bottom"
            color="danger"
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default QRScannerScreen;
