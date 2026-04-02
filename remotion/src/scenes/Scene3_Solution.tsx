import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const { fontFamily: displayFont } = loadFont("normal", { weights: ["700", "800"], subsets: ["latin"] });
const { fontFamily: bodyFont } = loadInter("normal", { weights: ["400", "500", "600"], subsets: ["latin"] });

const PRIMARY = "#00B5C8";
const BG = "#0A1628";
const WHITE = "#FFFFFF";
const MUTED = "#6B8AAD";

export const Scene3_Solution = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Screenshot entrance - slides up with parallax
  const screenSpring = spring({ frame: frame - 20, fps, config: { damping: 18, stiffness: 60, mass: 2 } });
  const screenY = interpolate(screenSpring, [0, 1], [200, 0]);
  const screenScale = interpolate(screenSpring, [0, 1], [0.9, 1]);

  // Floating glow behind screenshot
  const glowPulse = Math.sin(frame * 0.04) * 0.15 + 0.85;

  const steps = [
    { num: "01", text: "Cerca servizi nella tua zona" },
    { num: "02", text: "Confronta e scegli in tempo reale" },
    { num: "03", text: "Prenota e paga in pochi clic" },
  ];

  return (
    <AbsoluteFill style={{ background: BG }}>
      {/* Background glow */}
      <div style={{
        position: "absolute", right: "10%", top: "20%",
        width: 600, height: 600, borderRadius: "50%",
        background: `radial-gradient(circle, ${PRIMARY}15, transparent 60%)`,
        opacity: glowPulse,
      }} />

      <AbsoluteFill style={{
        display: "flex", flexDirection: "row",
        alignItems: "center", padding: "0 100px",
      }}>
        {/* Left: text content */}
        <div style={{ flex: 1, paddingRight: 60 }}>
          {/* Label */}
          <div style={{
            fontFamily: bodyFont, fontSize: 16, fontWeight: 600,
            color: PRIMARY, letterSpacing: 4, textTransform: "uppercase",
            opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
            marginBottom: 20,
          }}>
            La soluzione
          </div>

          {/* Title */}
          <div style={{
            fontFamily: displayFont, fontSize: 64, fontWeight: 800,
            color: WHITE, lineHeight: 1.15, marginBottom: 50,
            opacity: interpolate(frame, [5, 25], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateX(${interpolate(frame, [5, 25], [-50, 0], { extrapolateRight: "clamp" })}px)`,
          }}>
            Con <span style={{ color: PRIMARY }}>Bifase</span>,<br />
            tutto cambia.
          </div>

          {/* Steps */}
          {steps.map((step, i) => {
            const delay = 30 + i * 15;
            const s = spring({ frame: frame - delay, fps, config: { damping: 15 } });
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 20,
                marginBottom: 28, opacity: s,
                transform: `translateX(${interpolate(s, [0, 1], [-30, 0])}px)`,
              }}>
                <div style={{
                  fontFamily: displayFont, fontSize: 18, fontWeight: 800,
                  color: PRIMARY, minWidth: 40,
                }}>{step.num}</div>
                <div style={{
                  height: 1, width: 30, background: `${PRIMARY}50`,
                }} />
                <div style={{
                  fontFamily: bodyFont, fontSize: 22, fontWeight: 500,
                  color: `${WHITE}CC`,
                }}>{step.text}</div>
              </div>
            );
          })}
        </div>

        {/* Right: screenshot */}
        <div style={{
          flex: 1.1, position: "relative",
          transform: `translateY(${screenY}px) scale(${screenScale})`,
          opacity: screenSpring,
        }}>
          {/* Glow behind */}
          <div style={{
            position: "absolute", inset: -40, borderRadius: 32,
            background: `${PRIMARY}10`,
            filter: "blur(40px)",
          }} />
          
          {/* Screenshot with frame */}
          <div style={{
            borderRadius: 16, overflow: "hidden",
            border: `1px solid ${WHITE}15`,
            boxShadow: `0 40px 80px ${PRIMARY}15, 0 0 0 1px ${WHITE}05`,
          }}>
            {/* Browser bar */}
            <div style={{
              height: 36, background: `${WHITE}08`,
              display: "flex", alignItems: "center", padding: "0 14px", gap: 8,
            }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F57" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FFBD2E" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28CA41" }} />
              <div style={{
                marginLeft: 16, flex: 1, height: 22, borderRadius: 6,
                background: `${WHITE}08`, display: "flex", alignItems: "center",
                padding: "0 12px",
              }}>
                <span style={{ fontFamily: bodyFont, fontSize: 12, color: MUTED }}>bifase.it/esplora</span>
              </div>
            </div>
            <Img src={staticFile("images/explore.png")} style={{ width: "100%", display: "block" }} />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
