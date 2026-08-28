import Link from 'next/link';

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: 'Building Secure Local LLM Infrastructure with Ollama',
      excerpt:
        'A comprehensive guide on setting up a fully offline, secure AI environment using Ollama and Open WebUI for sensitive data processing.',
      date: 'March 15, 2025',
      href: '/blog/secure-local-llm',
      tags: ['AI', 'Security', 'Ollama', 'Local LLM'],
    },
    {
      id: 2,
      title: 'Orchestrating RAG Pipelines with n8n and VectorDB',
      excerpt:
        'Learn how to automate retrieval-augmented generation workflows using n8n visual programming and PostgreSQL pgvector.',
      date: 'April 10, 2025',
      href: '/blog/rag-pipelines-n8n',
      tags: ['RAG', 'n8n', 'VectorDB', 'Automation'],
    },
    {
      id: 3,
      title: 'MLOps: Implementing Drift Detection in Production',
      excerpt:
        'Strategies for monitoring model performance and implementing automated retraining triggers using DVC and PostgreSQL.',
      date: 'May 05, 2025',
      href: '/blog/mlops-drift-detection',
      tags: ['MLOps', 'DVC', 'Data Science', 'Production AI'],
    },
    {
      id: 4,
      title: 'Optimizing Personnel Assignments with Mixed-Integer Programming',
      excerpt:
        'Case study on solving large-scale resource allocation problems using Python and PySCIPOpt.',
      date: 'June 20, 2025',
      href: '/blog/mip-optimization',
      tags: ['Optimization', 'Python', 'Operations Research'],
    },
  ];

  return (
    <div className='container mx-auto px-4 pt-32 pb-16'>
      <h1 className='mb-8 text-center text-4xl font-bold'>Technical Blog</h1>
      <p className='text-muted-foreground mx-auto mb-12 max-w-2xl text-center text-lg'>
        Insights and tutorials on Secure AI, MLOps, and Enterprise Software Architecture.
      </p>

      <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {posts.map(post => (
          <article
            key={post.id}
            className='bg-card border-border flex flex-col overflow-hidden rounded-lg border p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl'
          >
            <div className='text-muted-foreground mb-4 flex items-center gap-2 text-sm'>
              <time dateTime={post.date}>{post.date}</time>
              <span>•</span>
              <span className='text-primary font-medium'>{post.tags[0]}</span>
            </div>

            <h2 className='hover:text-primary mb-3 text-2xl font-bold transition-colors'>
              <Link href={post.href}>{post.title}</Link>
            </h2>

            <p className='text-muted-foreground mb-6 line-clamp-3 flex-grow'>{post.excerpt}</p>

            <div className='mt-auto flex items-center justify-between'>
              <div className='flex flex-wrap gap-2'>
                {post.tags.slice(1).map(tag => (
                  <span
                    key={tag}
                    className='bg-secondary text-secondary-foreground rounded-full px-2 py-1 text-xs'
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <Link
                href={post.href}
                className='text-primary ml-4 font-medium whitespace-nowrap hover:underline'
              >
                Read More →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
