
export interface Video {
  id: string;
  slug: string;
  thumbnail: string;
  title: string;
  date: string;
  category: string;
  description: string;
  videos: { url: string; title: string; description: string }[];
}

export const videos: Video[] = [
  {
    id: "1",
    slug: "national-tournament-2024",
    thumbnail: "/cricket_2.png",
    title: "National Tournament 2024",
    date: "2024-10-26",
    category: "Men",
    description: "A thrilling match during the National Tournament 2024.",
    videos: [
      { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", title: "Men's National Tournament 2024", description: "A player hitting a powerful shot." },
      { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", title: "Men's National Tournament 2024", description: "The winning team celebrating their victory." },
      { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", title: "Men's National Tournament 2024", description: "A close-up of the action." },
      { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", title: "Men's National Tournament 2024", description: "The crowd cheering for their favorite team." },
    ],
  },
  {
    id: "2",
    slug: "regional-tournament-2024",
    thumbnail: "/cricket_3.png",
    title: "Regional Tournament 2024",
    date: "2024-08-15",
    category: "Women",
    description: "Highlights from the Regional Tournament 2024.",
    videos: [
        { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", title: "Women's Regional Tournament 2024", description: "A player taking a catch." },
        { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", title: "Women's Regional Tournament 2024", description: "A tense moment in the match." },
        { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", title: "Women's Regional Tournament 2024", description: "The team discussing strategy." },
        { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", title: "Women's Regional Tournament 2024", description: "A player receiving an award." },
    ],
  },
  {
    id: "3",
    slug: "state-championship-2024",
    thumbnail: "/cricket_4.png",
    title: "State Championship 2024",
    date: "2024-06-20",
    category: "Youth",
    description: "Young talent at the State Championship 2024.",
    videos: [
        { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", title: "Youth's State Championship 2024", description: "A young player showing great potential." },
        { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", title: "Youth's State Championship 2024", description: "A moment of sportsmanship." },
        { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", title: "Youth's State Championship 2024", description: "The future stars of cricket." },
        { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", title: "Youth's State Championship 2024", description: "A team huddle before the match." },
    ],
  },
  {
    id: "4",
    slug: "friendly-match-2024",
    thumbnail: "/cricket_5.png",
    title: "Friendly Match 2024",
    date: "2024-04-10",
    category: "All",
    description: "A friendly match to promote the sport.",
    videos: [
        { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", title: "All's Friendly Match 2024", description: "Players from different teams coming together." },
        { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", title: "All's Friendly Match 2024", description: "A light-hearted moment during the game." },
        { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", title: "All's Friendly Match 2024", description: "Promoting inclusivity in cricket." },
        { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", title: "All's Friendly Match 2024", description: "A group photo of all the participants." },
    ],
  },
];
