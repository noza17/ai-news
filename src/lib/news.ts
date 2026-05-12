export type ArticleSource = "live-rss" | "local-fallback";

export type AiArticle = {
  id: string;
  title: string;
  summary: string;
  sourceName: string;
  sourceUrl?: string;
  originalUrl: string;
  publishedAt: string;
  tags: string[];
  keyPoints: string[];
};

export type DailyAiArticle = {
  article: AiArticle;
  selectedDate: string;
  articleNumber: number;
  articleCount: number;
  nextPickOffset: number;
  source: ArticleSource;
  sourceLabel: string;
  sourceDescription: string;
};

export type AiTrendFeed = {
  articles: AiArticle[];
  source: ArticleSource;
  sourceLabel: string;
  sourceDescription: string;
};

type GoogleNewsFeedConfig = {
  query: string;
  language: string;
  country: string;
  edition: string;
  idPrefix: string;
  maxArticles: number;
  emptySummary: string;
  keyPoints: string[];
};

const GOOGLE_NEWS_FEED_URL = "https://news.google.com/rss/search";
const TOKYO_TIME_ZONE = "Asia/Tokyo";
const FEED_CACHE_SECONDS = 60 * 60;
const MAX_DAILY_CANDIDATES = 12;
const MAX_GLOBAL_TRENDS = 6;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const japanAiFeed: GoogleNewsFeedConfig = {
  query: "生成AI OR 人工知能 OR AI",
  language: "ja",
  country: "JP",
  edition: "JP:ja",
  idPrefix: "japan-ai",
  maxArticles: MAX_DAILY_CANDIDATES,
  emptySummary:
    "RSSの概要が空のため、詳しい内容は原文リンクから確認してください。",
  keyPoints: [
    "RSSのタイトルと概要をもとに、AI関連の候補として表示しています。",
    "著作権に配慮し、記事本文の全文転載はせず、概要と原文リンクに絞っています。",
    "詳しい内容や文脈は、原文を開いて確認してください。",
  ],
};

const globalAiFeed: GoogleNewsFeedConfig = {
  query:
    'OpenAI OR Anthropic OR "Google DeepMind" OR "Meta AI" OR "NVIDIA AI" OR "生成AI 世界"',
  language: "ja",
  country: "JP",
  edition: "JP:ja",
  idPrefix: "global-ai",
  maxArticles: MAX_GLOBAL_TRENDS,
  emptySummary:
    "RSSの概要が空のため、詳しい内容は原文リンクから確認してください。",
  keyPoints: [
    "世界のAI企業、研究機関、半導体、生成AIサービスの話題を拾いやすい検索条件にしています。",
    "日本語版Google News RSSを使うため、海外トピックも日本語記事として読みやすくなります。",
    "海外原文記事の自動翻訳や本文要約は、今後APIを接続すると拡張できます。",
  ],
};

