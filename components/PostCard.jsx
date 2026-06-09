"use client";

import Link from "next/link";

export default function PostCard({ post }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      
      <Link href={`/all-posts/${post.postId}`}>

        {/* Image */}
        <div className="h-56 overflow-hidden bg-gray-100">
          {post.animalPhoto ? (
            <img
              src={post.animalPhoto}
              alt="animal"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Pas d'image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">

          {/* User */}
          <div className="flex items-center gap-3 mb-4">

            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              {post.user?.userPhoto ? (
                <img
                  src={post.user.userPhoto}
                  alt="user"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>👤</span>
              )}
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                {post.user?.firstname} {post.user?.lastname}
              </h3>

              <p className="text-sm text-gray-500 truncate">
                {post.user?.email}
              </p>
            </div>

          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
            {post.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">

            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
              {post.animal?.species}
            </span>

            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
              {post.petService?.serviceType}
            </span>

          </div>

          {/* Dates */}
          <div className="border-t pt-3 text-sm text-gray-500">

            <p>
              <span className="font-medium">
                Début :
              </span>{" "}
              {post.startDate}
            </p>

            <p>
              <span className="font-medium">
                Fin :
              </span>{" "}
              {post.endDate}
            </p>

          </div>

        </div>

      </Link>

    </div>
  );
}