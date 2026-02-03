import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { getBestSellers } from '@/data/products';

export const BestSellers = () => {
  const bestSellers = getBestSellers();

  return (
    <section className="section-padding bg-cream">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div>
            <p className="text-label text-muted-foreground mb-2">Tendências</p>
            <h2 className="text-display-md">Mais Vendidos</h2>
          </div>
          <Link
            to="/catalogo?filter=bestseller"
            className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest group"
          >
            Ver Todos
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {bestSellers.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
