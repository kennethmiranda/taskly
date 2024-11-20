export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="flex-grow h-full w-auto p-4 sm:p-6 md:p-12">
        {children}
      </div>
    </div>
  );
}
