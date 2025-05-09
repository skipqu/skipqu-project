import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarcodeFormat, BrowserMultiFormatReader, Result } from '@zxing/library';
import { useCartStore } from '../store/cartStore';
import { Flashlight, X, ShoppingCart } from 'lucide-react';
import { ArrowLeft, Search, Mic } from 'lucide-react';
import skipquLogo from '../assets/skipqu-logo.png';

// Mock product database - in a real app, this would come from your backend
const MOCK_PRODUCTS = {
  '123456789': { 
    id: '123456789', 
    name: 'Organic Bananas', 
    price: 2.99, 
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&auto=format&fit=crop',
    description: 'Fresh organic bananas from Ecuador',
    weight: '1 bunch (approx. 6-7 bananas)'
  },
  '987654321': { 
    id: '987654321', 
    name: 'Whole Milk', 
    price: 3.49, 
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&auto=format&fit=crop',
    description: 'Fresh whole milk, vitamin D fortified',
    volume: '1 gallon'
  },
  '456789123': { 
    id: '456789123', 
    name: 'Wheat Bread', 
    price: 4.99, 
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800&auto=format&fit=crop',
    description: 'Freshly baked whole wheat bread',
    weight: '1 loaf (24 oz)'
  },
};

export const ScannerPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [scanning, setScanning] = useState(true);
  const [lastScanned, setLastScanned] = useState<any>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    let mounted = true;

    const startScanner = async () => {
      try {
        const videoInputDevices = await codeReader.listVideoInputDevices();
        const selectedDeviceId = videoInputDevices[0].deviceId;
        
        if (mounted && videoRef.current) {
          await codeReader.decodeFromVideoDevice(
            selectedDeviceId,
            videoRef.current,
            (result: Result | null, error: Error | undefined) => {
              if (result && mounted) {
                const scannedCode = result.getText();
                const product = MOCK_PRODUCTS[scannedCode];
                
                if (product && scanning) {
                  setScanning(false);
                  setLastScanned(product);
                  setShowOverlay(true);
                  addItem(product);
                  
                  // Resume scanning after 3 seconds
                  setTimeout(() => {
                    if (mounted) {
                      setScanning(true);
                      setShowOverlay(false);
                      setTimeout(() => {
                        if (mounted) setLastScanned(null);
                      }, 300);
                    }
                  }, 3000);
                }
              }
            }
          );
        }
      } catch (err) {
        console.error('Failed to start scanner:', err);
      }
    };

    startScanner();

    return () => {
      mounted = false;
      codeReader.reset();
    };
  }, [addItem]);

  const toggleFlashlight = async () => {
    try {
      const stream = videoRef.current?.srcObject as MediaStream;
      if (stream) {
        const track = stream.getVideoTracks()[0];
        const capabilities = track.getCapabilities();
        
        if (capabilities.torch) {
          await track.applyConstraints({
            advanced: [{ torch: !flashlightOn }],
          });
          setFlashlightOn(!flashlightOn);
        }
      }
    } catch (err) {
      console.error('Failed to toggle flashlight:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black relative"
    >
      {/* Header */}
      <div className="absolute top-0 inset-x-0 flex items-center p-4 z-20">
        <button onClick={() => window.history.back()} className="p-2">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-white text-lg font-medium ml-2">SkipQu Scan and Go</h2>
      </div>

      <div className="relative h-screen">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
        />
        
        {/* Scanner UI Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Corner Markers */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 mb-[35%]">
            {/* Top Left */}
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: scanning ? [1, 1.05, 1] : 1,
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-0 left-0 w-12 h-12 border-l-4 border-t-4 border-[#F59E0B]"
            />
            {/* Top Right */}
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: scanning ? [1, 1.05, 1] : 1,
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="absolute top-0 right-0 w-12 h-12 border-r-4 border-t-4 border-[#F59E0B]"
            />
            {/* Bottom Left */}
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: scanning ? [1, 1.05, 1] : 1,
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="absolute bottom-0 left-0 w-12 h-12 border-l-4 border-b-4 border-[#F59E0B]"
            />
            {/* Bottom Right */}
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: scanning ? [1, 1.05, 1] : 1,
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              className="absolute bottom-0 right-0 w-12 h-12 border-r-4 border-b-4 border-[#F59E0B]"
            />
            {/* <motion.div
              initial={{ y: -150 }}
              animate={{
                y: scanning ? 150 : -150,
                opacity: scanning ? [0.5, 1, 0.5] : 0
              }}
              transition={{
                y: { duration: 2, repeat: Infinity, ease: "linear" },
                opacity: { duration: 1, repeat: Infinity }
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-0.5 bg-blue-500 shadow-lg"
              style={{ boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)' }}
            /> */}
          </div>
        </div>

        {/* Static bottom sheet */}
        <div className="absolute bottom-0 inset-x-0 h-[35%] bg-white rounded-t-3xl p-6 z-10">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 mb-6">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Enter barcode number"
              className="flex-1 bg-transparent outline-none ml-2"
            />
            <Mic className="w-5 h-5 text-gray-500" />
          </div>
          <div className="flex justify-center mb-4">
            <img src={skipquLogo} alt="SkipQu" className="h-10" />
          </div>
          <p className="text-center text-gray-600 text-sm">
            Scan and Go - Scan the Barcode from the product or enter the barcode number to add that item to your cart.
          </p>
        </div>

        {/* Controls */}
        <div className="absolute bottom-56 inset-x-0 p-6 bg-gradient-to-t from-black to-transparent">
          <div className="flex justify-between items-center max-w-md mx-auto">
            <button
              onClick={toggleFlashlight}
              className={`p-4 rounded-full ${
                flashlightOn ? 'bg-blue-600' : 'bg-gray-800'
              } transition-colors duration-300`}
            >
              <Flashlight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Scanned Item Overlay */}
        <AnimatePresence>
          {showOverlay && lastScanned && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute bottom-0 inset-x-0 bg-white rounded-t-3xl overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <motion.img
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    src={lastScanned.image}
                    alt={lastScanned.name}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="text-xl font-semibold text-gray-800">{lastScanned.name}</h3>
                      <p className="text-blue-600 text-lg font-medium">${lastScanned.price.toFixed(2)}</p>
                      <p className="text-gray-600 text-sm mt-1">{lastScanned.description}</p>
                      {lastScanned.weight && (
                        <p className="text-gray-500 text-sm">{lastScanned.weight}</p>
                      )}
                      {lastScanned.volume && (
                        <p className="text-gray-500 text-sm">{lastScanned.volume}</p>
                      )}
                    </motion.div>
                  </div>
                </div>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-4 flex items-center justify-between"
                >
                  <div className="bg-green-100 px-4 py-2 rounded-full">
                    <p className="text-green-700 font-medium">Added to cart</p>
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      delay: 0.5,
                      duration: 0.5
                    }}
                    className="flex items-center space-x-2 text-blue-600"
                  >
                    <ShoppingCart size={20} />
                    <span className="font-medium">In Cart</span>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Animation Overlay */}
        <AnimatePresence>
          {lastScanned && !showOverlay && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.2, 0] }}
                transition={{ duration: 0.5 }}
                className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-white text-5xl"
                >
                  ✓
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};