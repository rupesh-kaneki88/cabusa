export interface Player {
  name: string;
  gender: "Men's" | "Women's";
  image: string;
  slug: string;
  bio: string;
}

export const players: Player[] = [
  {
    name: "John Doe",
    gender: "Men's",
    image: "/player1.jpg",
    slug: "john-doe",
    bio: "John Doe is a right-handed batsman and a right-arm medium-fast bowler. He is known for his aggressive batting style and his ability to swing the ball both ways."
  },
  {
    name: "Jane Smith",
    gender: "Women's",
    image: "/player2.jpg",
    slug: "jane-smith",
    bio: "Jane Smith is a left-handed batsman and a slow left-arm orthodox bowler. She is known for her elegant batting style and her ability to spin the ball sharply."
  },
  {
    name: "Peter Jones",
    gender: "Men's",
    image: "/player3.jpg",
    slug: "peter-jones",
    bio: "Peter Jones is a right-handed batsman and a wicket-keeper. He is known for his safe hands behind the stumps and his ability to score quick runs down the order."
  },
  {
    name: "Mary Williams",
    gender: "Women's",
    image: "/player4.jpg",
    slug: "mary-williams",
    bio: "Mary Williams is a right-handed batsman and a right-arm off-break bowler. She is known for her ability to score big hundreds and her deceptive off-spin bowling."
  },
  {
    name: "David Brown",
    gender: "Men's",
    image: "/player5.jpg",
    slug: "david-brown",
    bio: "David Brown is a left-handed batsman and a left-arm fast-medium bowler. He is known for his express pace and his ability to swing the new ball."
  },
  {
    name: "Susan Davis",
    gender: "Women's",
    image: "/player6.jpg",
    slug: "susan-davis",
    bio: "Susan Davis is a right-handed batsman and a right-arm medium-fast bowler. She is known for her powerful hitting and her ability to bowl accurate yorkers."
  }
];
