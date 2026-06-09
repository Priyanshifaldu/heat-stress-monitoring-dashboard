import type { ReactNode } from "react";

interface CardProps {
  title: string;
  value: string;
  suffix?: string;
  accent?: string;
  icon?: ReactNode;
}

export function Card({ title, value, suffix, accent, icon }: CardProps) {
  return (
    <article className="metric-card" style={{ borderColor: accent ?? "transparent" }}>
      <div className="metric-card__header">
        <p>{title}</p>
        <span>{icon}</span>
      </div>
      <div className="metric-card__value">
        {value}
        {suffix && <small>{suffix}</small>}
      </div>
    </article>
  );
}
