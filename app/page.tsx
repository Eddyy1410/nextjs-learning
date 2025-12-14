import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";

// Mặc dù Page là Server Component, nhưng bên trong nó có dùng: <Link> và <Image>
// Hai cái này là client component có sẵn của Next.js, và bản thân chúng có thể chứa logic Client (ví dụ: Link cần lắng nghe click để prefetch, Image cần lazy load).
// Mô hình hoạt động:
// Trong file page.tsx (Server) của bạn:
// Server: Render ra HTML của các thẻ div, h1, p...
// Gặp thẻ <Link>: Server nhận ra đây là Client Component. Nó để lại một "chỗ trống" (placeholder) và đánh dấu: "Chỗ này dành cho thằng Link, gửi code JS của thằng Link về cho Client nhé".
// Client: Nhận HTML + Code JS của <Link>. Trình duyệt lắp ráp chúng lại.
// => Tóm lại: Bạn cứ thoải mái dùng các component có sẵn của Next.js ở bất cứ đâu (Server hay Client) mà không cần quan tâm nó là gì, Next.js đã tối ưu việc đóng gói (bundling) hết cho bạn rồi.
export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <div className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-black" />
          <p
            className={`text-xl text-gray-800 md:text-3xl md:leading-normal ${lusitana.className}`}
          >
            <strong>Welcome to Acme.</strong> This is the example for the{" "}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Images Here */}
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshot of the dashboard project showing mobile version"
          />
        </div>
      </div>
    </main>
  );
}
