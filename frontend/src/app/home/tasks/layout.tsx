export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="flex flex-col h-full w-auto">{children}</div>
    </div>
  );
}
