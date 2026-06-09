import { useEffect, useMemo, useState } from "react";
import { SENSOR_TABLE, supabase } from "../lib/supabase";
import type { RiskLevel, SensorReading } from "../types/sensor";
import { getRiskLevel } from "../utils/risk";

const LIMIT = 50;

export function useSensorRealtime() {
  const [readings, setReadings] = useState<SensorReading[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadLatest() {
      const { data, error: fetchError } = await supabase
        .from(SENSOR_TABLE)
        .select("*")
        .order("created_at", { ascending: false })
        .limit(LIMIT);

      if (!isMounted) {
        return;
      }

      if (fetchError) {
        setError(fetchError.message);
      } else {
        const normalized = (data ?? []).map((row) => ({
          ...row,
          risk_level: (row.risk_level as RiskLevel | undefined) ?? getRiskLevel(row),
        }));
        setReadings(normalized.reverse());
      }

      setIsLoading(false);
    }

    loadLatest();

    const channel = supabase
      .channel("sensor-data-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: SENSOR_TABLE },
        (payload) => {
          const row = payload.new as SensorReading;
          setReadings((prev) => {
            const reading = {
              ...row,
              risk_level: row.risk_level ?? getRiskLevel(row),
            };
            const next = [...prev, reading];
            return next.slice(-LIMIT);
          });
        },
      )
      .subscribe((status) => {
        if (status === "CHANNEL_ERROR") {
          setError("Realtime connection failed.");
        }
      });

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const latest = readings[readings.length - 1] ?? null;
  const riskLevel: RiskLevel = useMemo(() => {
    if (!latest) {
      return "SAFE";
    }
    return latest.risk_level ?? getRiskLevel(latest);
  }, [latest]);

  return {
    readings,
    latest,
    riskLevel,
    isLoading,
    error,
  };
}
