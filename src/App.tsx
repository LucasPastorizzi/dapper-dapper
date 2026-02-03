import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";

import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
       <HashRouter>
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/catalogo" element={<Catalog />} />
    <Route path="/produto/:id" element={<ProductDetail />} />
    <Route path="/sobre" element={<About />} />
    <Route path="/contato" element={<Contact />} />
    <Route path="/auth" element={<Auth />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</HashRouter>

      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
