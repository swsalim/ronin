import MessageBox from '@/components/MessageBox';
import SquigglyLines from '@/components/SquigglyLines';

export default function HomePage() {
  return (
    <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-28 mt-20">
      <div className="border rounded-2xl py-1 px-4 text-slate-50 text-sm mb-5 hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
        Over <span className="font-semibold">1,000</span> messages checked
      </div>

      {/* TODO: Look into animation? */}
      {/* <div className="glowing-box glowing-box-active">
        <div className="glowing-box-animations">
          <div className="glowing-box-glow"></div>
          <div className="glowing-box-stars-masker">
            <div className="glowing-box-stars"></div>
          </div>
        </div>
        <div className="glowing-box-borders-masker">
          <div className="glowing-box-borders"></div>
        </div>
        <div className="glowing-box-button">
          <span className="font-semibold">$5,000,000</span> saved from scammers
        </div>
      </div> */}

      <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-transparent bg-clip-text bg-gradient-to-b sm:text-7xl from-slate-50 via-zinc-300 to-stone-300">
        Protect you against online spam{' '}
        <span className="relative whitespace-nowrap ">
          <SquigglyLines />
          <span className="relative text-purple-400  z-10 text-opacity-90">using AI</span>
        </span>
        .
      </h1>

      <p className="mx-auto mt-12 max-w-xl text-lg text-slate-400 leading-7">
        Are you worried about falling victim to scams and fraud online?
        <br />
        <span className="font-medium">Ronin</span> analyzes your text in real-time and detects any
        signs of a scam.
      </p>

      <div className="w-full mb-10">
        <MessageBox />
      </div>
    </main>
  );
}
