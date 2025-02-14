'use client'
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Volume2, VolumeX, Music, Gift } from 'lucide-react';
// import Confetti from './Confetti';
import PhotoGallery from './PhotoGallery';
import Quote from './Quote';


const photos = [
  { id: 7, url: "/images/We1.jpg", title: "First photo amar phone theke Metro te .. kothai jawar kotha chilo Moidann e neme gelm 😂😉" },
  { id: 8, url: "/images/We2.jpg", title: "First selfie asbar somoi" },
  { id: 9, url: "/images/We3.jpg", title: "Park St. er shei Cafe te .. shei ambience shei atmosphere songs , vibes , bbq pizza and most importantly you ♥️" },
  { id: 10, url: "/images/We4.jpg", title: "Shei Gariahat e orange ice-cream khete khete ulto dike walk kore ruby theke abr auto niye return aladai fun with kolkata r meye" },
  { id: 14, url: "/images/We5.jpg", title: "My current chat wallpaper , eta shei tritiya diner" },
  { id: 15, url: "/images/We6.jpg", title: "Chaturthi diner , shei Gariahat e ballygaunge side e pandal theke That Red House cafe te most beautiful girl amar sathe date e" },
  { id: 16, url: "/images/We7.jpg", title: "Shei khepu sathe khepu khepu selfie Diner 49B er samne rapido book kobar age" },
  { id: 17, url: "/images/We8.jpg", title: "Cute & Sweet er sathe ekta hot personality ache mante hoche boss !! ufff uff ufff" },
  { id: 18, url: "/images/We9.jpg", title: "First time tui saree amr samne ponchomi ,Shei saat samundar paar kore bhide bhattai chelta agrani r sathe koto pandals ghora ghori , diye paa felar jayga nei moton kalighat metro te just within time asaa "},
  { id: 20, url: "/images/We10.jpg", title: "Sosti and our last outing from Durga Puja 2024 , shei abr saree pore ese amai hypnotise kora and shei idlygo te filter coffee kehye taxi kore giye sorir kharap e gaa golani te trimu exhausted ,  hath paye jol niye trimu r jaane jaan ese ta dekhe amr jaan asa shaa ki din ,kilometers hete hete thakur dekhe jatin das park metro theke  cab e baari phere and then ... and then tomai safely baari drop kora "},
  { id: 12, url: "/images/We11.jpg", title: "South City mall e te , we had a lil fight later that day"},
  { id: 13, url: "/images/We12.jpg", title: "Tui all of a suden bolli tomar 8 tai plan achi toh aaj ami chole asi , ami soto mana korbr poreo tui eli thandai , faltu chai theke chaa and chicken cheese sandwich captain bherry te bose bose moshar kamore windy evening e time spend kora , that effort really impressed me and tui jete jete khali hate na amr heart er ekta tukro niye gechilis"},
  { id: 23, url: "/images/We13.jpg", title: "Shei reels dekhe khete jawa kolkatar ek onwo prante , dress kenar jldi o chilo oi chokore missed the ambience could have spent more time there better , dosh oi dogo taaro ,dorjar samne ke shuye thake bhai "},
  { id: 24, url: "/images/We14.jpg", title: "Bus e kore garfa jawa kina Denzong e momo khawa , shei khali bus e kore jawa kina , and then Paglir shei pagli pagli pose "},
  { id: 22, url: "/images/We15.jpg", title: "21st Birthday of my baby , bariteh sorir kharab niye jawa , Trimu r jonye cake niye pastry niye jawa or bariteh , khepi ta kichu tei manchilona na jabi toh shei cab ei , shei dakhinapan e bose bose goppoo jawar agee" },
  { id: 25, url: "/images/We16.jpg", title: "Christmas time , shei baazar kolkata theke shoping kore ,duto onwo bike e jawa , tarpor rasta match hochhena and then after 30 minutes match howai allen park bondho dekhe heartbreak howa and cab e bari phire selfie tola"},
  { id: 26, url: "/images/We17.jpg", title: "Shy Trimu park st. e kichutei chobi tolate jayna , ki kore bhojabo sob theke sundor toh tui hi chilis okhane , shei raat tar thekeo sundor"},
  { id: 29, url: "/images/We18.jpg", title: "Sawarswati Pujo sorted Trimu r sathe , finally amr deowar saree pore perfect wife material , masallaahh aladai look eto sundor outfit e kokhono dekhini , that saree was meant for u , tarpor the sad part i had to leave u early 2:44pm bari jawar jaldi te , missed you badly jawar somoi"},
  { id: 28, url: "/images/We19.jpg", title: "Just dumbstruck with your beauty babe , the sarees just compliments u even better"},
  { id: 4, url: "/images/We20.jpg", title: "first time we were captured in a lens , ari da lukiye tulechilo campus , hete hete oto dur jawa dekte j ratre park bondhyo , first time had deep conversation with you long walk e ice cream khete khete , that was the first time i felt like i was in love with you and wanna stay with you forever and awkward hugs"},
  { id: 2, url: "/images/We21.jpg", title: "tor first whatsapp dp which i saw , always special"},
  { id: 3, url: "/images/We22.jpg", title: "tor first status e dewa picture jeta i saw"},
  { id: 8.69, url: "/images/We23.jpg", title: "our first video call e kotha finally , amr BLR jawar por , start of something magical ,and amader aro better communication through out after that day"},
  { id: 11, url: "/images/We24.jpg", title: "bari theke shei pagli k miss kore selfie chawa , jantm na j amai valobashbe takee etotaa sundor dekteh hbe , wish i was samridhi for that evening "},
  { id: 19, url: "/images/We25.jpg", title: "something i never imagined , je ami amr girlfriend er sathe pujo te thakur dekteh jabo , jabo holeo takeey ei vabhe ful diye tar sondorjye aro kichu toppings add krbo , a effort jeta vblei goosebumps dei j onu wow u did some justice to her beauty man , very very special evening that"},
  { id: 21, url: "/images/We26.jpg", title: "Finally that morning pagli pujo katiye mamabari theke phirche , jawar agee onu k ekta cute selfie , amio happy j trimu finally comfortably ghumabe and abar amader midnight prem in vcall restarts that night"},
  { id: 5, url: "/images/We27.jpg", title: "ei sran kore bijhe chule j tokey kirom j patakka lage i can never explain to you , joto dekhi toto prem e pori , khub khub wifey wala vibes ashee , amr wife which i dream of"},
  { id: 1, url: "/images/We28.jpg", title: "The most special picture of my life , yes that's the first picture of yours which i saw for whom i eventually fell in love slowly but steadily very very deeply , ei picture ta always and is very special to me "},
  { id: 6, url: "/images/We29.jpg", title: "Yrr why have you stoped suprising me with your random selfies , ekhono mone pore koto koto nijer pictures pathathis during our texting phase and even voice call phase , kotota special korai ekta cheleke tor kono dharona nei , i even loved your imperfection , your lively cute sweet pixel perfect expressions of yours and that's what made me fall in love with you , plij yrr suprise me with your selfies , i miss them so much"},

];
photos.sort((a, b) => a.id - b.id);


