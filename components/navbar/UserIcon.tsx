// // components/UserIcon.tsx
"use client";

import { useState, useEffect } from "react";
import { getCurrentUser } from "@/utils/actions";
import { LuUser2 } from "react-icons/lu";

const UserIcon = () => {
  const [user, setUser] = useState<{ email: string; imageUrl: string } | null>(
    null
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const email = await getCurrentUser();
        if (email) {
          setUser({
            email,
            imageUrl:
              "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600", // Replace with real API logic
          });
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  if (user?.imageUrl) {
    return (
      <div>
        <img
          src={user.imageUrl}
          className="w-6 h-6 rounded-full object-cover"
          alt="Profile image"
        />
      </div>
    );
  }

  return <LuUser2 className="w-6 h-6 bg-primary rounded-full text-white" />;
};

export default UserIcon;
