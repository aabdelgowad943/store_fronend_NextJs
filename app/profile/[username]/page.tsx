// app/profile/[username]/page.tsx

import { fetchSellerByUsername } from "@/utils/actions"; // Import the new function
import { notFound } from "next/navigation";

interface SellerProfileProps {
  params: { username: string };
}

async function SellerProfile({ params }: SellerProfileProps) {
  const { username } = params;
  const sellerData = await fetchSellerByUsername(username);

  // Handle case where seller is not found
  if (!sellerData) {
    notFound(); // This will show a 404 page if no seller data is found
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Header */}
      <div className="flex items-center space-x-6 border-b pb-6 mb-8">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-300">
          {/* Assuming sellerData has a profile image URL */}
          <img
            src={sellerData.profileImage || "/default-avatar.png"} // Default image if no profile image
            alt={sellerData.username}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            {sellerData.username}
          </h1>
          <p className="text-xl text-gray-600">{sellerData.role}</p>
        </div>
      </div>

      {/* Bio Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">Bio</h2>
        <p className="text-md text-gray-700 mt-2">
          {sellerData.bio || "No bio available."}
        </p>
      </div>

      {/* Contact Information or Other Details Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Contact Information
        </h2>
        <div className="text-md text-gray-700">
          <p>
            <strong>Email:</strong> {sellerData.email || "No email provided."}
          </p>
        </div>
      </div>

      {/* Add other details as needed */}
    </div>
  );
}

export default SellerProfile;
