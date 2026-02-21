import { useEffect, useState } from "react";

export default function WorldClock({ city, timeZone, format }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    function updateTime() {
      const now = new Date();

      const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).formatToParts(now);

      const values = {};
      parts.forEach(({ type, value }) => {
        values[type] = value;
      });

      const formatted = format
        .replace("DD", values.day)
        .replace("MM", values.month)
        .replace("YYYY", values.year)
        .replace("HH", values.hour)
        .replace("mm", values.minute)
        .replace("ss", values.second);

      setTime(formatted);
    }

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timeZone, format]);

  return (
    <div>
      {city} - {time}
    </div>
  );
}