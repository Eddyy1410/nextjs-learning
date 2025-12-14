import Pagination from "@/app/ui/invoices/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/invoices/table";
import { CreateInvoice } from "@/app/ui/invoices/buttons";
import { lusitana } from "@/app/ui/fonts";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchInvoicesPages } from "@/app/lib/data";

//Nguồn gốc dữ liệu: Props này KHÔNG phải do bạn truyền, mà do Next.js Framework tự động bơm vào (Magic Props).
// Tại sao lại là async và Promise?
// Trong các phiên bản Next.js mới nhất, các dữ liệu liên quan đến Request (như params - đường dẫn động, searchParams - query string) được chuyển sang dạng Bất đồng bộ (Asynchronous).
// Lý do: Để tối ưu hiệu năng. Next.js muốn server bắt đầu render cái khung trang (Static Shell) ngay lập tức mà không cần chờ trình duyệt gửi xong mớ tham số URL.
// Việc xử lý URL (searchParams) được coi là một tác vụ IO (Input/Output) cần thời gian chờ, nên nó được bọc trong một Promise.
export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
