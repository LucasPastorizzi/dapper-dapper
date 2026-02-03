import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube } from 'lucide-react';

const footerLinks = {
  shop: [
    { label: 'Novidades', path: '/catalogo?filter=new' },
    { label: 'Mais Vendidos', path: '/catalogo?filter=bestseller' },
    { label: 'Camisas', path: '/catalogo?category=shirts' },
    { label: 'Calças', path: '/catalogo?category=pants' },
    { label: 'Jaquetas', path: '/catalogo?category=jackets' },
  ],
  company: [
    { label: 'Sobre Nós', path: '/sobre' },
    { label: 'Contato', path: '/contato' },
    { label: 'Política de Privacidade', path: '/privacidade' },
    { label: 'Termos de Uso', path: '/termos' },
  ],
  help: [
    { label: 'FAQ', path: '/faq' },
    { label: 'Envio e Entrega', path: '/envio' },
    { label: 'Trocas e Devoluções', path: '/trocas' },
    { label: 'Guia de Tamanhos', path: '/tamanhos' },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-semibold mb-4">
              MAISON<span className="text-gold"> NOIR</span>
            </h2>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-sm mb-6">
              Elegância atemporal para o homem moderno. Desde 2010, criando peças exclusivas 
              que combinam tradição artesanal com design contemporâneo.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-full hover:bg-gold hover:text-primary transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-full hover:bg-gold hover:text-primary transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-full hover:bg-gold hover:text-primary transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-label text-primary-foreground/50 mb-4">Comprar</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/80 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-label text-primary-foreground/50 mb-4">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/80 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="text-label text-primary-foreground/50 mb-4">Ajuda</h3>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/80 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/50">
            © 2024 Maison Noir. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-6 opacity-70" />
            <img src="https://img.icons8.com/color/48/mastercard-logo.png" alt="Mastercard" className="h-6 opacity-70" />
            <img src="https://img.icons8.com/color/48/amex.png" alt="Amex" className="h-6 opacity-70" />
            <img src="https://img.icons8.com/ios-filled/50/pix.png" alt="Pix" className="h-6 opacity-70 invert" />
          </div>
        </div>
      </div>
    </footer>
  );
};
