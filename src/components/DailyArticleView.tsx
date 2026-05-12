import Link from "next/link";
import type { AiArticle, AiTrendFeed, DailyAiArticle } from "@/lib/news";
import { formatPublishedDate, formatSelectedDate } from "@/lib/news";

type DailyArticleViewProps = {
  dailyArticle: DailyAiArticle;
  globalTrends: AiTrendFeed;
};

export function DailyArticleView({
  dailyArticle,
  globalTrends,
}: DailyArticleViewProps) {
  const { article, selectedDate } = dailyArticle;

  return (
    <main className="page-shell">
      <section className="hero-section" aria-labelledby="page-title">
        <div className="hero-copy">
          <p className="eyebrow">AI Daily Brief</p>
          <h1 id="page-title">今日読むAI記事</h1>
          <p>
            AI関連ニュースを毎日1本だけ選び、日本語の概要と読みどころに絞って確認できます。世界のAIトレンドも同じ画面で追えるようにしました。
          </p>
        </div>

        <div className="date-panel" aria-label="今日の日付">
          <span>JST</span>
          <strong>{formatSelectedDate(selectedDate)}</strong>
        </div>
      </section>

      <article className="article-layout">
        <section className="article-main" aria-labelledby="article-title">
          <ArticleMeta article={article} />

          <h2 id="article-title">{article.title}</h2>
          <p className="article-summary">{article.summary}</p>

          <TagList tags={article.tags} label="記事タグ" />

          <div className="article-actions">
            <a
              className="primary-link"
              href={article.originalUrl}
              target="_blank"
              rel="noreferrer"
            >
              原文を読む
            </a>

            {dailyArticle.articleCount > 1 && (
              <Link
                className="secondary-link"
                href={buildPickHref(dailyArticle.nextPickOffset)}
                prefetch={false}
                scroll={false}
              >
                別の記事にする
              </Link>
            )}
          </div>
        </section>

        <aside className="article-side" aria-label="補足情報">
          <section className="side-section">
            <h3>今日の読みどころ</h3>
            <ul>
              {article.keyPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </section>

          <section className="side-section source-section">
            <h3>記事取得</h3>
            <p className="source-label">{dailyArticle.sourceLabel}</p>
            <p className="pick-count">
              候補 {dailyArticle.articleNumber} / {dailyArticle.articleCount}
            </p>
            <p>{dailyArticle.sourceDescription}</p>
          </section>
        </aside>
      </article>

      <section className="global-section" aria-labelledby="global-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Global AI Trends</p>
            <h2 id="global-title">世界のAIトレンド</h2>
          </div>
          <p>{globalTrends.sourceDescription}</p>
        </div>

        <div className="trend-grid">
          {globalTrends.articles.map((trend) => (
            <TrendCard key={trend.id} article={trend} />
          ))}
        </div>

        <p className="feed-note">取得元: {globalTrends.sourceLabel}</p>
      </section>
    </main>
  );
}

function TrendCard({ article }: { article: AiArticle }) {
  return (
    <article className="trend-card">
      <ArticleMeta article={article} />
      <h3>
        <a href={article.originalUrl} target="_blank" rel="noreferrer">
          {article.title}
        </a>
      </h3>
      <p>{shortenText(article.summary, 180)}</p>
      <TagList tags={article.tags} label={`${article.title}のタグ`} />
    </article>
  );
}

function ArticleMeta({ article }: { article: AiArticle }) {
  return (
    <div className="meta-row">
      {article.sourceUrl ? (
        <a href={article.sourceUrl} target="_blank" rel="noreferrer">
          {article.sourceName}
        </a>
      ) : (
        <span>{article.sourceName}</span>
      )}
      <span>{formatPublishedDate(article.publishedAt)}</span>
    </div>
  );
}

function TagList({ tags, label }: { tags: string[]; label: string }) {
  return (
    <div className="tag-list" aria-label={label}>
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  );
}

function shortenText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength - 3)}...`;
}

function buildPickHref(nextPickOffset: number): string {
  if (nextPickOffset === 0) {
    return "/";
  }

  return `/?pick=${nextPickOffset}`;
}
