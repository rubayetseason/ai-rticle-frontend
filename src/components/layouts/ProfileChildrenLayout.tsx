import Sidebar from "@/components/layouts/Sidebar";

const ProfileChildrenLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full px-4">
      <div className="max-w-[var(--custom-width)] mx-auto flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden md:block w-72 pr-6">
          <div className="sticky top-0">
            <Sidebar />
          </div>
        </aside>

        {/* Content */}
        <main className="pb-10 flex-1 md:border-x md:border-border">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ProfileChildrenLayout;
