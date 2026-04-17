import { NavBar } from "./NavBar";

type Props = {
  path?: string;
  children: React.ReactNode;
};

export const PageContainer = ({ path, children }: Props) => {
  return (
    <div className="flex flex-col items-center w-screen h-screen pt-16 overflow-y-scroll no-scrollbar">
      <NavBar path={path} className="fixed top-0" />
      {children}
    </div>
  );
};
