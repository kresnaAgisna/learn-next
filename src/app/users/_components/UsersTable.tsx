"use client";

import type { User } from "@/types/user";
import UserTableRow from "./UserTableRow";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

type Props = {
  users: User[];
  sortAsc: boolean;
  onToggleSort: () => void;
};

export default function UsersTable({ users, sortAsc, onToggleSort }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">ID</th>
            <th
              className="p-2 text-left cursor-pointer flex items-center gap-1 select-none"
              onClick={onToggleSort}
            >
              Name
              {sortAsc ? (
                <ChevronUpIcon className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronDownIcon className="w-4 h-4 text-gray-600" />
              )}
            </th>
            <th className="p-2 text-left">Email</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={3} className="p-4 text-center text-gray-500">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => <UserTableRow key={user.id} user={user} />)
          )}
        </tbody>
      </table>
    </div>
  );
}
