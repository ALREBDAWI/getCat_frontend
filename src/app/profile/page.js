"use client";

import { useState } from "react";

export default function ProfilePage() {

  const [userName] = useState("Ahmed");

  const [selectedFile, setSelectedFile] = useState(null);

  const [previewUrl, setPreviewUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);

    const preview = URL.createObjectURL(file);

    setPreviewUrl(preview);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!selectedFile) {
      setMessage("Please select an image");
      return;
    }

    try {

      setLoading(true);

      setMessage("");

      const formData = new FormData();

      formData.append("image", selectedFile);

      // JWT token من localStorage
      const token = localStorage.getItem("getcat_user_token");

      const response = await fetch(
        "http://localhost:9090/api/test/upload",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      // in backend cloudinary service returns image url
      const imageUrl = await response.text();

      console.log(imageUrl);

      setMessage("Image uploaded successfully");

    } catch (error) {

      console.log(error);

      setMessage("Something went wrong");

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Profile
        </h1>

        {/* User Name */}
        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold">
            {userName}
          </h2>
        </div>

        {/* Preview */}
        <div className="flex justify-center mb-6">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="preview"
              className="w-40 h-40 rounded-full object-cover border"
            />
          ) : (
            <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* File Input */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border p-2 rounded-lg"
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            {loading ? "Uploading..." : "Upload Image"}
          </button>

        </form>

        {/* Message */}
        {message && (
          <p className="mt-5 text-center text-sm">
            {message}
          </p>
        )}

      </div>
    </div>
  );
}