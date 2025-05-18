import { useEffect, useState } from "preact/hooks";

const useClock = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const currentTime = new Date();
    setTime(currentTime);
    let intervalId: NodeJS.Timeout;

    const delayId = setInterval(() => {
      setTime(new Date());
      intervalId = setInterval(() => {
        setTime(new Date());
      }, 1000)
      clearInterval(delayId);
    }, 1001 - currentTime.getMilliseconds())

    return () => clearInterval(intervalId);
  }, [])

  return time;
}

export default useClock;
