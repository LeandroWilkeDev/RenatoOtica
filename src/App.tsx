import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import examDigitalPhoto from "./assets/exames.jpg";
import promoModelPhoto from "./assets/model01.jpg";
import glassVideo from "./assets/glass.mp4";
import logoLight from "./assets/logo.png";
import logoDark from "./assets/logoWhite.png";
import VideoCarousel from "./components/VideoCarousel";
import ProductShowcase from "./components/ProductShowcase";
import PrescriptionBanner from "./components/PrescriptionBanner";
import FAQAccordion from "./components/FAQAccordion";
import StoreFooter from "./components/StoreFooter";

const testimonials = [
  {
    name: "Mariana Costa",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=160&q=80",
    text: "Atendimento impecável e lente pronta antes do prazo. Minha visão ficou perfeita.",
  },
  {
    name: "Rafael Nunes",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
    text: "A equipe me ajudou a escolher uma armação que combinou com meu rosto e trabalho.",
  },
  {
    name: "Lívia Souza",
    rating: 4,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80",
    text: "Exame rápido e explicações claras. Volto com certeza para comprar o segundo óculos.",
  },
];

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isDark, setIsDark] = useState(true);

  // Escuro/Claro Logic
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Efeitos Mouse Parallax globais
  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty(
        "--scroll-y",
        `${window.scrollY}px`,
      );
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (
        window.innerWidth < 1024 ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;

      document.documentElement.style.setProperty("--mouse-x", x.toFixed(4));
      document.documentElement.style.setProperty("--mouse-y", y.toFixed(4));
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Animação em Cascata Nativa (Efeito "Montando" Seguro sem quebrar Grid)
  useEffect(() => {
    // Ativa logo de cara a seção inicial
    const heroItems = document.querySelectorAll(".hero-item");
    heroItems.forEach((item, index) => {
      setTimeout(
        () => {
          item.classList.add("active");
        },
        100 + index * 150,
      );
    });

    // Observer para animar o resto dos itens com scroll de forma limpa em cascata
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll(".reveal-item");
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add("active");
              }, index * 150);
            });
            observer.unobserve(entry.target); // Deixa ativado permanentemente depois do reload
          }
        });
      },
      { threshold: 0.1 },
    );

    document
      .querySelectorAll(".reveal-group")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const whatsappNumber = "5511999999999";
  const whatsappMessage = encodeURIComponent(
    "Olá! Quero agendar meu exame e conhecer os modelos da Renato Óculos.",
  );
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  const mapsUrl =
    "https://www.google.com/maps/search/?api=1&query=Avenida+Barretos+De+Menezes,+628+-+E,+Prazeres,+Jaboatao+dos+Guararapes+-+PE,+54310-310";

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const leadMessage = encodeURIComponent(
      `Olá! Meu nome é ${name} e meu número é ${phone}. Quero receber atendimento da Renato Óculos.`,
    );
    window.open(
      `https://wa.me/${whatsappNumber}?text=${leadMessage}`,
      "_blank",
    );
  };

  const logoPhoto = isDark ? logoDark : logoLight;

  return (
    <>
      <button
        onClick={() => setIsDark(!isDark)}
        className="hero-item reveal-item fixed top-5 right-5 lg:top-8 lg:right-8 z-50 p-3.5 rounded-full glass-card hover:scale-110 active:scale-95 transition-transform shadow-lg border border-teal-900/10 dark:border-white/10"
        aria-label="Alternar Tema"
      >
        {isDark ? (
          <svg
            className="w-5 h-5 text-yellow-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 text-slate-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </button>

      <div className="parallax-bg" aria-hidden="true">
        <div className="parallax-layer layer-back" />
        <div className="parallax-layer layer-mid" />
        <div className="parallax-layer layer-front" />
      </div>

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-[100vw] sm:max-w-7xl flex-col px-0 py-0 sm:px-8 sm:py-8 lg:px-12 selection:bg-teal-500/30 overflow-hidden">
        <section className="grid items-stretch gap-6 pt-0 md:pt-4">
          <article className="glass-card min-h-[100dvh] sm:min-h-0 flex flex-col justify-center sm:block relative overflow-hidden rounded-none sm:rounded-[2.5rem] p-8 sm:p-12 lg:min-h-[520px] lg:p-16 border border-teal-900/10 dark:border-white/10 shadow-xl transition-transform duration-500">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-teal-500/15 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none" />

            <div className="hero-item reveal-item relative w-full flex items-center justify-center mb-10 lg:mb-0 lg:absolute lg:right-16 lg:top-1/2 lg:-translate-y-1/2 lg:w-auto pointer-events-none z-10">
              <div className="absolute -inset-6 bg-teal-400/20 dark:bg-teal-400/10 rounded-full blur-[60px] scale-125 opacity-50 animate-pulse" />
              <img
                src={logoPhoto}
                alt="Logo Renato Óculos"
                className="relative w-auto h-auto max-w-[200px] sm:max-w-[260px] lg:max-w-[320px] xl:max-w-[420px] max-h-[350px] object-contain drop-shadow-xl dark:drop-shadow-[0_5px_20px_rgba(20,184,166,0.3)] animate-[float_6s_ease-in-out_infinite]"
                loading="eager"
              />
            </div>

            <div className="relative z-10 max-w-2xl lg:max-w-[55%]">
              <div className="hero-item reveal-item inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-700 dark:text-teal-300 text-xs font-bold uppercase tracking-wider mb-8 transition-transform hover:scale-105">
                <span className="w-2 h-2 rounded-full bg-teal-500 dark:bg-teal-400 animate-pulse" />
                Inovação em Ótica
              </div>
              <h1 className="hero-item reveal-item font-title text-[2.5rem] font-extrabold leading-[1.1] tracking-[-0.02em] text-zinc-900 dark:text-white sm:text-[4rem]">
                Visão perfeita,
                <span className="mt-2 block bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 dark:from-teal-300 dark:via-emerald-300 dark:to-teal-500 bg-clip-text text-transparent">
                  Design impecável.
                </span>
              </h1>
              <p className="hero-item reveal-item mt-6 max-w-xl text-base leading-relaxed text-slate-700 dark:text-zinc-300 sm:text-lg font-light">
                Armações premium, lentes com filtro de luz azul e atendimento
                consultivo para você enxergar melhor e viver com mais confiança.
              </p>
            </div>

            <div className="hero-item reveal-item relative z-10 mt-10 flex flex-wrap gap-4 md:mt-12">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-full bg-teal-500 px-8 py-4 text-sm font-bold text-white dark:text-zinc-950 transition-all hover:scale-105 hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-950 shadow-[0_5px_30px_-5px_rgba(20,184,166,0.5)]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="whatsapp-icon h-6 w-6 text-white dark:text-zinc-950 transition-transform group-hover:rotate-12"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20.52 3.49A11.84 11.84 0 0 0 12.06 0C5.61 0 .34 5.25.34 11.68c0 2.05.54 4.06 1.55 5.84L0 24l6.68-1.74a11.74 11.74 0 0 0 5.38 1.29h.01c6.45 0 11.72-5.25 11.72-11.68 0-3.12-1.22-6.05-3.27-8.38zM12.07 21.5h-.01a9.7 9.7 0 0 1-4.94-1.35l-.35-.2-3.97 1.03 1.06-3.86-.23-.39a9.6 9.6 0 0 1-1.48-5.05c0-5.32 4.37-9.65 9.75-9.65 2.61 0 5.06 1 6.89 2.83a9.52 9.52 0 0 1 2.87 6.82c0 5.33-4.37 9.66-9.59 9.66zm5.3-7.24c-.29-.14-1.71-.84-1.98-.93-.27-.1-.47-.14-.67.14-.2.28-.77.93-.95 1.12-.17.2-.35.22-.64.08-.29-.14-1.24-.45-2.35-1.43-.86-.76-1.44-1.7-1.61-1.99-.17-.29-.02-.44.13-.58.13-.13.29-.34.43-.51.14-.17.19-.29.29-.49.1-.2.05-.37-.02-.51-.07-.14-.67-1.6-.92-2.2-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.51.07-.78.35-.27.28-1.03 1-1.03 2.43s1.06 2.82 1.21 3.01c.14.19 2.05 3.12 4.96 4.37.69.3 1.23.48 1.65.61.69.22 1.31.19 1.8.12.55-.08 1.71-.7 1.95-1.37.24-.67.24-1.24.17-1.37-.07-.13-.27-.2-.56-.34z" />
                </svg>
                <span>Falar no WhatsApp Agora</span>
              </a>
            </div>
          </article>
        </section>

        <VideoCarousel />

        <ProductShowcase whatsappNumber={whatsappNumber} />

        <PrescriptionBanner whatsappNumber={whatsappNumber} />

        <section className="reveal-group mt-6 pt-16 sm:pt-0 grid gap-6 lg:grid-cols-2">
          <article className="reveal-item glass-card group overflow-hidden rounded-none sm:rounded-[2.5rem] p-8 transition-all hover:bg-slate-100/50 hover:dark:bg-white/[0.04] border-transparent hover:border-teal-500/20 hover:dark:border-teal-500/30">
            <div className="flex flex-col h-full">
              <h2 className="font-title text-2xl font-bold text-zinc-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-300 transition-colors">
                Armações a partir de R$ 69,90
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-zinc-400 font-light">
                Modelos premium e ultraleves para destacar sua personalidade com
                conforto no dia a dia e preço acessível.
              </p>

              <div className="mt-8 overflow-hidden rounded-3xl relative mt-auto border border-teal-900/10 dark:border-white/5 shadow-md dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)]">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 dark:from-zinc-950/80 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-80" />
                <video
                  src={glassVideo}
                  className="h-72 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              </div>
            </div>
          </article>

          <article className="reveal-item glass-card group overflow-hidden rounded-none sm:rounded-[2.5rem] p-8 transition-all hover:bg-slate-100/50 hover:dark:bg-white/[0.04] border-transparent hover:border-teal-500/20 hover:dark:border-teal-500/30">
            <div className="flex flex-col h-full">
              <h2 className="font-title text-2xl font-bold text-zinc-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-300 transition-colors">
                Exame de vista grátis*
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-zinc-400 font-light">
                Na compra do seu óculos completo. Oftalmo com equipamento
                digital para medição precisa e recomendação ideal.
              </p>

              <div className="mt-8 overflow-hidden rounded-3xl relative mt-auto border border-teal-900/10 dark:border-white/5 shadow-md dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)]">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 dark:from-zinc-950/80 to-transparent z-10" />
                <img
                  src={examDigitalPhoto}
                  alt="Oftalmo realizando exame de vista digital"
                  className="h-72 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-6 left-6 z-20 inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-teal-500 hover:text-white dark:hover:text-zinc-950 hover:scale-105 border border-white/30 hover:border-transparent"
                >
                  Agendar Exame
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </article>
        </section>

        <section className="reveal-group mt-6 pt-16 sm:pt-0 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <article className="reveal-item glass-card relative overflow-hidden rounded-none sm:rounded-[2.5rem] p-8 sm:p-12 lg:p-14 border-teal-500/20 dark:border-teal-500/30 transition-transform duration-500 hover:translate-y-[-4px]">
            <div className="absolute -left-12 -top-12 h-40 w-40 rounded-full bg-teal-500/20 blur-[80px]" />
            <div className="absolute -bottom-14 right-8 h-40 w-40 rounded-full bg-emerald-500/20 blur-[80px]" />

            <div className="relative grid items-center gap-10 md:grid-cols-[1.05fr_0.95fr]">
              <div className="order-2 md:order-1 md:pr-4">
                <div className="flex items-center gap-3">
                  <p className="inline-flex shrink-0 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.14em] text-teal-700 dark:text-teal-300">
                    Oferta Especial
                  </p>
                  <div className="h-px w-full bg-gradient-to-r from-teal-500/30 to-transparent" />
                </div>
                <h2 className="font-title mt-5 text-4xl font-extrabold leading-[1.05] text-zinc-900 dark:text-white sm:text-5xl">
                  Lentes Premium <br />
                  <span className="text-teal-600 dark:text-teal-400">
                    + 30% OFF na 2ª armação
                  </span>
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-700 dark:text-zinc-300 font-light">
                  Válido até o fim do mês para novos clientes. Agende agora e
                  faça sua consultoria visual completa no melhor padrão.
                </p>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center justify-center w-full sm:w-auto rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 px-8 py-4 text-base font-bold transition-all hover:bg-teal-500 hover:text-white dark:hover:bg-teal-400 hover:scale-105"
                >
                  Resgatar Promoção
                </a>
              </div>

              <div className="order-1 md:order-2 relative justify-self-center md:justify-self-end mb-6 md:mb-0 group">
                <div className="absolute inset-0 bg-teal-500/20 rounded-3xl blur-2xl transform rotate-3 transition-transform group-hover:rotate-6 duration-500" />
                <img
                  src={promoModelPhoto}
                  alt="Cliente usando oculos em campanha promocional"
                  className="relative z-10 mx-auto h-80 w-full max-w-[360px] rounded-3xl object-cover shadow-xl dark:shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-teal-900/10 dark:border-white/10 transition-transform duration-500 group-hover:scale-[1.02] sm:h-[24rem] lg:h-[27rem]"
                  loading="lazy"
                />
              </div>
            </div>
          </article>

          <aside className="reveal-item glass-card rounded-none sm:rounded-[2.5rem] p-8 flex flex-col transition-transform duration-500 hover:translate-y-[-4px]">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 dark:via-zinc-600 to-transparent" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400 text-center">
                Depoimentos
              </p>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 dark:via-zinc-600 to-transparent" />
            </div>

            <h2 className="font-title text-2xl font-bold text-center text-zinc-900 dark:text-white mb-8">
              Quem compra, recomenda
            </h2>
            <div className="space-y-4 flex-1">
              {testimonials.map((item) => (
                <article
                  key={item.name}
                  className="rounded-2xl bg-white/70 dark:bg-zinc-900/50 border border-teal-900/5 dark:border-white/5 p-5 transition hover:bg-white dark:hover:bg-zinc-800/80 hover:border-teal-200 dark:hover:border-white/10 shadow-sm"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.avatar}
                        alt={`Foto de ${item.name}`}
                        loading="lazy"
                        className="h-11 w-11 rounded-full object-cover ring-2 ring-teal-500/20 dark:ring-teal-500/30"
                      />
                      <div>
                        <p className="text-sm font-bold text-zinc-900 dark:text-white">
                          {item.name}
                        </p>
                        <div
                          className="flex items-center gap-0.5 mt-0.5"
                          aria-label={`${item.rating} de 5 estrelas`}
                        >
                          {Array.from({ length: 5 }, (_, index) => (
                            <svg
                              key={`${item.name}-${index}`}
                              viewBox="0 0 24 24"
                              className={`h-3.5 w-3.5 ${index < item.rating ? "text-teal-500 dark:text-teal-400" : "text-slate-300 dark:text-zinc-600"}`}
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M12 3.2l2.64 5.34 5.9.86-4.27 4.15 1 5.87L12 16.66l-5.27 2.76 1-5.87L3.46 9.4l5.9-.86L12 3.2z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700 dark:text-zinc-300 font-light italic">
                    "{item.text}"
                  </p>
                </article>
              ))}
            </div>
          </aside>
        </section>

        <section className="reveal-group mt-6 pt-16 sm:pt-0 grid gap-6 pb-12 lg:grid-cols-2">
          <article className="reveal-item glass-card rounded-none sm:rounded-[2.5rem] p-8 sm:p-10 transition-transform duration-500 hover:translate-y-[-4px]">
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400 mb-2">
                Onde estamos
              </p>
              <h2 className="font-title text-3xl font-bold text-zinc-900 dark:text-white">
                Visite nossa loja
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-zinc-400 font-light max-w-sm">
                Avenida Barretos De Menezes, 628 - E - Prazeres, Jaboatão dos
                Guararapes - PE, 54310-310 <br />
                <span className="text-teal-600 dark:text-teal-300 font-medium mt-2 inline-block">
                  Segunda a Sexta: 08h às 17h | Sábado: 08h às 13h
                </span>
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-teal-900/10 dark:border-white/10 shadow-lg group">
              <iframe
                title="Mapa da Renato Óculos"
                src="https://www.google.com/maps?output=embed&q=54310-310,+Avenida+Barretos+de+Menezes,+628,+Prazeres,+Jaboat%C3%A3o+dos+Guararapes,+PE"
                width="100%"
                height="300"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-90 transition-all duration-500 group-hover:opacity-100 dark:brightness-95"
              />
            </div>
          </article>

          <article className="reveal-item glass-card rounded-none sm:rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-center relative overflow-hidden transition-transform duration-500 hover:translate-y-[-4px]">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-teal-500/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400 mb-2">
                Contato Rápido
              </p>
              <h2 className="font-title text-3xl font-bold text-zinc-900 dark:text-white">
                Vamos conversar?
              </h2>
              <p className="mt-3 text-base text-slate-600 dark:text-zinc-400 font-light mb-8 max-w-sm">
                Deixe seus dados e nossa equipe de especialistas entrará em
                contato com você via WhatsApp.
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-zinc-300">
                    Seu Nome
                  </span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="w-full rounded-2xl border border-slate-300 dark:border-white/10 bg-white/50 dark:bg-zinc-900/50 px-4 py-3.5 text-base text-zinc-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 outline-none transition-all focus:border-teal-500 dark:focus:border-teal-500 focus:bg-white dark:focus:bg-zinc-900 focus:ring-1 focus:ring-teal-500 shadow-sm"
                    placeholder="Ex: João da Silva"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-zinc-300">
                    Telefone / WhatsApp
                  </span>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    className="w-full rounded-2xl border border-slate-300 dark:border-white/10 bg-white/50 dark:bg-zinc-900/50 px-4 py-3.5 text-base text-zinc-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 outline-none transition-all focus:border-teal-500 dark:focus:border-teal-500 focus:bg-white dark:focus:bg-zinc-900 focus:ring-1 focus:ring-teal-500 shadow-sm"
                    placeholder="(11) 99999-9999"
                  />
                </label>

                <button
                  type="submit"
                  className="mt-6 w-full rounded-2xl bg-teal-500 px-6 py-4 text-base font-bold text-white dark:text-zinc-950 transition-all hover:bg-teal-400 hover:scale-[1.02] shadow-lg shadow-teal-500/20 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-950"
                >
                  Solicitar Atendimento
                </button>
              </form>
            </div>
          </article>
        </section>

        <FAQAccordion />

        <StoreFooter mapsUrl={mapsUrl} />
      </main>
    </>
  );
}

export default App;
