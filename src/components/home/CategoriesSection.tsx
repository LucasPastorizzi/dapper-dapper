import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories } from '@/data/products';
import { ArrowUpRight } from 'lucide-react';

// Category images from our product collection
import shirtWhite from '@/assets/products/shirt-white.jpg';
import poloBlack from '@/assets/products/polo-black.jpg';
import pantsNavy from '@/assets/products/pants-navy.jpg';
import jacketBlack from '@/assets/products/jacket-black.jpg';
import accessories from '@/assets/products/accessories.jpg';
import sweaterGray from '@/assets/products/sweater-gray.jpg';

const categoryImages: Record<string, string> = {
  shirts: shirtWhite,
  tshirts: poloBlack,
  pants: pantsNavy,
  jackets: jacketBlack,
  accessories: accessories,
  sweaters: sweaterGray,
};

export const CategoriesSection = () => {
  return (
    <section className="section-padding bg-cream">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-label text-muted-foreground mb-2">Explore</p>
          <h2 className="text-display-md">Categorias</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/catalogo?category=${category.id}`}
                className="group block relative aspect-[3/4] overflow-hidden rounded-sm luxury-card"
              >
                <img
                  src={categoryImages[category.id]}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg text-primary-foreground font-medium">
                      {category.name}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-gold opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
