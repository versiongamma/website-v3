import { useEffect, useState } from 'react'

const useClock = (date: Date) => {
  const [time, setTime] = useState<Date>(date)

  useEffect(() => {
    const currentTime = new Date()
    setTime(currentTime)
    let intervalId: NodeJS.Timeout

    const delayId = setInterval(() => {
      setTime(new Date())
      intervalId = setInterval(() => {
        setTime(new Date())
      }, 1000)
      clearInterval(delayId)
    }, 1001 - currentTime.getMilliseconds())

    return () => clearInterval(intervalId)
  }, [])

  return time
}

export default useClock
