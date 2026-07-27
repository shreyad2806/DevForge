"use client";

import { useState } from "react";

import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/features/pricing/components/Hero";
import { BillingToggle } from "@/features/pricing/components/BillingToggle";
import { PricingCard } from "@/features/pricing/components/PricingCard";
import { FeatureComparison } from "@/features/pricing/components/FeatureComparison";
import { FAQPreview } from "@/features/pricing/components/FAQPreview";
import { CTA } from "@/features/pricing/components/CTA";
import { pricingPlans } from "@/data/pricing";

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <>
      <Navbar />
      <Layout container={false}>
        <main className="relative overflow-hidden py-16 lg:py-24">
          <section className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Hero />

            <div className="mt-8 flex justify-center">
              <BillingToggle isYearly={isYearly} onToggle={setIsYearly} />
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pricingPlans.map((plan) => (
                <PricingCard key={plan.id} plan={plan} isYearly={isYearly} />
              ))}
            </div>

            <FeatureComparison className="mt-12" />
            <FAQPreview className="mt-16" />
            <CTA className="mt-12" />
          </section>
        </main>
      </Layout>
      <Footer />
    </>
  );
}
