"use client";

import Link from "next/link";

export default function Navbar() {

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("getcat_user_token")
      : null;

  const handleLogout = () => {
    localStorage.removeItem("getcat_user_token");
    window.location.reload();
  };

  return (
    <nav className="bg-white border-b shadow-sm">

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/all-posts"
          className="text-2xl font-bold text-blue-600"
        >
          GetCat
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-4">

          {token ? (
            <>
              <Link
                href="/my-profile"
                className="text-gray-700 hover:text-blue-600"
              >
                Mon Profil
              </Link>

              <Link
                href="/my-posts"
                className="text-gray-700 hover:text-blue-600"
              >
                Mes Annonces
              </Link>

              <button
                onClick={handleLogout}
                className="
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  px-4
                  py-2
                  rounded-xl
                "
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/signin"
                className="
                  border
                  px-4
                  py-2
                  rounded-xl
                "
              >
                Connexion
              </Link>

              <Link
                href="/auth/signup"
                className="
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  px-4
                  py-2
                  rounded-xl
                "
              >
                Inscription
              </Link>
            </>
          )}

        </div>

      </div>

    </nav>
  );
}