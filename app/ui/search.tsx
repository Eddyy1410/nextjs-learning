"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

// React gọi hàm => nó luôn luôn gói tất cả các thuộc tính bạn truyền vào thành MỘT Object duy nhất (gọi là props).
//Cách 1: Viết đầy đủ
// function Search(props: { placeholder: string }) {
//    console.log(props.placeholder); // Phải chấm props mới lấy được
// }
// Cách 2: Viết tắt (Destructuring - Bóc tách) -> Cái bạn đang thấy
// function Search({ placeholder }: { placeholder: string }) {
//    console.log(placeholder); // Dùng luôn cho tiện
// }
export default function Search({ placeholder }: { placeholder: string }) {
  //searchParams sẽ trả về một đối tượng ReadonlyURLSearchParams (một phiên bản chỉ đọc của URLSearchParams trong Web API).
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Bạn KHÔNG THỂ viết thế này:
  // function handleSearch = useDebouncedCallback(...);
  // Lỗi: Unexpected token '='
  // JavaScript sẽ hét lên: "Ê, sau tên hàm phải là dấu ngoặc tròn () và dấu ngoặc nhọn {} để mày viết code vào chứ! Tại sao lại là dấu bằng =?"
  const handleSearch = useDebouncedCallback((term: string) => {

    // chuẩn Web API, hàm khởi tạo new URLSearchParams(...) chấp nhận các kiểu dữ liệu đầu vào sau:
    // Một chuỗi query string (VD: "page=1&sort=asc").
    // Một mảng các cặp key-value (VD: [['page', '1'], ['sort', 'asc']]).
    // Một object URLSearchParams khác.
    // return { key: string; value: string }
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    // Trong JS, ngoài false "xịn", thì 5 giá trị sau đây khi vào if cũng sẽ bị coi là false:
    // 1. "" (Chuỗi rỗng - Trường hợp ô input của bạn).
    // 2. null (Giá trị rỗng, không có gì).
    // 3. undefined (Biến chưa được gán giá trị).
    // 4. 0 (Số không).
    // 5. NaN (Not a Number - Lỗi tính toán).
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
    // Sau 300ms sau khi người dùng ngừng gõ, hàm này mới được gọi.
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        // Chỗ này giúp cho việc hiển thị giá trị trong ô input được đúng với query hiện tại trong URL.
        defaultValue={searchParams.get("query")?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
