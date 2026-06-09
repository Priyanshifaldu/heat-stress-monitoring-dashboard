import type { RiskLevel, SensorReading } from "../types/sensor";

export const RISK_COLOR: Record<RiskLevel, string> = {
  SAFE: "#14ae5c",
  WARNING: "#f5a524",
  DANGER: "#f31260",
};

export function getRiskLevel(reading: Pick<SensorReading, "temperature" | "bpm" | "spo2" | "heat_index">): RiskLevel {
  const { temperature, bpm, spo2, heat_index } = reading;

  if (temperature >= 39 || bpm >= 130 || spo2 < 90 || heat_index >= 42) {
    return "DANGER";
  }

  if (temperature >= 37.5 || bpm >= 105 || spo2 < 95 || heat_index >= 32) {
    return "WARNING";
  }

  return "SAFE";
}
