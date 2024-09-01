"use client"

import Link from 'next/link';
import { useAuthContext } from '@/context/AuthContext';

export default function NavigationBar() {
  const { isLoggedIn, logout } = useAuthContext();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          <Link href="/">ShareTube</Link>
        </div>
        <div>
          {isLoggedIn ? (
            <>
              <Link href="/share-video" className="text-white mr-4">
                Share Video
              </Link>
              <button
                onClick={logout}
                className="text-white bg-red-500 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-white mr-4">
                Login
              </Link>
              <Link href="/register" className="text-white">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
