import type { RefObject } from 'react'
import { useEffect, useState } from 'react'

const CARET_SPACING = 10.84444444444444
const MAX_CARET_DISTANCE = 488

type Props = {
  inputRef: RefObject<HTMLInputElement>
  show: boolean
}

const InputCaret = ({ inputRef, show }: Props) => {
  const [caretPosition, setCaretPosition] = useState(0)

  useEffect(() => {
    inputRef.current?.addEventListener('selectionchange', () => {
      moveCaret()
    })
  }, [])

  const moveCaret = () => {
    const count =
      (document.getElementById('input') as HTMLInputElement).selectionEnd ?? 0
    // @ts-ignore Looks like the Animation type doesn't have the correct fields to be matched to CSSAnimtaion
    document.getAnimations().forEach((anim: CSSAnimation) => {
      if (anim.animationName === 'caret-blink') {
        anim.cancel()
        anim.play()
      }
    })
    setCaretPosition(Math.min(count * CARET_SPACING, MAX_CARET_DISTANCE))
  }

  return (
    <div
      className="w-[10px] h-[24px] mt-[2px] bg-white absolute top-0 caret-blink mix-blend-difference"
      style={{ left: caretPosition, display: show ? 'block' : 'none' }}
    />
  )
}

export default InputCaret
