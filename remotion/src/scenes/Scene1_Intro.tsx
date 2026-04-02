import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/PlusJakartaSans";

const { fontFamily: displayFont } = loadFont("normal", { weights: ["700", "800"], subsets: ["latin"] });

const PRIMARY = "#00B5C8";
const BG = "#0A1628";
const WHITE = "#FFFFFF";

export const Scene1_Intro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgScale = interpolate(frame, [0, 200], [1.15, 1.0], { extrapolateRight: "clamp" });

  // Slow, dramatic logo reveal
  const logoSpring = spring({ frame: frame - 20, fps, config: { damping: 18, stiffness: 50, mass: 2.5 } });
  const logoScale = interpolate(logoSpring, [0, 1], [0.6, 1]);
  const logoOpacity = interpolate(frame, [20, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Tagline appears slowly after logo settles
  const tagDelay = 70;
  const tagOpacity = interpolate(frame, [tagDelay, tagDelay + 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tagY = interpolate(frame, [tagDelay, tagDelay + 30], [25, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Subtitle even later
  const subDelay = 110;
  const subOpacity = interpolate(frame, [subDelay, subDelay + 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Gentle floating particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    x: (i * 173 + 50) % 1920,
    y: (i * 137 + 100) % 1080,
    size: 2 + (i % 4) * 2,
    delay: i * 6,
  }));

  // Accent line
  const lineWidth = interpolate(frame, [90, 130], [0, 160], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lineOpacity = interpolate(frame, [90, 110], [0, 0.8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: BG }}>
      {/* Radial glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${PRIMARY}15, transparent 70%)`,
      }} />

      {/* Subtle grid */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: `linear-gradient(${WHITE}15 1px, transparent 1px), linear-gradient(90deg, ${WHITE}15 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
        transform: `scale(${bgScale})`,
      }} />

      {/* Particles */}
      {particles.map((p, i) => {
        const pOp = interpolate(frame - p.delay, [0, 30], [0, 0.35], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const pY = p.y + Math.sin((frame - p.delay) * 0.015) * 25;
        return (
          <div key={i} style={{
            position: "absolute", left: p.x, top: pY,
            width: p.size, height: p.size, borderRadius: "50%",
            background: i % 3 === 0 ? PRIMARY : `${WHITE}30`,
            opacity: pOp,
          }} />
        );
      })}

      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, transparent, ${PRIMARY}, transparent)`,
        opacity: interpolate(frame, [15, 50], [0, 0.7], { extrapolateRight: "clamp" }),
      }} />

      <AbsoluteFill style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
        {/* Real Logo PNG */}
        <Img
          src={staticFile("images/logo-bifase.png")}
          style={{
            height: 160,
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
          }}
        />

        {/* Tagline */}
        <div style={{
          marginTop: 36, fontFamily: displayFont, fontSize: 38, fontWeight: 700,
          color: `${WHITE}CC`, textAlign: "center",
          opacity: tagOpacity,
          transform: `translateY(${tagY}px)`,
        }}>
          La salute, a portata di clic
        </div>

        {/* Accent line */}
        <div style={{
          marginTop: 28, height: 2, borderRadius: 1,
          background: PRIMARY, width: lineWidth, opacity: lineOpacity,
        }} />

        {/* Subtitle */}
        <div style={{
          marginTop: 20, fontFamily: displayFont, fontSize: 20,
          color: `${WHITE}50`, fontWeight: 700, letterSpacing: 4,
          textTransform: "uppercase", opacity: subOpacity,
        }}>
          Per cittadini e professionisti
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
