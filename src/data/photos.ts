
export interface Photo {
  id: string;
  slug: string;
  image: string;
  title: string;
  date: string;
  category: string;
  description: string;
  images: { url: string; title: string; description: string }[];
}

export const photos: Photo[] = [
  {
    id: "1",
    slug: "national-tournament-2024",
    image: "/cricket_2.png",
    title: "National Tournament 2024",
    date: "2024-10-26",
    category: "Men",
    description: "A thrilling match during the National Tournament 2024.",
    images: [
      { url: "/cricket_2.png", title: "Men's National Tournament 2024", description: "A player hitting a powerful shot." },
      { url: "/cricket_3.png", title: "Men's National Tournament 2024", description: "The winning team celebrating their victory." },
      { url: "/cricket_4.png", title: "Men's National Tournament 2024", description: "A close-up of the action." },
      { url: "/cricket_5.png", title: "Men's National Tournament 2024", description: "The crowd cheering for their favorite team." },
    ],
  },
  {
    id: "2",
    slug: "regional-tournament-2024",
    image: "/cricket_3.png",
    title: "Regional Tournament 2024",
    date: "2024-08-15",
    category: "Women",
    description: "Highlights from the Regional Tournament 2024.",
    images: [
        { url: "/cricket_2.png", title: "Women's Regional Tournament 2024", description: "A player taking a catch." },
        { url: "/cricket_3.png", title: "Women's Regional Tournament 2024", description: "A tense moment in the match." },
        { url: "/cricket_4.png", title: "Women's Regional Tournament 2024", description: "The team discussing strategy." },
        { url: "/cricket_5.png", title: "Women's Regional Tournament 2024", description: "A player receiving an award." },
    ],
  },
  {
    id: "3",
    slug: "state-championship-2024",
    image: "/cricket_4.png",
    title: "State Championship 2024",
    date: "2024-06-20",
    category: "Youth",
    description: "Young talent at the State Championship 2024.",
    images: [
        { url: "/cricket_2.png", title: "Youth's State Championship 2024", description: "A young player showing great potential." },
        { url: "/cricket_3.png", title: "Youth's State Championship 2024", description: "A moment of sportsmanship." },
        { url: "/cricket_4.png", title: "Youth's State Championship 2024", description: "The future stars of cricket." },
        { url: "/cricket_5.png", title: "Youth's State Championship 2024", description: "A team huddle before the match." },
    ],
  },
  {
    id: "4",
    slug: "friendly-match-2024",
    image: "/cricket_5.png",
    title: "Friendly Match 2024",
    date: "2024-04-10",
    category: "All",
    description: "A friendly match to promote the sport.",
    images: [
        { url: "/cricket_2.png", title: "All's Friendly Match 2024", description: "Players from different teams coming together." },
        { url: "/cricket_3.png", title: "All's Friendly Match 2024", description: "A light-hearted moment during the game." },
        { url: "/cricket_4.png", title: "All's Friendly Match 2024", description: "Promoting inclusivity in cricket." },
        { url: "/cricket_5.png", title: "All's Friendly Match 2024", description: "A group photo of all the participants." },
    ],
  },
];
