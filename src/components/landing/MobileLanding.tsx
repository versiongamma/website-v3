// import bg from '../../assets/001.jpg';

import { en } from 'src/en'
import Links from './Links'
import { textStyle } from './style'

const MobileLanding = () => {
  return (
    <div className="flex w-full h-full flex-col gap-12">
      <div className="h-16 w-full bg-[#D9D9D9] flex items-center justify-center">
        <p className="text-black text-2xl font-mono">https versiongamma.com</p>
      </div>
      <div className="mx-6 space-y-6 flex flex-col h-full">
        <h1 className="font-heading text-4xl font-bold">Hey! I'm Matt.</h1>
        <h2 className={textStyle}>
          {en.landing.message.part1} {en.landing.message.part2}
        </h2>
        <div className="flex items-center justify-center h-full">
          <Links />
        </div>
      </div>
    </div>
  )
}

export default MobileLanding
