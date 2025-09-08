import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GamificationProvider } from "@/contexts/GamificationContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import DocumentDetail from "./pages/DocumentDetail";
import Pricing from "./pages/Pricing";
import Dashboard from "./pages/Dashboard";
import HowItWorks from "./pages/HowItWorks";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import PesquisaContexto from "./pages/PesquisaContexto";
import PesquisaPeticao from "./pages/PesquisaPeticao";
import PesquisaSentenca from "./pages/PesquisaSentenca";
import PesquisaRaioX from "./pages/PesquisaRaioX";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GamificationProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/busca" element={<SearchResults />} />
              <Route path="/documento/:id" element={<DocumentDetail />} />
              <Route path="/planos" element={<Pricing />} />
              <Route path="/conta" element={<Dashboard />} />
              <Route path="/como-funciona" element={<HowItWorks />} />
              <Route path="/pesquisa/contexto" element={<PesquisaContexto />} />
              <Route path="/pesquisa/peticao" element={<PesquisaPeticao />} />
              <Route path="/pesquisa/sentenca" element={<PesquisaSentenca />} />
              <Route path="/pesquisa/raio-x" element={<PesquisaRaioX />} />
              <Route path="/legal/termos" element={<Terms />} />
              <Route path="/legal/privacidade" element={<Privacy />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
        </BrowserRouter>
      </TooltipProvider>
    </GamificationProvider>
  </QueryClientProvider>
);

export default App;
