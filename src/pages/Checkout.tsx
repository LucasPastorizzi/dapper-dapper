import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Truck, Check } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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

const shippingOptions = [
  { id: 'standard', name: 'Padrão', price: 29.90, days: '5-7 dias úteis' },
  { id: 'express', name: 'Expresso', price: 49.90, days: '2-3 dias úteis' },
  { id: 'same-day', name: 'Same Day', price: 79.90, days: 'Hoje' },
];

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
  });

  const subtotal = getTotalPrice();
  const shippingCost = subtotal > 500 ? 0 : shippingOptions.find((s) => s.id === selectedShipping)?.price || 29.90;
  const total = subtotal + shippingCost;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate order submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.success('Pedido realizado com sucesso!');
    clearCart();
    navigate('/');
    setIsSubmitting(false);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-20 md:pt-24">
          <div className="container section-padding text-center">
            <h1 className="text-display-md mb-4">Carrinho Vazio</h1>
            <p className="text-muted-foreground mb-8">
              Adicione produtos ao carrinho para continuar com a compra.
            </p>
            <Link to="/catalogo" className="btn-hero">
              Ver Catálogo
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <main className="pt-20 md:pt-24">
        <div className="container section-padding">
          {/* Back button */}
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Continuar Comprando
          </Link>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                {/* Progress */}
                <div className="flex items-center gap-4 mb-8">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`flex items-center gap-2 ${step >= s ? 'text-foreground' : 'text-muted-foreground'}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          step >= s ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                        }`}
                      >
                        {step > s ? <Check className="w-4 h-4" /> : s}
                      </div>
                      <span className="text-sm hidden sm:block">
                        {s === 1 ? 'Dados' : s === 2 ? 'Entrega' : 'Pagamento'}
                      </span>
                      {s < 3 && <div className="w-8 h-px bg-border hidden sm:block" />}
                    </div>
                  ))}
                </div>

                {/* Step 1: Personal Data */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: step === 1 ? 1 : 0, display: step === 1 ? 'block' : 'none' }}
                  className="bg-background p-6 md:p-8 rounded-sm mb-6"
                >
                  <h2 className="text-display-md mb-6">Dados Pessoais</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="text-label text-muted-foreground block mb-2">Nome Completo</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="text-label text-muted-foreground block mb-2">E-mail</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="text-label text-muted-foreground block mb-2">Telefone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-label text-muted-foreground block mb-2">CPF</label>
                      <input
                        type="text"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    className="btn-hero mt-6"
                  >
                    Continuar
                  </Button>
                </motion.div>

                {/* Step 2: Shipping */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: step === 2 ? 1 : 0, display: step === 2 ? 'block' : 'none' }}
                  className="bg-background p-6 md:p-8 rounded-sm mb-6"
                >
                  <h2 className="text-display-md mb-6">Endereço de Entrega</h2>
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="text-label text-muted-foreground block mb-2">CEP</label>
                      <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="text-label text-muted-foreground block mb-2">Estado</label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      >
                        <option value="">Selecione</option>
                        <option value="SP">São Paulo</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="MG">Minas Gerais</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-label text-muted-foreground block mb-2">Cidade</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="text-label text-muted-foreground block mb-2">Bairro</label>
                      <input
                        type="text"
                        name="neighborhood"
                        value={formData.neighborhood}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-label text-muted-foreground block mb-2">Endereço</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="text-label text-muted-foreground block mb-2">Número</label>
                      <input
                        type="text"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="text-label text-muted-foreground block mb-2">Complemento</label>
                      <input
                        type="text"
                        name="complement"
                        value={formData.complement}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>

                  {/* Shipping Options */}
                  <h3 className="text-lg font-medium mb-4">Opções de Frete</h3>
                  <div className="space-y-3 mb-6">
                    {shippingOptions.map((option) => (
                      <label
                        key={option.id}
                        className={`flex items-center justify-between p-4 border rounded-sm cursor-pointer transition-all ${
                          selectedShipping === option.id
                            ? 'border-primary bg-secondary/50'
                            : 'border-border hover:border-muted-foreground'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shipping"
                            value={option.id}
                            checked={selectedShipping === option.id}
                            onChange={(e) => setSelectedShipping(e.target.value)}
                            className="w-4 h-4"
                          />
                          <Truck className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{option.name}</p>
                            <p className="text-xs text-muted-foreground">{option.days}</p>
                          </div>
                        </div>
                        <span className={`font-medium ${subtotal > 500 && option.id === 'standard' ? 'line-through text-muted-foreground' : ''}`}>
                          {formatPrice(option.price)}
                        </span>
                      </label>
                    ))}
                    {subtotal > 500 && (
                      <p className="text-sm text-green-600">✓ Frete grátis para compras acima de R$ 500</p>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                    >
                      Voltar
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setStep(3)}
                      className="btn-hero"
                    >
                      Continuar
                    </Button>
                  </div>
                </motion.div>

                {/* Step 3: Payment */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: step === 3 ? 1 : 0, display: step === 3 ? 'block' : 'none' }}
                  className="bg-background p-6 md:p-8 rounded-sm mb-6"
                >
                  <h2 className="text-display-md mb-6">Pagamento</h2>
                  <div className="flex items-center gap-2 mb-6">
                    <CreditCard className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Cartão de Crédito</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="text-label text-muted-foreground block mb-2">Número do Cartão</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                        placeholder="0000 0000 0000 0000"
                        className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-label text-muted-foreground block mb-2">Nome no Cartão</label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="text-label text-muted-foreground block mb-2">Validade</label>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        required
                        placeholder="MM/AA"
                        className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="text-label text-muted-foreground block mb-2">CVV</label>
                      <input
                        type="text"
                        name="cardCvv"
                        value={formData.cardCvv}
                        onChange={handleChange}
                        required
                        placeholder="000"
                        className="w-full px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(2)}
                    >
                      Voltar
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-gold flex-1"
                    >
                      {isSubmitting ? 'Processando...' : `Finalizar Compra • ${formatPrice(total)}`}
                    </Button>
                  </div>
                </motion.div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-background p-6 md:p-8 rounded-sm sticky top-24">
                <h2 className="text-lg font-display font-medium mb-6">Resumo do Pedido</h2>

                <ul className="divide-y divide-border mb-6">
                  {items.map((item) => (
                    <li key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="py-4 flex gap-4">
                      <div className="w-16 h-20 bg-secondary rounded-sm overflow-hidden flex-shrink-0">
                        <img
                          src={imageMap[item.product.images[0]] || item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium line-clamp-1">{item.product.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {item.selectedColor} · {item.selectedSize} · Qtd: {item.quantity}
                        </p>
                        <p className="text-sm font-medium mt-1">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="space-y-2 text-sm border-t border-border pt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Frete</span>
                    <span className={shippingCost === 0 ? 'text-green-600' : ''}>
                      {shippingCost === 0 ? 'Grátis' : formatPrice(shippingCost)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-semibold pt-2 border-t border-border">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Checkout;
