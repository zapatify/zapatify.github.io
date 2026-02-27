import { useState, useEffect, useRef } from "react";

const VZT_EPOCH_UTC = Date.UTC(1977, 8, 5, 12, 56, 0);
const SECONDS_PER_ARC = 8833536;
const AU_PER_YEAR = 3.57;
const VOYAGER_SPEED_KMS = 17.0;
const VOYAGER_SPEED_MPH = 38026.77;
const KM_PER_AU = 149597870.7;

function utcToVa(now) {
  const elapsedSeconds = (now - VZT_EPOCH_UTC) / 1000;
  return elapsedSeconds / SECONDS_PER_ARC;
}

function formatVa(va, precision = 10) {
  const intPart = Math.floor(va);
  const decPart = va - intPart;
  const decStr = decPart.toFixed(precision).substring(1);
  return `${intPart}${decStr}`;
}

function getUnitBreakdown(va) {
  const intPart = Math.floor(va);
  const dec = va - intPart;
  const decStr = dec.toFixed(10).substring(2);

  return [
    { label: "Arc", symbol: "Va", value: String(intPart), earthEquiv: "~102 days" },
    { label: "deci-arc", symbol: "dVa", value: decStr[0], earthEquiv: "~10.2 days" },
    { label: "centi-arc", symbol: "cVa", value: decStr[1], earthEquiv: "~1.02 days" },
    { label: "milli-arc", symbol: "mVa", value: decStr[2], earthEquiv: "~2.45 hours" },
    { label: "micro-arc", symbol: "μVa", value: decStr[3], earthEquiv: "~14.7 min" },
    { label: "nano-arc", symbol: "nVa", value: decStr[4], earthEquiv: "~1.47 min" },
    { label: "pico-arc", symbol: "pVa", value: decStr[5], earthEquiv: "~8.8 sec" },
    { label: "femto-arc", symbol: "fVa", value: decStr[6], earthEquiv: "~0.88 sec" },
  ];
}

function getDistanceAU(now) {
  const elapsedYears = (now - VZT_EPOCH_UTC) / (1000 * 60 * 60 * 24 * 365.25);
  return elapsedYears * AU_PER_YEAR;
}

function getDistanceKm(au) {
  return au * KM_PER_AU;
}

function getDistanceMiles(km) {
  return km * 0.621371;
}

function getLightTime(km) {
  const lightSpeedKms = 299792.458;
  const totalSeconds = km / lightSpeedKms;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return { hours, minutes, seconds, totalSeconds };
}

