import { useEffect, useState, useRef } from "react";

interface UseTimerProps {
  initialTime?: number;
  questionPosition: number;
  answered: boolean;
  onTimeUp?: () => void;
}

export function useTimer({
  initialTime = 15,
  questionPosition,
  answered,
  onTimeUp,
}: UseTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeUpCalledRef = useRef(false);

  // Reset timer when question changes
  useEffect(() => {
    setTimeLeft(initialTime);
    timeUpCalledRef.current = false;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!answered) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (!timeUpCalledRef.current && onTimeUp) {
              timeUpCalledRef.current = true;
              onTimeUp();
            }
            clearInterval(intervalRef.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [questionPosition, answered, initialTime, onTimeUp]);

  return timeLeft;
}
