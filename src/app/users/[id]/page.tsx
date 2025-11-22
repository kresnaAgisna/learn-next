import type { User } from "../types";
import Link from "next/link";
import { safeText } from "@/lib/safeText";

async function getUser(id: string): Promise<User> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch user");

  return res.json();
}

export default async function UserDetailPage({ params }: { params: { id: string } }) {
  const user = await getUser(params.id);

  return (
    <div className="space-y-6">
      <Link href="/users" className="text-blue-600 underline">
        ← Back to list
      </Link>

      <div className="p-6 rounded-lg border shadow-sm bg-white">
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
