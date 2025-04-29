import HeaderSection from "@/feature/home/components/header-section";
import ListSection from "@/feature/home/components/list-section";
import VideoSection from "@/feature/home/components/video-section";
import React from "react";

export default function HomePage() {
  return (
    <main className="lg:container mx-auto py-5 px-4 sm:px-0">
      <HeaderSection />
      <section className="flex gap-10">
        <VideoSection />
        <ListSection />
      </section>
    </main>
  );
}
