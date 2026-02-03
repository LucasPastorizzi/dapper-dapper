import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
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

export const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const totalPrice = getTotalPrice();
  const shippingEstimate = totalPrice > 500 ? 0 : 29.90;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-foreground/50 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-background z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-display text-xl font-semibold">Seu Carrinho</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-secondary rounded-sm transition-colors"
                aria-label="Fechar carrinho"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                  <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
                  <p className="text-lg font-medium text-muted-foreground mb-2">
                    Seu carrinho está vazio
                  </p>
                  <p className="text-sm text-muted-foreground/70 mb-6">
                    Explore nossa coleção e encontre peças exclusivas
                  </p>
                  <Button
                    onClick={() => setIsCartOpen(false)}
                    variant="outline"
                    asChild
                  >
                    <Link to="/catalogo">Ver Catálogo</Link>
                  </Button>
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {items.map((item) => (
                    <li key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="p-6">
                      <div className="flex gap-4">
                        <div className="w-24 h-32 bg-secondary rounded-sm overflow-hidden flex-shrink-0">
                          <img
                            src={imageMap[item.product.images[0]] || item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm line-clamp-2 mb-1">
                            {item.product.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mb-2">
                            {item.selectedColor} · Tam. {item.selectedSize}
                          </p>
                          <p className="font-semibold text-sm">
                            {formatPrice(item.product.price)}
                          </p>

                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center border border-border rounded-sm">
                              <button
                                onClick={() => updateQuantity(
                                  item.product.id,
                                  item.selectedColor,
                                  item.selectedSize,
                                  item.quantity - 1
                                )}
                                className="p-2 hover:bg-secondary transition-colors"
                                aria-label="Diminuir quantidade"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-4 text-sm font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(
                                  item.product.id,
                                  item.selectedColor,
                                  item.selectedSize,
                                  item.quantity + 1
                                )}
                                className="p-2 hover:bg-secondary transition-colors"
                                aria-label="Aumentar quantidade"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(
                                item.product.id,
                                item.selectedColor,
                                item.selectedSize
                              )}
                              className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                              aria-label="Remover item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-6 space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Frete estimado</span>
                    <span className={shippingEstimate === 0 ? 'text-green-600' : ''}>
                      {shippingEstimate === 0 ? 'Grátis' : formatPrice(shippingEstimate)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-semibold pt-2 border-t border-border">
                    <span>Total</span>
                    <span>{formatPrice(totalPrice + shippingEstimate)}</span>
                  </div>
                </div>

                <Button className="w-full btn-hero" asChild>
                  <Link to="/checkout" onClick={() => setIsCartOpen(false)}>
                    Finalizar Compra
                  </Link>
                </Button>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Continuar Comprando
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
