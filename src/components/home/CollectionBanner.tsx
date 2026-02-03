import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import collectionBanner from '@/assets/collection-banner.jpg';

export const CollectionBanner = () => {
  return (
    <section className="section-padding bg-primary">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <p className="text-label text-gold mb-4">Exclusivo</p>
            <h2 className="text-display-lg text-primary-foreground mb-6">
              Coleção
              <br />
              <span className="text-gold-gradient">Signature</span>
            </h2>
            <p className="text-primary-foreground/70 leading-relaxed mb-8 max-w-md">
              Peças únicas desenvolvidas em edição limitada. Cada item é numerado 
              e acompanha certificado de autenticidade, garantindo exclusividade 
              e distinção para o homem que aprecia o extraordinário.
            </p>
            <Link to="/catalogo?collection=signature" className="btn-gold group">
              Conhecer Coleção
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-sm">
              <img
                src={collectionBanner}
                alt="Coleção Signature"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
