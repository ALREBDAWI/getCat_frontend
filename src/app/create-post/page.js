"use client";

import { useState } from "react";

export default function CreatePostPage() {
  const [description, setDescription] = useState("");
  const [animalSpecies, setAnimalSpecies] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("getcat_user_token");

      let uploadedImageUrl = "";

      // upload image first

      if (selectedFile) {

        const imageData = new FormData();

        imageData.append("image", selectedFile);

        const uploadResponse = await fetch(
          "http://localhost:9090/api/test/upload-post-image",
          {
            method: "POST",

            headers: {
              Authorization: `Bearer ${token}`,
            },

            body: imageData,
          }
        );

        if (!uploadResponse.ok) {
          throw new Error("Image upload failed");
        }

        uploadedImageUrl = await uploadResponse.text();
      }

      const response = await fetch(
        "http://localhost:9090/api/posts/create_post",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            description,
            animalPhoto: uploadedImageUrl,
            startDate,
            endDate,
            serviceType,
            animalSpecies,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const data = await response.json();

      console.log("POST CREATED:", data);

      alert("Post created successfully");

      setDescription("");
      setAnimalSpecies("");
      setServiceType("");
      setStartDate("");
      setEndDate("");
    } catch (error) {
      console.error(error);
      alert("Error creating post");
    }
    
  };

  return (
  <div className="min-h-screen bg-gray-100 py-10 px-4">
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Create Post
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>

          <textarea
            placeholder="Tell people about your post..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files?.[0])}
            className="block w-full text-sm text-gray-600
              file:mr-4 file:rounded-lg file:border-0
              file:bg-blue-50 file:px-4 file:py-2
              file:text-blue-600 file:font-medium
              hover:file:bg-blue-100"
          />
        </div>

        {/* Animal Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Animal Type
          </label>

          <select
            value={animalSpecies}
            onChange={(e) => setAnimalSpecies(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Animal</option>
            <option value="CAT">Cat</option>
            <option value="DOG">Dog</option>
            <option value="BIRD">Bird</option>
            <option value="LIZARD">Lizard</option>
            <option value="RABBIT">rabbit</option>
          </select>
        </div>

        {/* Service Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Type
          </label>

          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Service</option>
            <option value="PET_SITTING">Pet sitting</option>
            <option value="PET_BOARDING">Pet boarding</option>
            <option value="DOG_WALKING">dog walking</option>
            <option value="VETERINARY_VISIT">VETERINARY VISIT</option>
            <option value="PET_GROOMING">PET GROOMING</option>
          </select>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition duration-200"
        >
          Create Post
        </button>
      </form>
    </div>
  </div>
);
}