const localFallbackArticles: AiArticle[] = [
  {
    id: "transformer-attention",
    title: "Transformerの基本を押さえる: Attention Is All You Need",
    summary:
      "現在の生成AIを理解するうえで重要なTransformerの原点です。長い文章の中で、どの単語や文脈に注目するかを扱う仕組みを知ると、LLMの強みと限界を整理しやすくなります。",
    sourceName: "arXiv",
    originalUrl: "https://arxiv.org/abs/1706.03762",
    publishedAt: "2017-06-12T00:00:00.000Z",
    tags: ["基礎", "Transformer", "LLM"],
    keyPoints: [
      "生成AIの多くはTransformer系の考え方を土台にしています。",
      "Attentionは、入力のどこを重視するかを学習する仕組みです。",
      "ニュースを追う前に読んでおくと、技術発表の意味を理解しやすくなります。",
    ],
  },
  {
    id: "ai-index",
    title: "AI Index ReportでAI業界の大きな流れを見る",
    summary:
      "研究、投資、規制、利用状況など、AIの進展を広く整理する年次レポートです。個別ニュースだけでは見えにくい、産業全体の変化をつかむ入口になります。",
    sourceName: "Stanford HAI",
    originalUrl: "https://aiindex.stanford.edu/report/",
    publishedAt: "2025-04-01T00:00:00.000Z",
    tags: ["市場動向", "研究", "レポート"],
    keyPoints: [
      "AIの進歩を技術面だけでなく社会面からも確認できます。",
      "投資額や導入状況を見ると、どこで実用化が進んでいるかが分かります。",
      "毎日のニュースを長期トレンドの中に置いて読めるようになります。",
    ],
  },
  {
    id: "nist-ai-risk",
    title: "AI Risk Management Frameworkで安全性の観点を学ぶ",
    summary:
      "AIシステムの信頼性、公平性、透明性、安全性をどう扱うかを整理したフレームワークです。AIサービスを作る側として、技術だけでなく運用リスクも考える材料になります。",
    sourceName: "NIST",
    originalUrl: "https://www.nist.gov/itl/ai-risk-management-framework",
    publishedAt: "2023-01-26T00:00:00.000Z",
    tags: ["安全性", "ガバナンス", "運用"],
    keyPoints: [
      "AIサービスでは性能だけでなく、説明責任やリスク管理も重要です。",
      "実装前に考えるべき観点をチェックリストのように使えます。",
      "法規制や企業導入の記事を読むときの背景知識になります。",
    ],
  },
  {
    id: "illustrated-transformer",
    title: "図解でTransformerの流れをつかむ",
    summary:
      "Transformerの処理の流れを視覚的に理解できる解説です。数式に入る前に全体像をつかみたいときに役立ちます。",
    sourceName: "The Illustrated Transformer",
    originalUrl: "https://jalammar.github.io/illustrated-transformer/",
    publishedAt: "2018-06-27T00:00:00.000Z",
    tags: ["入門", "図解", "Transformer"],
    keyPoints: [
      "文章がベクトルとして処理される流れをイメージできます。",
      "Self-Attentionやエンコーダー/デコーダーの関係を追いやすい解説です。",
      "LLM関連ニュースの専門用語に慣れる前段階として向いています。",
    ],
  },
];

const localGlobalTrendArticles: AiArticle[] = [
  {
    id: "deep-learning-ai-the-batch",
    title: "The Batchで世界のAIニュースを広く追う",
    summary:
      "DeepLearning.AIが発信するAIニュースレターです。研究、プロダクト、規制、ビジネスの話題を短く追えるため、世界のAI動向をざっくり把握する入口になります。",
    sourceName: "DeepLearning.AI",
    originalUrl: "https://www.deeplearning.ai/the-batch/",
    publishedAt: "2026-01-01T00:00:00.000Z",
    tags: ["海外動向", "ニュースレター", "研究"],
    keyPoints: globalAiFeed.keyPoints,
  },
  {
    id: "mit-technology-review-ai",
    title: "MIT Technology ReviewでAIの社会実装を見る",
    summary:
      "AI研究や企業利用だけでなく、社会、倫理、規制への影響も扱うメディアです。技術トレンドを社会の文脈と一緒に読みたいときに向いています。",
    sourceName: "MIT Technology Review",
    originalUrl: "https://www.technologyreview.com/topic/artificial-intelligence/",
    publishedAt: "2026-01-01T00:00:00.000Z",
    tags: ["海外動向", "社会実装", "規制"],
    keyPoints: globalAiFeed.keyPoints,
  },
  {
    id: "google-deepmind-blog",
    title: "Google DeepMind BlogでAI研究の進展を見る",
    summary:
      "基盤モデル、AI for Science、ロボティクスなど、世界的なAI研究の進展を追える公式ブログです。研究寄りのトレンドを確認したいときに役立ちます。",
    sourceName: "Google DeepMind",
    originalUrl: "https://deepmind.google/discover/blog/",
    publishedAt: "2026-01-01T00:00:00.000Z",
    tags: ["海外動向", "研究", "AI for Science"],
    keyPoints: globalAiFeed.keyPoints,
  },
];

