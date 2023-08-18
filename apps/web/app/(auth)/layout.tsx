import { getServerSession } from "next-auth";
import { Roboto_Mono } from "next/font/google";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Stack Overflow",
  description: "Sign IN On Stack Overflow",
};

const inter = Roboto_Mono({
  weight: ["300", "400", "700", "500"],
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  console.log(session);
  if (session) {
    return redirect("/");
  }

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
