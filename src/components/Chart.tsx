import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { SensorReading } from "../types/sensor";

interface ChartProps {
  title: string;
  dataKey: keyof Pick<SensorReading, "temperature" | "bpm" | "spo2" | "heat_index">;
  color: string;
  data: SensorReading[];
  unit: string;
}

export function Chart({ title, dataKey, color, data, unit }: ChartProps) {
  return (
    <article className="chart-card">
      <header>
        <h3>{title}</h3>
      </header>
      <div className="chart-card__canvas">
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="4 4" stroke="#dbe3ee" />
            <XAxis
              dataKey="created_at"
              tickFormatter={(value: string) => new Date(value).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              minTickGap={28}
            />
            <YAxis width={38} />
            <Tooltip
              formatter={(value: number) => `${value} ${unit}`}
              labelFormatter={(value: string) => new Date(value).toLocaleString()}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2.4}
              dot={false}
              activeDot={{ r: 4 }}
              animationDuration={250}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
