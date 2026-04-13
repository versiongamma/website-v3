import { createFileRoute } from '@tanstack/react-router'
import { createRef } from 'react'
import Links from 'src/components/landing/Links'
import face from '/assets/face_400px.webp'
import useClock from '~hooks/useClock'
import { tw } from '~utils/index'
import { en } from 'src/en'
import InputField from 'src/components/landing/InputField'

export const Route = createFileRoute('/')({ component: App })

export const textStyle = tw`font-text text-xl`

function App() {
  const time = useClock()
  const inputRef = createRef<HTMLInputElement>()

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="fixed w-full h-full flex items-center justify-center">
        {/* <img src={bg} className="fixed object-cover min-h-full min-w-full"/> */}
        <span className="fixed w-full h-full background-gradient-transparent"></span>
      </div>
      <div
        className="w-full h-full md:w-250 md:h-192.5 md:bg-[#171717]/60 bg-opacity-8 op md:rounded-3xl relative md:dropshadow"
        onClick={() => inputRef.current?.focus()}
      >
        <img
          src={face}
          className="absolute w-50 bottom-4 right-4 rounded-full"
        />
        <div className="bg-[#D8D8D8] w-full h-16 md:rounded-t-3xl flex items-center justify-center">
          <p className="text-black text-2xl font-mono">
            https versiongamma.com
          </p>
        </div>
        <div className="flex flex-col justify-between h-[calc(100%-64px)]">
          <div className="flex flex-col gap-3 m-8">
            <p className="font-mono text-lg mb-4">
              current time: {time.toLocaleTimeString()}
            </p>
            <h1 className="font-heading text-4xl font-bold mb-6">
              {en.landing.title}
            </h1>
            <p className={textStyle}>{en.landing.message.part1}</p>
            <p className={textStyle}>{en.landing.message.part2}</p>
            <div className="mt-8">
              <Links />
            </div>
          </div>
          <InputField inputRef={inputRef} />
        </div>
      </div>
    </div>
  )
}
