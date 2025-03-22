import React from "react";
import DashboardHeaderSection from "../components/DashboardHeaderSection";
import FooterSection from "../components/FooterSection";
import InteractiveVisualizationSection from "../components/InteractiveVisualizationSection";
import PriceDetectionSection from "../components/PriceDetectionSection";

export default function Page() {
  return (
    <main className="flex flex-col w-full min-h-screen">
      <section className="w-full">
        <PriceDetectionSection />
      </section>

      <section className="w-full">
        <DashboardHeaderSection />
      </section>

      <section id="visualization-section" className="w-full">
        <InteractiveVisualizationSection />
      </section>

      <section className="w-full">
        <FooterSection />
      </section>
    </main>
  );
}
