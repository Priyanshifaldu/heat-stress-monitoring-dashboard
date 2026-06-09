import { useEffect } from "react";
import { AlertBanner } from "./AlertBanner";
import { Card } from "./Card";
import { Chart } from "./Chart";
import { useSensorRealtime } from "../hooks/useSensorRealtime";
import { RISK_COLOR } from "../utils/risk";

function dangerBeep() {
  const context = new AudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = "sine";
  oscillator.frequency.value = 880;
  gain.gain.value = 0.08;

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();

  setTimeout(() => {
    oscillator.stop();
    context.close();
  }, 220);
}

export function Dashboard() {
  const { latest, readings, riskLevel, isLoading, error } = useSensorRealtime();

  useEffect(() => {
    if (riskLevel === "DANGER") {
      dangerBeep();
    }
  }, [riskLevel]);

  if (isLoading) {
    return <p className="state-message">Loading realtime dashboard...</p>;
  }

  if (error) {
    return <p className="state-message state-message--error">{error}</p>;
  }

  if (!latest) {
    return <p className="state-message">No sensor data available yet.</p>;
  }

  return (
    <main className="dashboard">
      <header className="dashboard__header">
        <div>
          <h1>Real-time Health Monitor</h1>
          <p>Live vitals stream from Supabase sensor pipeline.</p>
        </div>
        <span className="status-pill" style={{ backgroundColor: `${RISK_COLOR[riskLevel]}20`, color: RISK_COLOR[riskLevel] }}>
          {riskLevel}
        </span>
      </header>

      <AlertBanner riskLevel={riskLevel} />

      <section className="metrics-grid">
        <Card title="Temperature" value={latest.temperature.toFixed(1)} suffix="°C" accent="#4589ff" />
        <Card title="Heart Rate" value={latest.bpm.toFixed(0)} suffix="BPM" accent="#f05d5e" />
        <Card title="SpO2" value={latest.spo2.toFixed(0)} suffix="%" accent="#00a37a" />
        <Card title="Heat Index" value={latest.heat_index.toFixed(1)} suffix="°C" accent="#f5a524" />
      </section>

      <section className="charts-grid">
        <Chart title="Temperature Trend" dataKey="temperature" data={readings} color="#4589ff" unit="°C" />
        <Chart title="Heart Rate Trend" dataKey="bpm" data={readings} color="#f05d5e" unit="BPM" />
        <Chart title="SpO2 Trend" dataKey="spo2" data={readings} color="#00a37a" unit="%" />
        <Chart title="Heat Index Trend" dataKey="heat_index" data={readings} color="#f5a524" unit="°C" />
      </section>
    </main>
  );
}
