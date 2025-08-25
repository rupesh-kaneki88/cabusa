
export interface MediaRelease {
  id: string;
  slug: string;
  title: string;
  by: string;
  date: string;
  article: string;
  image: string;
  related_articles: { id: string; title: string; slug: string }[];
}

export const mediaReleases: MediaRelease[] = [
  {
    id: "1",
    slug: "blind-cricket-world-cup-2024-kick-off",
    title: "Blind Cricket World Cup 2024 Kicks Off with a Bang",
    by: "John Doe",
    date: "2024-10-26",
    image: "/cricket_2.png",
    article: `
      <p>The Blind Cricket World Cup 2024 commenced today with an electrifying opening ceremony and a thrilling first match between India and Pakistan. The tournament, held in New Delhi, promises a month of exciting cricket action.</p>
      <p>The opening ceremony was a spectacular event, showcasing the rich cultural heritage of India. It was attended by several dignitaries, including the Minister of Sports and the presidents of the participating cricket boards.</p>
      <p>The first match lived up to its hype, with both teams displaying exceptional skill and sportsmanship. India won the toss and chose to bat, setting a challenging target of 250 runs. Pakistan, in their chase, fought valiantly but fell short by 15 runs.</p>
    `,
    related_articles: [
      { id: "2", title: "CAB USA Announces National Team for Upcoming Tour", slug: "cab-usa-announces-national-team" },
      { id: "3", title: "New Training Program for Umpires and Scorers", slug: "new-training-program-for-umpires-and-scorers" },
      { id: "4", title: "Challengers Trophy 2024: A Resounding Success", slug: "challengers-trophy-2024-a-resounding-success" },
    ],
  },
  {
    id: "2",
    slug: "cab-usa-announces-national-team",
    title: "CAB USA Announces National Team for Upcoming Tour",
    by: "Jane Smith",
    date: "2024-09-15",
    image: "/cricket_3.png",
    article: `
      <p>The Cricket Association for the Blind in USA (CAB USA) has announced the national team for the upcoming tour of England. The team, led by captain John Miller, will play a series of five one-day internationals and three T20 matches.</p>
      <p>The selection committee had a tough time choosing the final squad, as there was a wealth of talent on display during the selection camp. The team is a mix of experienced players and promising youngsters, and is expected to perform well on the tour.</p>
    `,
    related_articles: [
      { id: "1", title: "Blind Cricket World Cup 2024 Kicks Off with a Bang", slug: "blind-cricket-world-cup-2024-kick-off" },
      { id: "3", title: "New Training Program for Umpires and Scorers", slug: "new-training-program-for-umpires-and-scorers" },
      { id: "4", title: "Challengers Trophy 2024: A Resounding Success", slug: "challengers-trophy-2024-a-resounding-success" },
    ],
  },
  {
    id: "3",
    slug: "new-training-program-for-umpires-and-scorers",
    title: "New Training Program for Umpires and Scorers",
    by: "Peter Jones",
    date: "2024-08-20",
    image: "/cricket_4.png",
    article: `
      <p>CAB USA is launching a new training program for umpires and scorers to improve the quality of officiating in blind cricket. The program will cover the rules of the game, as well as the specific techniques and challenges of officiating in blind cricket.</p>
      <p>The program is open to anyone interested in becoming an umpire or scorer, and will be conducted by experienced and certified instructors. The first batch of the program will commence next month.</p>
    `,
    related_articles: [
        { id: "1", title: "Blind Cricket World Cup 2024 Kicks Off with a Bang", slug: "blind-cricket-world-cup-2024-kick-off" },
        { id: "2", title: "CAB USA Announces National Team for Upcoming Tour", slug: "cab-usa-announces-national-team" },
        { id: "4", title: "Challengers Trophy 2024: A Resounding Success", slug: "challengers-trophy-2024-a-resounding-success" },
    ],
  },
  {
    id: "4",
    slug: "challengers-trophy-2024-a-resounding-success",
    title: "Challengers Trophy 2024: A Resounding Success",
    by: "Mary Williams",
    date: "2024-07-10",
    image: "/default.png",
    article: `
      <p>The Challengers Trophy 2024, a domestic T20 tournament for the visually impaired, concluded last week with a thrilling final between the New York Knights and the California Stars. The tournament was a resounding success, and unearthed several new and exciting players.</p>
      <p>The final was a nail-biter, with the Knights winning on the last ball of the match. The tournament was a great platform for players to showcase their talent, and will help in strengthening the pipeline of players for the national team.</p>
    `,
    related_articles: [
        { id: "1", title: "Blind Cricket World Cup 2024 Kicks Off with a Bang", slug: "blind-cricket-world-cup-2024-kick-off" },
        { id: "2", title: "CAB USA Announces National Team for Upcoming Tour", slug: "cab-usa-announces-national-team" },
        { id: "3", title: "New Training Program for Umpires and Scorers", slug: "new-training-program-for-umpires-and-scorers" },
    ],
  },
];
