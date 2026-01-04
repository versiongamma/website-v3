import { createRef } from "preact";
// import bg from '../../assets/001.jpg';

import face from "/assets/face_400px.webp";
import InputField from "../components/InputField";
import Links from "../components/Links";
import useClock from "../useClock";
import { useTranslation } from "react-i18next";
import { textStyle } from "../style";

const Landing = () => {
  const time = useClock();
  const inputRef = createRef<HTMLInputElement>();
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="fixed w-full h-full flex items-center justify-center">
        {/* <img src={bg} className="fixed object-cover min-h-full min-w-full"/> */}
        <span className="fixed w-full h-full background-gradient-transparent"></span>
      </div>
      <div
        className="w-250 h-192.5 bg-[#171717]/60 bg-opacity-8 op rounded-3xl relative dropshadow"
        onClick={() => inputRef.current?.focus()}
      >
        <img
          src={face}
          className="absolute w-50 bottom-4 right-4 rounded-full"
        />
        <div className="bg-[#D8D8D8] w-full h-16 rounded-t-3xl flex items-center justify-center">
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
              {t("landing.title")}
            </h1>
            <p className={textStyle}>{t("landing.message.part1")}</p>
            <p className={textStyle}>{t("landing.message.part2")}</p>
            <div className="mt-8">
              <Links />
            </div>
          </div>
          <InputField inputRef={inputRef} />
        </div>
      </div>
    </div>
  );
};

export default Landing;
