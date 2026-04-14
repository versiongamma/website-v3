import { createFileRoute } from '@tanstack/react-router'
import { createRef } from 'react'
import Links from 'src/components/landing/Links'
import face from '/assets/face_400px.webp'
import useClock from '~hooks/useClock'
import { tw } from '~utils/index'
import { en } from 'src/en'
import InputField from 'src/components/landing/InputField'
import { TerminalContainer } from 'src/components/TerminalContainer'

export const Route = createFileRoute('/')({ component: Index })

export const textStyle = tw`font-text text-xl`

function Index() {
  const time = useClock()
  const inputRef = createRef<HTMLInputElement>()

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="fixed w-full h-full flex items-center justify-center">
        {/* <img src={bg} className="fixed object-cover min-h-full min-w-full"/> */}
        <span className="fixed w-full h-full background-gradient-transparent"></span>
      </div>
      <TerminalContainer
        onClick={() => inputRef.current?.focus()}
        classes={{
          container: 'w-full h-full relative md:w-250 md:h-192.5',
          header: 'h-16',
        }}
        header={
          <span className="flex w-full h-full items-center justify-center">
            <p className="text-black text-2xl font-mono">
              https versiongamma.com
            </p>
          </span>
        }
        content={
          <>
            <img
              src={face}
              className="absolute w-50 bottom-4 right-4 rounded-full"
            />
            <div className="flex flex-col justify-between h-full">
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
          </>
        }
      />
    </div>
  )
}
