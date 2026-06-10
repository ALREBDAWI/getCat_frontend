"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function PostDetailsPage() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:9090/api/posts/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }

        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="h-[400px] bg-gray-200 animate-pulse rounded-3xl mb-8" />

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 h-80 bg-gray-200 animate-pulse rounded-3xl" />
            <div className="h-80 bg-gray-200 animate-pulse rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-semibold text-gray-600">
          Annonce introuvable
        </h2>
      </div>
    );
  }

  const serviceLabels = {
  PET_SITTING: "Garde d'animaux",
  PET_BOARDING: "Hébergement",
  DOG_WALKING: "Promenade",
  VETERINARY_VISIT: "Visite vétérinaire",
  PET_GROOMING: "Toilettage",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Back Button */}
        <Link
          href="/all-posts"
          className="inline-flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Retour aux annonces
        </Link>

        {/* Hero Image */}
        <div className="overflow-hidden rounded-3xl shadow-lg mb-8 bg-white">
          {post.animalPhoto ? (
            <img
              src={post.animalPhoto}
              alt="Pet"
              className="w-full h-[450px] object-cover"
            />
          ) : (
            <div className="h-[450px] flex items-center justify-center bg-gray-200 text-gray-500">
              Aucune image disponible
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left Content */}
          <div className="lg:col-span-2">

            <div className="bg-white rounded-3xl p-8 shadow-sm">

              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {post.petService?.serviceType}
                </span>

                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                  {post.animal?.species}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                GetCat annonce 
              </h1>

              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-3">
                  Description
                </h3>

                <p className="text-gray-600 leading-relaxed text-lg">
                  {post.description}
                </p>
              </div>

              <div className="border-t mt-8 pt-8">
                <h3 className="text-xl font-semibold mb-4">
                  Période du service
                </h3>

                <div className="grid md:grid-cols-2 gap-4">

                  <div className="bg-gray-50 p-4 rounded-2xl">
                    <p className="text-sm text-gray-500">
                      Date de début
                    </p>

                    <p className="font-semibold text-lg">
                      {post.startDate}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-2xl">
                    <p className="text-sm text-gray-500">
                      Date de fin
                    </p>

                    <p className="font-semibold text-lg">
                      {post.endDate}
                    </p>
                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* Right Sidebar */}
          <div>

            <div className="bg-white rounded-3xl p-6 shadow-sm sticky top-6">

              <h3 className="text-xl font-bold mb-6">
                À propos du propriétaire
              </h3>

              <div className="flex items-center gap-4 mb-6">

                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  {post.user?.userPhoto ? (
                    <img
                      src={post.user.userPhoto}
                      alt="Owner"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl">👤</span>
                  )}
                </div>

                <div>
                  <h4 className="font-bold text-lg">
                    {post.user?.firstname}{" "}
                    {post.user?.lastname}
                  </h4>

                  <p className="text-gray-500 text-sm">
                    {post.user?.email}
                  </p>
                </div>

              </div>

              <div className="space-y-4">

                <div className="border rounded-2xl p-4">
                  <p className="text-sm text-gray-500">
                    Type de service
                  </p>

                  <p className="font-semibold">
                    {post.petService?.serviceType}
                  </p>
                </div>

                <div className="border rounded-2xl p-4">
                  <p className="text-sm text-gray-500">
                    Espèce animale
                  </p>

                  <p className="font-semibold">
                    {post.animal?.species}
                  </p>
                </div>

              </div>

              
                
                      <Link href={`/profile/${post.user.id}`}
                className="
                  w-full
                  mt-6
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  py-3
                  rounded-2xl
                  font-semibold
                  transition
                "
              >
                <button>
                  Voir le profil
                  </button>
              </Link>
                
                
              
              

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}