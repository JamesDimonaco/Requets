'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export function SignInButton() {
  const { data: session, status } = useSession();
  console.log(session, status);

  if (status === 'loading') {
    return <>...</>;
  }

  if (status === 'authenticated') {
    return (
        <>
      <Link className='flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800' href={`/`}>
        <Image
        className="h-8 w-8 rounded-full bg-gray-800"
          src={session.user?.image ?? ''}
          width={32}
          height={32}
          alt="Your Name"
        />
        <span className="sr-only">Your profile</span>
        <span aria-hidden="true">{session.user?.name ?? ''}</span>
      </Link>
      <SignOutButton />
        </>
    );
  }

  return <button
  type="button"
  className="rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 w-full"
   onClick={() => signIn()}>Sign in</button>;
}

export function SignOutButton() {
  return <button
  type="button"
  className="rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 w-full"
   onClick={() => signOut()}>Sign out</button>;
}