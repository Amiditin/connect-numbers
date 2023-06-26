import { memo, useEffect, useRef, useState } from 'react';

interface IStopwatchProps {
  interval: number;
  status: 'paused' | 'started' | 'stopped';
  getTime: (time: string) => unknown;
}

export const Stopwatch = memo<IStopwatchProps>(function Stopwatch({ interval, status, getTime }) {
  const [time, setTime] = useState(0);
  const timerRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    if (status === 'started') {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + interval / 1000);
      }, interval);
    } //
    else if (status === 'stopped') {
      clearInterval(timerRef.current);
      setTime((prevTime) => {
        getTime(prevTime.toFixed(1));

        return 0;
      });
    } //
    else {
      clearInterval(timerRef.current);
      setTime(0);
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [getTime, interval, status]);

  return <>{time.toFixed(1)}</>;
});
