import { fallbackInsights } from "@/data/insights";

export type FeedItem = {
  title: string;
  url: string;
  category?: string;
  date?: string;
  description?: string;
  isNew?: boolean;
};

const NEW_WINDOW_DAYS = 14;

function isRecent(dateStr?: string) {
  if (!dateStr) return false;
  const time = new Date(dateStr).getTime();
  if (Number.isNaN(time)) return false;
  return Date.now() - time <= NEW_WINDOW_DAYS * 24 * 60 * 60 * 1000;
}

function decodeEntities(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function readTag(block: string, tag: string) {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? decodeEntities(match[1]) : "";
}

export async function getNaverFeed(limit = 8): Promise<FeedItem[]> {
  const feedUrl = process.env.NAVER_BLOG_RSS_URL || "https://rss.blog.naver.com/alsemffp234.xml";

  try {
    const response = await fetch(feedUrl, {
      next: { revalidate: 3600 },
      headers: { "User-Agent": "ezstory-homepage/1.0" },
    });
    if (!response.ok) throw new Error(`RSS ${response.status}`);
    const xml = await response.text();
    const blocks = xml.match(/<item[\s\S]*?<\/item>/gi) || [];
    const items = blocks.slice(0, limit).map((block) => ({
      title: readTag(block, "title"),
      url: readTag(block, "link"),
      date: readTag(block, "pubDate"),
      description: readTag(block, "description").slice(0, 180),
      category: readTag(block, "category") || "비즈스킬",
      isNew: isRecent(readTag(block, "pubDate")),
    })).filter((item) => item.title && item.url);

    if (items.length) return items;
  } catch (error) {
    console.warn("Naver RSS fallback:", error);
  }

  return fallbackInsights.slice(0, limit);
}
