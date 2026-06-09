export type RiskLevel = "SAFE" | "WARNING" | "DANGER";

export interface SensorReading {
  id: number;
  temperature: number;
  bpm: number;
  spo2: number;
  heat_index: number;
  risk_level?: RiskLevel;
  created_at: string;
}
