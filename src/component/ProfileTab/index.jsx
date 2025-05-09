import { useState } from "react";
import axios from "axios";

import {
  FaEdit,
  FaSave,
  FaMapMarkerAlt,
  FaPhone,
  FaCalendarAlt,
  FaEnvelope,
} from "react-icons/fa";
import { useContext } from "react";
import { Store } from "../../Context";
const ProfileTab = () => {
  const [editMode, setEditMode] = useState(false);
  const { user, setUser, isloggedin, setIsLoggedIn } = useContext(Store);

  const [avatarPreview, setAvatarPreview] = useState(
    user.preview || "../user.png"
  );

  console.log(user.joinDate, user.name);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
      // You can upload the file here to server or Firebase and get a real URL
      setUser((prev) => ({ ...prev, avatar: file, preview: previewUrl }));
    }
  };

  const toggleEdit = () => setEditMode(!editMode);
  const saveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("phone", user.phone);
      formData.append("address", user.address);
      formData.append("userId", user.userId);
      formData.append("email", user.email);

      // If avatar is a File, append it to the form data
      if (user.avatar) {
        formData.append("avatar", user.avatar); // This key must match the multer field name
      }

      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/auth/upload`, // you’re not using :id in the route
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      localStorage.setItem("name", res.data?.name);
      localStorage.setItem("address", res.data?.address);
      localStorage.setItem("avatar", res.data?.dp);
      localStorage.setItem("phone", res.data?.phone);

      setUser({
        name: res.data?.name,
        email: localStorage.getItem("email"),
        phone: res.data?.phone,
        address: res.data?.address,
        joinDate: localStorage.getItem("date"),
        avatar: res.data?.dp,
        preview: "",
        userId: localStorage.getItem("userId"),
      });

      setEditMode(false);
    } catch (err) {
      console.error("Error uploading profile:", err);
      alert("Failed to save profile.");
    }
  };

  return (
    <div className="space-y-6">
      {isloggedin && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 pb-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              {editMode ? (
                <div className="relative h-20 w-20 rounded-full border-4 border-white shadow-lg overflow-hidden">
                  <img
                    src={avatarPreview}
                    alt={user.name}
                    className="object-cover h-full w-full"
                  />

                  {editMode && (
                    <label className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center cursor-pointer text-white text-xs hover:bg-opacity-60">
                      Change
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                        name="avatar"
                      />
                    </label>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                  <div className="relative h-20 w-20 rounded-full border-4 border-white shadow-lg overflow-hidden">
                    <img
                      src={user.avatar || "../user.png"}
                      alt={user.name}
                      className="object-cover h-full w-full"
                    />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-gray-500">{user.email}</p>
                  </div>
                </div>
              )}

              {isloggedin && (
                <button
                  onClick={editMode ? saveChanges : toggleEdit}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    editMode
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {editMode ? (
                    <>
                      <FaSave className="h-4 w-4" /> Save Changes
                    </>
                  ) : (
                    <>
                      <FaEdit className="h-4 w-4" /> Edit Profile
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          <div className="p-6 pt-0 space-y-6">
            {editMode ? (
              <div className="grid gap-6 md:grid-cols-2 transition-all duration-200">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="address"
                    className="text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    value={user.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-3 mt-6 transition-all duration-200">
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-3">
                    <div className="bg-indigo-100 p-2 rounded-full">
                      <FaPhone className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{user.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-3">
                    <div className="bg-indigo-100 p-2 rounded-full">
                      <FaMapMarkerAlt className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">{user.address}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {" "}
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 justify-center p-2 rounded-full">
                      <FaCalendarAlt className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="font-medium">
                        {new Date(
                          localStorage.getItem("date")
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileTab;
