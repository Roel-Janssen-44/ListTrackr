import SideNav from '@/app/components/dashboard/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col rounded md:flex-row">
      <div className="md:w-16">
        <SideNav />
      </div>
      <div className=" p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
