import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, X, ChevronDown } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { ProductCard } from '@/components/product/ProductCard';
import { products, categories } from '@/data/products';

const priceRanges = [
  { label: 'Até R$ 500', min: 0, max: 500 },
  { label: 'R$ 500 - R$ 1.000', min: 500, max: 1000 },
  { label: 'R$ 1.000 - R$ 2.000', min: 1000, max: 2000 },
  { label: 'Acima de R$ 2.000', min: 2000, max: Infinity },
];

const Catalog = () => {
  const [searchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get('category')
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>('featured');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by price range
    if (selectedPriceRange !== null) {
      const range = priceRanges[selectedPriceRange];
      result = result.filter((p) => p.price >= range.min && p.price <= range.max);
    }

    // Filter by search param
    const filter = searchParams.get('filter');
    if (filter === 'new') {
      result = result.filter((p) => p.newArrival);
    } else if (filter === 'bestseller') {
      result = result.filter((p) => p.bestSeller);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Featured first
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [selectedCategory, selectedPriceRange, sortBy, searchParams]);

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedPriceRange(null);
    setSortBy('featured');
  };

  const hasActiveFilters = selectedCategory || selectedPriceRange !== null;

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20 md:pt-24">
        {/* Breadcrumb */}
        <div className="container py-6">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Catálogo</span>
          </nav>
        </div>

        {/* Header */}
        <div className="container mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-display-md mb-2">Catálogo</h1>
            <p className="text-muted-foreground">
              {filteredProducts.length} produtos encontrados
            </p>
          </motion.div>
        </div>

        {/* Toolbar */}
        <div className="container mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border">
            {/* Filter Toggle */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest hover:text-accent transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filtros
              {hasActiveFilters && (
                <span className="w-5 h-5 bg-accent text-accent-foreground rounded-full text-xs flex items-center justify-center">
                  !
                </span>
              )}
            </button>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-transparent text-sm font-medium uppercase tracking-widest pr-8 cursor-pointer focus:outline-none"
              >
                <option value="featured">Destaques</option>
                <option value="name">Nome A-Z</option>
                <option value="price-low">Menor Preço</option>
                <option value="price-high">Maior Preço</option>
              </select>
              <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container pb-16">
          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <motion.aside
              initial={false}
              animate={{
                width: isFilterOpen ? 280 : 0,
                opacity: isFilterOpen ? 1 : 0,
              }}
              className={`flex-shrink-0 overflow-hidden ${isFilterOpen ? '' : 'hidden md:block'}`}
            >
              <div className="w-[280px] pr-8 space-y-8">
                {/* Clear Filters */}
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Limpar filtros
                  </button>
                )}

                {/* Categories */}
                <div>
                  <h3 className="text-label text-muted-foreground mb-4">Categorias</h3>
                  <ul className="space-y-3">
                    {categories.map((cat) => (
                      <li key={cat.id}>
                        <button
                          onClick={() => setSelectedCategory(
                            selectedCategory === cat.id ? null : cat.id
                          )}
                          className={`text-sm transition-colors ${
                            selectedCategory === cat.id
                              ? 'text-foreground font-medium'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {cat.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="text-label text-muted-foreground mb-4">Faixa de Preço</h3>
                  <ul className="space-y-3">
                    {priceRanges.map((range, index) => (
                      <li key={index}>
                        <button
                          onClick={() => setSelectedPriceRange(
                            selectedPriceRange === index ? null : index
                          )}
                          className={`text-sm transition-colors ${
                            selectedPriceRange === index
                              ? 'text-foreground font-medium'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {range.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.aside>

            {/* Products Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-lg text-muted-foreground mb-4">
                    Nenhum produto encontrado
                  </p>
                  <button
                    onClick={clearFilters}
                    className="text-sm font-medium uppercase tracking-widest text-accent hover:underline"
                  >
                    Limpar filtros
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
      <WhatsAppButton />
    </div>
  );
};

export default Catalog;