function formatNumber(num) {
  if (num >= 1e12) return (num / 1e12).toFixed(3) + " T";
  if (num >= 1e9) return (num / 1e9).toFixed(3) + " B";
  if (num >= 1e6) return (num / 1e6).toFixed(3) + " M";
  return num.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

const Starfield = () => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    if (starsRef.current.length === 0) {
      for (let i = 0; i < 200; i++) {
        starsRef.current.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          r: Math.random() * 1.5 + 0.3,
          opacity: Math.random() * 0.6 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }
    }

    function draw(time) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      starsRef.current.forEach((s) => {
        const flicker =
          0.5 + 0.5 * Math.sin(time * s.twinkleSpeed + s.twinkleOffset);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,210,230,${s.opacity * flicker})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    }
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default function VZTClock() {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 88);
    return () => clearInterval(interval);
  }, []);

  const va = utcToVa(now);
  const vaFormatted = formatVa(va, 10);
  const units = getUnitBreakdown(va);
  const distAU = getDistanceAU(now);
  const distKm = getDistanceKm(distAU);
  const distMiles = getDistanceMiles(distKm);
  const lightTime = getLightTime(distKm);

  const utcString = new Date(now).toISOString().replace("T", " ").substring(0, 19) + " UTC";

  const dotIndex = vaFormatted.indexOf(".");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 30% 20%, #0a0e1a 0%, #030508 60%, #000000 100%)",
        color: "#c8d2dc",
        fontFamily: "'IBM Plex Mono', 'SF Mono', 'Fira Code', monospace",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Starfield />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 820 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#4a6a8a",
              marginBottom: 8,
            }}
          >
            Voyager Zulu Time
          </div>
          <div
            style={{
              fontSize: 13,
              letterSpacing: 3,
              color: "#2a4a6a",
              textTransform: "uppercase",
            }}
          >
            Epoch: 1977-09-05 12:56:00 UTC
          </div>
        </div>

        {/* Main Clock */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 48,
            padding: "40px 20px",
            border: "1px solid rgba(100,160,220,0.08)",
            borderRadius: 2,
            background: "rgba(6,12,24,0.6)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "clamp(28px, 5vw, 52px)",
              fontWeight: 300,
              letterSpacing: 2,
              lineHeight: 1.2,
              color: "#e8f0f8",
              wordBreak: "break-all",
            }}
          >
            <span style={{ color: "#7aacdc" }}>
              {vaFormatted.substring(0, dotIndex)}
            </span>
            <span style={{ color: "#3a5a7a" }}>.</span>
            <span style={{ color: "#a0b8cc" }}>
              {vaFormatted.substring(dotIndex + 1)}
            </span>
            <span
              style={{
                fontSize: "clamp(14px, 2.5vw, 22px)",
                color: "#3a6a9a",
                marginLeft: 8,
              }}
            >
              Va
            </span>
          </div>
          <div
            style={{
              fontSize: 11,
              color: "#2a4a6a",
              marginTop: 12,
              letterSpacing: 2,
            }}
          >
            VZT
          </div>
        </div>

        {/* Unit Breakdown */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 1,
            marginBottom: 48,
            background: "rgba(100,160,220,0.04)",
            border: "1px solid rgba(100,160,220,0.06)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          {units.map((u, i) => (
            <div
              key={i}
              style={{
                padding: "16px 14px",
                background: "rgba(6,12,24,0.7)",
                borderRight:
                  i < units.length - 1
                    ? "1px solid rgba(100,160,220,0.04)"
                    : "none",
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: "#3a5a7a",
                  marginBottom: 6,
                }}
              >
                {u.label}
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 300,
                  color: i === 0 ? "#7aacdc" : "#a0b8cc",
                  lineHeight: 1,
                  marginBottom: 4,
                }}
              >
                {u.value}
              </div>
              <div style={{ fontSize: 9, color: "#2a4a6a" }}>
                {u.symbol} · {u.earthEquiv}
              </div>
            </div>
          ))}
        </div>

        {/* Voyager Status */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 1,
            marginBottom: 48,
            background: "rgba(100,160,220,0.04)",
            border: "1px solid rgba(100,160,220,0.06)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          {[
            {
              label: "Distance Traveled",
              value: distAU.toFixed(6) + " AU",
            },
            {
              label: "Distance (km)",
              value: formatNumber(distKm) + " km",
            },
            {
              label: "Distance (miles)",
              value: formatNumber(distMiles) + " mi",
            },
            {
              label: "Velocity",
              value: VOYAGER_SPEED_KMS.toFixed(1) + " km/s",
            },
            {
              label: "One-Way Light Time",
              value: `${lightTime.hours}h ${lightTime.minutes}m ${lightTime.seconds}s`,
            },
            {
              label: "Earth UTC",
              value: utcString,
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                padding: "16px 14px",
                background: "rgba(6,12,24,0.7)",
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: "#3a5a7a",
                  marginBottom: 6,
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 400,
                  color: "#a0b8cc",
                  lineHeight: 1.3,
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            fontSize: 10,
            color: "#1a2a3a",
            letterSpacing: 2,
            lineHeight: 1.8,
          }}
        >
          <div>VOYAGER 1 · LAUNCHED 1977-09-05 · CAPE CANAVERAL</div>
          <div>LINEARIZED MODEL · 3.57 AU/YEAR · 1 ARC = 8,833,536 SECONDS</div>
        </div>
      </div>
    </div>
  );
}
