import { connection } from "next/server";
import { DailyArticleView } from "@/components/DailyArticleView";
import { getDailyAiArticle, getGlobalAiTrends } from "@/lib/news";

export default async function Home() {
  await connection();

  const [dailyArticle, globalTrends] = await Promise.all([
    getDailyAiArticle(),
    getGlobalAiTrends(),
  ]);

  return (
    <DailyArticleView
      dailyArticle={dailyArticle}
      globalTrends={globalTrends}
    />
  );
}
