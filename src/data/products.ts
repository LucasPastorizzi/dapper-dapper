// Mock product data for the luxury men's fashion store
export interface ProductVariant {
  color: string;
  colorCode: string;
  sizes: {
    size: string;
    stock: number;
  }[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  variants: ProductVariant[];
  featured?: boolean;
  newArrival?: boolean;
  bestSeller?: boolean;
}

export const categories = [
  { id: 'shirts', name: 'Camisas', icon: '👔' },
  { id: 'tshirts', name: 'Camisetas', icon: '👕' },
  { id: 'pants', name: 'Calças', icon: '👖' },
  { id: 'jackets', name: 'Jaquetas', icon: '🧥' },
  { id: 'accessories', name: 'Acessórios', icon: '⌚' },
  { id: 'sweaters', name: 'Suéteres', icon: '🧶' },
];

export const products: Product[] = [
  {
    id: 'classic-white-shirt',
    name: 'Camisa Clássica Branca',
    description: 'Camisa social de algodão premium 100% egípcio com acabamento impecável. Corte slim fit que proporciona elegância e conforto. Perfeita para ocasiões formais e eventos importantes.',
    price: 890,
    category: 'shirts',
    images: ['/products/shirt-white.jpg'],
    variants: [
      {
        color: 'Branco',
        colorCode: '#FFFFFF',
        sizes: [
          { size: 'P', stock: 5 },
          { size: 'M', stock: 8 },
          { size: 'G', stock: 6 },
          { size: 'GG', stock: 3 },
        ],
      },
    ],
    featured: true,
    bestSeller: true,
  },
  {
    id: 'premium-leather-jacket',
    name: 'Jaqueta de Couro Premium',
    description: 'Jaqueta de couro legítimo italiano com forro de seda. Design atemporal com detalhes em metal fosco. Uma peça de investimento que combina sofisticação e atitude.',
    price: 4890,
    category: 'jackets',
    images: ['/products/jacket-black.jpg'],
    variants: [
      {
        color: 'Preto',
        colorCode: '#1A1A1A',
        sizes: [
          { size: 'P', stock: 2 },
          { size: 'M', stock: 4 },
          { size: 'G', stock: 3 },
          { size: 'GG', stock: 2 },
        ],
      },
    ],
    featured: true,
    newArrival: true,
  },
  {
    id: 'tailored-navy-pants',
    name: 'Calça Alfaiataria Azul',
    description: 'Calça de alfaiataria em lã tropical com corte moderno. Cintura média com pregas sutis que garantem caimento perfeito. Versatilidade para o dia a dia executivo.',
    price: 1290,
    category: 'pants',
    images: ['/products/pants-navy.jpg'],
    variants: [
      {
        color: 'Azul Marinho',
        colorCode: '#1E3A5F',
        sizes: [
          { size: '38', stock: 4 },
          { size: '40', stock: 7 },
          { size: '42', stock: 5 },
          { size: '44', stock: 3 },
          { size: '46', stock: 2 },
        ],
      },
    ],
    bestSeller: true,
  },
  {
    id: 'luxury-polo-black',
    name: 'Polo Pima Premium',
    description: 'Polo em algodão Pima peruano de fibra longa. Toque sedoso e durabilidade excepcional. Detalhes em ribana contrastante e bordado discreto.',
    price: 590,
    category: 'tshirts',
    images: ['/products/polo-black.jpg'],
    variants: [
      {
        color: 'Preto',
        colorCode: '#0A0A0A',
        sizes: [
          { size: 'P', stock: 10 },
          { size: 'M', stock: 12 },
          { size: 'G', stock: 8 },
          { size: 'GG', stock: 5 },
        ],
      },
    ],
    newArrival: true,
    bestSeller: true,
  },
  {
    id: 'leather-accessories-set',
    name: 'Kit Couro Italiano',
    description: 'Conjunto exclusivo com cinto e carteira em couro italiano legítimo. Acabamento artesanal com costuras à mão. Apresentação em caixa premium para presente.',
    price: 1890,
    category: 'accessories',
    images: ['/products/accessories.jpg'],
    variants: [
      {
        color: 'Marrom Conhaque',
        colorCode: '#8B4513',
        sizes: [
          { size: 'Único', stock: 15 },
        ],
      },
    ],
    featured: true,
  },
  {
    id: 'cashmere-turtleneck',
    name: 'Suéter Cashmere',
    description: 'Suéter gola alta em cashmere mongol 100% puro. Maciez incomparável com design minimalista. A peça essencial para os dias frios com muito estilo.',
    price: 2490,
    category: 'sweaters',
    images: ['/products/sweater-gray.jpg'],
    variants: [
      {
        color: 'Cinza Chumbo',
        colorCode: '#4A4A4A',
        sizes: [
          { size: 'P', stock: 3 },
          { size: 'M', stock: 5 },
          { size: 'G', stock: 4 },
          { size: 'GG', stock: 2 },
        ],
      },
    ],
    newArrival: true,
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((p) => p.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter((p) => p.featured);
};

export const getNewArrivals = (): Product[] => {
  return products.filter((p) => p.newArrival);
};

export const getBestSellers = (): Product[] => {
  return products.filter((p) => p.bestSeller);
};
