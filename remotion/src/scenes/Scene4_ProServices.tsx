import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { loadFont } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const { fontFamily: displayFont } = loadFont("normal", { weights: ["700", "800"], subsets: ["latin"] });
const { fontFamily: bodyFont } = loadInter("normal", { weights: ["400", "500", "600"], subsets: ["latin"] });

const PRIMARY = "#00B5C8";
const BG = "#0A1628";
const WHITE = "#FFFFFF";
const AMBER = "#F59E0B";

export const Scene4_ProServices = () => {
  const frame = useCurrentFrame();

  const badgeOp = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const titleOp = interpolate(frame, [15, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [15, 40], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const features = [
    { icon: "📅", title: "Agenda intelligente", desc: "Gestisci slot e disponibilità in modo smart" },
    { icon: "📉", title: "Riduci i no-show", desc: "Promemoria automatici e recupero slot vuoti" },
    { icon: "👥", title: "Nuovi pazienti", desc: "Raggiungi più persone nella tua zona" },
    { icon: "📊", title: "Analytics avanzati", desc: "Monitora performance e trend in tempo reale" },
  ];

  return (
    <AbsoluteFill style={{ background: BG }}>
      {/* Amber tint for professional/business mood */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse 70% 50% at 70% 50%, ${AMBER}08, transparent 70%)`,
      }} />

      <AbsoluteFill style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "0 160px",
      }}>
        {/* Badge */}
        <div style={{
          fontFamily: displayFont, fontSize: 14, fontWeight: 700,
          color: AMBER, letterSpacing: 3, textTransform: "uppercase",
          background: `${AMBER}18`, padding: "10px 28px", borderRadius: 30,
          marginBottom: 24, opacity: badgeOp,
        }}>
          Per i Professionisti
        </div>

        {/* Title */}
        <div style={{
          fontFamily: displayFont, fontSize: 52, fontWeight: 800,
          color: WHITE, textAlign: "center", marginBottom: 60,
          opacity: titleOp, transform: `translateY(${titleY}px)`,
        }}>
          Fai crescere la tua <span style={{ color: AMBER }}>attività</span>
        </div>

        {/* Feature grid 2x2 */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 24,
          justifyContent: "center", maxWidth: 1100,
        }}>
          {features.map((f, i) => {
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
                <div style={{ fontSize: 40, flexShrink: 0 }}>{f.icon}</div>
                <div>
                  <div style={{ fontFamily: displayFont, fontSize: 22, fontWeight: 700, color: WHITE, marginBottom: 8 }}>
                    {f.title}
                  </div>
                  <div style={{ fontFamily: bodyFont, fontSize: 17, fontWeight: 400, color: `${WHITE}80`, lineHeight: 1.5 }}>
                    {f.desc}
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
