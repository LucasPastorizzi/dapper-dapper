import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import collectionBanner from '@/assets/collection-banner.jpg';
import heroBanner from '@/assets/hero-banner.jpg';

const values = [
  {
    title: 'Excelência Artesanal',
    description: 'Cada peça é confeccionada por mestres alfaiates com décadas de experiência, utilizando técnicas tradicionais aperfeiçoadas ao longo de gerações.',
  },
  {
    title: 'Materiais Premium',
    description: 'Selecionamos os melhores tecidos do mundo: algodão egípcio, lã italiana, couro argentino e cashmere mongol de primeira qualidade.',
  },
  {
    title: 'Sustentabilidade',
    description: 'Compromisso com práticas éticas de produção, materiais sustentáveis e embalagens eco-friendly que minimizam nosso impacto ambiental.',
  },
  {
    title: 'Atemporalidade',
    description: 'Criamos peças que transcendem modismos passageiros, oferecendo um guarda-roupa que atravessa décadas com elegância intocada.',
  },
];

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20 md:pt-24">
        {/* Hero */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroBanner}
              alt="Maison Noir"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/70" />
          </div>
          
          <div className="container relative z-10 text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-label text-gold mb-4"
            >
              Nossa História
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-display-xl text-primary-foreground"
            >
              Sobre a<br />
              <span className="text-gold-gradient">Maison Noir</span>
            </motion.h1>
          </div>
        </section>

        {/* Story */}
        <section className="section-padding">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <p className="text-label text-muted-foreground mb-4">Desde 2010</p>
                <h2 className="text-display-md mb-6">
                  Uma Tradição de
                  <br />
                  <span className="text-gold">Elegância</span>
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    A Maison Noir nasceu da paixão por vestir o homem moderno com peças 
                    que transcendem o tempo. Fundada em São Paulo por um grupo de mestres 
                    alfaiates e designers visionários, nossa maison rapidamente se estabeleceu 
                    como referência em moda masculina de luxo no Brasil.
                  </p>
                  <p>
                    Nossa filosofia é simples: cada peça deve ser uma obra de arte vestível. 
                    Combinamos técnicas centenárias de alfaiataria com inovações contemporâneas, 
                    criando um equilíbrio perfeito entre tradição e modernidade.
                  </p>
                  <p>
                    Hoje, vestimos executivos, celebridades e homens que apreciam o valor da 
                    verdadeira qualidade. Cada criação Maison Noir carrega consigo a promessa 
                    de excelência e a garantia de exclusividade.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="aspect-[4/5] overflow-hidden rounded-sm">
                  <img
                    src={collectionBanner}
                    alt="Atelier Maison Noir"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding bg-cream">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-label text-muted-foreground mb-2">Nossos Pilares</p>
              <h2 className="text-display-md">Valores</h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-px bg-gold mx-auto mb-6" />
                  <h3 className="font-display text-lg font-medium mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-primary">
          <div className="container text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-display-md text-primary-foreground mb-6">
                Descubra Nossa Coleção
              </h2>
              <p className="text-primary-foreground/70 max-w-lg mx-auto mb-8">
                Explore peças exclusivas que definem o que há de melhor em moda masculina contemporânea.
              </p>
              <Link to="/catalogo" className="btn-gold group">
                Ver Catálogo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <CartDrawer />
      <WhatsAppButton />
    </div>
  );
};

export default About;
