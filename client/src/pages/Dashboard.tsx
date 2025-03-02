import React, { useEffect, useState } from "react";
import {
  Github,
  Linkedin,
  Code2,
  Plus,
  Trash2,
  Edit3,
  Save,
  UserPlus,
} from "lucide-react";
import { DashBoard } from "../types";
import apiService from "../services/api";
import { _admin, _user } from "../services/user";

export default function Dashboard() {
  const [isEditing, setIsEditing] = useState(false);
  const currentYear = new Date().getFullYear();
  const maxGraduationYear = currentYear + 4;
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<DashBoard>({
    username: user.username,
    email: user.email,
    role: user.role,
    graduationYear: user.graduationYear,
    mobile: user.mobile,
  });

  const [tempUserInfo, setTempUserInfo] = useState({ ...userInfo });

  const handleEditToggle = () => {
    try {
      if (isEditing) {
        const emptyFields: string[] = [];
        if (!tempUserInfo.username.trim()) emptyFields.push("Username");
        if (!tempUserInfo.role.trim()) emptyFields.push("Role");
        if (!tempUserInfo.graduationYear) {
          emptyFields.push("Graduation Year");
        } else if (tempUserInfo.role === "member") {
          if (tempUserInfo.graduationYear > maxGraduationYear) {
            emptyFields.push(
              `Graduation Year (should be ≤ ${maxGraduationYear} for members)`
            );
          } else if (tempUserInfo.graduationYear < currentYear) {
            emptyFields.push(
              `Graduation Year (should be ≥ ${currentYear} for members)`
            );
          }
        } else if (
          tempUserInfo.role === "alumni" &&
          tempUserInfo.graduationYear > currentYear
        ) {
          emptyFields.push(
            `Graduation Year (should be ≤ ${currentYear} for alumni)`
          );
        }
        if (emptyFields.length > 0) {
          alert(
            `Please fill in the following fields correctly:\n- ${emptyFields.join(
              "\n- "
            )}`
          );
          return;
        }
        const res = apiService.updateUserDetails(tempUserInfo);
        res.then(() => {
          setUserInfo({ ...tempUserInfo });
        });
      } else {
        setTempUserInfo({ ...userInfo });
      }
      setIsEditing(!isEditing);
    } catch (error) {
      console.error("Error in saving:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setTempUserInfo({
      ...tempUserInfo,
      [name]: value,
    });
  };

  useEffect(() => {
    const res = apiService.getUserDetails(_user);
    res.then((response) => {
      setUserInfo(response.data);
    });
  }, []);

  const handleInviteAlumni = async () => {
    try {
      const inviteLink = await apiService.genrateInviteLink();
      await navigator.clipboard.writeText(inviteLink.data.toString());
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Error generating invite link:", error);
      alert("Failed to generate invite link.");
    }
  };
  return (
    <>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">User Profile</h2>
          <button
            onClick={handleEditToggle}
            className={`flex items-center px-4 py-2 rounded-md ${
              isEditing
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {isEditing ? (
              <>
                <Save size={18} className="mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Edit3 size={18} className="mr-2" />
                Edit Profile
              </>
            )}
          </button>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500 text-4xl mb-4">
                {userInfo.username
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
              <h3 className="text-xl font-semibold">
                {userInfo.username?.toUpperCase()}
              </h3>
              <p className="text-gray-500">{userInfo.email}</p>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="username"
                    value={tempUserInfo.username}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <p className="text-gray-900">
                    {userInfo.username?.toUpperCase()}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={tempUserInfo.email}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <p className="text-gray-900">{userInfo.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <p className="text-gray-900">
                  {userInfo.role.charAt(0).toUpperCase() +
                    userInfo.role.slice(1)}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Graduadtion Year
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    name="graduationYear"
                    min={2000}
                    max={currentYear + 4}
                    value={tempUserInfo.graduationYear}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <p className="text-gray-900">{userInfo.graduationYear}</p>
                )}
              </div>
              {userInfo.role === "admin" && (
                <p
                  className="flex items-center gap-2 bg-green-500 text-white py-1 px-2 rounded-md max-w-max cursor-pointer hover:bg-green-600"
                  onClick={handleInviteAlumni}
                >
                  <UserPlus color="#fff" />{" "}
                  {isCopied ? "Link copied" : "Invite Alumni"}
                </p>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile
                </label>
                <p className="text-gray-900">
                  {userInfo.mobile || "xxxxxxxxxx"}
                </p>
              </div>
            </div>
          </div>
        </div>  
      </div>
    </>
  );
}