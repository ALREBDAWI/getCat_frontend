"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AllPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serviceType, setServiceType] = useState("");

  const serviceTypes = [
    { value: "", label: "All Services" },
    { value: "PET_SITTING", label: "Pet Sitting" },
    { value: "PET_BOARDING", label: "Pet Boarding" },
    { value: "DOG_WALKING", label: "Dog Walking" },
    { value: "PET_GROOMING", label: "Pet Grooming" },
    { value: "VETERINARY_VISIT", label: "Veterinary Visit" },
  ];

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    fetchFilteredPosts();
  }, [serviceType]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "http://localhost:9090/api/posts/all-posts"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilteredPosts = async () => {
    try {
      const url = serviceType
        ? `http://localhost:9090/api/posts/all-posts?serviceType=${serviceType}`
        : `http://localhost:9090/api/posts/all-posts`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="h-96 bg-gray-200 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Get Cat
          </h1>

          <p className="text-gray-500 mt-2">
            **
          </p>

          <p className="mt-3 text-sm text-gray-400">
            {posts.length} posts found
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-3 mb-10">
          {serviceTypes.map((service) => (
            <button
              key={service.value}
              onClick={() => setServiceType(service.value)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200
                ${
                  serviceType === service.value
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }
              `}
            >
              {service.label}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {posts.map((post) => (
            <div
              key={post.postId}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <Link href={`all-posts/${post.postId}`}>
                {/* Animal Image */}
                <div className="h-56 overflow-hidden bg-gray-100">
                  {post.animalPhoto ? (
                    <img
                      src={post.animalPhoto}
                      alt="animal"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
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
                      <span className="font-medium">Start:</span>{" "}
                      {post.startDate}
                    </p>

                    <p>
                      <span className="font-medium">End:</span>{" "}
                      {post.endDate}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {!loading && posts.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-gray-700">
              No posts found
            </h3>

            <p className="text-gray-500 mt-2">
              Try selecting another service type.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}