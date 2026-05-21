"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [uploading, setUploading] = useState(false);

  const [message, setMessage] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);

  const [previewUrl, setPreviewUrl] = useState("");

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    address: {
      buildingNum: "",
      street: "",
      city: "",
      postalCode: "",
    },
  });

  // =========================
  // FETCH USER
  // =========================

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const token = localStorage.getItem("getcat_user_token");

        const response = await fetch(
          "http://localhost:9090/api/users/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();

        setUser(data);

        setFormData({
          firstname: data.firstname || "",
          lastname: data.lastname || "",
          phone: data.phone || "",
          address: {
            buildingNum: data.address?.buildingNum || "",
            street: data.address?.street || "",
            city: data.address?.city || "",
            postalCode: data.address?.postalCode || "",
          },
        });

      } catch (error) {

        console.log(error);

        setMessage("Failed to load profile");

      } finally {

        setLoading(false);
      }
    };

    fetchUser();

  }, []);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // HANDLE ADDRESS CHANGE
  // =========================

  const handleAddressChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  // =========================
  // UPDATE PROFILE
  // =========================

  const handleSave = async () => {

    try {

      setSaving(true);

      setMessage("");

      const token = localStorage.getItem("getcat_user_token");

      const response = await fetch(
        "http://localhost:9090/api/users/me",
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Update failed");
      }

      const updatedUser = await response.json();

      setUser(updatedUser);

      setMessage("Profile updated successfully");

    } catch (error) {

      console.log(error);

      setMessage("Failed to update profile");

    } finally {

      setSaving(false);
    }
  };

  // =========================
  // IMAGE CHANGE
  // =========================

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);

    setPreviewUrl(URL.createObjectURL(file));
  };

  // =========================
  // IMAGE UPLOAD
  // =========================

  const handleImageUpload = async () => {

    if (!selectedFile) return;

    try {

      setUploading(true);

      const token = localStorage.getItem("getcat_user_token");

      const imageData = new FormData();

      imageData.append("image", selectedFile);

      const response = await fetch(
        "http://localhost:9090/api/test/upload",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: imageData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const imageUrl = await response.text();

      setUser((prev) => ({
        ...prev,
        userPhoto: imageUrl,
      }));

      setMessage("Profile picture updated");

    } catch (error) {

      console.log(error);

      setMessage("Failed to upload image");

    } finally {

      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
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
              previewUrl
                ? previewUrl
                : user?.userPhoto ||
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

        {/* IMAGE SECTION */}
        <div className="mt-8 flex flex-col items-center gap-4">

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2 rounded-xl"
          />

          <button
            onClick={handleImageUpload}
            disabled={uploading}
            className="bg-black text-white px-6 py-3 rounded-xl"
          >
            {uploading
              ? "Uploading..."
              : "Change Profile Picture"}
          </button>

        </div>

        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="First Name"
            className="border p-3 rounded-xl"
          />

          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Last Name"
            className="border p-3 rounded-xl"
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border p-3 rounded-xl"
          />

        </div>

        {/* ADDRESS */}
        <div className="mt-10">

          <h2 className="text-2xl font-semibold mb-5">
            Address
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <input
              type="text"
              name="buildingNum"
              value={formData.address.buildingNum}
              onChange={handleAddressChange}
              placeholder="Building Number"
              className="border p-3 rounded-xl"
            />

            <input
              type="text"
              name="street"
              value={formData.address.street}
              onChange={handleAddressChange}
              placeholder="Street"
              className="border p-3 rounded-xl"
            />

            <input
              type="text"
              name="city"
              value={formData.address.city}
              onChange={handleAddressChange}
              placeholder="City"
              className="border p-3 rounded-xl"
            />

            <input
              type="text"
              name="postalCode"
              value={formData.address.postalCode}
              onChange={handleAddressChange}
              placeholder="Postal Code"
              className="border p-3 rounded-xl"
            />

          </div>

        </div>

        {/* SAVE BUTTON */}
        <div className="mt-10 flex justify-center">

          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 text-white px-10 py-4 rounded-2xl text-lg"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

        </div>

        {/* MESSAGE */}
        {message && (
          <p className="text-center mt-6 text-gray-700">
            {message}
          </p>
        )}

      </div>

    </div>
  );
}