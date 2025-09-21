import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Settings, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { setApiKey, hasApiKeys } from '@/services/searchService';

const ApiKeySettings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [escavadorKey, setEscavadorKey] = useState('');
  const [openaiKey, setOpenaiKey] = useState('');
  const [showEscavadorKey, setShowEscavadorKey] = useState(false);
  const [showOpenaiKey, setShowOpenaiKey] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    if (!escavadorKey.trim()) {
      toast({
        title: "Erro",
        description: "A chave da API do Escavador é obrigatória.",
        variant: "destructive",
      });
      return;
    }

    setApiKey('ESCAVADOR_API_KEY', escavadorKey.trim());
    if (openaiKey.trim()) {
      setApiKey('OPENAI_API_KEY', openaiKey.trim());
    }

    toast({
      title: "Configurações salvas",
      description: "As chaves da API foram salvas com sucesso.",
    });

    setIsOpen(false);
    setEscavadorKey('');
    setOpenaiKey('');
  };

  const hasKeys = hasApiKeys();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={hasKeys ? "outline" : "default"} size="sm">
          <Settings className="w-4 h-4 mr-2" />
          {hasKeys ? "Configurar APIs" : "Configurar APIs (Obrigatório)"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Configurar Chaves das APIs</DialogTitle>
          <DialogDescription>
            Configure suas chaves das APIs para habilitar a pesquisa e geração de sinônimos.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base text-primary">API do Escavador</CardTitle>
              <CardDescription>
                Obrigatória para realizar pesquisas de jurisprudência.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Label htmlFor="escavador-key">Chave da API</Label>
              <div className="relative">
                <Input
                  id="escavador-key"
                  type={showEscavadorKey ? "text" : "password"}
                  placeholder="Insira sua chave da API do Escavador"
                  value={escavadorKey}
                  onChange={(e) => setEscavadorKey(e.target.value)}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowEscavadorKey(!showEscavadorKey)}
                >
                  {showEscavadorKey ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base text-primary">API do OpenAI</CardTitle>
              <CardDescription>
                Opcional. Usado para gerar sinônimos e melhorar os resultados da pesquisa.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Label htmlFor="openai-key">Chave da API</Label>
              <div className="relative">
                <Input
                  id="openai-key"
                  type={showOpenaiKey ? "text" : "password"}
                  placeholder="Insira sua chave da API do OpenAI (opcional)"
                  value={openaiKey}
                  onChange={(e) => setOpenaiKey(e.target.value)}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowOpenaiKey(!showOpenaiKey)}
                >
                  {showOpenaiKey ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              Salvar Configurações
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeySettings;