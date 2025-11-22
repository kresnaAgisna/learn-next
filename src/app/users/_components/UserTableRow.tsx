"use client";

import { useRouter } from "next/navigation";
import type { User } from "@/types/user";
import React from "react";

type Props = {
  user: User;
};

export default function UserTableRow({ user }: Props) {
  const router = useRouter();

  return (
    <tr
      onClick={() => router.push(`/users/${user.id}`)}
      className="cursor-pointer hover:bg-gray-50 transition-colors"
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          router.push(`/users/${user.id}`);
        }
      }}
    >
      <td className="p-2">{user.name}</td>
      <td className="p-2">{user.email}</td>
      <td className="p-2">{user.website}</td>
    </tr>
  );
}
