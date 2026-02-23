import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Star, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Users,
  MessageSquare
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const IMAGES = [
  {
    url: 'https://i.imgur.com/Q6y33mm.png',
    title: 'Histórias Bíblicas Encantadoras',
    desc: 'Ilustrações fofas que prendem a atenção e ensinam valores eternos.'
  },
  {
    url: 'https://i.imgur.com/P8U7TLK.png',
    title: 'Aprendizado Divertido',
    desc: 'Transforme o momento da leitura em uma jornada de fé para os pequenos.'
  },
  {
    url: 'https://i.imgur.com/0Ujutvo.png',
    title: 'Conhecimento sobre Cristo',
    desc: 'Livros digitais práticos para ler em qualquer lugar, a qualquer hora.'
  }
];

const FEATURES = [
  {
    icon: <Zap className="w-6 h-6 text-pink-500" />,
    title: 'Acesso Imediato',
    desc: 'Receba seus livros digitais na hora e comece a ler hoje mesmo.'
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-pink-500" />,
    title: 'Conteúdo Seguro',
    desc: 'Histórias fiéis à bíblia com linguagem adaptada para crianças.'
  },
  {
    icon: <Users className="w-6 h-6 text-pink-500" />,
    title: 'Para Toda Família',
    desc: 'Momentos de conexão entre pais e filhos através da palavra.'
  }
];

