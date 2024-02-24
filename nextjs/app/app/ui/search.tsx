'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toUrlCase } from '../lib/util';


export default function Search({ disabled }: { disabled?: boolean }) {
  const { replace } = useRouter();
  const [term, setTerm] = useState('');

  function handleChange(term: string) {
    setTerm(term);
  }

  function handleSearch() {
    console.log('handleSearch', term);
    replace(`/artist/${toUrlCase(term)}`);
  }

  return (
    <form className="relative w-full" action={handleSearch}>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="rounded-md shadow-sm">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
          aria-hidden="true"
        >
          <MagnifyingGlassIcon
            className="mr-3 h-4 w-4 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <input
          type="text"
          name="search"
          id="search"
          disabled={disabled}
          className="h-10 block w-full text-gray-900 rounded-md border border-gray-200 pl-9 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter Artist Name"
          spellCheck={false}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </form>
  );
}