export async function getDailyAiArticle(
  now = new Date(),
  pickOffset = 0,
): Promise<DailyAiArticle> {
  const selectedDate = getTokyoDateKey(now);

  try {
    const liveArticles = await fetchGoogleNewsArticles(japanAiFeed);

    if (liveArticles.length > 0) {
      const picked = pickArticleForDate(liveArticles, selectedDate, pickOffset);

      return {
        ...picked,
        selectedDate,
        source: "live-rss",
        sourceLabel: "Google News RSS",
        sourceDescription:
          "日本語のGoogleニュースRSSからAI関連記事の候補を取得し、その日の1本を選んでいます。",
      };
    }
  } catch {
    // If the public feed is unavailable, the app still renders useful learning content.
  }

  const picked = pickArticleForDate(
    localFallbackArticles,
    selectedDate,
    pickOffset,
  );

  return {
    ...picked,
    selectedDate,
    source: "local-fallback",
    sourceLabel: "ローカル学習用データ",
    sourceDescription:
      "RSS取得に失敗した、または候補が空だったため、学習用に用意した記事データを表示しています。",
  };
}

export async function getGlobalAiTrends(): Promise<AiTrendFeed> {
  try {
    const articles = await fetchGoogleNewsArticles(globalAiFeed);

    if (articles.length > 0) {
      return {
        articles,
        source: "live-rss",
        sourceLabel: "Google News RSS / 世界AIキーワード",
        sourceDescription:
          "日本語版GoogleニュースRSSから、OpenAI、Anthropic、NVIDIA、Google DeepMindなど世界のAI関連キーワードを含む記事を取得しています。",
      };
    }
  } catch {
    // The global trend section should remain useful even when the feed is unavailable.
  }

  return {
    articles: localGlobalTrendArticles,
    source: "local-fallback",
    sourceLabel: "ローカル海外トレンド用データ",
    sourceDescription:
      "海外RSSを取得できなかったため、世界のAI動向を追う入口になる学習用リンクを表示しています。",
  };
}

export function formatSelectedDate(dateKey: string): string {
  const date = new Date(`${dateKey}T00:00:00+09:00`);

  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: TOKYO_TIME_ZONE,
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(date);
}

export function formatPublishedDate(dateValue: string): string {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "公開日不明";
  }

  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: TOKYO_TIME_ZONE,
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

async function fetchGoogleNewsArticles(
  config: GoogleNewsFeedConfig,
): Promise<AiArticle[]> {
  const response = await fetch(buildGoogleNewsFeedUrl(config), {
    next: { revalidate: FEED_CACHE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch news feed: ${response.status}`);
  }

  const xml = await response.text();

  return parseRssItems(xml, config).slice(0, config.maxArticles);
}

function buildGoogleNewsFeedUrl(config: GoogleNewsFeedConfig): string {
  const feedUrl = new URL(GOOGLE_NEWS_FEED_URL);

  feedUrl.searchParams.set("q", config.query);
  feedUrl.searchParams.set("hl", config.language);
  feedUrl.searchParams.set("gl", config.country);
  feedUrl.searchParams.set("ceid", config.edition);

  return feedUrl.toString();
}

function parseRssItems(
  xml: string,
  config: GoogleNewsFeedConfig,
): AiArticle[] {
  const itemBlocks = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)];
  const articles = itemBlocks
    .map((match, index) => parseRssItem(match[1], index, config))
    .filter((article): article is AiArticle => article !== null);

  return dedupeArticles(articles);
}

function parseRssItem(
  itemXml: string,
  index: number,
  config: GoogleNewsFeedConfig,
): AiArticle | null {
  const sourceName = readXmlTag(itemXml, "source") || "Google News";
  const title = removeSourceSuffix(readXmlTag(itemXml, "title"), sourceName);
  const originalUrl = readXmlTag(itemXml, "link");
  const publishedAt = normalizeDate(readXmlTag(itemXml, "pubDate"));
  const summary = cleanSummary(readXmlTag(itemXml, "description"));
  const sourceUrl = readXmlAttribute(itemXml, "source", "url");

  if (!title || !originalUrl) {
    return null;
  }

  return {
    id: `${config.idPrefix}-${index}-${hashText(title)}`,
    title,
    summary: summary || config.emptySummary,
    sourceName,
    sourceUrl,
    originalUrl,
    publishedAt,
    tags: inferTags(`${title} ${summary}`),
    keyPoints: config.keyPoints,
  };
}

function readXmlTag(xml: string, tagName: string): string {
  const tagPattern = new RegExp(
    `<${tagName}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tagName}>`,
    "i",
  );
  const match = tagPattern.exec(xml);

  return decodeXml(match?.[1] ?? "");
}

function readXmlAttribute(
  xml: string,
  tagName: string,
  attributeName: string,
): string | undefined {
  const tagPattern = new RegExp(`<${tagName}([^>]*)>`, "i");
  const tagMatch = tagPattern.exec(xml);

  if (!tagMatch) {
    return undefined;
  }

  const attributePattern = new RegExp(`${attributeName}="([^"]*)"`, "i");
  const attributeMatch = attributePattern.exec(tagMatch[1]);
  const value = decodeXml(attributeMatch?.[1] ?? "");

  return value || undefined;
}

