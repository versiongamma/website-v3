import InputField from "./InputField";
import Links from "./Links";
import face from '../../assets/face.jpg'

const Landing = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-[1000px] h-[770px] bg-[#171717]/80 bg-opacity-8 op rounded-3xl relative">
        <img src={face} className="absolute w-[200px] bottom-4 right-4 rounded-full" />
        <div className="bg-[#D8D8D8] w-full h-[64px] rounded-t-3xl flex items-center justify-center">
          <p className="text-black text-2xl font-mono">
            https versiongamma.com
          </p>
        </div>
        <div className='flex flex-col justify-between h-[calc(100%-64px)]'>
          <div className='flex flex-col gap-3 m-8'>
            <p className="font-mono text-lg mb-4">current time: {new Date().toLocaleTimeString()}</p>
            <h1 className="font-heading text-4xl font-bold">Hey! I'm Matt.</h1>
            <h2 className="font-heading text-2xl font-semibold mb-10">
              I’m a Software Engineer, Videographer, and overall maker of things.
              <br />
              If you’d like to learn more, you can at the links below:
            </h2>
            <Links />
          </div>
          <InputField />
        </div>
      </div>
    </div>
  );
};

export default Landing;
