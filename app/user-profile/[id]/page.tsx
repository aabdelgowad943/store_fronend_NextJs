// src/app/user-profile/[id]/page.tsx

import { fetchUserById } from "@/utils/actions";

export default async function UserProfile({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  try {
    const response = await fetchUserById(id);
    const user = response;

    return (
      <div className="max-w-4xl mx-auto p-6">
        {/* Profile Header */}
        <div className="flex items-center space-x-6 border-b pb-6 mb-8">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-300">
            {/* Assuming user has a profile image URL */}
            <img
              src={
                user.profileImage ||
                "https://images.pexels.com/photos/4506436/pexels-photo-4506436.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              } // Default image if no profile image
              alt={user.username || "Profile Avatar"}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">
              {user.username}
            </h1>
            <p className="text-xl text-gray-600">{user.role}</p>
          </div>
        </div>

        {/* Bio Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Bio</h2>
          <p className="text-md text-gray-700 mt-2">
            {user.bio || "No bio available."}
          </p>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Contact Information
          </h2>
          <div className="text-md text-gray-700">
            <p>
              <strong>Email:</strong> {user.email || "No email provided."}
            </p>
          </div>
        </div>
      </div>
    );
  } catch (error: any) {
    return <div>Error: {error.message}</div>;
  }
}
