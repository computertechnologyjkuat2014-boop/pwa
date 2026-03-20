import Navbar from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 p-4">
        {/* <Navbar /> */}
        {children}
      </main>
    </div>
  );
}