const TESTIMONIALS = [
  {
    name: 'Carla Mendes',
    role: 'Mãe de 2 filhos',
    content: 'Meus filhos amaram as ilustrações! Agora eles pedem para ler as histórias da bíblia antes de dormir em vez de quererem o celular.'
  },
  {
    name: 'Ricardo Santos',
    role: 'Pai e Educador',
    content: 'Uma ferramenta maravilhosa para introduzir os valores cristãos de forma leve e divertida. O traço é realmente encantador.'
  }
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const productRef = useRef<HTMLDivElement>(null);

  const scrollToProduct = () => {
    productRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % IMAGES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);

  useEffect(() => {
    const slideTimer = setInterval(nextSlide, 5000);
    const countdownTimer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(slideTimer);
      clearInterval(countdownTimer);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
      {/* Sticky Timer */}
      <div className="sticky top-0 z-50 bg-red-600 text-white py-2 text-center font-bold text-sm md:text-base shadow-md">
        ⚠️ Oferta Expira em {formatTime(timeLeft)} Minutos
      </div>

      {/* Header */}
      <header className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-12 px-4 md:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-2xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
            Transforme o tempo de tela de seus filhos, por aprendizado e conhecimento sobre Cristo
          </h1>
          <div className="inline-block bg-emerald-500 text-white px-4 py-1 rounded-full font-bold text-xs md:text-sm mb-6 uppercase tracking-wider shadow-lg">
            Oferta Especial: 70% de Desconto Imediato
          </div>
          <p className="text-base md:text-xl text-white/90 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed">
            Nossos livros digitais trazem as histórias da bíblia com o traço fofo que encanta crianças e adultos. Economize mais de R$ 20 hoje.
          </p>
          <motion.button 
            onClick={scrollToProduct}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="bg-white text-pink-600 px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg shadow-xl hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
          >
            Garantir Meus Livros Agora <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </header>

      {/* Carousel Section */}
      <section className="py-12 md:py-20 px-4 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto relative group">
          <div className="relative aspect-square md:aspect-[21/9] overflow-hidden rounded-2xl shadow-2xl bg-neutral-200 border-4 border-pink-200">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <img
                  src={IMAGES[currentSlide].url}
                  alt={IMAGES[currentSlide].title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 md:p-12 text-white">
                  <h3 className="text-xl md:text-4xl font-bold mb-2">{IMAGES[currentSlide].title}</h3>
                  <p className="text-xs md:text-lg text-white/80 line-clamp-2 md:line-clamp-none">{IMAGES[currentSlide].desc}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/30 md:bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 md:p-3 rounded-full text-white transition-colors md:opacity-0 md:group-hover:opacity-100 z-10"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/30 md:bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 md:p-3 rounded-full text-white transition-colors md:opacity-0 md:group-hover:opacity-100 z-10"
          >
            <ChevronRight className="w-5 h-5 md:w-6 h-6" />
          </button>
          <div className="flex justify-center gap-2 mt-6">
            {IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all",
                  currentSlide === i ? "bg-pink-600 w-8" : "bg-neutral-300"
                )}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 px-4 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Por que escolher nosso método?</h2>
            <p className="text-sm md:text-base text-neutral-500 max-w-2xl mx-auto">
              Desenvolvemos uma estrutura completa para garantir que você tenha tudo o que precisa para ter sucesso.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100"
              >
                <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-4xl font-bold mb-6">O que os pais estão dizendo</h2>
              <p className="text-sm md:text-base text-neutral-600 mb-8">
                Mais de 5.000 famílias já transformaram o tempo de tela em momentos de fé. Veja alguns depoimentos reais.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 md:w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="font-bold ml-2 text-sm md:text-base">4.9/5 estrelas</span>
              </div>
              <p className="text-xs text-neutral-400">Baseado em avaliações de pais e educadores.</p>
            </div>
            
            <div className="flex-1 grid gap-6">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="bg-neutral-50 p-6 rounded-2xl border border-pink-100 flex flex-col gap-2 items-start shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-pink-500 text-white p-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                    <span className="font-bold text-pink-600">{t.name}</span>
                    <span className="text-neutral-300">•</span>
                    <span className="text-xs text-neutral-500 uppercase tracking-wider">{t.role}</span>
                  </div>
                  <p className="text-neutral-700 italic leading-relaxed">"{t.content}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section ref={productRef} className="py-12 md:py-20 px-4 bg-pink-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 order-2 md:order-1 w-full">
              <div className="relative">
                <div className="absolute -inset-4 bg-pink-200/50 rounded-[2.5rem] blur-2xl" />
                <img 
                  src="https://i.imgur.com/v8mFrx2.png" 
                  alt="Coleção de Livros Digitais" 
                  className="relative w-full max-w-xs md:max-w-md mx-auto rounded-[2rem] shadow-2xl border-4 md:border-8 border-white"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-4 -right-2 md:-bottom-6 md:-right-6 bg-white p-4 md:p-6 rounded-2xl shadow-xl border border-pink-100 scale-75 md:scale-100">
                  <p className="text-pink-600 font-bold text-lg md:text-2xl">Coleção Completa</p>
                  <p className="text-neutral-500 text-xs md:text-sm">12 Livros Digitais Ilustrados</p>
                </div>
              </div>
            </div>
            <div className="flex-1 order-1 md:order-2">
              <h2 className="text-2xl md:text-4xl font-bold mb-6 text-neutral-900 text-center md:text-left">O que você vai receber</h2>
              <ul className="space-y-3 md:space-y-4">
                {[
                  '12 Histórias Bíblicas com ilustrações exclusivas',
                  'Atividades para colorir em cada livro',
                  'Guia para pais sobre como contar as histórias',
                  'Acesso vitalício em qualquer dispositivo',
                  '7 Dias de Garantia Incondicional'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm md:text-base text-neutral-700">
                    <div className="bg-pink-500 rounded-full p-1 shrink-0">
                      <CheckCircle2 className="w-3 h-3 md:w-4 h-4 text-white" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 md:mt-10 p-6 bg-white rounded-2xl border border-pink-100 shadow-sm text-center">
                <p className="text-neutral-500 line-through text-base md:text-lg">De R$ 49,90</p>
                <p className="text-pink-600 font-bold text-3xl md:text-4xl mb-4">Por apenas R$ 10,00</p>
                <motion.a 
                  href="https://pay.kirvano.com/bd19b8ec-bfd8-436d-aa4a-955baaa6b569"
                  target="_blank"
                  rel="noopener noreferrer"
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="block w-full bg-pink-600 text-white py-3 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-pink-700 transition-colors shadow-lg"
                >
                  Aproveitar Desconto de 70%
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-4xl mx-auto bg-pink-600 rounded-[1.5rem] md:rounded-[2rem] p-8 md:p-20 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-5xl font-bold mb-6">Dê o primeiro passo hoje</h2>
            <p className="text-pink-100 text-base md:text-lg mb-8 md:mb-10 max-w-xl mx-auto">
              Aproveite o desconto de 70% e comece a construir o alicerce espiritual de seus filhos agora mesmo.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button 
                onClick={scrollToProduct}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-full sm:w-auto bg-white text-pink-600 px-8 md:px-10 py-3 md:py-4 rounded-full font-bold text-lg md:text-xl shadow-2xl hover:bg-pink-50 transition-colors"
              >
                Garantir Meus Livros
              </motion.button>
              <div className="flex items-center gap-2 text-pink-100 text-xs md:text-sm">
                <ShieldCheck className="w-5 h-5" /> Pagamento 100% Seguro
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-neutral-200 text-center text-neutral-500 text-sm">
        <div className="max-w-6xl mx-auto">
          <p className="mb-4">© 2026 Educação Cristã Infantil. Todos os direitos reservados.</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="hover:text-pink-600 transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-pink-600 transition-colors">Privacidade</a>
            <a href="#" className="hover:text-pink-600 transition-colors">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
