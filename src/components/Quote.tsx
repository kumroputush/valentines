import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Star, Crown, Moon, Sun } from 'lucide-react';

const Quote = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <motion.div 
        className="relative p-10 md:p-16  max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Magical Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-50 to-rose-100 rounded-3xl overflow-hidden">
          {/* Floating Sparkles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-yellow-400"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 0.8, 0.4],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles size={12} />
            </motion.div>
          ))}
        </div>

        {/* Main Content Container */}
        <motion.div
          className="relative z-10"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.div
              className="inline-block"
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Crown className="inline-block text-yellow-500 mb-4" size={32} />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              My Dearest Khepi
            </h2>
          </motion.div>

          {/* Quote Card */}
          <motion.div
            className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-xl"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Decorative Corner Hearts */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-pink-400"
                style={{
                  [i < 2 ? 'top' : 'bottom']: '-10px',
                  [i % 2 === 0 ? 'left' : 'right']: '-10px'
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.5,
                  repeat: Infinity
                }}
              >
                <Heart size={24} fill="currentColor" />
              </motion.div>
            ))}

            {/* Message Content */}
            <div className="space-y-6 text-center">
              <motion.p 
                className="text-2xl md:text-3xl font-medium leading-relaxed text-gray-700"
                animate={{ scale: isHovered ? 1.02 : 1 }}
              >
                <span className="block mb-4 text-pink-600">
                Thank you for being the sweetest part of my story ✨
                </span>
                <span className="block mb-4 text-purple-600">
                I promise to be there for you as long as you keep fighting, loving, and never giving up on us.I am always there for you and is very proud of your every efforts , Will you be mine, baby?
                </span>
                <span className="block text-pink-600 font-bold mt-6">
                Will you be mine, forever and always? 🌟
              </span>
              </motion.p>

              {/* Animated Love Icons */}
              <div className="flex justify-center space-x-6 mt-8">
                {[Moon, Sun, Star].map((Icon, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [-8, 0, -8],
                      rotate: [-10, 10, -10],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.3,
                      repeat: Infinity
                    }}
                    className="text-purple-500"
                  >
                    <Icon size={28} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Footer Signature */}
          <motion.div
            className="text-center mt-8"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="text-xl text-purple-700 font-medium">
              Forever & Always Yours 💝
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Quote;