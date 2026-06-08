// components/Navbar.jsx

"use client";

import Link from "next/link";

export default function Navbar({
  currentUser,
  onSignOut,
}) {
  return (
    <nav className="bg-white rounded-2xl shadow-sm mb-8 px-6 py-4 flex items-center justify-between">

      <Link
        href="/all-posts"
        className="text-2xl font-bold text-blue-600"
      >
        GetCat 🐱
      </Link>

      <div className="flex items-center gap-4">

        <Link
          href="/create-post"
          className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
        >
          + Create Post
        </Link>

        <Link
          href="/profile"
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl"
        >
          <span>
            {currentUser?.firstname}
          </span>
        </Link>

        <button
          onClick={onSignOut}
          className="px-4 py-2 bg-red-600 text-white rounded-xl"
        >
          Sign Out
        </button>

      </div>

    </nav>
  );
}