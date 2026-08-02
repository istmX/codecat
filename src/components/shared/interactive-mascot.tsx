"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CodeCatLogo } from "@/components/shared/codecat-logo";
import { cn } from "@/lib/utils/cn";

const MASCOT_QUOTES = [
  "I smell a code smell...",
  "Another PR? Bring it...",
  "Humans never write enough tests...",
  "This diff is bigger than my attention span...",
  "I reviewed it so you don't have to...",
  "Compiles on your machine? Interesting...",
  "Zero warnings? I'll believe it when I see it...",
  "Feed me another pull request...",
  "I found bugs before my morning nap...",
  "Your linter is trying its best..."
];

export function InteractiveMascot({ className }: { className?: string }) {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [quote, setQuote] = useState("");
  const [showQuote, setShowQuote] = useState(false);
  const [roamingThought, setRoamingThought] = useState("");
  const [isWalking, setIsWalking] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [facingRight, setFacingRight] = useState(true);
  const [clickCount, setClickCount] = useState(0);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPosition({
      x: window.innerWidth / 2 - 50,
      y: window.innerHeight / 2 - 50
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  // Easter Egg: Type 'cat'
  useEffect(() => {
    if (!isMounted) return;
    
    let keyBuffer = "";
    const handleKeyDown = (e: KeyboardEvent) => {
      keyBuffer += e.key.toLowerCase();
      if (keyBuffer.length > 3) {
        keyBuffer = keyBuffer.slice(-3);
      }
      
      if (keyBuffer === "cat") {
        keyBuffer = "";
        // Force cat to run across screen
        setQuote("Zoomies! 💨");
        setShowQuote(true);
        setIsWalking(true);
        setPosition({ x: -150, y: window.innerHeight - 150 });
        setFacingRight(true);
        
        setTimeout(() => {
          setPosition({ x: window.innerWidth + 150, y: window.innerHeight - 150 });
        }, 100);
        
        setTimeout(() => {
          setShowQuote(false);
          setIsWalking(false);
        }, 3000);
      }
    };

    const handleHappyEvent = () => {
      setQuote("Yay! A new repository to review! 🚀");
      setShowQuote(true);
      setIsWalking(true);
      setTimeout(() => {
        setShowQuote(false);
        setIsWalking(false);
      }, 4000);
    };

    const handleSadEvent = () => {
      setQuote("Why did you remove me? 😿");
      setShowQuote(true);
      setIsWalking(false);
      // Optional: shake animation by moving position slightly back and forth
      setTimeout(() => {
        setShowQuote(false);
      }, 4000);
    };
    
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("codecat-happy", handleHappyEvent);
    window.addEventListener("codecat-sad", handleSadEvent);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("codecat-happy", handleHappyEvent);
      window.removeEventListener("codecat-sad", handleSadEvent);
    };
  }, [isMounted]);

  const moveRandomly = useCallback(() => {
    if (typeof window === "undefined" || showQuote || isDragging || isMenuOpen) return;
    
    // Strict bounding box to keep the cat fully on screen
    const minX = 50;
    const maxX = window.innerWidth - 150;
    const minY = 100;
    const maxY = window.innerHeight - 150;

    const nextX = Math.max(minX, Math.min(maxX, Math.random() * maxX));
    const nextY = Math.max(minY, Math.min(maxY, Math.random() * maxY));
    
    setFacingRight(nextX > position.x);
    setIsWalking(true);
    
    setPosition({ x: nextX, y: nextY });

    // Stop walking animation after it arrives
    setTimeout(() => {
      setIsWalking(false);

      // Randomly spawn a roaming thought when arriving
      if (Math.random() > 0.3 && !showQuote && !isDragging && !isMenuOpen) {
        const thoughts = ["sleepy~", "happy~", "meow~"];
        setRoamingThought(thoughts[Math.floor(Math.random() * thoughts.length)]);
        setTimeout(() => setRoamingThought(""), 2000);
      }
    }, 2000);
  }, [position.x, showQuote, isDragging, isMenuOpen]);

  // Roam every 8 seconds if idle
  useEffect(() => {
    if (!isMounted) return;
    const interval = setInterval(() => {
      if (!showQuote && !isDragging && !isMenuOpen) {
        moveRandomly();
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [isMounted, showQuote, isDragging, isMenuOpen, moveRandomly]);

  const handleMouseEnter = () => {
    if (isDragging || isMenuOpen) return;
    const randomIndex = Math.floor(Math.random() * MASCOT_QUOTES.length);
    setQuote(`Mew... ${MASCOT_QUOTES[randomIndex]} ...Meow`);
    setShowQuote(true);
    setRoamingThought("");
  };

  const handleMouseLeave = () => {
    if (isDragging) return;
    setShowQuote(false);
  };

  const handleCatClick = () => {
    if (!isDragging) {
      const newCount = clickCount + 1;
      setClickCount(newCount);
      
      if (newCount === 10) {
        setQuote("Achievement Unlocked! 🐟 Fish Earned!");
        setShowQuote(true);
        setTimeout(() => setShowQuote(false), 3000);
        setClickCount(0); 
      } else {
        setIsMenuOpen(true);
        setShowQuote(false);
      }
    }
  };

  return (
    <>
      <motion.div 
        className={cn("fixed top-0 left-0 z-[100] flex flex-col items-center justify-center pointer-events-none", className)}
        initial={false}
        animate={isDragging ? undefined : { x: position.x, y: position.y }}
        transition={{ 
          x: { duration: isDragging ? 0 : (isWalking ? 2 : 0.5), ease: "easeInOut" },
          y: { duration: isDragging ? 0 : (isWalking ? 2 : 0.5), ease: "easeInOut" }
        }}
        drag
        dragConstraints={{ 
          left: 50, 
          right: typeof window !== 'undefined' ? window.innerWidth - 150 : 1000, 
          top: 100, 
          bottom: typeof window !== 'undefined' ? window.innerHeight - 150 : 1000 
        }}
        dragElastic={0.1}
        dragMomentum={false}
        onDragStart={() => {
          setIsDragging(true);
          setIsWalking(false);
          setQuote("Put me down! 🙀");
          setShowQuote(true);
          setRoamingThought("");
        }}
        onDragEnd={(_, info) => {
          setIsDragging(false);
          setShowQuote(false);
          
          // Clamp the drop position so it doesn't get dropped off-screen
          const dropX = Math.max(50, Math.min(window.innerWidth - 150, info.point.x - 50));
          const dropY = Math.max(100, Math.min(window.innerHeight - 150, info.point.y - 50));
          
          setPosition({ x: dropX, y: dropY });
        }}
        style={{ width: 100, height: 100 }}
      >
        {/* Wrapper to handle left/right flipping without flipping the speech bubbles */}
        <div 
          style={{ transform: `scaleX(${facingRight ? -1 : 1})`, transition: 'transform 0.2s' }} 
          className="flex flex-col items-center justify-center w-full h-full"
        >
          {/* The Mascot */}
          <motion.div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleCatClick}
            animate={
              isDragging 
              ? { y: -15, rotate: [-5, 5, -5] } // Dangle animation when picked up
              : isWalking 
                ? { y: [0, -5, 0, -5, 0], rotate: 0 } // Bouncing walk
                : { y: [0, -2, 0], rotate: 0 } // Idle breathing
            }
            transition={{ 
              duration: isDragging ? 0.3 : (isWalking ? 0.6 : 3), 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className={cn(
              "pointer-events-auto cursor-grab active:cursor-grabbing transition-transform duration-200",
              (!isDragging && !isWalking) ? "hover:scale-110" : "",
              (!isWalking && !isDragging) && "paused", // This pauses the CSS animation of the legs
              isDragging && "paused" // Also pause legs when dangling
            )}
            style={{ touchAction: "none" }}
          >
            <CodeCatLogo 
              size={100} 
              className="drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
            />
          </motion.div>
        </div>

        {/* The Speech Bubble (Hover Quotes) */}
        <AnimatePresence>
          {showQuote && !isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: -10 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              className={cn(
                "absolute bottom-full mb-2 rounded-lg border bg-card p-3 shadow-xl z-50 pointer-events-none",
                isDragging ? "border-red-500/50 w-40" : "border-border w-56"
              )}
            >
              {/* Arrow pointing down to cat */}
              <div className={cn(
                "absolute -bottom-1.5 left-1/2 -ml-1.5 h-3 w-3 rotate-45 border-b border-r bg-card",
                isDragging ? "border-red-500/50" : "border-border"
              )} />
              
              <p className={cn(
                "text-sm font-medium relative z-10 leading-snug text-center",
                isDragging ? "text-red-500 font-bold" : "text-foreground"
              )}>
                {quote}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Small Roaming Thoughts (sleepy~, happy~) */}
        <AnimatePresence>
          {roamingThought && !showQuote && !isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 0, scale: 0.5 }}
              animate={{ opacity: 1, y: -40, scale: 1 }}
              exit={{ opacity: 0, y: -60, scale: 0.8 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute top-0 right-0 pointer-events-none"
            >
              <span className="text-xs font-semibold text-primary/80 italic drop-shadow-md bg-background/50 px-2 py-1 rounded-full border border-border/50">
                {roamingThought}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Cat Menu Modal */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex w-full max-w-lg flex-col items-center rounded-2xl border border-border bg-card shadow-2xl"
            >
              <div className="absolute -top-12 rounded-full border-4 border-card bg-background p-2 shadow-lg z-10">
                <CodeCatLogo size={70} className="drop-shadow-lg" />
              </div>
              
              <div className="mt-8 flex w-full flex-col p-6 gap-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
                
                {/* Section: What's New */}
                <div className="w-full">
                  <h3 className="mb-2 text-sm font-bold text-muted-foreground tracking-wider uppercase flex items-center gap-2">
                    <span>🐈</span> Mew... What&apos;s New? ...Meow
                  </h3>
                  <div className="flex flex-col gap-1 rounded-lg border border-border bg-secondary/20 p-2">
                    <button className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors text-left">
                      Release Notes
                    </button>
                    <button className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors text-left">
                      Changelog
                    </button>
                    <button className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors text-left">
                      New Features
                    </button>
                  </div>
                </div>

                {/* Section: Need Help */}
                <div className="w-full">
                  <h3 className="mb-2 text-sm font-bold text-muted-foreground tracking-wider uppercase flex items-center gap-2">
                    <span>🐈</span> Mew... Need Help? ...Meow
                  </h3>
                  <div className="flex flex-col gap-1 rounded-lg border border-border bg-secondary/20 p-2">
                    <button className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors text-left">
                      Documentation
                    </button>
                    <button className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors text-left">
                      Keyboard Shortcuts
                    </button>
                    <button className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors text-left">
                      Contact Support
                    </button>
                  </div>
                </div>

                {/* Section: Cat Settings */}
                <div className="w-full">
                  <h3 className="mb-2 text-sm font-bold text-muted-foreground tracking-wider uppercase flex items-center gap-2">
                    <span>🐈</span> Mew... Cat Settings... Meow
                  </h3>
                  <div className="flex flex-col gap-1 rounded-lg border border-border bg-secondary/20 p-2">
                    <button className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors text-left">
                      Change Mood
                    </button>
                    <button className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors text-left">
                      Enable Random Quotes
                    </button>
                    <button className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors text-left">
                      Disable Cat
                    </button>
                  </div>
                </div>

                {/* Section: About */}
                <div className="w-full">
                  <h3 className="mb-2 text-sm font-bold text-muted-foreground tracking-wider uppercase flex items-center gap-2">
                    <span>🐈</span> Mew... About CodeCat... Meow
                  </h3>
                  <div className="flex flex-col gap-1 rounded-lg border border-border bg-secondary/20 p-4 text-xs text-muted-foreground">
                    <p className="font-medium text-foreground mb-1">Version 0.1.0</p>
                    <p>Built with ISTMX Skills</p>
                    <p className="mt-2 text-primary hover:underline cursor-pointer">GitHub</p>
                    <p className="text-primary hover:underline cursor-pointer">Discord</p>
                  </div>
                </div>

              </div>

              <div className="border-t border-border w-full p-4 flex justify-center">
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                >
                  Close Menu
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
