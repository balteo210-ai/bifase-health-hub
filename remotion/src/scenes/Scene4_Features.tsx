import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const { fontFamily: displayFont } = loadFont("normal", { weights: ["700", "800"], subsets: ["latin"] });
const { fontFamily: bodyFont } = loadInter("normal", { weights: ["400", "500", "600"], subsets: ["latin"] });

const PRIMARY = "#00B5C8";
const BG = "#0A1628";
const WHITE = "#FFFFFF";
const MUTED = "#6B8AAD";
const GREEN = "#34D399";

export const Scene4_Features = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const features = [
    { icon: "🔬", title: "Screening & Test", desc: "Glicemia, colesterolo, PSA", color: PRIMARY },
    { icon: "❤️", title: "Telemedicina", desc: "ECG, Holter, Spirometria", color: "#EF4444" },
    { icon: "💉", title: "Infermieristica", desc: "Iniezioni, medicazioni", color: GREEN },
    { icon: "🥗", title: "Nutrizione", desc: "Piani alimentari personalizzati", color: "#F59E0B" },
  ];

  // Homepage screenshot with tilt
  const heroSpring = spring({ frame: frame - 10, fps, config: { damping: 20, stiffness: 60, mass: 2 } });
  const heroRotate = interpolate(heroSpring, [0, 1], [8, 2]);
  const heroY = interpolate(heroSpring, [0, 1], [150, 0]);

  return (
    <AbsoluteFill style={{ background: BG }}>
      {/* Diagonal accent */}
      <div style={{
        position: "absolute", top: -200, right: -200,
        width: 800, height: 800,
        background: `linear-gradient(135deg, ${PRIMARY}06, transparent)`,
        transform: "rotate(45deg)",
      }} />

      <AbsoluteFill style={{
        display: "flex", flexDirection: "row",
        alignItems: "center", padding: "0 80px",
      }}>
        {/* Left: tilted homepage screenshot */}
        <div style={{
          flex: 1, position: "relative",
          transform: `perspective(1200px) rotateY(${heroRotate}deg) translateY(${heroY}px)`,
          opacity: heroSpring,
        }}>
          <div style={{
            borderRadius: 16, overflow: "hidden",
            border: `1px solid ${WHITE}12`,
            boxShadow: `0 50px 100px rgba(0,0,0,0.5), 0 0 60px ${PRIMARY}10`,
          }}>
            <div style={{
              height: 36, background: `${WHITE}08`,
              display: "flex", alignItems: "center", padding: "0 14px", gap: 8,
            }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F57" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FFBD2E" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28CA41" }} />
            </div>
            <Img src={staticFile("images/hero.png")} style={{ width: "100%", display: "block" }} />
          </div>
        </div>

        {/* Right: feature grid */}
        <div style={{
          flex: 1, paddingLeft: 80,
          display: "flex", flexDirection: "column",
        }}>
          <div style={{
            fontFamily: bodyFont, fontSize: 16, fontWeight: 600,
            color: GREEN, letterSpacing: 4, textTransform: "uppercase",
            marginBottom: 16,
            opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
          }}>
            Servizi
          </div>
          <div style={{
            fontFamily: displayFont, fontSize: 52, fontWeight: 800,
            color: WHITE, lineHeight: 1.15, marginBottom: 40,
            opacity: interpolate(frame, [5, 25], [0, 1], { extrapolateRight: "clamp" }),
          }}>
            Tutto ciò di cui<br />hai bisogno
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: 20,
          }}>
            {features.map((f, i) => {
              const delay = 25 + i * 10;
              const s = spring({ frame: frame - delay, fps, config: { damping: 14 } });
              return (
                <div key={i} style={{
                  padding: "24px 20px", borderRadius: 16,
                  background: `linear-gradient(135deg, ${f.color}10, ${WHITE}03)`,
                  border: `1px solid ${f.color}20`,
                  opacity: s,
                  transform: `scale(${interpolate(s, [0, 1], [0.85, 1])})`,
                }}>
                  <div style={{ fontSize: 32, marginBottom: 10 }}>{f.icon}</div>
                  <div style={{
                    fontFamily: displayFont, fontSize: 20, fontWeight: 700,
                    color: f.color, marginBottom: 4,
                  }}>{f.title}</div>
                  <div style={{
                    fontFamily: bodyFont, fontSize: 14, fontWeight: 400,
                    color: MUTED, lineHeight: 1.4,
                  }}>{f.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
