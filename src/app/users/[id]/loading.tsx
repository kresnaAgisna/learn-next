import BackLink from "../_components/BackLink";
import { Skeleton } from "@/components/Skeleton";

export default function UserDetailLoading() {
  return (
    <div className="space-y-6 p-4">
      <BackLink />

      <div className="p-6 rounded-lg border shadow-sm bg-white max-w-md">
        <h1 className="text-2xl font-bold mb-4">
          <Skeleton className="w-32 h-6" />
        </h1>

        <div className="space-y-2">
          <div>
            <span className="font-semibold">Username:</span> <Skeleton className="w-24 h-4" />
          </div>
          <div>
            <span className="font-semibold">Email:</span> <Skeleton className="w-32 h-4" />
          </div>
          <div>
            <span className="font-semibold">Phone:</span> <Skeleton className="w-28 h-4" />
          </div>
          <div>
            <span className="font-semibold">Website:</span> <Skeleton className="w-24 h-4" />
          </div>

          <div>
            <h2 className="font-semibold mt-4">Company</h2>
          <Skeleton className="w-32 h-4" />
            <div className="text-sm text-gray-600"><Skeleton className="w-48 h-3" /></div>
            <div className="text-sm text-gray-600"><Skeleton className="w-40 h-3" /></div>
          </div>

          <div>
            <h2 className="font-semibold mt-4">Address</h2>
            <div>
              <Skeleton className="w-48 h-4" /><br />
              <Skeleton className="w-32 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
