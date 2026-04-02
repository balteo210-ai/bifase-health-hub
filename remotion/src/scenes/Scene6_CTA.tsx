import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/PlusJakartaSans";

const { fontFamily: displayFont } = loadFont("normal", { weights: ["700", "800"], subsets: ["latin"] });

const PRIMARY = "#00B5C8";
const BG = "#0A1628";
const WHITE = "#FFFFFF";

export const Scene6_CTA = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({ frame, fps, config: { damping: 12, stiffness: 60, mass: 2 } });

  // Expanding glow
  const glowSize = interpolate(frame, [0, 120], [100, 800], { extrapolateRight: "clamp" });
  const glowOp = interpolate(frame, [0, 40], [0, 0.3], { extrapolateRight: "clamp" });

  // Logo pulse
  const pulse = Math.sin(frame * 0.06) * 3;

  // URL entrance
  const urlSpring = spring({ frame: frame - 40, fps, config: { damping: 15 } });

  // Particles converging
  const particles = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * Math.PI * 2;
    const startDist = 600;
    const progress = interpolate(frame, [0, 60], [0, 1], { extrapolateRight: "clamp" });
    const dist = startDist * (1 - progress * 0.7);
    return {
      x: 960 + Math.cos(angle + frame * 0.008) * dist,
      y: 540 + Math.sin(angle + frame * 0.008) * dist,
      size: 2 + (i % 3) * 2,
      opacity: interpolate(frame, [i * 2, i * 2 + 20], [0, 0.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    };
  });

  return (
    <AbsoluteFill style={{ background: BG }}>
      {/* Converging particles */}
      {particles.map((p, i) => (
        <div key={i} style={{
          position: "absolute", left: p.x, top: p.y,
          width: p.size, height: p.size, borderRadius: "50%",
          background: i % 2 === 0 ? PRIMARY : WHITE,
          opacity: p.opacity,
        }} />
      ))}

      {/* Central glow */}
      <div style={{
        position: "absolute", left: "50%", top: "50%",
        width: glowSize, height: glowSize, borderRadius: "50%",
        background: `radial-gradient(circle, ${PRIMARY}25, transparent 70%)`,
        transform: "translate(-50%, -50%)",
        opacity: glowOp,
      }} />

      <AbsoluteFill style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
        {/* Main text */}
        <div style={{
          fontFamily: displayFont, fontSize: 88, fontWeight: 800,
          color: WHITE, textAlign: "center", lineHeight: 1.15,
          transform: `scale(${s}) translateY(${pulse}px)`,
          opacity: s,
        }}>
          La tua salute.
          <br />
          <span style={{ color: PRIMARY }}>Senza attese.</span>
        </div>

        {/* URL badge */}
        <div style={{
          marginTop: 50, padding: "18px 56px",
          borderRadius: 50,
          background: `linear-gradient(135deg, ${PRIMARY}, #0099AA)`,
          fontFamily: displayFont, fontSize: 30, fontWeight: 700,
          color: WHITE, letterSpacing: 1,
          opacity: urlSpring,
          transform: `translateY(${interpolate(urlSpring, [0, 1], [30, 0])}px)`,
          boxShadow: `0 20px 60px ${PRIMARY}40, 0 0 0 1px ${PRIMARY}60`,
        }}>
          bifase.it
        </div>

        {/* Subtitle */}
        <div style={{
          marginTop: 24, fontFamily: displayFont, fontSize: 18,
          color: `${WHITE}50`, fontWeight: 700, letterSpacing: 3,
          textTransform: "uppercase",
          opacity: interpolate(frame, [50, 70], [0, 1], { extrapolateRight: "clamp" }),
        }}>
          Disponibile ora
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
