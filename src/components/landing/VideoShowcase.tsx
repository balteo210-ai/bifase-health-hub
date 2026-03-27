import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useState, useRef } from 'react';

const VideoShowcase = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
            Scopri Bifase
          </span>
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-5xl">
            La salute, senza attese
          </h2>
          <p className="mx-auto mb-12 max-w-lg text-muted-foreground md:text-lg">
            Guarda come Bifase sta rivoluzionando l'accesso ai servizi sanitari
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-4xl"
        >
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-navy shadow-2xl">
            <video
              ref={videoRef}
              className="w-full aspect-video"
              src="/videos/bifase-promo.mp4"
              muted
              playsInline
              onEnded={() => setIsPlaying(false)}
            />
            {!isPlaying && (
              <button
                onClick={handlePlay}
                className="absolute inset-0 flex items-center justify-center bg-navy/40 transition-colors hover:bg-navy/30"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/30 transition-transform hover:scale-110">
                  <Play className="h-8 w-8 text-primary-foreground ml-1" />
                </div>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoShowcase;
