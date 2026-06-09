"use client";

import Link from "next/link";
import Navbar from "../../../components/Navbar";
import { useEffect, useState } from "react";
import FilterBar from "../../../components/FilterBar";
import PostCard from "../../../components/PostCard";
import PageHeader from "../../../components/PageHeader";


export default function AllPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serviceType, setServiceType] = useState("");
  const [services, setServices] = useState([]);

  useEffect(()=> {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try{

      const response = await fetch(
        "http://localhost:9090/api/services"
      );

      const data = await response.json();
      console.log(data);

      setServices(data);

    }catch(error){
      console.error(error);
    }
  };

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="h-96 bg-gray-200 rounded-2xl animate-pulse"
        />
      ))}
    </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar/>
      <div className="max-w-7xl mx-auto px-6 py-10">



        {/* Header */}
        <PageHeader count={posts.length} />

        {/* Filter Bar */}
        
        <div className="flex flex-wrap gap-3 mb-10">
            <FilterBar
              services={services}
              serviceType={serviceType}
              setServiceType={setServiceType}
            />
          </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {posts.map((post) => (
            <PostCard
              key={post.postId}
              post={post}
              />
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