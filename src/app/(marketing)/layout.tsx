import { Footer } from "@/components/footer/Footer";
import { Layout } from "@/components/layout/Layout";
import { Navbar } from "@/components/navbar/Navbar";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <Layout container={false}>{children}</Layout>
      <Footer />
    </>
  );
}
