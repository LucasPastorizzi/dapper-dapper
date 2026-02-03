import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '@/data/products';

// Import product images
import shirtWhite from '@/assets/products/shirt-white.jpg';
import jacketBlack from '@/assets/products/jacket-black.jpg';
import pantsNavy from '@/assets/products/pants-navy.jpg';
import poloBlack from '@/assets/products/polo-black.jpg';
import accessories from '@/assets/products/accessories.jpg';
import sweaterGray from '@/assets/products/sweater-gray.jpg';

const imageMap: Record<string, string> = {
  '/products/shirt-white.jpg': shirtWhite,
  '/products/jacket-black.jpg': jacketBlack,
  '/products/pants-navy.jpg': pantsNavy,
  '/products/polo-black.jpg': poloBlack,
  '/products/accessories.jpg': accessories,
  '/products/sweater-gray.jpg': sweaterGray,
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
};

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const imageSrc = imageMap[product.images[0]] || product.images[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/produto/${product.id}`} className="block">
        <div className="luxury-card">
          {/* Image */}
          <div className="relative aspect-[3/4] img-zoom bg-secondary">
            <img
              src={imageSrc}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.newArrival && (
                <span className="px-3 py-1 bg-foreground text-background text-xs uppercase tracking-widest font-medium">
                  Novo
                </span>
              )}
              {product.bestSeller && (
                <span className="px-3 py-1 bg-gold text-foreground text-xs uppercase tracking-widest font-medium">
                  Destaque
                </span>
              )}
            </div>

            {/* Quick View Overlay */}
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
              <span className="bg-background px-6 py-2 text-xs uppercase tracking-widest font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                Ver Produto
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="p-4">
            <h3 className="font-medium text-sm mb-1 group-hover:text-accent transition-colors line-clamp-1">
              {product.name}
            </h3>
            <p className="text-muted-foreground text-sm">
              {formatPrice(product.price)}
            </p>

            {/* Color swatches */}
            <div className="flex gap-2 mt-3">
              {product.variants.map((variant, i) => (
                <span
                  key={i}
                  className="w-4 h-4 rounded-full border border-border"
                  style={{ backgroundColor: variant.colorCode }}
                  title={variant.color}
                />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};
