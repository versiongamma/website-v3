import type { RefObject } from 'react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import InputCaret from './InputCaret'

const INPUT_ID = 'input'

type FormData = {
  path: string
}

type Props = {
  inputRef: RefObject<HTMLInputElement>
}

const InputField = ({ inputRef }: Props) => {
  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: { path: '' },
  })
  const [showCaret, setShowCaret] = useState(true)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const onSubmit = ({ path }: FormData) => {}

  return (
    <div className="flex gap-2 font-mono text-lg p-6 w-full">
      <p>https://versiongamma.com {'>'} </p>
      <form className="w-[486px] relative" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="path"
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <input
              id={INPUT_ID}
              name={name}
              value={value}
              autoFocus
              onFocus={() => {
                setShowCaret(true)
              }}
              onBlur={() => {
                setShowCaret(false)
              }}
              ref={inputRef}
              type="text"
              onChange={onChange}
              className="w-full outline-0 caret-[rgba(0,0,0,0)]"
            />
          )}
        />
        <InputCaret inputRef={inputRef} show={showCaret} />
      </form>
    </div>
  )
}

export default InputField
