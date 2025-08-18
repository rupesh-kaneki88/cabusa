export interface Match {
  matchNumber: number;
  team1: {
    name: string;
    logo: string;
  };
  team2: {
    name: string;
    logo: string;
  };
  result: string;
  scorecardUrl: string;
}

export interface MatchDay {
  date: string;
  format: string;
  matches: Match[];
}

export interface Tournament {
  name: string;
  slug: string;
  matchDays: MatchDay[];
}

export const tournaments: Tournament[] = [
  {
    name: "Men's Under 19 National Championships",
    slug: "mens-u19-national-championships",
    matchDays: [
      {
        date: "Monday April 5th 2021",
        format: "50 Over Matches",
        matches: [
          {
            matchNumber: 1,
            team1: {
              name: "Midwest Zone",
              logo: "/midwest-zone.png",
            },
            team2: {
              name: "South West Zone",
              logo: "/south-west-zone.png",
            },
            result: "South West Zone Won by 228 runs(s)",
            scorecardUrl: "#",
          },
          {
            matchNumber: 2,
            team1: {
              name: "Mid-Atlantic Zone",
              logo: "/mid-atlantic-zone.png",
            },
            team2: {
              name: "Colts",
              logo: "/colts.png",
            },
            result: "Mid-Atlantic Zone won by 4 wkt(s)",
            scorecardUrl: "#",
          },
        ],
      },
      {
        date: "Tuesday April 6th 2021",
        format: "50 Over Matches",
        matches: [
          {
            matchNumber: 3,
            team1: {
              name: "West Zone Blues",
              logo: "/west-zone-blue.png",
            },
            team2: {
              name: "South Zone",
              logo: "/south-zone.png",
            },
            result: "South Zone Won by 6 wkt(s)",
            scorecardUrl: "#",
          },
        ],
      },
    ],
  }
];
