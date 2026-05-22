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
    <div style={{ padding: "20px" }}>
      <h1>Create Post</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <br />
        <div>
          <input
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          />
        </div>
        <div>
          <label>Animal Type:</label>

          <select
            value={animalSpecies}
            onChange={(e) => setAnimalSpecies(e.target.value)}
            >
            <option value="">Select Animal</option>
            <option value="CAT">cat</option>
            <option value="DOG">dog</option>
            <option value="BIRD">bird</option>
            <option value="LIZARD">lizard</option>
            </select>
        </div>

        <br />

        <div>
          <label>Service Type:</label>

          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
          >
            <option value="">Select service</option>
            <option value="HOST">host</option>
            <option value="GUEST">guest</option>
          </select>
        </div>

        <br />

        <div>
          <label>Start Date:</label>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>End Date:</label>

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}