"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Papa from "papaparse";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  BarChart3,
  Globe,
  Zap,
  Headphones,
  ArrowRight,
  Music,
  Layers,
  ShieldCheck,
  X,
  Search,
  CheckCircle2,
  Lock,
  Loader2,
  MessageCircle,
  Send,
  PenTool,
  Radio,
  Youtube,
  Instagram,
  Volume2,
  TrendingUp,
  Award,
  ExternalLink,
  Image as ImageIcon,
} from "lucide-react";

// ============================================================
// DADOS ESTÁTICOS DE FALLBACK (caso a planilha falhe)
// ============================================================
const FALLBACK_DATA = {
  catalogo: [
    {
      id: 1,
      title: "MINHA FLOR",
      artist: "L'A HIT Originals",
      bpm: 128,
      genre: "Piseiro Pop",
      mood: "Romântico",
      price: 499,
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      id: 2,
      title: "SOZINHA POR OPÇÃO",
      artist: "L'A HIT Originals",
      bpm: 140,
      genre: "Sertanejo Feminino",
      mood: "Superação",
      price: 499,
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
    {
      id: 3,
      title: "TROVÕES",
      artist: "L'A HIT Originals",
      bpm: 90,
      genre: "Sertanejo Romântico",
      mood: "Melancólico",
      price: 499,
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
    {
      id: 4,
      title: "BUQUÊ DE DORES",
      artist: "L'A HIT Originals",
      bpm: 79,
      genre: "Sertanejo",
      mood: "Romântico",
      price: 650,
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    },
    {
      id: 5,
      title: "CACHAÇA TERAPIA",
      artist: "L'A HIT Originals",
      bpm: 124,
      genre: "Sertanejo",
      mood: "Barzinho",
      price: 499,
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    },
    {
      id: 6,
      title: "MASSAGEM CARDÍACA",
      artist: "L'A HIT Originals",
      bpm: 72,
      genre: "Sertanejo Arrocha",
      mood: "Dramático",
      price: 499,
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    },
  ],
  servicos: [
    {
      id: "ghost",
      title: "Ghostwriting",
      desc: "Produção fantasma para artistas de Tier-1. Sigilo absoluto.",
      icon: "PenTool",
      cta: "Consultar",
      highlight: false,
      external: "",
    },
    {
      id: "sync",
      title: "Sync Licensing",
      desc: "Licenciamento para Cinema, TV e Games. A partir de R$ 850.",
      icon: "Globe",
      cta: "Ver Licenças",
      highlight: false,
      external: "",
    },
    {
      id: "brand",
      title: "Sonic Branding & Jingles",
      desc: "Identidade sonora proprietária para marcas e jingles publicitários.",
      icon: "Volume2",
      cta: "Consultar",
      highlight: false,
      external: "",
    },
    {
      id: "distro",
      title: "Distribuição Digital, Marketing & Editais",
      desc: "Distribuição em todas as plataformas, estratégias de marketing musical, análise de carreira e suporte para leis de incentivo.",
      icon: "TrendingUp",
      cta: "Conhecer Parceiro",
      highlight: true,
      external: "https://instagram.com/distribuidora",
    },
  ],
  cases: [
    {
      id: 1,
      title: "MINHA FLOR",
      artist: "L'A HIT Originals",
      image: "/cases/minha-flor.jpg",
      videoThumb: "/cases/minha-flor-thumb.jpg",
      link: "https://youtube.com/watch?v=...",
      plays: "1.2M",
      platform: "YouTube",
    },
    {
      id: 2,
      title: "SOZINHA POR OPÇÃO",
      artist: "L'A HIT Originals",
      image: "/cases/sozinha.jpg",
      videoThumb: "/cases/sozinha-thumb.jpg",
      link: "https://open.spotify.com/track/...",
      plays: "850K",
      platform: "Spotify",
    },
    {
      id: 3,
      title: "TROVÕES",
      artist: "L'A HIT Originals",
      image: "/cases/trovoes.jpg",
      videoThumb: "/cases/trovoes-thumb.jpg",
      link: "https://instagram.com/p/...",
      plays: "2.3M",
      platform: "Instagram Reels",
    },
    {
      id: 4,
      title: "CACHAÇA TERAPIA",
      artist: "L'A HIT Originals",
      image: "/cases/cachaca.jpg",
      videoThumb: "/cases/cachaca-thumb.jpg",
      link: "https://tiktok.com/@...",
      plays: "5.7M",
      platform: "TikTok",
    },
  ],
  links: {
    formularioCliente:
      "https://docs.google.com/forms/d/e/1FAIpQLSd6MVlpHp6EVZnmQVvG1pWD-_DvX0euNBjrdg4NI0bF0w3Ojg/viewform?usp=pp_url",
    formularioEncomenda:
      "https://docs.google.com/forms/d/e/1FAIpQLScVsotUHwhzOwZZ2XuTNtxNFMtErXSsfvFczi6GnQB8ZYs-Rg/viewform?usp=pp_url",
    formularioLicenciamento:
      "https://docs.google.com/forms/d/e/SEU_FORM_ID_LICENCIAMENTO/viewform",
    whatsapp: "https://wa.me/5532998078161",
    showreel: "https://www.youtube.com/watch?v=SEU_VIDEO_ID",
  },
  tiposLicenca: [
    {
      id: "liberacao_simples",
      icon: "Radio",
      title: "LIBERAÇÃO SIMPLES",
      subtitle: "Para Artistas",
      price: "R$ 500,00+",
      payment: "Por Música",
      deliverables: [
        "Liberação para Gravação e Lançamento",
        "Geração de ISRC",
        "Arquivo do playback WAV Masterizado",
      ],
      advantage:
        "Ideal para artistas que querem gravar e lançar a música sem exclusividade.",
    },
    {
      id: "exclusividade",
      icon: "ShieldCheck",
      title: "EXCLUSIVIDADE",
      subtitle: "Artista / Carreira",
      price: "R$ 2.500,00",
      payment: "Taxa de Reserva",
      deliverables: [
        "Retirada Imediata do Catálogo (Ninguém mais compra)",
        "Liberação para Gravação (ISRC)",
        "Guia de Voz + Playback",
      ],
      advantage:
        "Monopólio do Hit. A música é 'Sua'. Você entra como intérprete oficial no Spotify.",
    },
    {
      id: "sync",
      icon: "Globe",
      title: "LICENÇA SYNC",
      subtitle: "Audiovisual & Games",
      price: "R$ 850,00",
      payment: "Pagamento Único",
      deliverables: [
        "Arquivo WAV Masterizado (48kHz/24bit)",
        "Documento de Liberação (YouTube/Instagram Safe)",
        "Licença Vitalícia para 1 Projeto",
      ],
      advantage:
        "Zero Dor de Cabeça. Publique seu vídeo, filme ou game sem medo de 'Copyright Strike'.",
    },
    {
      id: "publicidade",
      icon: "Zap",
      title: "PUBLICIDADE",
      subtitle: "Digital & Branding",
      price: "R$ 1.800,00",
      payment: "Campanha",
      deliverables: [
        "WAV + Stems (Faixas separadas para edição)",
        "Contrato de Uso Comercial (Ads/Tráfego Pago)",
        "Nota Fiscal para PJ",
      ],
      advantage:
        "Blindagem Jurídica. Sua marca roda anúncios com segurança legal total.",
    },
    {
      id: "buyout",
      icon: "BarChart3",
      title: "BUYOUT",
      subtitle: "Venda de Ativo",
      price: "R$ 15.000,00+",
      payment: "Patrimônio",
      deliverables: [
        "Transferência Total de Titularidade",
        "Arquivos do Projeto Aberto",
        "Direitos de Royalties Futuros",
      ],
      advantage: "Construção de Patrimônio. Você vira o dono da 'Casa'.",
    },
  ],
};

// ============================================================
// CONFIGURAÇÃO DAS PLANILHAS (COM TIMESTAMP PARA QUEBRAR CACHE)
// ============================================================
const SHEETS = {
  catalogo:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vS7sqQrQ4CJDQ2b8QwjCBVHXXj1yQulLWQoeeP58hqqoA_kgPYDCMf2Q5hvkxcD7m3ISnxmFH_NTe8P/pub?gid=0&single=true&output=csv",
  servicos:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vS7sqQrQ4CJDQ2b8QwjCBVHXXj1yQulLWQoeeP58hqqoA_kgPYDCMf2Q5hvkxcD7m3ISnxmFH_NTe8P/pub?gid=5493861&single=true&output=csv",
  cases:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vS7sqQrQ4CJDQ2b8QwjCBVHXXj1yQulLWQoeeP58hqqoA_kgPYDCMf2Q5hvkxcD7m3ISnxmFH_NTe8P/pub?gid=1357706581&single=true&output=csv",
  links:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vS7sqQrQ4CJDQ2b8QwjCBVHXXj1yQulLWQoeeP58hqqoA_kgPYDCMf2Q5hvkxcD7m3ISnxmFH_NTe8P/pub?gid=918950045&single=true&output=csv",
  tiposLicenca:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vS7sqQrQ4CJDQ2b8QwjCBVHXXj1yQulLWQoeeP58hqqoA_kgPYDCMf2Q5hvkxcD7m3ISnxmFH_NTe8P/pub?gid=319719436&single=true&output=csv",
};

// Função para adicionar timestamp e quebrar cache
function addTimestamp(url: string) {
  return `${url}&_t=${Date.now()}`;
}

// ============================================================
// MAPEAMENTO DE ÍCONES
// ============================================================
const iconMap: Record<string, React.ElementType> = {
  PenTool,
  Globe,
  Volume2,
  TrendingUp,
  Radio,
  ShieldCheck,
  Zap,
  BarChart3,
};

function getIconComponent(iconName: string): React.ElementType {
  return iconMap[iconName] || PenTool;
}

// ============================================================
// FUNÇÃO PARA BUSCAR E PARSEAR CSV
// ============================================================
async function fetchSheet<T>(url: string): Promise<T[]> {
  try {
    const response = await fetch(addTimestamp(url), { 
      cache: "no-store", 
      mode: "cors",
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    });
    if (!response.ok) {
      console.warn(`HTTP error ${response.status} ao buscar ${url}`);
      return [];
    }
    const csvText = await response.text();
    return new Promise((resolve) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => resolve(result.data as T[]),
        error: (error) => {
          console.error("Erro ao parsear CSV:", error);
          resolve([]);
        },
      });
    });
  } catch (error) {
    console.error("Erro na requisição da planilha:", error);
    return [];
  }
}

