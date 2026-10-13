import { useState, useEffect } from "react";
import { WireframeHero } from "../components/WireframeHero";
import { AnnouncementsTicker } from "../components/AnnouncementsTicker";
import { QuickServicesHub } from "../components/QuickServicesHub";
import { DiscoverMuta } from "../components/DiscoverMuta";
import { MostVisited } from "../components/MostVisited";
import { LatestNews } from "../components/LatestNews";

export function Home() {
  return (
    <main>
      <WireframeHero />
      <AnnouncementsTicker />
      <QuickServicesHub />
      <DiscoverMuta />
      <MostVisited />
      <LatestNews />
    </main>
  );
}
