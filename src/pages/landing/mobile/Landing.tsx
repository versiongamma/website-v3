// import bg from '../../assets/001.jpg';

import { useTranslation } from "react-i18next";
import Links from "../components/Links";
import { textStyle } from "../style";

const Landing = () => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full h-full flex-col gap-12">
      <div className="h-[64px] w-full bg-[#D9D9D9] flex items-center justify-center">
        <p className="text-black text-2xl font-mono">https versiongamma.com</p>
      </div>
      <div className="mx-6 space-y-6 flex flex-col h-full">
        <h1 className="font-heading text-4xl font-bold">Hey! I'm Matt.</h1>
        <h2 className={textStyle}>
          {t("landing.message.part1")} {t("landing.message.part2")}
        </h2>
        <div className="flex items-center justify-center h-full">
          <Links />
        </div>
      </div>
    </div>
  );
};

export default Landing;
