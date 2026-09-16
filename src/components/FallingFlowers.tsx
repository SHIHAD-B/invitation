import type { CSSProperties } from "react";

type Petal = {
  left: string;
  delay: string;
  duration: string;
  size: number;
  color: string;
  drift: string;
  spin: string;
  kind: "flower" | "sparkle";
  opacity: number;
};

type PetalStyle = CSSProperties & {
  "--delay": string;
  "--duration": string;
  "--drift": string;
  "--spin": string;
  "--petal-opacity": number;
};

const PETALS: Petal[] = [
  { left: "4%", delay: "-2s", duration: "16s", size: 12, color: "#f3e6c4", drift: "22px", spin: "320deg", kind: "flower", opacity: 0.9 },
  { left: "11%", delay: "-9s", duration: "19s", size: 8, color: "#c5d4e8", drift: "-18px", spin: "-280deg", kind: "sparkle", opacity: 0.75 },
  { left: "17%", delay: "-4s", duration: "14s", size: 14, color: "#d4c49a", drift: "28px", spin: "360deg", kind: "flower", opacity: 0.85 },
  { left: "23%", delay: "-12s", duration: "21s", size: 9, color: "#ffffff", drift: "-12px", spin: "240deg", kind: "sparkle", opacity: 0.7 },
  { left: "29%", delay: "-1s", duration: "17s", size: 11, color: "#9eb6d4", drift: "16px", spin: "-300deg", kind: "flower", opacity: 0.8 },
  { left: "35%", delay: "-7s", duration: "15s", size: 7, color: "#e8dcc0", drift: "-24px", spin: "200deg", kind: "sparkle", opacity: 0.65 },
  { left: "41%", delay: "-14s", duration: "20s", size: 13, color: "#f7f1e0", drift: "20px", spin: "340deg", kind: "flower", opacity: 0.88 },
  { left: "47%", delay: "-3s", duration: "18s", size: 10, color: "#b7c9a3", drift: "-16px", spin: "-220deg", kind: "flower", opacity: 0.72 },
  { left: "53%", delay: "-10s", duration: "16s", size: 8, color: "#d4c49a", drift: "14px", spin: "280deg", kind: "sparkle", opacity: 0.8 },
  { left: "59%", delay: "-6s", duration: "22s", size: 15, color: "#c9d7ea", drift: "-22px", spin: "-360deg", kind: "flower", opacity: 0.78 },
  { left: "65%", delay: "-15s", duration: "14s", size: 9, color: "#ffffff", drift: "18px", spin: "260deg", kind: "flower", opacity: 0.7 },
  { left: "71%", delay: "-5s", duration: "19s", size: 12, color: "#e4cbb0", drift: "-14px", spin: "-310deg", kind: "sparkle", opacity: 0.82 },
  { left: "77%", delay: "-11s", duration: "17s", size: 8, color: "#f3e6c4", drift: "24px", spin: "200deg", kind: "flower", opacity: 0.76 },
  { left: "83%", delay: "-8s", duration: "21s", size: 14, color: "#8fa8c8", drift: "-20px", spin: "330deg", kind: "flower", opacity: 0.7 },
  { left: "89%", delay: "-2.5s", duration: "15s", size: 10, color: "#d4c49a", drift: "12px", spin: "-240deg", kind: "sparkle", opacity: 0.85 },
  { left: "94%", delay: "-13s", duration: "18s", size: 7, color: "#eef3f8", drift: "-10px", spin: "180deg", kind: "flower", opacity: 0.68 },
  { left: "8%", delay: "-16s", duration: "23s", size: 11, color: "#c4a484", drift: "15px", spin: "-270deg", kind: "flower", opacity: 0.74 },
  { left: "21%", delay: "-18s", duration: "16s", size: 9, color: "#dce6f2", drift: "-26px", spin: "300deg", kind: "sparkle", opacity: 0.8 },
  { left: "38%", delay: "-0.8s", duration: "20s", size: 13, color: "#f6edd4", drift: "10px", spin: "-180deg", kind: "flower", opacity: 0.86 },
  { left: "56%", delay: "-19s", duration: "14.5s", size: 8, color: "#ffffff", drift: "21px", spin: "210deg", kind: "sparkle", opacity: 0.66 },
  { left: "68%", delay: "-4.5s", duration: "18.5s", size: 12, color: "#a8c09a", drift: "-18px", spin: "350deg", kind: "flower", opacity: 0.7 },
  { left: "80%", delay: "-17s", duration: "15.5s", size: 10, color: "#b9c7dc", drift: "16px", spin: "-200deg", kind: "flower", opacity: 0.78 },
  { left: "14%", delay: "-21s", duration: "19.5s", size: 6, color: "#d4c49a", drift: "-8px", spin: "160deg", kind: "sparkle", opacity: 0.62 },
  { left: "50%", delay: "-6.5s", duration: "17.5s", size: 11, color: "#f0d5c4", drift: "26px", spin: "-330deg", kind: "flower", opacity: 0.73 },
  { left: "92%", delay: "-9.5s", duration: "22s", size: 9, color: "#e8f0d8", drift: "-15px", spin: "250deg", kind: "sparkle", opacity: 0.7 },
  { left: "32%", delay: "-22s", duration: "16.5s", size: 14, color: "#c9b07a", drift: "8px", spin: "290deg", kind: "flower", opacity: 0.8 },
  { left: "74%", delay: "-1.8s", duration: "13.5s", size: 7, color: "#ffffff", drift: "-28px", spin: "-150deg", kind: "sparkle", opacity: 0.64 },
  { left: "44%", delay: "-12.5s", duration: "24s", size: 10, color: "#9bb8d6", drift: "19px", spin: "310deg", kind: "flower", opacity: 0.77 },
];

function PetalMark({ kind, color, size }: Pick<Petal, "kind" | "color" | "size">) {
  if (kind === "sparkle") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
        <path d="M12 1.5 13.2 9.2 21 12 13.2 14.8 12 22.5 10.8 14.8 3 12 10.8 9.2Z" />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
      <g transform="translate(12 12)">
        {Array.from({ length: 6 }, (_, index) => (
          <ellipse
            key={index}
            cx="0"
            cy="-6.1"
            rx="2.15"
            ry="5.6"
            transform={`rotate(${index * 60})`}
          />
        ))}
        <circle r="2" />
      </g>
    </svg>
  );
}

export default function FallingFlowers() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {PETALS.map((petal, index) => (
        <span
          key={`${petal.left}-${index}`}
          className="petal absolute top-0"
          style={
            {
              left: petal.left,
              width: petal.size,
              height: petal.size,
              "--delay": petal.delay,
              "--duration": petal.duration,
              "--drift": petal.drift,
              "--spin": petal.spin,
              "--petal-opacity": petal.opacity,
            } as PetalStyle
          }
        >
          <PetalMark kind={petal.kind} color={petal.color} size={petal.size} />
        </span>
      ))}
    </div>
  );
}
