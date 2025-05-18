import { createRef } from "preact";
import { useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";

const InputField = () => {
  const { route } = useLocation();
  const inputRef = createRef<HTMLInputElement>();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex gap-2 font-mono text-lg p-6 w-full">
      <p>https://versiongamma.com {">"} </p>
      <form
      className="w-[486px]"
        onSubmit={(event: SubmitEvent) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget as HTMLFormElement);
          route((data.get("path") as string) ?? "/");
        }}
      >
        <input
          autoFocus
          onBlur={(event) => {
            event.preventDefault();
            event.currentTarget.focus();
          }}
          ref={inputRef}
          type="text"
          name="path"
          className="w-full outline-0"
        />
      </form>
    </div>
  );
};

export default InputField;
