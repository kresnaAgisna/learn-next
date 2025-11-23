// app/users/[id]/page.tsx
import { safeText } from "@/lib/safeText";
import { getUser } from "@/lib/api/user";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const user = await getUser(params.id);
    return {
      title: `${safeText(user.name)} - User Details`,
      description: `View details of ${safeText(user.name)}, including username, email, phone, website, company, and address.`,
    };
  } catch {
    return {
      title: "User not found",
      description: "Failed to fetch user details.",
    };
  }
}

export default async function UserDetailPage({ params }: { params: { id: string } }) {
  const user = await getUser(params.id);

  return (
    <div className="flex justify-center sm:justify-start">
      <div className="p-6 rounded-lg border shadow-sm bg-white max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">{safeText(user.name)}</h1>

        <div className="space-y-2">
          <p>
            <span className="font-semibold">Username:</span> {safeText(user.username)}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {safeText(user.email)}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {safeText(user.phone)}
          </p>
          <p>
            <span className="font-semibold">Website:</span> {safeText(user.website)}
          </p>

          <div>
            <h2 className="font-semibold mt-4">Company</h2>
            <p>{safeText(user.company?.name)}</p>
            <p className="text-sm text-gray-600">{safeText(user.company?.catchPhrase)}</p>
            <p className="text-sm text-gray-600">{safeText(user.company?.bs)}</p>
          </div>

          <div>
            <h2 className="font-semibold mt-4">Address</h2>
            <p>
              {safeText(user.address?.street)}, {safeText(user.address?.suite)}
              <br />
              {safeText(user.address?.city)}, {safeText(user.address?.zipcode)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
