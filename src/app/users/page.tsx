import UserList from "./_components/UserList";

export default function UsersPage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Users</h1>
      <UserList />
    </div>
  );
}
