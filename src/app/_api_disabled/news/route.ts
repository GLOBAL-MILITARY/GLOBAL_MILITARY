import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

export async function GET() {
    try {
        const parser = new Parser();
        // Google News RSS feed for Military & Defense topic
        const feed = await parser.parseURL('https://news.google.com/rss/search?q=military+defense+technology&hl=en-US&gl=US&ceid=US:en');

        const newsItems = feed.items.slice(0, 6).map((item, index) => {
            // Extract image from content if available, or use a placeholder based on keywords
            let imageUrl = "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=250&fit=crop";

            // Simple keyword matching for better placeholders if real image extraction is complex from RSS
            const title = item.title?.toLowerCase() || "";
            if (title.includes("navy") || title.includes("sea") || title.includes("ship")) {
                imageUrl = "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=250&fit=crop";
            } else if (title.includes("air") || title.includes("jet") || title.includes("plane")) {
                imageUrl = "https://images.unsplash.com/photo-1583468982228-19f19164aee2?w=400&h=250&fit=crop";
            } else if (title.includes("tank") || title.includes("army") || title.includes("ground")) {
                imageUrl = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop";
            } else if (title.includes("missile") || title.includes("nuclear")) {
                imageUrl = "https://images.unsplash.com/photo-1626265774643-f1943311a86b?w=400&h=250&fit=crop";
            }

            return {
                id: index,
                title: item.title,
                summary: item.contentSnippet || item.content || "No summary available.",
                category: "Global Defense", // RSS doesn't always provide clean categories
                time: item.pubDate ? new Date(item.pubDate).toLocaleDateString() : "Recent",
                link: item.link,
                image: imageUrl
            };
        });

        return NextResponse.json(newsItems);
    } catch (error) {
        console.error('Error fetching news:', error);
        return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
    }
}
