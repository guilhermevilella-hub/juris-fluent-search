import { Link } from "react-router-dom";
import { Shield, Users, FileText, Mail, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-brand">
                <span className="text-white font-bold text-lg">i</span>
              </div>
              <span className="font-bold text-xl text-primary">Jus</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Jurisprudência em segundos. Pesquise de graça, copie com 1 assinatura.
            </p>
            <div className="flex items-start space-x-2 p-3 bg-background rounded-lg border border-border">
              <Shield className="w-4 h-4 text-success mt-0.5" />
              <div>
                <p className="text-xs font-medium text-foreground">Dados oficiais</p>
                <p className="text-xs text-muted-foreground">
                  Fontes oficiais integráveis
                </p>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-medium text-foreground mb-4">Produto</h3>
            <div className="space-y-2">
              <Link 
                to="/planos" 
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Planos e Preços
              </Link>
              <Link 
                to="/como-funciona" 
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Como Funciona
              </Link>
              <Link 
                to="/busca" 
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Pesquisar Jurisprudências
              </Link>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-medium text-foreground mb-4">Legal</h3>
            <div className="space-y-2">
              <Link 
                to="/legal/termos" 
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Termos de Uso
              </Link>
              <Link 
                to="/legal/privacidade" 
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Política de Privacidade
              </Link>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <FileText className="w-3 h-3" />
                <span>Uso acadêmico e profissional</span>
              </div>
            </div>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="font-medium text-foreground mb-4">Suporte</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>contato@ijus.com.br</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>Suporte técnico</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © 2024 iJus. Todos os direitos reservados.
          </p>
          <p className="text-xs text-muted-foreground mt-2 md:mt-0">
            *Uso razoável sujeito a política anti-abuso.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;