const ValentinesPage = () => {
  const [showLoveMessage, setShowLoveMessage] = useState(false);
  // const [showConfetti, setShowConfetti] = useState(false);
  // const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentMessage, setCurrentMessage] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const loveMessages = [
    "I love You ",
    "You are my everything and Im all yours Khepi",
    "Every moment with you is magical ✨",
    "You are the reason I sleep with a smile on my face 😊",
    "Forever and always yours 💝"
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => setIsPlaying(false));
      }
    }
  }, []);

  const handleHeartClick = () => {
    // setShowConfetti(true);
    setShowLoveMessage(true);
    setCurrentMessage((prev) => (prev + 1) % loveMessages.length);
    // setTimeout(() => setShowConfetti(false), 2000);
    setTimeout(() => setShowLoveMessage(false), 3000);
  };

  <audio ref={audioRef} src="/sounds/tumSeHi.mp3" />
  const toggleMusic = () => {
    if (!audioRef.current) return; // Ensure the ref is not null
  
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  
    setIsPlaying(!isPlaying);
  };
  
  
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-rose-100">
      
      {/* <Confetti isActive={showConfetti} /> */}

      {/* Music Control */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 bg-white/80 p-3 rounded-full shadow-lg hover:bg-pink-100 transition-all"
      >
        {isPlaying ? (
          <Volume2 className="text-pink-600" size={24} />
        ) : (
          <VolumeX className="text-pink-600" size={24} />
        )}
      </motion.button>

      {/* New Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Floating Music Notes */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`music-${i}`}
              className="absolute text-pink-300"
              initial={{ y: '100vh', x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0 }}
              animate={{
                y: -100,
                x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Music size={20} />
            </motion.div>
          ))}

          {/* Floating Gifts */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`gift-${i}`}
              className="absolute text-red-400"
              initial={{ y: -100, x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0 }}
              animate={{
                y: '120vh',
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Gift size={24} />
            </motion.div>
          ))}

          {/* Enhanced Hearts Rain */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`heart-${i}`}
              className="absolute"
              initial={{ 
                y: -100, 
                x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
                scale: 0.5 + Math.random() * 0.5
              }}
              animate={{
                y: '120vh',
                x: `${Math.sin(i) * 100}px`,
                rotate: 360
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Heart 
                className="text-pink-400" 
                fill={Math.random() > 0.5 ? "currentColor" : "none"}
                size={16 + Math.random() * 16} 
              />
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center px-4">
          <motion.div 
            className="relative inline-block mb-8"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Pulsing Heart Aura */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-300 to-red-300 blur-3xl"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Main Heart */}
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleHeartClick}
              className="relative z-10 cursor-pointer"
            >
              <Heart className="text-red-500" size={120} fill="currentColor" />
            </motion.button>
          </motion.div>

          {/* Text Content with Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <motion.span 
                className="inline-block bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent"
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [-2, 2, -2]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Happy Valentine&apos;s Day
              </motion.span>
              <br />
              <motion.span 
                className="inline-block text-5xl md:text-6xl font-handwritten text-red-600 mt-4"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                My Dearest Khepi 💖
              </motion.span>
            </h1>
          </motion.div>
        </div>

        {/* Enhanced Love Message Pop-up */}
        <AnimatePresence>
          {showLoveMessage && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border-2 border-pink-200"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: "spring", damping: 12 }}
              >
                <motion.h3
                  className="text-4xl font-bold text-pink-600 mb-4"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [-5, 5, -5]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {loveMessages[currentMessage]}
                </motion.h3>
                <div className="flex justify-center space-x-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        y: [0, -10, 0],
                        scale: [1, 1.2, 1],
                        rotate: [-10, 10, -10]
                      }}
                      transition={{ 
                        delay: i * 0.1,
                        duration: 1,
                        repeat: Infinity
                      }}
                    >
                      <Heart className="text-red-500" size={24} fill="currentColor" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    
      {/* Photo Gallery */}
      <PhotoGallery photos={photos} />
            <Quote/>
      {/* Footer */}
      <footer className="bg-white py-8 text-center">
        <motion.div
          className="flex justify-center items-center space-x-2"
          whileHover={{ scale: 1.1 }}
        >
          <Heart className="text-red-500 animate-pulse" size={24} />
          <p className="text-gray-600">Made with endless love for my Khepi</p>
          <Heart className="text-red-500 animate-pulse" size={24} />
        </motion.div>
      </footer>
    </div>
  );
};

export default ValentinesPage;