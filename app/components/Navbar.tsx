import React from 'react';
import Link from "next/link";
import {ModeToggle} from"./ModeToggle";
import { LanguageToggle } from './LanguageToggle';

export default function Navbar() {
  return (
    <nav className='w-full relative flex items-center justify-between max-w-6xl mx-auto px-4 py-5 overflow-hidden '>
    <Link href="/" className="font-bold text-3xl">
        Kenji&apos;s <span className='text-blue-500'>Dev</span>Blog
      </Link>
      
      <div className='flex items-center space-x-4'>
        <div className=''>
          <LanguageToggle />
        </div>
        <div className='toggle-wrapper'>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}