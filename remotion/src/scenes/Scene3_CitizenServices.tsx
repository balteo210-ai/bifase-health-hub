import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const { fontFamily: displayFont } = loadFont("normal", { weights: ["700", "800"], subsets: ["latin"] });
const { fontFamily: bodyFont } = loadInter("normal", { weights: ["400", "500", "600"], subsets: ["latin"] });

const PRIMARY = "#00B5C8";
const BG = "#0A1628";
const WHITE = "#FFFFFF";
const GREEN = "#34D399";

export const Scene3_CitizenServices = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Badge
  const badgeOp = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Title
  const titleOp = interpolate(frame, [15, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [15, 40], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const services = [
    { icon: "🔍", title: "Cerca e prenota", desc: "Trova professionisti vicino a te in pochi secondi" },
    { icon: "📱", title: "Gestisci online", desc: "Modifica o cancella i tuoi appuntamenti" },
    { icon: "🏥", title: "Screening gratuiti", desc: "Accedi a controlli preventivi nella tua zona" },
    { icon: "💬", title: "Telemedicina", desc: "Consulti video direttamente da casa" },
  ];

  return (
    <AbsoluteFill style={{ background: BG }}>
      {/* Green tint for citizen/health mood */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse 70% 50% at 30% 50%, ${GREEN}08, transparent 70%)`,
      }} />

      <AbsoluteFill style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "0 160px",
      }}>
        {/* Badge */}
        <div style={{
          fontFamily: displayFont, fontSize: 14, fontWeight: 700,
          color: PRIMARY, letterSpacing: 3, textTransform: "uppercase",
          background: `${PRIMARY}18`, padding: "10px 28px", borderRadius: 30,
          marginBottom: 24, opacity: badgeOp,
        }}>
          Per i Cittadini
        </div>

        {/* Title */}
        <div style={{
          fontFamily: displayFont, fontSize: 52, fontWeight: 800,
          color: WHITE, textAlign: "center", marginBottom: 60,
          opacity: titleOp, transform: `translateY(${titleY}px)`,
        }}>
          La tua salute, <span style={{ color: PRIMARY }}>semplificata</span>
        </div>

        {/* Service grid 2x2 */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 24,
          justifyContent: "center", maxWidth: 1100,
        }}>
          {services.map((s, i) => {
            const delay = 40 + i * 18;
            const cardOp = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const cardScale = interpolate(frame, [delay, delay + 20], [0.9, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={i} style={{
                width: 500, padding: "32px 36px", borderRadius: 20,
                background: `${WHITE}08`, border: `1px solid ${WHITE}12`,
                opacity: cardOp, transform: `scale(${cardScale})`,
                display: "flex", gap: 20, alignItems: "flex-start",
              }}>
                <div style={{ fontSize: 40, flexShrink: 0 }}>{s.icon}</div>
                <div>
                  <div style={{ fontFamily: displayFont, fontSize: 22, fontWeight: 700, color: WHITE, marginBottom: 8 }}>
                    {s.title}
                  </div>
                  <div style={{ fontFamily: bodyFont, fontSize: 17, fontWeight: 400, color: `${WHITE}80`, lineHeight: 1.5 }}>
                    {s.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
