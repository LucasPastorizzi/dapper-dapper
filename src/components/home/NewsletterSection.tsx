import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { toast } from 'sonner';

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Simulate submission
    setIsSubmitted(true);
    toast.success('Inscrição realizada com sucesso!');
    setEmail('');
    
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="text-label text-muted-foreground mb-2">Newsletter</p>
          <h2 className="text-display-md mb-4">Receba Novidades</h2>
          <p className="text-muted-foreground mb-8">
            Inscreva-se para receber em primeira mão nossos lançamentos exclusivos, 
            promoções especiais e conteúdos sobre estilo masculino.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor e-mail"
              className="flex-1 px-6 py-4 bg-secondary border-0 rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
            <button
              type="submit"
              disabled={isSubmitted}
              className="btn-hero px-6 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitted ? (
                <>
                  <Check className="w-4 h-4" />
                  Inscrito
                </>
              ) : (
                <>
                  Inscrever
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-muted-foreground mt-4">
            Ao se inscrever, você concorda com nossa política de privacidade.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
