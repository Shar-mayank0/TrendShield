import React from "react";
import DashboardHeaderSection from "../components/DashboardHeaderSection";
import  FeaturesSection  from "../components/FeatureSection";  
import  FooterSection  from "../components/FooterSection";
import  InteractiveVisualizationSection  from "../components/InteractiveVisualizationSection";
import  PriceDetectionSection  from "../components/PriceDetectionSection";

export default function Page(){
  return (
    <main className="flex flex-col w-full min-h-screen">
      <section className="w-full">
        <PriceDetectionSection />
      </section>

      <section className="w-full">
        <DashboardHeaderSection />
      </section>

      <section className="w-full">
        <InteractiveVisualizationSection />
      </section>

      <section className="w-full">
        <FeaturesSection />
      </section>

      <section className="w-full">
        <FooterSection />
      </section>
    </main>
  );
}
