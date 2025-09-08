import { Search, User, CreditCard } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/busca?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const isHomePage = location.pathname === '/';
  const isSearchPage = location.pathname === '/busca';

  return (
    <header className={`sticky top-0 z-50 transition-all duration-200 ${
      isScrolled ? 'bg-background/95 backdrop-blur-sm border-b border-border' : 'bg-background'
    }`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-brand">
            <span className="text-white font-bold text-lg">i</span>
          </div>
          <span className="font-bold text-xl text-primary group-hover:text-primary-hover transition-colors">
            Jus
          </span>
        </Link>

        {/* Global Search (only show if not on home page) */}
        {!isHomePage && (
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Busque por tema, tribunal, número..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full search-input"
              />
            </form>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          <Link 
            to="/planos" 
            className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Planos
          </Link>
          <Link 
            to="/como-funciona" 
            className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Como funciona
          </Link>
          
          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm"
              className="btn-outline px-4"
              onClick={() => navigate('/conta')}
            >
              <User className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Entrar</span>
            </Button>
            <Button 
              size="sm"
              className="btn-hero px-4"
              onClick={() => navigate('/planos')}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Assinar
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;