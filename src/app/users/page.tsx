import { getUsers } from "@/lib/api/user";
import UsersTable from "./_components/UsersTable";

export const revalidate = 60;

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>
      <UsersTable users={users} />
    </div>
  );
}
