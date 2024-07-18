'use client'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { UserIcon } from "@heroicons/react/24/solid"
import Link from 'next/link'
import Search from './search'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}


export default function Navbar({setSidebarIsOpen}) {

  const { data: session } = useSession();
  const user = session?.user

  return (
    <>
    <div className="w-full flex items-center bg-white dark:bg-gray-900 dark:text-white shadow-sm">
      <div className="flex p-2.5">
        <Link href="/">
          <svg 
            className="dark:text-white fill-current"
            width={32}
            height={32}
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 104.23 122.88">
              <path d="M87.9 78.04c2.74-.48 5.33-.4 7.6.13V24.82L39.05 41.03v61.95c.03.34.05.69.05 1.03v.01c0 8.34-8.75 16.62-19.55 18.49C8.76 124.37 0 119.12 0 110.77c0-8.34 8.76-16.62 19.55-18.48 4.06-.7 7.84-.39 10.97.71V16.74h.47L104.04 0v85.92c.13.63.2 1.27.2 1.91v.01c0 6.97-7.32 13.89-16.33 15.44-9.02 1.56-16.33-2.83-16.33-9.8-.01-6.97 7.3-13.89 16.32-15.44z" />
          </svg>
        </Link>
      </div>
      <div className="grid p-2.5 w-full">
        <Search />
      </div>
      <div className="flex p-2.5">
      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button 
            className="flex h-8 w-8 rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
            <span className="sr-only">Open user menu</span>
            {!user?.image && 
            <UserIcon 
              className="h-8 w-8 rounded-full text-black"
              height={32}
              width={32}
            />} 
            {user?.image && 
            <Image
              className="h-8 w-8 rounded-full"
              src={user.image}
              height={32}
              width={32}
              alt={user?.name || 'Account'}
            />}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {user ? (
              <>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'flex w-full px-4 py-2 text-sm text-gray-700'
                    )}
                    onClick={() => signOut()}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'flex w-full px-4 py-2 text-sm text-gray-700'
                  )}
                  onClick={() => setSidebarIsOpen(true)}
                >
                  Preferences
                </button>
              )}
            </Menu.Item>
            </>
            ) : (
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'flex w-full px-4 py-2 text-sm text-gray-700'
                    )}
                    onClick={() => signIn('github')}
                  >
                    Sign in
                  </button>
                )}
              </Menu.Item>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
      </div>
    </div>
    </>
  )
}
