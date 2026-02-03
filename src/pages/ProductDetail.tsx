import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, Heart, ArrowLeft, Truck, RefreshCw, Shield } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { getProductById } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

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

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = getProductById(id || '');

  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display mb-4">Produto não encontrado</h1>
          <Link to="/catalogo" className="btn-hero">
            Voltar ao Catálogo
          </Link>
        </div>
      </div>
    );
  }

  const currentVariant = product.variants[selectedVariant];
  const selectedSizeStock = currentVariant.sizes.find((s) => s.size === selectedSize)?.stock || 0;
  const imageSrc = imageMap[product.images[0]] || product.images[0];

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Por favor, selecione um tamanho');
      return;
    }

    addToCart(product, currentVariant.color, selectedSize, quantity);
    toast.success('Produto adicionado ao carrinho!');
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast.error('Por favor, selecione um tamanho');
      return;
    }

    addToCart(product, currentVariant.color, selectedSize, quantity);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20 md:pt-24">
        {/* Breadcrumb */}
        <div className="container py-6">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link to="/catalogo" className="hover:text-foreground transition-colors">Catálogo</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>

        {/* Product */}
        <div className="container pb-16">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="aspect-[3/4] bg-secondary rounded-sm overflow-hidden">
                <img
                  src={imageSrc}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              {/* Badges */}
              <div className="flex gap-2 mb-4">
                {product.newArrival && (
                  <span className="px-3 py-1 bg-foreground text-background text-xs uppercase tracking-widest">
                    Novo
                  </span>
                )}
                {product.bestSeller && (
                  <span className="px-3 py-1 bg-gold text-foreground text-xs uppercase tracking-widest">
                    Mais Vendido
                  </span>
                )}
              </div>

              <h1 className="text-display-md mb-4">{product.name}</h1>
              
              <p className="text-2xl font-semibold mb-6">
                {formatPrice(product.price)}
                <span className="text-sm text-muted-foreground font-normal ml-2">
                  ou 10x de {formatPrice(product.price / 10)}
                </span>
              </p>

              <p className="text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Color Selection */}
              {product.variants.length > 1 && (
                <div className="mb-6">
                  <p className="text-label text-muted-foreground mb-3">
                    Cor: <span className="text-foreground">{currentVariant.color}</span>
                  </p>
                  <div className="flex gap-3">
                    {product.variants.map((variant, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedVariant(index);
                          setSelectedSize(null);
                        }}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          selectedVariant === index
                            ? 'border-foreground scale-110'
                            : 'border-border hover:border-muted-foreground'
                        }`}
                        style={{ backgroundColor: variant.colorCode }}
                        title={variant.color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-label text-muted-foreground">
                    Tamanho: {selectedSize && <span className="text-foreground">{selectedSize}</span>}
                  </p>
                  <button className="text-xs text-muted-foreground underline hover:text-foreground">
                    Guia de Tamanhos
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentVariant.sizes.map((sizeOption) => (
                    <button
                      key={sizeOption.size}
                      onClick={() => setSelectedSize(sizeOption.size)}
                      disabled={sizeOption.stock === 0}
                      className={`min-w-[60px] px-4 py-3 border text-sm font-medium transition-all ${
                        selectedSize === sizeOption.size
                          ? 'border-foreground bg-foreground text-background'
                          : sizeOption.stock === 0
                          ? 'border-border text-muted-foreground/50 cursor-not-allowed line-through'
                          : 'border-border hover:border-foreground'
                      }`}
                    >
                      {sizeOption.size}
                    </button>
                  ))}
                </div>
                {selectedSize && (
                  <p className="text-xs text-muted-foreground mt-2">
                    {selectedSizeStock > 5
                      ? 'Em estoque'
                      : selectedSizeStock > 0
                      ? `Apenas ${selectedSizeStock} em estoque`
                      : 'Esgotado'}
                  </p>
                )}
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <p className="text-label text-muted-foreground mb-3">Quantidade</p>
                <div className="flex items-center border border-border rounded-sm w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-secondary transition-colors"
                    aria-label="Diminuir quantidade"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(selectedSizeStock || 10, quantity + 1))}
                    className="p-3 hover:bg-secondary transition-colors"
                    aria-label="Aumentar quantidade"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button onClick={handleAddToCart} className="btn-hero flex-1">
                  <ShoppingBag className="w-5 h-5" />
                  Adicionar ao Carrinho
                </Button>
                <Button onClick={handleBuyNow} className="btn-gold flex-1">
                  Comprar Agora
                </Button>
                <button
                  className="p-4 border border-border hover:border-foreground hover:text-accent transition-all"
                  aria-label="Adicionar aos favoritos"
                >
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              {/* Features */}
              <div className="border-t border-border pt-8 space-y-4">
                <div className="flex items-center gap-4">
                  <Truck className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Frete Grátis</p>
                    <p className="text-xs text-muted-foreground">Para compras acima de R$ 500</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <RefreshCw className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Troca Facilitada</p>
                    <p className="text-xs text-muted-foreground">Até 30 dias após a compra</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Shield className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Compra Segura</p>
                    <p className="text-xs text-muted-foreground">Pagamento criptografado</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
      <WhatsAppButton />
    </div>
  );
};

export default ProductDetail;
