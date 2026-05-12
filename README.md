# AI Daily Brief

AI関連の記事を毎日1本ピックアップし、日本語の概要で読めるNext.jsアプリです。

## 記事取得について

- 現在は日本語のGoogle News RSSから「生成AI / 人工知能 / AI」の候補を取得します。
- 「世界のAIトレンド」では日本語版Google News RSSから、OpenAI / Anthropic / NVIDIA / Google DeepMindなど世界AI関連キーワードの記事を取得します。
- RSSが取得できない場合でも画面が空にならないよう、`src/lib/news.ts` の学習用ローカルデータを表示します。
- 記事本文の全文取得や海外原文記事の自動翻訳は未接続です。必要な場合は、利用するニュースAPI、翻訳/要約API、保存ポリシーを決める必要があります。

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
