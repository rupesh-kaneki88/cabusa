
import { articles } from "@/data/articles";
import Link from "next/link";

export default function ArticlesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Articles</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link href={article.link} key={article.id}>
            <div className="block border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
                <p className="text-gray-700">{article.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
