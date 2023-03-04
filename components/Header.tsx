import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full mt-5 border-b pb-7 sm:px-4 px-2 border-slate-700">
      <Link href="/" className="flex space-x-2 items-center">
        <Image
          alt="header text"
          src="/logo-dark.png"
          className="sm:w-14 sm:h-14 w-9 h-9 rounded-full"
          width={64}
          height={64}
        />
        <h1 className="sm:text-2xl text-xl font-medium ml-2 tracking-tight">Ronin</h1>
      </Link>
    </header>
  );
}
