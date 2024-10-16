import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import Image from "next/image";

const Profile: React.FC = () => {
  const { user, updateAvatar } = useAuth();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpload = () => {
    if (avatarPreview) {
      updateAvatar(avatarPreview);
    }
  };

  return (
    <div className="bg-card text-card-foreground shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {user && (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Image
              src={avatarPreview || user.avatarUrl}
              width={100}
              height={100}
              className="rounded-full"
              alt="User avatar"
            />
            <div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition duration-300"
              >
                Change Avatar
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                className="hidden"
                accept="image/*"
              />
            </div>
          </div>
          {avatarPreview && (
            <button
              onClick={handleAvatarUpload}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition duration-300"
            >
              Upload New Avatar
            </button>
          )}
          <div>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Referral Code:</strong> {user.referralCode}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
