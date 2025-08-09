export interface Story {
  id: number
  title: string
  excerpt: string
  image: string
  category: string
  author: string
  publishDate: string
  readTime: string
  featured?: boolean
}

export const stories: Story[] = [
  {
    id: 1,
    title: "The Rise of Cricket in America: A New Era Begins",
    excerpt: "Discover how cricket is gaining unprecedented popularity across the United States, from grassroots initiatives to professional leagues.",
    image: "/cricket-story1.webp",
    category: "Cricket Development",
    author: "Sarah Johnson",
    publishDate: "2024-01-15",
    readTime: "5 min read",
    featured: true
  },
  {
    id: 2,
    title: "Meet the Stars: Top Cricket Players Making Waves",
    excerpt: "Profiles of the most promising cricket talents emerging from American soil and their journey to success.",
    image: "/cricket-story2.webp",
    category: "Player Profiles",
    author: "Michael Chen",
    publishDate: "2024-01-12",
    readTime: "7 min read",
    featured: true
  },
  {
    id: 3,
    title: "Cricket Infrastructure: Building the Future",
    excerpt: "An in-depth look at the development of cricket facilities and infrastructure across major American cities.",
    image: "/cricket-story3.webp",
    category: "Infrastructure",
    author: "David Rodriguez",
    publishDate: "2024-01-10",
    readTime: "6 min read",
    featured: true
  },
  {
    id: 4,
    title: "Youth Cricket Programs: Nurturing Tomorrow's Champions",
    excerpt: "How schools and communities are introducing cricket to young athletes and building the next generation of players.",
    image: "/cricket_4.jpg",
    category: "Youth Development",
    author: "Emily Watson",
    publishDate: "2024-01-08",
    readTime: "4 min read",
    featured: true
  },
  {
    id: 5,
    title: "Cricket vs Baseball: The Great American Sports Debate",
    excerpt: "A fascinating comparison between cricket and baseball, exploring their similarities, differences, and cultural impact.",
    image: "/cricket_5.jpg",
    category: "Sports Culture",
    author: "James Wilson",
    publishDate: "2024-01-05",
    readTime: "8 min read",
    featured: true
  },
  {
    id: 6,
    title: "International Cricket: America's Growing Presence",
    excerpt: "How American cricket teams are making their mark on the international stage and what the future holds.",
    image: "/cricket_6.jpg",
    category: "International",
    author: "Lisa Thompson",
    publishDate: "2024-01-03",
    readTime: "6 min read",
    featured: true
  }
]

export const getFeaturedStories = (): Story[] => {
  return stories.filter(story => story.featured)
}

export const getTopStories = (limit: number = 3): Story[] => {
  return stories.slice(0, limit)
} 