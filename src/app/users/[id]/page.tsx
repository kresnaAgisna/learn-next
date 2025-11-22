import { safeText } from "@/lib/safeText";
import { getUser } from "@/lib/api/user";
import BackLink from "../_components/BackLink";

export default async function UserDetailPage({ params }: { params: { id: string } }) {
  let user;

  try {
    user = await getUser(params.id);
  } catch {
    return (
      <div className="p-4 text-red-600">
        Failed to load user details.
        <BackLink />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <BackLink />

      <div className="p-6 rounded-lg border shadow-sm bg-white max-w-md">
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
