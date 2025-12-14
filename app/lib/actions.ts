"use server";
// Định nghĩa: Đây là cái "công tắc" để biến một hàm thành Server Action.

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(["pending", "paid"]),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse(
    Object.fromEntries(formData.entries())
  );
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];
  // const rawFormData = Object.fromEntries(formData.entries());

  try {
    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;
  } catch (error) {
    console.error(error);
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }

  // Once the database has been updated, the /dashboard/invoices path will be revalidated, and fresh data will be fetched from the server.
  // Do cơ chế static rendering và caching của Next.js, nên sau khi thao tác dữ liệu (thêm/sửa/xóa) ta cần gọi hàm revalidatePath để Next.js biết là cần tải lại dữ liệu mới.
  // Nếu không có bước này, trang sẽ vẫn hiển thị dữ liệu cũ đã được cache.
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  const amountInCents = amount * 100;

  try {
    await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
  } catch (error) {
    console.error(error);
    return { message: "Database Error: Failed to Update Invoice." };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  throw new Error('Failed to Delete Invoice');
  
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath("/dashboard/invoices");
}
