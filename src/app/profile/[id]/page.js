"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function UserProfilePage() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:9090/api/users/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await response.json();

        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading Profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        User not found
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-white">
    <div className="max-w-4xl mx-auto px-6 py-12">

      {/* HEADER */}
      <div className="flex flex-col items-center text-center">

        <img
          src={
            user.userPhoto ||
            "https://via.placeholder.com/200"
          }
          alt="profile"
          className="
            w-40
            h-40
            rounded-full
            object-cover
            border
          "
        />

        <h1 className="text-4xl font-semibold mt-6">
          {user.firstname} {user.lastname}
        </h1>

        <p className="text-gray-500 mt-2">
          Membre
        </p>

      </div>

      {/* INFOS */}
      <div className="mt-12">

        <h2 className="text-2xl font-semibold mb-6">
          Informations
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div className="border rounded-2xl p-5">
            <p className="text-sm text-gray-500">
              Prénom
            </p>

            <p className="font-medium mt-1">
              {user.firstname || "-"}
            </p>
          </div>

          <div className="border rounded-2xl p-5">
            <p className="text-sm text-gray-500">
              Nom
            </p>

            <p className="font-medium mt-1">
              {user.lastname || "-"}
            </p>
          </div>

          <div className="border rounded-2xl p-5">
            <p className="text-sm text-gray-500">
              code postal
            </p>

            <p className="font-medium mt-1">
              {user.address.postalCode || "-"}
            </p>
          </div>

          <div className="border rounded-2xl p-5">
            <p className="text-sm text-gray-500">
              Ville
            </p>

            <p className="font-medium mt-1">
              {user.address?.city || "-"}
            </p>
          </div>

        </div>

      </div>

      {/* CONTACT */}
      <div className="mt-12 border rounded-3xl p-6">

        <h3 className="text-xl font-semibold mb-3">
          Contacter ce propriétaire
        </h3>

        <p className="text-gray-600 mb-5">
          Vous pouvez utiliser les informations ci-dessous
          pour prendre contact avec lui.
        </p>

        <div className="space-y-2">

          <p>
            <span className="font-medium">
              Email :
            </span>{" "}
            {user.email}
          </p>

        

        </div>

      </div>

    </div>
  </div>
);
}