import type { RiskLevel } from "../types/sensor";
import { RISK_COLOR } from "../utils/risk";

interface AlertBannerProps {
  riskLevel: RiskLevel;
}

export function AlertBanner({ riskLevel }: AlertBannerProps) {
  const copy =
    riskLevel === "DANGER"
      ? "Critical condition detected. Take immediate action."
      : riskLevel === "WARNING"
        ? "Moderate risk detected. Monitor patient closely."
        : "Vitals are stable. Continue normal observation.";

  return (
    <section className="alert-banner" style={{ borderColor: RISK_COLOR[riskLevel] }}>
      <div className="alert-banner__dot" style={{ backgroundColor: RISK_COLOR[riskLevel] }} />
      <div>
        <strong>{riskLevel}</strong>
        <p>{copy}</p>
      </div>
    </section>
  );
}
