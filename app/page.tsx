import Link from 'next/link';
import TestDb from './test-db';

export default function Page() {
  return (
    <div className="flex h-screen bg-black text-stone-200">
      <div className="w-screen h-screen flex flex-col justify-center items-center">
      <TestDb/>
      </div>

    </div>
  );
}
