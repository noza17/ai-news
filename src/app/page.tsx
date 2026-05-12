import { connection } from "next/server";
import { DailyArticleView } from "@/components/DailyArticleView";
import { getDailyAiArticle, getGlobalAiTrends } from "@/lib/news";

type HomeProps = {
  searchParams: Promise<{
    pick?: string | string[];
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  await connection();

  const pickOffset = getPickOffset((await searchParams).pick);

  const [dailyArticle, globalTrends] = await Promise.all([
    getDailyAiArticle(new Date(), pickOffset),
    getGlobalAiTrends(),
  ]);

  return (
    <DailyArticleView
      dailyArticle={dailyArticle}
      globalTrends={globalTrends}
    />
  );
}

function getPickOffset(value: string | string[] | undefined): number {
  const rawValue = Array.isArray(value) ? value[0] : value;
  const pickOffset = Number.parseInt(rawValue ?? "0", 10);

  if (!Number.isFinite(pickOffset) || pickOffset < 0) {
    return 0;
  }

  return pickOffset;
}
