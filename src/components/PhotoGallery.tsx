'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Heart, Download } from 'lucide-react';

interface Photo {
  id: number;
  url: string;
  title: string;
}

const PhotoGallery: React.FC<{ photos: Photo[] }> = ({ photos }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [isLoved, setIsLoved] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedId) {
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'Escape') setSelectedId(null);
        if (e.key === 'd') handleDownload();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId]);

  const handleNext = () => {
    setDirection('right');
    setSelectedId(prev => {
      const currentIndex = photos.findIndex(p => p.id === prev);
      return photos[(currentIndex + 1) % photos.length].id;
    });
  };

  const handlePrev = () => {
    setDirection('left');
    setSelectedId(prev => {
      const currentIndex = photos.findIndex(p => p.id === prev);
      return photos[(currentIndex - 1 + photos.length) % photos.length].id;
    });
  };

  const handleDownload = () => {
    if (selectedId) {
      const photo = photos.find(p => p.id === selectedId);
      if (photo) {
        const link = document.createElement('a');
        link.href = photo.url;
        link.download = `memory-${photo.id}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  const toggleLove = (id: number) => {
    setIsLoved(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const selectedPhoto = photos.find(p => p.id === selectedId);

  return (
    <div className="py-20 px-4">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
        Amader Memory Vault 📸
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            layoutId={`photo-${photo.id}`}
            onClick={() => setSelectedId(photo.id)}
            className="relative aspect-square cursor-pointer overflow-hidden rounded-xl group"
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <motion.img
              src={photo.url}
              alt={photo.title}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity"
              initial={false}
            >
              <p className="text-white font-medium text-lg drop-shadow-lg">
                {photo.title}
              </p>
            </motion.div>
            
            <motion.div
              className="absolute top-2 right-2 text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity"
              whileHover={{ scale: 1.2 }}
              onClick={(e) => {
                e.stopPropagation();
                toggleLove(photo.id);
              }}
            >
              <Heart 
                size={24} 
                fill={isLoved[photo.id] ? "currentColor" : "none"}
                className={isLoved[photo.id] ? "text-pink-500" : "text-white/80"}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode='wait'>
        {selectedId && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="max-w-7xl w-full px-4 relative">
              {/* Navigation Arrows */}
              <motion.button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors z-10"
                onClick={handlePrev}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="text-white" size={32} />
              </motion.button>
              
              <motion.button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors z-10"
                onClick={handleNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="text-white" size={32} />
              </motion.button>

              {/* Close Button */}
              <motion.button
                className="absolute top-4 right-4 bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors z-10"
                onClick={() => setSelectedId(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="text-white" size={28} />
              </motion.button>

              {/* Main Image */}
              <motion.div
                layoutId={`photo-${selectedId}`}
                className="relative mx-4"
                initial={{ opacity: 0, x: direction === 'left' ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction === 'left' ? 100 : -100 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <img
                  src={selectedPhoto?.url}
                  alt={selectedPhoto?.title}
                  className="w-full h-[80vh] object-contain rounded-xl"
                />
                
                {/* Caption Footer */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <p className="text-white text-xl font-medium text-center max-w-[80%]">
                      {selectedPhoto?.title}
                    </p>
                    <div className="flex items-center space-x-4">
                      <motion.button
                        className="p-2 rounded-full hover:bg-white/20 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLove(selectedId);
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart 
                          size={28} 
                          fill={isLoved[selectedId] ? "currentColor" : "none"}
                          className={isLoved[selectedId] ? "text-pink-500" : "text-white/80"}
                        />
                      </motion.button>
                      <motion.button
                        className="p-2 rounded-full hover:bg-white/20 transition-colors"
                        onClick={handleDownload}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Download className="text-white" size={28} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotoGallery;