// components/PostCard.jsx

import Link from "next/link";

export default function PostCard({ post }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all">

      <Link href={`/all-posts/${post.postId}`}>

        <div className="h-56 overflow-hidden">
          <img
            src={post.animalPhoto}
            alt="animal"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-5">

          <h3 className="font-semibold">
            {post.user?.firstname}{" "}
            {post.user?.lastname}
          </h3>

          <p className="text-sm text-gray-500">
            {post.user?.email}
          </p>

          <p className="mt-3 text-sm">
            {post.description}
          </p>

        </div>

      </Link>

    </div>
  );
}