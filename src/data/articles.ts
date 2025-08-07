
export interface Article {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  date: string;
}

export const articles: Article[] = [
  {
    id: 1,
    title: "The Rise of Blind Cricket in the US",
    description: "An in-depth look at the growing popularity of blind cricket across the United States, from local clubs to the national team.",
    image: "/cricket_2.png",
    link: "/articles/rise-of-blind-cricket",
    date: "2025-08-01",
  },
  {
    id: 2,
    title: "Interview with a Star Player",
    description: "We sit down with one of the top blind cricket players to discuss their journey, challenges, and the future of the sport.",
    image: "/cricket_3.png",
    link: "/articles/star-player-interview",
    date: "2025-07-25",
  },
  {
    id: 3,
    title: "A Guide to the Rules of Blind Cricket",
    description: "New to blind cricket? This guide will walk you through the essential rules and regulations of this unique and exciting game.",
    image: "/cricket_4.png",
    link: "/articles/rules-of-blind-cricket",
    date: "2025-07-18",
  },
  {
    id: 4,
    title: "Upcoming Tournaments to Watch",
    description: "A preview of the most anticipated blind cricket tournaments of the year, featuring top teams from around the world.",
    image: "/cricket_5.png",
    link: "/articles/upcoming-tournaments",
    date: "2025-07-12",
  },
  {
    id: 5,
    title: "The Technology Behind the Ball",
    description: "Explore the innovative technology used in blind cricket balls to help players track them by sound.",
    image: "/cricket_6.png",
    link: "/articles/technology-behind-ball",
    date: "2025-07-05",
  },
];
