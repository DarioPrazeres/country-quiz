import { useEffect, useRef, useContext } from "react";
import { ContContext } from "../App.tsx";
import { ContContextType } from "../types";

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
  const { timeLeft, setTimeLeft } = useContext(ContContext) as ContContextType;

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeUpCalledRef = useRef(false);

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
  }, [questionPosition, answered, initialTime, onTimeUp, setTimeLeft]);

  return timeLeft;
}
