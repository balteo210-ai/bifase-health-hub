import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/PlusJakartaSans";

const { fontFamily: displayFont } = loadFont("normal", { weights: ["700", "800"], subsets: ["latin"] });

const PRIMARY = "#00B5C8";
const BG = "#0A1628";
const WHITE = "#FFFFFF";

export const Scene6_CTA = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow dramatic entrance
  const logoSpring = spring({ frame: frame - 10, fps, config: { damping: 20, stiffness: 40, mass: 3 } });

  // Expanding glow
  const glowSize = interpolate(frame, [0, 160], [100, 900], { extrapolateRight: "clamp" });
  const glowOp = interpolate(frame, [0, 50], [0, 0.25], { extrapolateRight: "clamp" });

  // Logo gentle pulse
  const pulse = Math.sin(frame * 0.04) * 3;

  // Text
  const textOp = interpolate(frame, [40, 65], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const textY = interpolate(frame, [40, 65], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // URL badge
  const urlOp = interpolate(frame, [80, 105], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const urlY = interpolate(frame, [80, 105], [25, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Subtitle
  const subOp = interpolate(frame, [110, 135], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Converging particles
  const particles = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * Math.PI * 2;
    const startDist = 600;
    const progress = interpolate(frame, [0, 80], [0, 1], { extrapolateRight: "clamp" });
    const dist = startDist * (1 - progress * 0.7);
    return {
      x: 960 + Math.cos(angle + frame * 0.005) * dist,
      y: 540 + Math.sin(angle + frame * 0.005) * dist,
      size: 2 + (i % 3) * 2,
      opacity: interpolate(frame, [i * 3, i * 3 + 25], [0, 0.3], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    };
  });

  return (
    <AbsoluteFill style={{ background: BG }}>
      {/* Particles */}
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
        background: `radial-gradient(circle, ${PRIMARY}20, transparent 70%)`,
        transform: "translate(-50%, -50%)", opacity: glowOp,
      }} />

      <AbsoluteFill style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
        {/* Real Logo */}
        <Img
          src={staticFile("images/logo-bifase.png")}
          style={{
            height: 120, opacity: logoSpring,
            transform: `scale(${logoSpring}) translateY(${pulse}px)`,
          }}
        />

        {/* Main text */}
        <div style={{
          marginTop: 36, fontFamily: displayFont, fontSize: 72, fontWeight: 800,
          color: WHITE, textAlign: "center", lineHeight: 1.2,
          opacity: textOp, transform: `translateY(${textY}px)`,
        }}>
          La tua salute.
          <br />
          <span style={{ color: PRIMARY }}>Senza attese.</span>
        </div>

        {/* URL badge */}
        <div style={{
          marginTop: 44, padding: "16px 52px", borderRadius: 50,
          background: `linear-gradient(135deg, ${PRIMARY}, #0099AA)`,
          fontFamily: displayFont, fontSize: 28, fontWeight: 700,
          color: WHITE, letterSpacing: 1,
          opacity: urlOp, transform: `translateY(${urlY}px)`,
          boxShadow: `0 20px 60px ${PRIMARY}40`,
        }}>
          bifase.it
        </div>

        {/* Subtitle */}
        <div style={{
          marginTop: 22, fontFamily: displayFont, fontSize: 17,
          color: `${WHITE}45`, fontWeight: 700, letterSpacing: 3,
          textTransform: "uppercase", opacity: subOp,
        }}>
          Disponibile ora
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
