import SideNav from '@/app/components/dashboard/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col rounded md:flex-row md:flex-nowrap">
      <div className="flex-none md:w-16">
        <SideNav />
      </div>
      <div className="flex-1 bg-gray-100 p-6 pt-0 md:overflow-y-auto md:p-12">
        {children}
      </div>
    </div>
  );
}
