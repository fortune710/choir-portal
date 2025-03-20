import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/login"); // ✅ Redirect happens before layout is applied
  return null;
}