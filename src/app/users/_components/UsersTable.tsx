"use client";

import type { User } from "@/types/user";
import UserTableRow from "./UserTableRow";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { Skeleton } from "@/components/Skeleton";

type Props = {
  users: User[];
  sortAsc: boolean;
  onToggleSort: () => void;
  loading?: boolean;
  error?: Error;
};

export default function UsersTable({ users, sortAsc, onToggleSort, loading, error }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left cursor-pointer flex items-center gap-1 select-none" onClick={onToggleSort}>
              Name
              {sortAsc ? <ChevronUpIcon className="w-4 h-4 text-gray-600" /> : <ChevronDownIcon className="w-4 h-4 text-gray-600" />}
            </th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Website</th>
          </tr>
        </thead>

        <tbody>
          {loading &&
            Array.from({ length: 3 }).map((_, idx) => (
              <tr key={idx}>
                <td className="p-2">
                  {" "}
                  <Skeleton className="h-6 w-2/4" />
                </td>
                <td className="p-2">
                  {" "}
                  <Skeleton className="h-6 w-2/4" />
                </td>
                <td className="p-2">
                  {" "}
                  <Skeleton className="h-6 w-2/4" />
                </td>
              </tr>
            ))}

          {!loading && error && (
            <tr>
              <td colSpan={3} className="p-4 text-center text-red-600">
                Failed to load users
              </td>
            </tr>
          )}

          {!loading && !error && users.length === 0 && (
            <tr>
              <td colSpan={3} className="p-4 text-center text-gray-500">
                No users found
              </td>
            </tr>
          )}

          {!loading && !error && users.length > 0 && users.map((user) => <UserTableRow key={user.id} user={user} />)}
        </tbody>
      </table>
    </div>
  );
}