// ============================================================
// COMPONENTES REUTILIZÁVEIS
// ============================================================
const NoiseOverlay = () => (
  <div
    className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.03] mix-blend-overlay"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
);

const MagneticButton = ({ children, className, onClick, disabled }: any) => (
  <motion.button
    whileHover={!disabled ? { scale: 1.02 } : {}}
    whileTap={!disabled ? { scale: 0.98 } : {}}
    className={`relative overflow-hidden group ${className} ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    }`}
    onClick={!disabled ? onClick : undefined}
    disabled={disabled}
  >
    <span className="relative z-10">{children}</span>
    {!disabled && (
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
    )}
  </motion.button>
);

const SectionHeader = ({
  subtitle,
  title,
}: {
  subtitle: string;
  title: string;
}) => (
  <div className="mb-12">
    <div className="flex items-center gap-2 text-blue-500 font-mono text-xs tracking-widest uppercase mb-3">
      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
      {subtitle}
    </div>
    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
      {title}
    </h2>
  </div>
);

// ============================================================
// MODAL DE LICENCIAMENTO (SEM O BOTÃO GHOSTWRITING)
// ============================================================
const QuoteModal = ({ track, onClose, tiposLicenca, links }: any) => {
  const handleWhatsApp = (licenseTitle: string) => {
    const message = `Olá! Tenho interesse em licenciar a música "${track.title}" (ID: ${track.id}) para a modalidade: ${licenseTitle}.`;
    window.open(
      `${links.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-slate-900 border border-white/10 w-full max-w-6xl shadow-2xl relative max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-slate-900 z-10 p-6 border-b border-white/5 flex justify-between items-center">
          <div>
            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest border border-blue-500/20 px-2 py-1">
              Licenciamento
            </span>
            <h3 className="text-2xl font-black text-white mt-2">
              {track.title}
            </h3>
            <p className="text-slate-400 font-mono text-xs">
              ID: {track.id} // {track.bpm} BPM
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2"
          >
            <X size={24} />
          </button>
        </div>

        {/* BOTÃO REMOVIDO - ESTA SEÇÃO FOI ELIMINADA */}

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tiposLicenca.map((license: any) => {
              const Icon = license.icon;
              return (
                <div
                  key={license.id}
                  className="bg-slate-800/50 border border-white/5 p-6 hover:border-blue-500/30 transition-colors flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-600/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm uppercase tracking-wider">
                        {license.title}
                      </h4>
                      <p className="text-[10px] text-slate-500 font-mono">
                        {license.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="text-2xl font-black text-white">
                      {license.price}
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      {license.payment}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4 flex-1">
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      O que você recebe:
                    </h5>
                    <ul className="space-y-1">
                      {license.deliverables.map((item: string, idx: number) => (
                        <li
                          key={idx}
                          className="text-xs text-slate-300 flex items-start gap-2"
                        >
                          <CheckCircle2
                            size={12}
                            className="text-emerald-500 mt-0.5 flex-shrink-0"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-6 p-3 bg-slate-900/80 border border-white/5">
                    <p className="text-xs text-slate-400 italic">
                      “{license.advantage}”
                    </p>
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => handleWhatsApp(license.title)}
                      className="w-full py-2 bg-green-600 hover:bg-green-700 text-white text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageCircle size={14} />
                      Falar no WhatsApp
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ============================================================
// MODAL DE LEAD
// ============================================================
const LeadModal = ({
  service,
  onClose,
}: {
  service: string;
  onClose: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Interesse em ${service}`;
    const body = `Nome: ${name}\nE-mail: ${email}\n\nGostaria de receber mais informações sobre ${service}.`;
    window.location.href = `mailto:contato@lahit.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-slate-900 border border-white/10 w-full max-w-md p-8 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X size={20} />
        </button>
        <h3 className="text-2xl font-bold text-white mb-2">{service}</h3>
        <p className="text-slate-400 mb-6">
          Cadastre-se para receber novidades, promoções e conteúdos exclusivos
          sobre {service}.
        </p>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-slate-800 border border-white/10 p-3 text-white text-sm focus:outline-none focus:border-blue-500"
            />
            <input
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-slate-800 border border-white/10 p-3 text-white text-sm focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="w-full py-3 bg-[#DFFF00] text-[#020617] font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Send size={16} /> Enviar
            </button>
          </form>
        ) : (
          <div className="text-center py-6">
            <CheckCircle2 size={40} className="text-emerald-500 mx-auto mb-4" />
            <p className="text-white">
              Obrigado! Em breve você receberá nossas novidades.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// ============================================================
// RODAPÉ (CONTATOS E ESPAÇAMENTO CORRIGIDOS)
// ============================================================
const Footer = () => {
  const scrollToSection = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="bg-slate-950 py-12 border-t border-[#00F0FF]/10 text-slate-500 text-xs font-mono relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-10">
          <div className="max-w-xs">
            <div className="mb-6">
              <img 
                src="/image_2ee558fe-removebg-preview.png"
                alt="L*A HIT"
                className="h-12 w-auto md:h-16 transition-all duration-300 hover:opacity-80"
              />
              <div className="w-12 h-px bg-gradient-to-r from-[#00F0FF] to-transparent mt-3" />
            </div>
            <p className="leading-relaxed text-slate-400 mt-4">
              Otimizando a indústria musical através da lógica, design e
              estratégia. Brasil • Global
            </p>
          </div>
          <div className="flex gap-12 md:gap-24">
            <div>
              <h5 className="text-white font-bold uppercase tracking-widest mb-6 text-xs">
                Plataforma
              </h5>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => scrollToSection("catalog")}
                    className="hover:text-[#DFFF00] transition-colors text-xs"
                  >
                    Catálogo
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="hover:text-[#DFFF00] transition-colors text-xs"
                  >
                    Serviços
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("cases")}
                    className="hover:text-[#DFFF00] transition-colors text-xs"
                  >
                    Cases
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold uppercase tracking-widest mb-6 text-xs">
                Contato Direto
              </h5>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="mailto:aoliabele@gmail.com" 
                    className="hover:text-[#00F0FF] transition-colors text-xs"
                  >
                    EMAIL
                  </a>
                </li>
                <li>
                  <a 
                    href="https://wa.me/5532998078161" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#00F0FF] transition-colors text-xs"
                  >
                    WhatsApp Corporativo
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4">
          <p>© 2026 L*A HIT HOLDINGS. TODOS OS DIREITOS RESERVADOS.</p>
          <p className="flex items-center gap-2 text-[#00F0FF]">
            <span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full animate-pulse shadow-[0_0_5px_#00F0FF]" />{" "}
            SYSTEM STATUS: OPTIMAL
          </p>
        </div>
      </div>
    </footer>
  );
};

const Navbar = ({ links }: { links: any }) => {
  const [scrolled, setScrolled] = useState(false);
  const [imgSrc, setImgSrc] = useState("/image_2ee558fe-removebg-preview.png");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Força o recarregamento da imagem com timestamp
  useEffect(() => {
    setImgSrc(`/image_2ee558fe-removebg-preview.png?t=${Date.now()}`);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-md border-white/5 py-3"
          : "bg-transparent border-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img 
            src={imgSrc}
            alt="L*A HIT"
            className="h-14 w-auto md:h-20 transition-all duration-300 hover:opacity-80"
          />
        </div>
        
        <div className="hidden md:flex items-center gap-6 text-xs font-bold tracking-widest text-slate-400 uppercase">
          <button
            onClick={() => scrollToSection("catalog")}
            className="hover:text-white transition-colors relative group"
          >
            Catálogo
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-500 group-hover:w-full transition-all duration-300" />
          </button>
          <button
            onClick={() => scrollToSection("services")}
            className="hover:text-white transition-colors relative group"
          >
            Serviços
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-500 group-hover:w-full transition-all duration-300" />
          </button>
          <button
            onClick={() => scrollToSection("cases")}
            className="hover:text-white transition-colors relative group"
          >
            Cases
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-500 group-hover:w-full transition-all duration-300" />
          </button>
        </div>
        
        <div className="w-20" />
      </div>
    </nav>
  );
};

// ============================================================
// HERO BACKGROUND
// ============================================================
const DynamicTerrainCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let frame = 0;

    const lines: any[] = [];
    const gap = 30;
    const rows = Math.ceil(height / gap) + 2;

    for (let i = 0; i < rows; i++) {
      lines.push({
        y: i * gap,
        baseY: i * gap,
        speed: 0.02 + Math.random() * 0.02,
        amplitude: 15 + Math.random() * 20,
        offset: Math.random() * Math.PI * 2,
      });
    }

    const animate = () => {
      ctx.fillStyle = "rgba(2, 6, 23, 0.2)";
      ctx.fillRect(0, 0, width, height);

      ctx.lineWidth = 1;

      lines.forEach((line, i) => {
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, "rgba(2, 6, 23, 0)");
        gradient.addColorStop(
          0.5,
          `rgba(59, 130, 246, ${0.1 + (i / rows) * 0.3})`
        );
        gradient.addColorStop(1, "rgba(2, 6, 23, 0)");

        ctx.beginPath();
        ctx.strokeStyle = gradient;

        for (let x = 0; x <= width; x += 10) {
          const wave1 =
            Math.sin(x * 0.003 + frame * line.speed + line.offset) *
            line.amplitude;
          const wave2 =
            Math.cos(x * 0.01 - frame * 0.01) * (line.amplitude * 0.5);
          const y = line.baseY + wave1 + wave2;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      frame++;
      requestAnimationFrame(animate);
    };

    const rafId = requestAnimationFrame(animate);
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

// ============================================================
// HERO - VERSÃO CORRIGIDA (POSICIONAMENTO E RESPONSIVIDADE)
// ============================================================
const Hero = () => {
  const scrollToCatalog = () =>
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen flex items-center justify-start overflow-hidden bg-slate-950">
      <DynamicTerrainCanvas />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_90%)]" />

      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 pt-24 sm:pt-28 md:pt-32 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl lg:max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] xl:text-[100px] font-black tracking-tighter text-white leading-[1.1] sm:leading-[1.05] md:leading-[0.9] mb-6 sm:mb-8 uppercase">
                TRANSFORMANDO
                <br />
                <span className="text-white/20">IDEIAS</span> EM
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#DFFF00]">
                  ATIVOS.
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-base sm:text-lg md:text-xl text-slate-400 max-w-lg md:max-w-xl leading-relaxed mb-8 sm:mb-12 border-l-2 border-[#00F0FF] pl-4 sm:pl-6 font-medium italic"
            >
              Engenharia de Hits baseada em dados. Transformamos ondas sonoras em
              propriedades intelectuais de alto rendimento.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-start"
            >
              <MagneticButton
                onClick={scrollToCatalog}
                className="px-6 sm:px-8 py-3 bg-[#00F0FF] text-[#020617] font-black tracking-widest uppercase text-sm sm:text-base shadow-[0_0_25px_rgba(0,240,255,0.5)] hover:shadow-[0_0_35px_rgba(0,240,255,0.7)] transition-all"
              >
                Explorar Catálogo
              </MagneticButton>
              
              <MagneticButton
                className="px-6 sm:px-8 py-3 border border-white/20 text-white font-bold uppercase tracking-widest text-sm sm:text-base flex items-center gap-2 sm:gap-3 backdrop-blur-sm hover:border-[#DFFF00] hover:text-[#DFFF00] hover:shadow-[0_0_20px_rgba(223,255,0,0.3)] transition-all"
              >
                <Play size={16} fill="currentColor" /> Showreel
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// COMPONENTE: SMART CATALOG (ESPAÇOS CORRIGIDOS E NEON)
// ============================================================
const SmartCatalog = ({
  catalogo,
  filteredTracks,
  setFilteredTracks,
  onLicenseClick,
  currentTrack,
  setCurrentTrack,
  isPlaying,
  setIsPlaying,
}: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("TODOS");

  const filters = [
    "TODOS",
    ...Array.from(new Set(catalogo.map((t: any) => t.genre))),
  ];

  useEffect(() => {
    let filtered = catalogo;
    if (activeFilter !== "TODOS")
      filtered = filtered.filter((t: any) => t.genre === activeFilter);
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (t: any) =>
          t.title.toLowerCase().includes(term) ||
          t.artist.toLowerCase().includes(term) ||
          t.genre.toLowerCase().includes(term) ||
          t.mood?.toLowerCase().includes(term) ||
          t.bpm?.toString().includes(term)
      );
    }
    setFilteredTracks(filtered);
  }, [searchTerm, activeFilter, catalogo, setFilteredTracks]);

  return (
    <section id="catalog" className="py-16 bg-slate-950 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Usando Ciano para subtítulos de seção */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-[#00F0FF] font-mono text-xs tracking-widest uppercase mb-3">
            <span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full animate-pulse" />
            Catálogo Oficial
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            A Biblioteca.
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-end mb-8 gap-6">
          <div className="w-full lg:w-1/3">
             <div className="relative flex items-center bg-slate-900 border border-white/10 rounded-lg px-4 py-3 focus-within:border-[#00F0FF] transition-colors shadow-inner">
                <Search size={18} className="text-slate-500 mr-3" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Pesquisar título, gênero, BPM..."
                  className="bg-transparent border-none text-sm text-white w-full focus:outline-none placeholder:text-slate-600 font-mono"
                />
             </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide w-full lg:w-auto">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all whitespace-nowrap ${
                  activeFilter === filter
                    ? "bg-[#DFFF00] text-[#020617] shadow-[0_0_15px_rgba(223,255,0,0.5)]"
                    : "bg-slate-900 text-slate-400 border border-white/5 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/50 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm flex flex-col">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 bg-slate-900 text-[10px] font-bold text-slate-500 uppercase tracking-widest sticky top-0 z-20">
            <div className="col-span-2 md:col-span-1 text-center">Play</div>
            <div className="col-span-5 md:col-span-4">Título da Faixa</div>
            <div className="col-span-2 hidden md:block">Gênero</div>
            <div className="col-span-1 hidden md:block text-center">BPM</div>
            <div className="col-span-1 hidden md:block text-center">Mood</div>
            <div className="col-span-5 md:col-span-3 text-right">Ação</div>
          </div>

          <div className="flex flex-col overflow-y-auto max-h-[300px] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
          {filteredTracks.map((track: any) => {
            const isCurrent = currentTrack?.id === track.id;
            
            return (
              <div
                key={track.id}
                className={`grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-white/5 transition-colors group ${
                  isCurrent ? "bg-[#00F0FF]/5" : "hover:bg-white/[0.02]"
                }`}
              >
                <div className="col-span-2 md:col-span-1 flex justify-center">
                  {/* BOTÃO PLAY NEON DA LISTA */}
                  <button
                    onClick={() => isCurrent ? setIsPlaying(!isPlaying) : (setCurrentTrack(track), setIsPlaying(true))}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isCurrent && isPlaying
                        ? "bg-[#DFFF00] text-[#020617] shadow-[0_0_15px_#DFFF00]"
                        : "bg-slate-900 border border-[#DFFF00]/30 text-[#DFFF00] hover:border-[#DFFF00] hover:shadow-[0_0_10px_rgba(223,255,0,0.3)]"
                    }`}
                  >
                    {isCurrent && isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-1" />}
                  </button>
                </div>

                <div className="col-span-5 md:col-span-4">
                  <h4 className={`text-sm font-bold truncate ${isCurrent ? "text-[#00F0FF]" : "text-white"}`}>{track.title}</h4>
                  <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest">{track.artist}</p>
                </div>

                <div className="col-span-2 hidden md:block">
                  <span className="px-2 py-1 rounded-sm border border-white/10 text-[9px] font-bold text-slate-400 uppercase tracking-tighter group-hover:border-[#DFFF00]/50 group-hover:text-[#DFFF00] transition-colors">
                    {track.genre}
                  </span>
                </div>
                
                <div className="col-span-1 hidden md:block text-center text-slate-400 text-xs font-mono">{track.bpm}</div>
                <div className="col-span-1 hidden md:block text-center text-slate-400 text-xs">{track.mood}</div>

                <div className="col-span-5 md:col-span-3 text-right">
                  <button
                    onClick={() => onLicenseClick(track)}
                    className="px-4 py-1.5 bg-transparent border border-[#00F0FF]/50 text-[#00F0FF] text-[10px] font-black uppercase tracking-widest hover:bg-[#00F0FF] hover:text-[#020617] hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all"
                  >
                    Licenciar
                  </button>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
};
            
// ============================================================
// PLAYER DE MÚSICA FIXO (O GLOW NEON DEFINITIVO)
// ============================================================
const PersistentPlayer = ({ 
  track, 
  isPlaying, 
  setIsPlaying, 
  onLicenseClick,
  currentTrack,
  setCurrentTrack,
  filteredTracks,
  isPlayingAuto
}: any) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [audioLoaded, setAudioLoaded] = useState(false);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const playNext = () => {
    if (!filteredTracks || filteredTracks.length === 0) return;
    const currentIndex = filteredTracks.findIndex((t: any) => t.id === currentTrack?.id);
    const nextIndex = (currentIndex + 1) % filteredTracks.length;
    const nextTrack = filteredTracks[nextIndex];
    if (nextTrack) {
      setCurrentTrack(nextTrack);
      setIsPlaying(true);
    }
  };

  const playPrevious = () => {
    if (!filteredTracks || filteredTracks.length === 0) return;
    const currentIndex = filteredTracks.findIndex((t: any) => t.id === currentTrack?.id);
    const prevIndex = (currentIndex - 1 + filteredTracks.length) % filteredTracks.length;
    const prevTrack = filteredTracks[prevIndex];
    if (prevTrack) {
      setCurrentTrack(prevTrack);
      setIsPlaying(true);
    }
  };

  const closePlayer = () => {
    if (audioRef.current) audioRef.current.pause();
    setCurrentTrack(null);
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime("0:00");
  };

  const handleEnded = () => {
    if (isPlayingAuto && filteredTracks && filteredTracks.length > 0) {
      playNext();
    } else {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime("0:00");
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      setProgress(0);
      setCurrentTime("0:00");
      setDuration("0:00");
      setAudioLoaded(false);
      if (isPlaying && track) {
        setTimeout(() => {
          audioRef.current?.play().catch(e => console.error("Erro ao reproduzir:", e));
        }, 100);
      }
    }
  }, [track]);

  useEffect(() => {
    if (!audioRef.current || !audioLoaded) return;
    if (isPlaying) {
      audioRef.current.play().catch(e => console.error("Erro ao reproduzir:", e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, audioLoaded]);

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(formatTime(audioRef.current.duration));
      setAudioLoaded(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      setCurrentTime(formatTime(current));
      setProgress((current / audioRef.current.duration) * 100);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && audioLoaded) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.min(Math.max(x / rect.width, 0), 1);
      audioRef.current.currentTime = percentage * audioRef.current.duration;
    }
  };

  if (!track) return null;

   return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        className="fixed bottom-0 left-0 w-full bg-slate-950/95 backdrop-blur-2xl border-t border-[#00F0FF]/20 p-4 z-50 shadow-[0_-10px_50px_-15px_rgba(0,240,255,0.15)]"
      >
        <audio
          ref={audioRef}
          src={track.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onLoadedMetadata={handleLoadedMetadata}
          preload="auto"
        />

        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">
          
          {/* INFO DA MÚSICA */}
          <div className="flex items-center gap-4 w-full md:w-1/3">
            <div className="w-12 h-12 bg-slate-900 rounded-md relative flex items-center justify-center shrink-0 border border-[#00F0FF]/20 overflow-hidden">
              <Music size={20} className="text-[#00F0FF] drop-shadow-[0_0_5px_#00F0FF]" />
              {isPlaying && (
                <motion.div 
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-[#00F0FF]/20 rounded-md" 
                />
              )}
            </div>
            
            <div className="overflow-hidden flex-1">
              <h4 className="text-white font-bold text-sm truncate tracking-tight">{track.title}</h4>
              <p className="text-slate-500 text-[10px] uppercase tracking-widest font-black">{track.artist}</p>
            </div>
          </div>

          {/* CONTROLES CENTRAIS NEON */}
          <div className="flex flex-col items-center w-full md:w-2/4">
            <div className="flex items-center gap-6 mb-2">
              <button onClick={playPrevious} className="text-slate-500 hover:text-[#00F0FF] transition-colors">
                <SkipBack size={18} fill="currentColor" />
              </button>
              
              {/* BOTÃO PLAY GIGANTE NEON (VERDE LIMÃO) */}
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 bg-[#DFFF00] rounded-full flex items-center justify-center text-slate-950 hover:scale-110 transition-all shadow-[0_0_25px_rgba(223,255,0,0.6)] active:scale-95"
                disabled={!audioLoaded}
              >
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
              </button>
              
              <button onClick={playNext} className="text-slate-500 hover:text-[#00F0FF] transition-colors">
                <SkipForward size={18} fill="currentColor" />
              </button>
            </div>
            
            {/* BARRA DE PROGRESSO CIANO */}
            <div className="w-full flex items-center gap-3">
              <span className="text-[10px] text-slate-500 font-mono w-8 text-right">{currentTime}</span>
              <div 
                onClick={handleSeek}
                className="h-1 bg-slate-800 rounded-full flex-1 relative cursor-pointer group"
              >
                <motion.div 
                  className="h-full bg-[#00F0FF] absolute top-0 left-0 shadow-[0_0_10px_#00F0FF]" 
                  style={{ width: `${progress}%` }} 
                />
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#00F0FF] opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ left: `${progress}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-500 font-mono w-8">{duration}</span>
            </div>
          </div>

          {/* AÇÃO - LICENCIAR */}
          <div className="w-full md:w-1/4 flex items-center justify-end gap-4">
            <button
              onClick={() => onLicenseClick(track)}
              className="px-6 py-2 bg-transparent text-[#00F0FF] border border-[#00F0FF]/50 text-[10px] font-black uppercase tracking-[0.2em] rounded-sm hover:bg-[#DFFF00] hover:text-[#020617] hover:border-[#DFFF00] hover:shadow-[0_0_20px_rgba(223,255,0,0.4)] transition-all"
            >
              Licenciar Ativo
            </button>
            
            <button onClick={closePlayer} className="text-slate-600 hover:text-[#DFFF00] transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// ============================================================
// SERVIÇOS (CORES CORRIGIDAS PARA A PALETA LA HIT)
// ============================================================
const Services = ({ servicos, links, onLeadOpen }: any) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  const openDetails = (service: any) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const formatDescription = (desc: string) => {
    if (!desc) return [];
    return desc.split("|").map(part => part.trim()).filter(part => part);
  };

  const getResumo = (service: any) => {
    if (service.desc) {
      const primeiraLinha = service.desc.split("|")[0];
      if (primeiraLinha && primeiraLinha.length > 60) {
        return primeiraLinha.substring(0, 57) + "...";
      }
      return primeiraLinha || "Sob consulta";
    }
    return "Sob consulta";
  };

  const getTituloAbreviado = (titulo: string) => {
    if (titulo.length > 30) {
      return titulo.substring(0, 30) + "...";
    }
    return titulo;
  };

  const servicosEmpresas = servicos.filter((s: any) => s.categoria === "empresas");
  const servicosArtistas = servicos.filter((s: any) => s.categoria === "artistas");

  return (
    <section
      id="services"
      className="py-16 bg-slate-950 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* TÍTULO PRINCIPAL (CIANO) */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-2 text-[#00F0FF] font-mono text-[10px] tracking-widest uppercase mb-2">
            <span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full animate-pulse shadow-[0_0_5px_#00F0FF]" />
            SOLUTIONS
            <span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full animate-pulse shadow-[0_0_5px_#00F0FF]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Soluções Integradas
          </h2>
          <p className="text-slate-400 text-sm mt-3 max-w-2xl mx-auto">
            Atendemos tanto o mercado corporativo quanto artistas independentes.
          </p>
        </div>

        {/* DUAS COLUNAS LADO A LADO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* COLUNA ESQUERDA - EMPRESAS (TEMA CIANO) */}
          <div className="bg-slate-900 rounded-2xl border border-[#00F0FF]/20 overflow-hidden flex flex-col h-full shadow-[0_0_30px_-10px_rgba(0,240,255,0.2)]">
            <div className="p-6 pb-3 border-b border-[#00F0FF]/20">
              <div className="flex items-center gap-2 text-[#00F0FF] font-mono text-[11px] tracking-widest uppercase mb-1">
                <span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full shadow-[0_0_5px_#00F0FF]" />
                B2B SOLUTIONS
                <span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full shadow-[0_0_5px_#00F0FF]" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                Para Empresas.
              </h3>
              <p className="text-slate-400 text-xs mt-1">
                Licenciamento e identidade sonora para marcas, agências e produtoras.
              </p>
            </div>

            <div className="p-6 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-full">
                {servicosEmpresas.map((s: any, i: number) => {
                  const Icon = s.icon;
                  const resumo = getResumo(s);
                  const tituloAbreviado = getTituloAbreviado(s.title);
                  
                  return (
                    <div
                      key={i}
                      className="group bg-slate-950/80 border border-white/10 hover:border-[#00F0FF]/40 rounded-xl transition-all duration-300 overflow-hidden flex flex-col h-full"
                    >
                      <div className="p-5 flex flex-col h-full">
                        {/* Ícone Ciano com glow */}
                        <div className="flex justify-center mb-4">
                          <div className="w-14 h-14 bg-[#00F0FF]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                            <Icon className="w-7 h-7 text-[#00F0FF] drop-shadow-[0_0_5px_#00F0FF]" />
                          </div>
                        </div>
                        
                        <div className="min-h-[56px] flex items-center justify-center mb-3">
                          <h4 className="text-base font-bold text-white group-hover:text-[#00F0FF] transition-colors text-center leading-tight line-clamp-2">
                            {tituloAbreviado}
                          </h4>
                        </div>
                        
                        <div className="min-h-[48px] flex items-center justify-center mb-4">
                          <p className="text-slate-400 text-xs text-center leading-relaxed line-clamp-2">
                            {resumo}
                          </p>
                        </div>
                        
                        <div className="text-center mb-4">
                          <span className="text-[10px] text-[#00F0FF] font-mono bg-[#00F0FF]/10 border border-[#00F0FF]/30 px-2 py-1 rounded shadow-[0_0_8px_rgba(0,240,255,0.2)]">
                            Sob consulta
                          </span>
                        </div>
                        
                        <div className="flex gap-2 justify-center mt-auto pt-2">
                          <button
                            onClick={() => openDetails(s)}
                            className="px-4 py-2 bg-[#00F0FF]/10 border border-[#00F0FF] text-[#00F0FF] text-[10px] font-bold uppercase tracking-widest shadow-[0_0_12px_rgba(0,240,255,0.4)] hover:shadow-[0_0_20px_rgba(0,240,255,0.8)] hover:bg-[#00F0FF] hover:text-[#020617] transition-all rounded-lg w-full"
                          >
                            {s.cta || "DETALHES"}
                          </button>
                          <button
                            onClick={() => window.open(links.whatsapp, "_blank")}
                            className="p-2 border border-[#00F0FF] text-[#00F0FF] bg-transparent shadow-[0_0_8px_rgba(0,240,255,0.3)] hover:shadow-[0_0_15px_rgba(37,211,102,0.5)] hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all rounded-lg"
                            title="Chamar no WhatsApp"
                          >
                            <MessageCircle size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA - ARTISTAS (TEMA NEON YELLOW) */}
          <div className="bg-slate-900 rounded-2xl border border-[#DFFF00]/20 overflow-hidden flex flex-col h-full shadow-[0_0_30px_-10px_rgba(223,255,0,0.2)]">
            <div className="p-6 pb-3 border-b border-[#DFFF00]/20">
              <div className="flex items-center gap-2 text-[#DFFF00] font-mono text-[11px] tracking-widest uppercase mb-1">
                <span className="w-1.5 h-1.5 bg-[#DFFF00] rounded-full shadow-[0_0_5px_#DFFF00]" />
                ARTIST SOLUTIONS
                <span className="w-1.5 h-1.5 bg-[#DFFF00] rounded-full shadow-[0_0_5px_#DFFF00]" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                Para Artistas.
              </h3>
              <p className="text-slate-400 text-xs mt-1">
                Soluções completas para sua carreira musical, do estúdio ao streaming.
              </p>
            </div>

            <div className="p-6 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-full">
                {servicosArtistas.map((s: any, i: number) => {
                  const Icon = s.icon;
                  const resumo = getResumo(s);
                  const tituloAbreviado = getTituloAbreviado(s.title);
                  const isDestaque = s.highlight === true || s.highlight === "TRUE";
                  
                  return (
                    <div
                      key={i}
                      className={`group bg-slate-950/80 border rounded-xl transition-all duration-300 overflow-hidden flex flex-col h-full ${
                        isDestaque
                          ? "border-[#DFFF00]/40 shadow-[0_0_20px_-5px_rgba(223,255,0,0.3)]"
                          : "border-white/10 hover:border-[#DFFF00]/40"
                      }`}
                    >
                      <div className="p-5 flex flex-col h-full">
                        {/* Ícone Neon com glow */}
                        <div className="flex justify-center mb-4">
                          <div className={`w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${
                            isDestaque ? "bg-[#DFFF00]/20 shadow-[0_0_20px_rgba(223,255,0,0.4)]" : "bg-[#DFFF00]/10 shadow-[0_0_10px_rgba(223,255,0,0.2)]"
                          }`}>
                            <Icon className={`w-7 h-7 text-[#DFFF00] drop-shadow-[0_0_8px_rgba(223,255,0,0.6)]`} />
                          </div>
                        </div>
                        
                        <div className="min-h-[56px] flex items-center justify-center mb-2">
                          <h4 className={`text-base font-bold text-center leading-tight line-clamp-2 ${
                            isDestaque ? "text-[#DFFF00] drop-shadow-[0_0_5px_rgba(223,255,0,0.5)]" : "text-white group-hover:text-[#DFFF00]"
                          } transition-colors`}>
                            {tituloAbreviado}
                          </h4>
                        </div>
                        
                        {isDestaque && (
                          <div className="flex justify-center mb-3">
                            <span className="text-[8px] bg-[#DFFF00] text-[#020617] px-2 py-0.5 rounded-full font-black tracking-widest shadow-[0_0_8px_#DFFF00]">
                              DESTAQUE
                            </span>
                          </div>
                        )}
                        
                        <div className="min-h-[48px] flex items-center justify-center mb-4">
                          <p className="text-slate-400 text-xs text-center leading-relaxed line-clamp-2">
                            {resumo}
                          </p>
                        </div>
                        
                        {/* Logo Parceiro */}
                        <div className="min-h-[32px] flex justify-center items-center mb-4">
                          {s.external && s.external !== "" ? (
                            <div className="w-12 h-12 bg-slate-900 border border-[#DFFF00]/30 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(223,255,0,0.2)]">
                              <span className="text-[7px] text-[#DFFF00] font-mono font-bold drop-shadow-[0_0_4px_#DFFF00]">HIT UP</span>
                            </div>
                          ) : (
                            <div className="h-12" />
                          )}
                        </div>
                        
                        <div className="text-center mb-4">
                           <span className="text-[10px] text-[#DFFF00] font-mono bg-[#DFFF00]/10 border border-[#DFFF00]/30 px-2 py-1 rounded shadow-[0_0_8px_rgba(223,255,0,0.2)]">
                            Sob consulta
                          </span>
                        </div>
                        
                        <div className="flex gap-2 justify-center mt-auto pt-2">
                          <button
                            onClick={() => openDetails(s)}
                            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all rounded-lg w-full shadow-[0_0_12px_rgba(223,255,0,0.4)] hover:shadow-[0_0_20px_rgba(223,255,0,0.8)] ${
                              isDestaque
                                ? "bg-[#DFFF00] text-[#020617]"
                                : "bg-[#DFFF00]/10 border border-[#DFFF00] text-[#DFFF00] hover:bg-[#DFFF00] hover:text-[#020617]"
                            }`}
                          >
                            {s.cta || "DETALHES"}
                          </button>
                          <button
                            onClick={() => window.open(links.whatsapp, "_blank")}
                            className="p-2 border border-[#DFFF00] text-[#DFFF00] bg-transparent shadow-[0_0_8px_rgba(223,255,0,0.3)] hover:shadow-[0_0_15px_rgba(37,211,102,0.5)] hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all rounded-lg"
                            title="Chamar no WhatsApp"
                          >
                            <MessageCircle size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DE DETALHES DO SERVIÇO */}
      <AnimatePresence>
        {modalOpen && selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-white/10 w-full max-w-md p-6 relative max-h-[80vh] overflow-y-auto rounded-xl shadow-2xl shadow-[#00F0FF]/10"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center rounded-full">
                  <selectedService.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  {selectedService.title}
                </h3>
              </div>
              
              <div className="mb-4">
                <h4 className="text-[10px] font-bold text-[#00F0FF] mb-2 uppercase tracking-wider border-l-2 border-[#00F0FF] pl-2">
                  Sobre o serviço
                </h4>
                <div className="space-y-2">
                  {formatDescription(selectedService.desc).map((line, idx) => (
                    <p key={idx} className="text-slate-300 text-xs leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              {selectedService.external && selectedService.external !== "" && (
                <div className="mb-4 p-3 bg-white/5 border border-[#DFFF00]/30 rounded-lg">
                  <p className="text-[#DFFF00] text-[8px] font-mono mb-1 font-bold">🚀 EM PARCERIA COM</p>
                  <a 
                    href={selectedService.external}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-xs font-medium hover:text-[#DFFF00] transition flex items-center gap-1"
                  >
                    Parceiro <ExternalLink size={10} />
                  </a>
                </div>
              )}

              <button
                onClick={() => window.open(links.whatsapp, "_blank")}
                className="w-full py-3 mt-4 bg-[#25D366] text-white text-[11px] font-black uppercase tracking-widest hover:bg-[#1DA851] transition-colors flex items-center justify-center gap-2 rounded-lg"
              >
                <MessageCircle size={16} />
                FALAR NO WHATSAPP
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

// ============================================================
// SEÇÃO DE PROVA SOCIAL (ESPAÇO E BORDAS CORRIGIDOS)
// ============================================================
const SocialProof = ({ cases }: { cases: any[] }) => {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const getImageUrl = (path: string) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    let cleanPath = path.replace(/^\/public/, "");
    if (!cleanPath.startsWith("/")) cleanPath = "/" + cleanPath;
    return cleanPath;
  };

  const getObjectPosition = (enquadramento: string) => {
    switch(enquadramento) {
      case "face": return "center 20%";
      case "top": return "center 0%";
      case "body": return "center 40%";
      case "bottom": return "center 100%";
      case "left": return "0% center";
      case "right": return "100% center";
      default: return "center center";
    }
  };

  const handleImageError = (id: string | number) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const formatPlays = (plays: string) => {
    if (!plays || plays === "0" || plays === "0 plays" || plays.trim() === "") {
      return null;
    }
    return plays;
  };

  if (!cases || cases.length === 0) {
    return (
      <section id="cases" className="py-16 bg-slate-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-[#00F0FF] font-mono text-xs tracking-widest uppercase mb-3">
            <span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full animate-pulse" />
            Resultados
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-12">
            Músicas em Ação.
          </h2>
          <p className="text-center text-slate-400">Nenhum case encontrado.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="cases" className="py-16 bg-slate-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-2 text-[#00F0FF] font-mono text-xs tracking-widest uppercase mb-3">
          <span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full animate-pulse" />
          Resultados
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-12">
          Músicas em Ação.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cases.map((item) => {
            const imageSrc = getImageUrl(item.image || item.videoThumb);
            const playsValue = formatPlays(item.plays);
            const hasError = imageErrors[item.id];
            const objectPosition = getObjectPosition(item.enquadramento);

            return (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-transparent border border-white/5 hover:border-[#00F0FF]/50 transition-all overflow-hidden rounded-lg shadow-lg"
              >
                <div className="relative w-full bg-slate-900 overflow-hidden" style={{ aspectRatio: "16/9" }}>
                  {imageSrc && !hasError ? (
                    <img
                      src={imageSrc}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ objectPosition }}
                      onError={() => handleImageError(item.id)}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                      <ImageIcon size={24} className="text-slate-700" />
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 pointer-events-none" />
                  
                  <div className="absolute bottom-3 left-3 right-3">
                    <h4 className="text-white font-bold text-sm line-clamp-1 group-hover:text-[#DFFF00] transition-colors drop-shadow-md">
                      {item.title}
                    </h4>
                    <p className="text-slate-300 text-xs line-clamp-1 mb-1 drop-shadow-md">
                      {item.artist}
                    </p>
                    <div className="flex items-center justify-between">
                      {playsValue && (
                        <div className="flex items-center gap-1">
                          <span className="text-[#00F0FF] text-[10px] font-black tracking-widest bg-black/50 px-1.5 py-0.5 rounded backdrop-blur-sm">
                            {playsValue} PLAYS
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] text-white bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full z-10">
                    {item.platform === "YouTube" && <Youtube size={10} className="text-white" />}
                    {item.platform === "Spotify" && <Music size={10} className="text-white" />}
                    {item.platform === "Instagram Reels" && <Instagram size={10} className="text-white" />}
                    {item.platform === "TikTok" && <Music size={10} className="text-white" />}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ============================================================
// COMPONENTE DO LOGO ANIMADO (L✦A HIT)
// ============================================================
const LogoAnimado = () => {
  return (
    <div className="flex flex-col items-center justify-center select-none group cursor-pointer">
      {/* Parte Superior: L ✦ A */}
      <div className="relative flex items-center justify-center gap-1 mb-[-4px]">
        <span className="text-3xl font-black text-white italic tracking-tighter">L</span>
        
        {/* Estrela de 4 pontas com Pulso Neon */}
        <motion.span
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
            filter: ["drop-shadow(0 0 2px #DFFF00)", "drop-shadow(0 0 8px #DFFF00)", "drop-shadow(0 0 2px #DFFF00)"]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-[#DFFF00] text-2xl mx-0.5"
        >
          ✦
        </motion.span>
        
        <span className="text-3xl font-black text-white italic tracking-tighter">A</span>
      </div>

      {/* Linha de Horizonte Laser Ciano */}
      <motion.div 
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "110%", opacity: 0.7 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="h-[1.5px] bg-[#00F0FF] shadow-[0_0_10px_#00F0FF] relative z-10"
      />

      {/* Palavra HIT com o Pingo Foguete */}
      <div className="flex items-center justify-center text-[10px] font-black text-[#DFFF00] tracking-[0.5em] mt-1 relative">
        <span>H</span>
        <div className="relative inline-flex justify-center">
          <span className="opacity-100">I</span>
          {/* O Pingo Foguete: sai do 'I' e vai até a estrela ✦ */}
          <motion.div
            initial={{ y: 0, opacity: 1 }}
            animate={{ 
              y: -36, // Ajuste de altura para chegar na estrela
              opacity: [1, 1, 0],
              scale: [1, 1.4, 0.6]
            }}
            transition={{ 
              duration: 1.4, 
              repeat: Infinity, 
              repeatDelay: 2.5,
              ease: "circIn" 
            }}
            className="absolute -top-1 w-[3px] h-[3px] bg-[#DFFF00] rounded-full shadow-[0_0_8px_#DFFF00]"
          />
        </div>
        <span className="ml-1">T</span>
      </div>
    </div>
  );
};

// ============================================================
// APP PRINCIPAL
// ============================================================
export default function App() {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [leadService, setLeadService] = useState("");
  const [filteredTracks, setFilteredTracks] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        console.log("Carregando dados das planilhas...");
        
        const [catalogoRaw, servicosRaw, casesRaw, linksRaw, tiposLicencaRaw] = await Promise.all([
          fetchSheet(SHEETS.catalogo),
          fetchSheet(SHEETS.servicos),
          fetchSheet(SHEETS.cases),
          fetchSheet(SHEETS.links),
          fetchSheet(SHEETS.tiposLicenca),
        ]);

        console.log("Dados do catálogo carregados:", catalogoRaw.length);
        console.log("Dados dos cases carregados:", casesRaw.length);

        // Processa catálogo
        let catalogo = FALLBACK_DATA.catalogo;
        if (catalogoRaw.length > 0) {
          catalogo = catalogoRaw.map((item: any) => ({
            id: Number(item.id) || 0,
            title: item.title || "Sem título",
            artist: item.artist || "L'A HIT Originals",
            bpm: Number(item.bpm) || 0,
            genre: item.genre || "Outro",
            mood: item.mood || "Neutro",
            price: Number(item.price) || 0,
            audioUrl: item.audioUrl || item.link || "", // Aceita audioUrl ou link
          })).filter((track: any) => track.audioUrl); // Remove tracks sem áudio
        }

       // Processa cases
let cases = FALLBACK_DATA.cases;
if (casesRaw.length > 0) {
  cases = casesRaw.map((item: any) => ({
    id: Number(item.id) || 0,
    title: item.title || "Case",
    artist: item.artist || "L'A HIT Originals",
    image: item.image || "",
    videoThumb: item.videoThumb || "",
    link: item.link || "#",
    plays: item.plays || "0",
    platform: item.platform || "Streaming",
    enquadramento: item.enquadramento || "center",
  }));
}

        // Processa serviços
        let servicos = FALLBACK_DATA.servicos;
        if (servicosRaw.length > 0) {
          servicos = servicosRaw.map((item: any) => ({
            ...item,
            highlight: item.highlight === "true" || item.highlight === true,
            icon: getIconComponent(item.icon || "PenTool"),
          }));
        }

        // Processa links
        let links = FALLBACK_DATA.links;
        if (linksRaw.length > 0) {
          links = linksRaw.reduce((acc: any, row: any) => {
            acc[row.chave] = row.valor;
            return acc;
          }, {});
        }

        // Processa tipos de licença
        let tiposLicenca = FALLBACK_DATA.tiposLicenca;
        if (tiposLicencaRaw.length > 0) {
          tiposLicenca = tiposLicencaRaw.map((item: any) => ({
            ...item,
            deliverables: item.deliverables 
              ? item.deliverables.split("|").map((s: string) => s.trim()) 
              : [],
            icon: getIconComponent(item.icon || "PenTool"),
          }));
        }

        setConfig({ catalogo, servicos, cases, links, tiposLicenca });
        setFilteredTracks(catalogo);
        console.log("Configuração carregada com sucesso!");
      } catch (error) {
        console.error("Erro crítico, usando fallback total", error);
        setConfig({
          catalogo: FALLBACK_DATA.catalogo,
          servicos: FALLBACK_DATA.servicos.map((s) => ({ ...s, icon: getIconComponent(s.icon) })),
          cases: FALLBACK_DATA.cases,
          links: FALLBACK_DATA.links,
          tiposLicenca: FALLBACK_DATA.tiposLicenca.map((t) => ({ ...t, icon: getIconComponent(t.icon) })),
        });
        setFilteredTracks(FALLBACK_DATA.catalogo);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleLicenseClick = (track: any) => {
    setCurrentTrack(track);
    setShowQuoteModal(true);
  };

  const handleLeadOpen = (service: string) => {
    setLeadService(service);
    setShowLeadModal(true);
  };

   if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-blue-500" />
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Erro ao carregar dados. Tente novamente mais tarde.
      </div>
    );
  }

return (
  <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
    <NoiseOverlay />
    <Navbar links={config.links} />
    <main className="relative z-10">
      <Hero />
      <SmartCatalog
        catalogo={config.catalogo}
        filteredTracks={filteredTracks}
        setFilteredTracks={setFilteredTracks}
        onLicenseClick={handleLicenseClick}
        currentTrack={currentTrack}
        setCurrentTrack={setCurrentTrack}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <Services servicos={config.servicos} links={config.links} onLeadOpen={handleLeadOpen} />
      <SocialProof cases={config.cases} />
    </main>
    <Footer />
    <PersistentPlayer
      track={currentTrack}
      isPlaying={isPlaying}
      setIsPlaying={setIsPlaying}
      onLicenseClick={handleLicenseClick}
      currentTrack={currentTrack}
      setCurrentTrack={setCurrentTrack}
      filteredTracks={filteredTracks}
      isPlayingAuto={true}
    />
       <AnimatePresence>
      {showQuoteModal && currentTrack && (
        <QuoteModal
          track={currentTrack}
          onClose={() => setShowQuoteModal(false)}
          tiposLicenca={config.tiposLicenca}
          links={config.links}
        />
      )}
      {showLeadModal && (
        <LeadModal service={leadService} onClose={() => setShowLeadModal(false)} />
      )}
    </AnimatePresence>
  </div>
);
}  // <-- ESTA É A CHAVE QUE FALTAVA (fecha o componente App)

