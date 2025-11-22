"use client";

import { useState } from "react";
import useSWR from "swr";
import type { User } from "@/types/user";
import UsersTable from "./UsersTable";
import { useDebounce } from "@/lib/hooks/useDebouce";
import { fetchUsers } from "@/lib/api/user";

export default function UserList() {
  const [query, setQuery] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const debouncedQuery = useDebounce(query, 500);

  const { data: users, error, isLoading } = useSWR<User[]>(
    ["users", debouncedQuery],
    () => fetchUsers(debouncedQuery)
  );

  // Sort users alphabetically by name
  const sortedUsers = users
    ? [...users].sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return sortAsc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      })
    : [];

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name/email"
        className="border rounded px-3 py-2 w-full sm:w-64"
      />

      <UsersTable
        users={sortedUsers}
        sortAsc={sortAsc}
        onToggleSort={() => setSortAsc(!sortAsc)}
        loading={isLoading}
        error={error}
      />
    </div>
  );
}
