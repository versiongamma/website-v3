import Links from "./Links";

const Landing = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-[1000px] h-[770px] bg-[#171717]/80 bg-opacity-8 op rounded-3xl">
        <div className="bg-[#D8D8D8] w-full h-[64px] rounded-t-3xl flex items-center justify-center">
          <p className="text-black text-2xl font-mono">
            https versiongamma.com
          </p>
        </div>
        <div className='flex flex-col gap-3 m-8'>
        <h1 className="font-heading text-4xl font-bold">Hey! I'm Matt.</h1>
        <h2 className="font-heading text-2xl font-semibold mb-10">
          I’m a Software Engineer, Videographer, and overall maker of things.
          <br />
          If you’d like to learn more, you can at the links below:
        </h2>
        <Links />
        </div>
      </div>
    </div>
  );
};

export default Landing;
