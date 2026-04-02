import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/PlusJakartaSans";

const { fontFamily: displayFont } = loadFont("normal", { weights: ["700", "800"], subsets: ["latin"] });

const PRIMARY = "#00B5C8";
const BG = "#0A1628";
const WHITE = "#FFFFFF";

export const Scene1_Intro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Dramatic zoom on background
  const bgScale = interpolate(frame, [0, 150], [1.15, 1.0], { extrapolateRight: "clamp" });
  const bgOpacity = interpolate(frame, [0, 30], [0, 0.35], { extrapolateRight: "clamp" });

  // Logo entrance with spring
  const logoSpring = spring({ frame: frame - 15, fps, config: { damping: 12, stiffness: 80, mass: 1.8 } });
  const logoY = interpolate(logoSpring, [0, 1], [80, 0]);
  
  // Tagline
  const tagSpring = spring({ frame: frame - 45, fps, config: { damping: 15, stiffness: 100 } });
  const tagY = interpolate(tagSpring, [0, 1], [40, 0]);

  // Subtitle words stagger
  const words = ["La", "salute,", "a", "portata", "di", "clic"];
  
  // Cinematic bars
  const barWidth = interpolate(frame, [0, 40], [0, 100], { extrapolateRight: "clamp" });

  // Floating particles
  const particles = Array.from({ length: 12 }, (_, i) => ({
    x: (i * 173 + 50) % 1920,
    y: (i * 137 + 100) % 1080,
    size: 3 + (i % 4) * 2,
    speed: 0.3 + (i % 3) * 0.2,
    delay: i * 8,
  }));

  return (
    <AbsoluteFill style={{ background: BG }}>
      {/* Gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${PRIMARY}12, transparent 70%)`,
      }} />
      
      {/* Subtle grid lines */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: `linear-gradient(${WHITE}20 1px, transparent 1px), linear-gradient(90deg, ${WHITE}20 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
        transform: `scale(${bgScale})`,
      }} />

      {/* Floating particles */}
      {particles.map((p, i) => {
        const pOpacity = interpolate(frame - p.delay, [0, 20], [0, 0.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const pY = p.y + Math.sin((frame - p.delay) * 0.02 * p.speed) * 30;
        return (
          <div key={i} style={{
            position: "absolute", left: p.x, top: pY,
            width: p.size, height: p.size, borderRadius: "50%",
            background: i % 3 === 0 ? PRIMARY : `${WHITE}40`,
            opacity: pOpacity,
          }} />
        );
      })}

      {/* Top cinematic bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, transparent, ${PRIMARY}, transparent)`,
        opacity: interpolate(frame, [10, 40], [0, 0.8], { extrapolateRight: "clamp" }),
      }} />

      <AbsoluteFill style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
        {/* Logo */}
        <div style={{
          fontFamily: displayFont, fontSize: 140, fontWeight: 800,
          color: WHITE, letterSpacing: -4,
          opacity: logoSpring,
          transform: `translateY(${logoY}px)`,
        }}>
          <span style={{ color: PRIMARY }}>B</span>ifase<span style={{ color: PRIMARY }}>.</span>
        </div>

        {/* Tagline with word stagger */}
        <div style={{
          display: "flex", gap: 14, marginTop: 24,
          opacity: tagSpring,
          transform: `translateY(${tagY}px)`,
        }}>
          {words.map((word, i) => {
            const wordSpring = spring({ frame: frame - 50 - i * 4, fps, config: { damping: 18 } });
            return (
              <span key={i} style={{
                fontFamily: displayFont, fontSize: 34, fontWeight: 700,
                color: word === "portata" || word === "clic" ? PRIMARY : `${WHITE}90`,
                opacity: wordSpring,
                transform: `translateY(${interpolate(wordSpring, [0, 1], [15, 0])}px)`,
              }}>
                {word}
              </span>
            );
          })}
        </div>

        {/* Accent line */}
        <div style={{
          marginTop: 30, height: 2, borderRadius: 1,
          background: PRIMARY,
          width: interpolate(frame, [60, 90], [0, 120], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          opacity: interpolate(frame, [60, 80], [0, 1], { extrapolateRight: "clamp" }),
        }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
