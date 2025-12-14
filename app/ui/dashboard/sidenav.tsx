import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';

// <Link href=""/> hỗ trợ CSR thay thế cho <a href=""/> 
// <a/> sẽ tải lại trang (full refresh)
// <Link/> chỉ tải lại phần thay đổi (client side routing), Client component
// Cơ chế Automatic CODE-SPLITTING và PREFETCHING
// so sánh 2 cách thức CSR cũ là theo SPA load hết initial data nên khiến lần đầu bị chậm, còn theo cách mới của Next.js là chỉ sẽ tải RSC payload, client component JS, CSS cần thiết cho route segment hompage và trong homepage thì sẽ có <Link /> và khi đó thì phía client sẽ fetch code cần thiết cho các linked route segment và để sẵn ở RAM
// Khi user click vào link thì sẽ render ngay lập tức từ RAM mà không cần fetch lại từ server nữa
// Next.js SSR (lần đầu với homepage route segment) + CSR hybrid (các lần sau với các linked route segment)

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
