import { createClient } from "@/lib/supabase/server";
import { Footer } from "@/components/footer/Footer";
import { Layout } from "@/components/layout/Layout";
import { Navbar } from "@/components/navbar/Navbar";

export default async function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const authUser = user ? { id: user.id } : null;

  return (
    <>
      <Navbar user={authUser} />
      <Layout container={false}>{children}</Layout>
      <Footer />
    </>
  );
}
