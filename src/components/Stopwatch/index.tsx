import { useEffect, useRef, useState } from 'react';

interface IStopwatchProps {
  interval: number;
  status: 'paused' | 'started' | 'stopped';
  getTime: (time: string) => unknown;
}

export const Stopwatch: React.FC<IStopwatchProps> = ({ interval, status, getTime }) => {
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    const handleStart = () => {
      setTimer(0);
      timerRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer + interval / 1000);
      }, interval);
    };

    const handleFinish = () => {
      clearInterval(timerRef.current);
      getTime(timer.toFixed(1));
    };

    switch (status) {
      case 'started':
        handleStart();
        break;
      case 'stopped':
        handleFinish();
        break;
      default:
        setTimer(0);
        clearInterval(timerRef.current);
        break;
    }
  }, [getTime, interval, status, timer]);

  return <>{timer.toFixed(1)}</>;
};
