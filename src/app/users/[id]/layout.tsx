import BackLink from "../_components/BackLink";

export default function userDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col p-4 gap-4">
      <BackLink />
      {children}
    </div>
  );
}
