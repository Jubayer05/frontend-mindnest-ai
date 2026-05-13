import { FaqHome } from "@/components/modules/Home/FaqHome";
import { HomeBanner } from "@/components/modules/Home/HomeBanner";
import { HomeFeatureTutor } from "@/components/modules/Home/HomeFeatureTutor";
import {
  HomeBlogTeaser,
  HomeFinalCta,
  HomeHowItWorks,
  HomeNewsletter,
  HomeStatsStrip,
  HomeValues,
} from "@/components/modules/Home/HomeMoreSections";
import { HomeReviews } from "@/components/modules/Home/HomeReviews";
import { HomeServices } from "@/components/modules/Home/HomeServices";
import { fetchFeaturedTutorsForHome } from "@/lib/featured-tutors";

export default async function Home() {
  const featuredTutors = await fetchFeaturedTutorsForHome(8);

  return (
    <div className="min-h-screen bg-background font-sans">
      <main className="container mx-auto max-w-7xl space-y-16 px-4 py-6 sm:px-6 lg:px-8">
        <HomeBanner />
        <HomeStatsStrip />
        <HomeServices />
        <HomeHowItWorks />
        <HomeFeatureTutor
          tutors={
            featuredTutors && featuredTutors.length > 0
              ? featuredTutors
              : undefined
          }
        />
        <HomeValues />
        <HomeReviews />
        <HomeBlogTeaser />
        <HomeNewsletter />
        <FaqHome />
        <HomeFinalCta />
      </main>
    </div>
  );
}
