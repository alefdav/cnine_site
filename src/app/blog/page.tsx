'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Componente de cabeçalho de página
const PageHeader = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Blog
          </h1>
          <p className="text-xl text-blue-100">
            Dicas, estratégias e tendências de marketing digital para impulsionar seu negócio.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// Componente de Filtro de Categorias
const CategoryFilter = () => {
  const categories = [
    "Todos", "Tráfego Pago", "Design", "Automação", "Marketing Digital", "Tendências"
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
      {categories.map((category, index) => (
        <button
          key={index}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            index === 0 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

// Componente de Blog Posts
const BlogPosts = () => {
  const posts = [
    {
      id: 1,
      title: "5 Estratégias Avançadas de Facebook Ads para Aumentar suas Conversões",
      excerpt: "Descubra técnicas de segmentação e otimização que podem multiplicar o resultado das suas campanhas de Facebook Ads.",
      image: "/blog-post1.jpg",
      date: "15 de Março de 2023",
      category: "Tráfego Pago",
      author: {
        name: "Mariana Costa",
        image: "/team2.jpg"
      }
    },
    {
      id: 2,
      title: "Como Criar Landing Pages que Convertem: Guia Completo",
      excerpt: "Aprenda os princípios fundamentais de design e copywriting para criar landing pages irresistíveis que aumentam suas taxas de conversão.",
      image: "/blog-post2.jpg",
      date: "28 de Fevereiro de 2023",
      category: "Design",
      author: {
        name: "Rafael Mendes",
        image: "/team3.jpg"
      }
    },
    {
      id: 3,
      title: "Automação de Marketing: Como Construir Fluxos que Vendem",
      excerpt: "Um guia passo a passo para criar sequências de email marketing e automações que nutrem leads e os transformam em clientes.",
      image: "/blog-post3.jpg",
      date: "10 de Fevereiro de 2023",
      category: "Automação",
      author: {
        name: "Juliana Santos",
        image: "/team4.jpg"
      }
    },
    {
      id: 4,
      title: "Google Ads para E-commerce: Estratégias que Funcionam em 2023",
      excerpt: "Conheça as técnicas mais eficientes para aumentar o ROI das suas campanhas de Google Ads para lojas virtuais.",
      image: "/blog-post4.jpg",
      date: "05 de Janeiro de 2023",
      category: "Tráfego Pago",
      author: {
        name: "Alexandre Silva",
        image: "/team1.jpg"
      }
    },
    {
      id: 5,
      title: "O Impacto da Inteligência Artificial no Marketing Digital",
      excerpt: "Como a IA está revolucionando o marketing digital e como você pode usar essa tecnologia a seu favor hoje mesmo.",
      image: "/blog-post5.jpg",
      date: "20 de Dezembro de 2022",
      category: "Tendências",
      author: {
        name: "Mariana Costa",
        image: "/team2.jpg"
      }
    },
    {
      id: 6,
      title: "A Psicologia das Cores no Marketing: Como Escolher as Cores Certas",
      excerpt: "Um guia sobre como as cores afetam a percepção da sua marca e influenciam as decisões de compra dos seus clientes.",
      image: "/blog-post6.jpg",
      date: "05 de Dezembro de 2022",
      category: "Design",
      author: {
        name: "Rafael Mendes",
        image: "/team3.jpg"
      }
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="relative h-48 sm:h-56">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 right-4">
              <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center mb-3">
              <div className="relative h-8 w-8">
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                <p className="text-xs text-gray-500">{post.date}</p>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              <Link href={`/blog/${post.id}`} className="hover:text-blue-600 transition-colors">
                {post.title}
              </Link>
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-3">
              {post.excerpt}
            </p>
            <Link 
              href={`/blog/${post.id}`}
              className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center"
            >
              Ler mais
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Componente de Newsletter
const NewsletterSection = () => {
  return (
    <section className="py-16 bg-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-lg"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Inscreva-se em nossa Newsletter
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Receba dicas exclusivas, estratégias e tendências de marketing digital diretamente na sua caixa de entrada.
            </p>
          </div>

          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Inscrever-se
            </button>
          </form>
          <p className="text-xs text-gray-500 text-center mt-4">
            Ao se inscrever, você concorda com nossa Política de Privacidade. Prometemos não enviar spam.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// Componente de Paginação
const Pagination = () => {
  return (
    <div className="flex justify-center mt-12">
      <nav className="inline-flex rounded-md shadow">
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <span className="sr-only">Anterior</span>
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </a>
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-600 text-sm font-medium text-white hover:bg-blue-700"
        >
          1
        </a>
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          2
        </a>
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          3
        </a>
        <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
          ...
        </span>
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          8
        </a>
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <span className="sr-only">Próximo</span>
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </a>
      </nav>
    </div>
  );
};

const BlogPage = () => {
  return (
    <>
      <PageHeader />
      
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryFilter />
          <BlogPosts />
          <Pagination />
        </div>
      </section>
      
      <NewsletterSection />
    </>
  );
};

export default BlogPage; 