function decodeXml(value: string): string {
  return value
    .replace(/^<!\[CDATA\[/, "")
    .replace(/\]\]>$/, "")
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    )
    .replace(/&#(\d+);/g, (_, code: string) =>
      String.fromCodePoint(Number.parseInt(code, 10)),
    )
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function cleanSummary(value: string): string {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function removeSourceSuffix(title: string, sourceName: string): string {
  const suffix = ` - ${sourceName}`;

  if (title.endsWith(suffix)) {
    return title.slice(0, -suffix.length).trim();
  }

  return title;
}

function normalizeDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString();
  }

  return date.toISOString();
}

function inferTags(text: string): string[] {
  const tags = new Set<string>(["AI"]);

  if (/生成AI|generative AI|LLM|ChatGPT|大規模言語モデル/i.test(text)) {
    tags.add("生成AI");
  }

  if (/規制|著作権|governance|copyright|risk|safety|安全/i.test(text)) {
    tags.add("社会・規制");
  }

  if (/半導体|GPU|NVIDIA|data center|データセンター/i.test(text)) {
    tags.add("インフラ");
  }

  if (/研究|model|モデル|学習|training|inference|推論/i.test(text)) {
    tags.add("技術");
  }

  return [...tags].slice(0, 4);
}

function dedupeArticles(articles: AiArticle[]): AiArticle[] {
  const seen = new Set<string>();

  return articles.filter((article) => {
    const key = `${article.title}:${article.originalUrl}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function pickArticleForDate(
  articles: AiArticle[],
  dateKey: string,
  pickOffset: number,
): Pick<
  DailyAiArticle,
  "article" | "articleNumber" | "articleCount" | "nextPickOffset"
> {
  const safeOffset = normalizePickOffset(pickOffset);
  const index = (getDayNumber(dateKey) + safeOffset) % articles.length;

  return {
    article: articles[index],
    articleNumber: index + 1,
    articleCount: articles.length,
    nextPickOffset: (safeOffset + 1) % articles.length,
  };
}

function normalizePickOffset(pickOffset: number): number {
  if (!Number.isFinite(pickOffset) || pickOffset < 0) {
    return 0;
  }

  return Math.trunc(pickOffset);
}

function getTokyoDateKey(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TOKYO_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  return `${year}-${month}-${day}`;
}

function getDayNumber(dateKey: string): number {
  const [year, month, day] = dateKey.split("-").map(Number);

  return Math.floor(Date.UTC(year, month - 1, day) / ONE_DAY_MS);
}

function hashText(text: string): string {
  let hash = 0;

  for (const char of text) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }

  return hash.toString(16);
}
