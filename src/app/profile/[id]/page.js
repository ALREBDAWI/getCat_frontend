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
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-xl p-10">

        {/* PROFILE HEADER */}
        <div className="flex flex-col items-center">

          <img
            src={
              user.userPhoto ||
              "https://via.placeholder.com/200"
            }
            alt="profile"
            className="w-44 h-44 rounded-full object-cover border-4 border-gray-200"
          />

          <h1 className="text-4xl font-bold mt-5">
            {user.firstname} {user.lastname}
          </h1>

          <p className="text-gray-500 mt-2">
            {user.email}
          </p>

        </div>

        {/* USER INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

          <div className="border p-4 rounded-xl">
            <p className="text-gray-500 text-sm mb-1">
              First Name
            </p>

            <p className="font-semibold">
              {user.firstname || "-"}
            </p>
          </div>

          <div className="border p-4 rounded-xl">
            <p className="text-gray-500 text-sm mb-1">
              Last Name
            </p>

            <p className="font-semibold">
              {user.lastname || "-"}
            </p>
          </div>

          <div className="border p-4 rounded-xl">
            <p className="text-gray-500 text-sm mb-1">
              Email
            </p>

            <p className="font-semibold">
              {user.email || "-"}
            </p>
          </div>

          <div className="border p-4 rounded-xl">
            <p className="text-gray-500 text-sm mb-1">
              Phone
            </p>

            <p className="font-semibold">
              {user.phone || "-"}
            </p>
          </div>

        </div>

        {/* ADDRESS */}
        <div className="mt-10">

          <h2 className="text-2xl font-semibold mb-5">
            Address
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="border p-4 rounded-xl">
              <p className="text-gray-500 text-sm mb-1">
                Building Number
              </p>

              <p className="font-semibold">
                {user.address?.buildingNum || "-"}
              </p>
            </div>

            <div className="border p-4 rounded-xl">
              <p className="text-gray-500 text-sm mb-1">
                Street
              </p>

              <p className="font-semibold">
                {user.address?.street || "-"}
              </p>
            </div>

            <div className="border p-4 rounded-xl">
              <p className="text-gray-500 text-sm mb-1">
                City
              </p>

              <p className="font-semibold">
                {user.address?.city || "-"}
              </p>
            </div>

            <div className="border p-4 rounded-xl">
              <p className="text-gray-500 text-sm mb-1">
                Postal Code
              </p>

              <p className="font-semibold">
                {user.address?.postalCode || "-"}
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}