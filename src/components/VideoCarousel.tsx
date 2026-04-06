import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";
import video3 from "../assets/video3.mp4";
import video4 from "../assets/video4.mp4";
import video5 from "../assets/video5.mp4";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const videos = [video1, video2, video3, video4, video5];

export default function VideoCarousel() {
  const container = useRef<HTMLDivElement>(null);
  // Store ref to each video element using a callback ref array
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Expose contextSafe so we can run animations tied to this component's lifecycle
  const { contextSafe } = useGSAP({ scope: container });

  const updatePositions = contextSafe((index: number) => {
    const total = videos.length;

    videos.forEach((_, i) => {
      const el = container.current?.querySelectorAll(".video-slide")[i];
      if (!el) return;

      // Find the shortest distance in an infinite loop
      let diff = i - index;
      if (diff > Math.floor(total / 2)) diff -= total;
      if (diff < -Math.floor(total / 2)) diff += total;

      const isCenter = diff === 0;

      // X translation (responsive overlap)
      // 220px offset creates a cool 3D coverflow overlap effect
      const xOffset = diff * 220; 
      const scale = isCenter ? 1 : 0.85;
      const opacity = Math.abs(diff) > 2 ? 0 : isCenter ? 1 : 0.6;
      const blur = isCenter ? 0 : 6;
      const zIndex = 30 - Math.abs(diff);

      gsap.to(el, {
        x: xOffset,
        scale: scale,
        opacity: opacity,
        zIndex: zIndex,
        filter: `blur(${blur}px)`,
        duration: 0.6,
        ease: "power3.out"
      });
    });
  });

  // Automatically recalculate positions whenever the index changes
  useGSAP(() => {
    updatePositions(currentIndex);
  }, [currentIndex]);

  // Viewport tracking so videos pause when user scrolls away
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: container.current,
      start: "top 75%",
      end: "bottom 35%",
      onEnter: () => setIsInView(true),
      onLeave: () => setIsInView(false),
      onEnterBack: () => setIsInView(true),
      onLeaveBack: () => setIsInView(false),
    });
  }, { scope: container });

  // Handle Play/Pause securely based on slider state AND viewport visibility
  useEffect(() => {
    videos.forEach((_, i) => {
      const videoEl = videoRefs.current[i];
      if (!videoEl) return;
      
      if (i === currentIndex) {
        if (isInView && isPlaying) {
          // Play the center video if carousel is visible on screen and user has pressed Play
          videoEl.play().catch(() => {});
        } else {
          videoEl.pause();
        }
      } else {
        // Force side videos to pause and reset them so they start fresh
        videoEl.pause();
        videoEl.currentTime = 0; 
      }
    });
  }, [currentIndex, isInView, isPlaying]);

  const handleInitialPlay = () => {
    setIsMuted(false);
    setIsPlaying(true);
  };


  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <article 
      className="reveal relative w-full mt-0 sm:mt-6 mb-8 transition-all flex flex-col items-center pt-16 sm:pt-0 pb-6 sm:py-6"
    >
      <div className="text-center mb-6">
         <h2 className="font-title text-3xl font-extrabold text-zinc-900 dark:text-white">
            Nossas <span className="text-teal-600 dark:text-teal-400">Coleções</span>
         </h2>
         <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">Deslize para ver os modelos em destaque.</p>
      </div>

      {/* Main 3D Tracking Area */}
      <div 
        ref={container}
        className="relative w-full h-[60dvh] lg:h-[550px] flex justify-center items-center overflow-hidden"
      >
        {videos.map((vid, i) => (
          <div 
            key={i}
            className="video-slide absolute w-[260px] sm:w-[300px] aspect-[9/16] rounded-[2.5rem] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.8)] border border-white/20 bg-zinc-950 will-change-transform cursor-pointer"
            onClick={() => setCurrentIndex(i)}
          >
            <video 
              ref={(el) => { videoRefs.current[i] = el; }}
              src={vid}
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover"
            />
            {/* Dark gradient for elegant text/overlay handling */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent pointer-events-none" />
          </div>
        ))}

        {/* Giant Play Button Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
             <button
                onClick={handleInitialPlay}
                aria-label="Iniciar Vídeo com Som"
                className="pointer-events-auto h-20 w-20 rounded-full bg-teal-500/80 backdrop-blur-md border border-white/40 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 shadow-[0_0_30px_rgba(20,184,166,0.6)] animate-pulse"
             >
                <svg className="w-10 h-10 ml-2" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
             </button>
          </div>
        )}

        {/* Global Controls Overlay */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 sm:px-[15%] z-50 pointer-events-none">
          <button 
            onClick={prevSlide}
            aria-label="Vídeo anterior"
            className="pointer-events-auto h-12 w-12 rounded-full bg-black/60 backdrop-blur hover:bg-black/80 border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 shadow-xl"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          
          <button 
            onClick={nextSlide}
            aria-label="Próximo vídeo"
            className="pointer-events-auto h-12 w-12 rounded-full bg-black/60 backdrop-blur hover:bg-black/80 border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 shadow-xl"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        {/* Floating Mute Button Separated Below the Carousel Controls */}
        <div className="absolute bottom-[10%] right-[15%] z-50 pointer-events-none">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="pointer-events-auto h-12 w-12 rounded-full bg-teal-600/80 backdrop-blur-md hover:bg-teal-500 border border-teal-400/50 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(20,184,166,0.6)]"
              aria-label={isMuted ? "Ativar som" : "Desativar som"}
            >
              {isMuted ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
              )}
            </button>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-2 inset-x-0 flex justify-center gap-2 z-50 pointer-events-none">
          {videos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Ir para o vídeo ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 pointer-events-auto ${idx === currentIndex ? "w-8 bg-teal-400" : "w-2.5 bg-white/40 hover:bg-white/70"}`}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
