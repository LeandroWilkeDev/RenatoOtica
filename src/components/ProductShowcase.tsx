import { useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";

import imgCard1 from "../assets/masculino/Armação de Óculos de Grau Ray Ban, modelo 0RX7203L, cor 8164,/imgCard1.png";
import imgCard2 from "../assets/masculino/Armação de Óculos de Grau Ray Ban, modelo 0RX7203L, cor 8164,/imgCard2.png";
import rayban1 from "../assets/masculino/Armação de Óculos de Grau Ray Ban, modelo 0RX7203L, cor 8164,/rayban1.png";
import rayban2 from "../assets/masculino/Armação de Óculos de Grau Ray Ban, modelo 0RX7203L, cor 8164,/rayban2.png";
import rayban3 from "../assets/masculino/Armação de Óculos de Grau Ray Ban, modelo 0RX7203L, cor 8164,/rayban3.png";
import rayban4 from "../assets/masculino/Armação de Óculos de Grau Ray Ban, modelo 0RX7203L, cor 8164,/rayban4.png";
import rayban5 from "../assets/masculino/Armação de Óculos de Grau Ray Ban, modelo 0RX7203L, cor 8164,/rayban5.png";
import rayban6 from "../assets/masculino/Armação de Óculos de Grau Ray Ban, modelo 0RX7203L, cor 8164,/rayban6.png";
import cliponHit1 from "../assets/masculino/cliponHit/cliponHit1.png";
import cliponHit2 from "../assets/masculino/cliponHit/cliponHit2.png";
import cliponHit3 from "../assets/masculino/cliponHit/cliponHit3.png";
import cliponHit4 from "../assets/masculino/cliponHit/cliponHit4.png";
import imgClipon1 from "../assets/masculino/cliponHit/imgClipon1.png";
import imgClipon2 from "../assets/masculino/cliponHit/imgClipon2.png";
import imgTommy1 from "../assets/masculino/Armação de Óculos de Grau Tommy Hilfiger, modelo TH 1905/imgTommy1.png";
import imgTommy2 from "../assets/masculino/Armação de Óculos de Grau Tommy Hilfiger, modelo TH 1905/imgTommy2.png";
import tommy1 from "../assets/masculino/Armação de Óculos de Grau Tommy Hilfiger, modelo TH 1905/Tommy1.png";
import tommy2 from "../assets/masculino/Armação de Óculos de Grau Tommy Hilfiger, modelo TH 1905/Tommy2.png";
import lacosteCard1 from "../assets/masculino/grauLacoste/lacosteCard1.png";
import lacosteCard2 from "../assets/masculino/grauLacoste/lacosteCard2.png";
import lacoste1 from "../assets/masculino/grauLacoste/lacoste1.png";
import lacoste2 from "../assets/masculino/grauLacoste/lacoste2.png";
import infantil1 from "../assets/infantil/infantil1.png";
import infantil2 from "../assets/infantil/infantil2.png";
import infantil3 from "../assets/infantil/infantil3.png";
import infantil4 from "../assets/infantil/infantil4.png";
import infantil5 from "../assets/infantil/infantil5.png";
import infantil6 from "../assets/infantil/infantil6.png";

type ProductCategory = "Masculino" | "Feminino" | "Solar" | "Infantil";

type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  priceHint: string;
  image: string;
  hoverImage?: string;
  galleryImages?: string[];
};

const tabs: ProductCategory[] = ["Masculino", "Feminino", "Solar", "Infantil"];
const AUTO_SCROLL_INTERVAL_MS = 3500;
const INERTIA_FRICTION = 0.92;
const INERTIA_MIN_START_SPEED = 0.01;
const INERTIA_MIN_STOP_SPEED = 0.02;

function getLoopedIndex(index: number, total: number) {
  return (index + total) % total;
}

function buildAiSet(
  name: string,
  category: ProductCategory,
  seedBase: number,
): Pick<Product, "image" | "hoverImage" | "galleryImages"> {
  const basePrompt = `fotografia de produto premium de oculos ${name}, categoria ${category}, fundo neutro, e-commerce, hiper-realista`;
  const variations = [
    "frontal",
    "angulo 3/4",
    "detalhe da haste",
    "vista lateral",
    "close nas lentes",
    "sobre superficie de estudio",
  ];

  const galleryImages = variations.map((variation, index) => {
    const prompt = `${basePrompt}, ${variation}`;
    return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?model=flux&width=1200&height=900&seed=${seedBase + index}&nologo=true`;
  });

  return {
    image: galleryImages[0],
    hoverImage: galleryImages[1],
    galleryImages,
  };
}

const products: Product[] = [
  {
    id: "masc-01",
    name: "Óculos Clipon Hit, modelo 4 8023, cor Demi Marrom",
    category: "Masculino",
    description: "Óculos Clipon Hit, modelo 4 8023, cor Demi Marrom",
    priceHint: "A partir de R$ 169,90",
    image: imgClipon1,
    hoverImage: imgClipon2,
    galleryImages: [cliponHit1, cliponHit2, cliponHit3, cliponHit4],
  },
  {
    id: "masc-02",
    name: "Armação de Óculos de Grau Ray Ban, modelo 0RX7203L, cor 8164, tamanho 56",
    category: "Masculino",
    description:
      "Armação de Óculos de Grau Ray Ban, modelo 0RX7203L, cor 8164, tamanho 56",
    priceHint: "A partir de R$ 189,90",
    image: imgCard1,
    hoverImage: imgCard2,
    galleryImages: [rayban1, rayban2, rayban3, rayban4, rayban5, rayban6],
  },
  {
    id: "masc-03",
    name: "Armação de Óculos de Grau Tommy Hilfiger, modelo TH 1905, cor 003, tamanho 55",
    category: "Masculino",
    description:
      "Armação de Óculos de Grau Tommy Hilfiger, modelo TH 1905, cor 003, tamanho 55",
    priceHint: "A partir de R$ 219,90",
    image: tommy1,
    hoverImage: tommy2,
    galleryImages: [imgTommy1, imgTommy2],
  },
  {
    id: "masc-04",
    name: "Armação de Óculos de Grau Lacoste, modelo L2904, cor 400, tamanho 49",
    category: "Masculino",
    description:
      "Armação de Óculos de Grau Lacoste, modelo L2904, cor 400, tamanho 49",
    priceHint: "A partir de R$ 239,90",
    image: lacosteCard1,
    hoverImage: lacosteCard2,
    galleryImages: [lacoste1, lacoste2],
  },
  {
    id: "masc-05",
    name: "Axis Steel M5",
    category: "Masculino",
    description: "Visual executivo com linhas retas e alto conforto nasal.",
    priceHint: "A partir de R$ 249,90",
    ...buildAiSet("Axis Steel M5", "Masculino", 140),
  },
  {
    id: "masc-06",
    name: "Graphite One M6",
    category: "Masculino",
    description:
      "Modelo urbano em grafite com haste flexível para longas horas.",
    priceHint: "A partir de R$ 269,90",
    ...buildAiSet("Graphite One M6", "Masculino", 150),
  },
  {
    id: "fem-01",
    name: "Aurora Blue F1",
    category: "Feminino",
    description:
      "Formato gatinho contemporâneo com detalhes metálicos discretos.",
    priceHint: "A partir de R$ 179,90",
    ...buildAiSet("Aurora Blue F1", "Feminino", 200),
  },
  {
    id: "fem-02",
    name: "Luna Crystal F2",
    category: "Feminino",
    description: "Armação translúcida elegante para visual leve e sofisticado.",
    priceHint: "A partir de R$ 209,90",
    ...buildAiSet("Luna Crystal F2", "Feminino", 210),
  },
  {
    id: "fem-03",
    name: "Bella Light F3",
    category: "Feminino",
    description: "Design oval minimalista com encaixe delicado e confortável.",
    priceHint: "A partir de R$ 199,90",
    ...buildAiSet("Bella Light F3", "Feminino", 220),
  },
  {
    id: "fem-04",
    name: "Charm Rose F4",
    category: "Feminino",
    description: "Armação com toque rosado e hastes finas para uso cotidiano.",
    priceHint: "A partir de R$ 229,90",
    ...buildAiSet("Charm Rose F4", "Feminino", 230),
  },
  {
    id: "fem-05",
    name: "Velvet Cat F5",
    category: "Feminino",
    description: "Cat-eye moderno com acabamento leve e visual sofisticado.",
    priceHint: "A partir de R$ 259,90",
    ...buildAiSet("Velvet Cat F5", "Feminino", 240),
  },
  {
    id: "fem-06",
    name: "Diva Soft F6",
    category: "Feminino",
    description: "Armação slim com suporte confortável para uso prolongado.",
    priceHint: "A partir de R$ 279,90",
    ...buildAiSet("Diva Soft F6", "Feminino", 250),
  },
  {
    id: "solar-01",
    name: "Solar Edge S1",
    category: "Solar",
    description: "Lentes com proteção UV400 e visual moderno para o dia a dia.",
    priceHint: "A partir de R$ 149,90",
    ...buildAiSet("Solar Edge S1", "Solar", 300),
  },
  {
    id: "solar-02",
    name: "Sunline Polar S2",
    category: "Solar",
    description:
      "Modelo polarizado com contraste elevado para direção e praia.",
    priceHint: "A partir de R$ 229,90",
    ...buildAiSet("Sunline Polar S2", "Solar", 310),
  },
  {
    id: "solar-03",
    name: "Coast Mirror S3",
    category: "Solar",
    description: "Lente espelhada e proteção avançada para ambientes externos.",
    priceHint: "A partir de R$ 259,90",
    ...buildAiSet("Coast Mirror S3", "Solar", 320),
  },
  {
    id: "solar-04",
    name: "Drive Pro S4",
    category: "Solar",
    description: "Modelo com polarização de alta nitidez para direção diária.",
    priceHint: "A partir de R$ 279,90",
    ...buildAiSet("Drive Pro S4", "Solar", 330),
  },
  {
    id: "solar-05",
    name: "Ocean View S5",
    category: "Solar",
    description: "Lentes degradê com proteção total e estilo contemporâneo.",
    priceHint: "A partir de R$ 289,90",
    ...buildAiSet("Ocean View S5", "Solar", 340),
  },
  {
    id: "solar-06",
    name: "Street Sun S6",
    category: "Solar",
    description: "Formato quadrado com excelente cobertura lateral e conforto.",
    priceHint: "A partir de R$ 309,90",
    ...buildAiSet("Street Sun S6", "Solar", 350),
  },
  {
    id: "inf-01",
    name: "Kids Flex K1",
    category: "Infantil",
    description:
      "Armação flexível, resistente e confortável para rotina escolar.",
    priceHint: "A partir de R$ 119,90",
    image: infantil1,
    galleryImages: [infantil1],
  },
  {
    id: "inf-02",
    name: "Mini Pop K2",
    category: "Infantil",
    description:
      "Cores suaves e encaixe seguro para crianças em fase de adaptação.",
    priceHint: "A partir de R$ 129,90",
    image: infantil2,
    galleryImages: [infantil2],
  },
  {
    id: "inf-03",
    name: "Junior Neo K3",
    category: "Infantil",
    description: "Armação leve com ponte emborrachada para ajuste mais seguro.",
    priceHint: "A partir de R$ 139,90",
    image: infantil3,
    galleryImages: [infantil3],
  },
  {
    id: "inf-04",
    name: "Color Joy K4",
    category: "Infantil",
    description: "Modelo divertido com materiais resistentes para uso intenso.",
    priceHint: "A partir de R$ 149,90",
    image: infantil4,
    galleryImages: [infantil4],
  },
  {
    id: "inf-05",
    name: "Tiny Bright K5",
    category: "Infantil",
    description: "Modelo colorido e ultra leve para adaptação mais rápida.",
    priceHint: "A partir de R$ 159,90",
    image: infantil5,
    galleryImages: [infantil5],
  },
  {
    id: "inf-06",
    name: "Play Vision K6",
    category: "Infantil",
    description: "Estrutura reforçada com ótima resistência para uso diário.",
    priceHint: "A partir de R$ 169,90",
    image: infantil6,
    galleryImages: [infantil6],
  },
];

type ProductShowcaseProps = {
  whatsappNumber: string;
};

function getProductWhatsAppHref(whatsappNumber: string, productName: string) {
  const message = encodeURIComponent(
    `Olá! Gostaria de saber o valor e a disponibilidade do modelo ${productName} que vi no site.`,
  );

  return `https://wa.me/${whatsappNumber}?text=${message}`;
}

export default function ProductShowcase({
  whatsappNumber,
}: ProductShowcaseProps) {
  const [activeTab, setActiveTab] = useState<ProductCategory>("Masculino");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [viewerImages, setViewerImages] = useState<string[]>([]);
  const [viewerTitle, setViewerTitle] = useState("");
  const [viewerIndex, setViewerIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isMouseDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  const lastDragXRef = useRef(0);
  const lastDragTimeRef = useRef(0);
  const dragVelocityRef = useRef(0);
  const inertiaFrameRef = useRef<number | null>(null);

  const filteredProducts = useMemo(
    () => products.filter((product) => product.category === activeTab),
    [activeTab],
  );

  const isViewerOpen = viewerImages.length > 0;

  useEffect(() => {
    if (!sliderRef.current) {
      return;
    }

    sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
    setActiveIndex(0);
  }, [activeTab]);

  const scrollToCard = (index: number) => {
    if (!sliderRef.current) {
      return;
    }

    const cards = sliderRef.current.querySelectorAll("article");
    const targetCard = cards[index] as HTMLElement | undefined;
    if (!targetCard) {
      return;
    }

    sliderRef.current.scrollTo({
      left: targetCard.offsetLeft,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (
      !isAutoScrollEnabled ||
      isHovered ||
      isViewerOpen ||
      filteredProducts.length <= 1
    ) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => {
        const next = getLoopedIndex(current + 1, filteredProducts.length);
        scrollToCard(next);
        return next;
      });
    }, AUTO_SCROLL_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isAutoScrollEnabled, isHovered, isViewerOpen, filteredProducts.length]);

  useEffect(() => {
    if (!isViewerOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setViewerImages([]);
        return;
      }

      if (event.key === "ArrowRight") {
        setViewerIndex((current) =>
          getLoopedIndex(current + 1, Math.max(viewerImages.length, 1)),
        );
      }

      if (event.key === "ArrowLeft") {
        setViewerIndex((current) =>
          getLoopedIndex(current - 1, Math.max(viewerImages.length, 1)),
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isViewerOpen, viewerImages.length]);

  const openProductViewer = (product: Product) => {
    const images = product.galleryImages?.length
      ? product.galleryImages
      : product.hoverImage
        ? [product.image, product.hoverImage]
        : [product.image];

    if (images.length === 0) {
      return;
    }

    setViewerImages(images);
    setViewerTitle(product.name);
    setViewerIndex(0);
  };

  const closeViewer = () => {
    setViewerImages([]);
    setViewerTitle("");
    setViewerIndex(0);
  };

  const showPreviousImage = () => {
    setViewerIndex((current) =>
      getLoopedIndex(current - 1, Math.max(viewerImages.length, 1)),
    );
  };

  const showNextImage = () => {
    setViewerIndex((current) =>
      getLoopedIndex(current + 1, Math.max(viewerImages.length, 1)),
    );
  };

  const handleSliderScroll = () => {
    if (!sliderRef.current) {
      return;
    }

    const cards = Array.from(sliderRef.current.querySelectorAll("article"));
    if (cards.length === 0) {
      return;
    }

    const scrollLeft = sliderRef.current.scrollLeft;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const distance = Math.abs((card as HTMLElement).offsetLeft - scrollLeft);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    setActiveIndex(nearestIndex);
  };

  const scrollCards = (direction: "left" | "right") => {
    if (!sliderRef.current || filteredProducts.length === 0) {
      return;
    }

    const nextIndex =
      direction === "left"
        ? getLoopedIndex(activeIndex - 1, filteredProducts.length)
        : getLoopedIndex(activeIndex + 1, filteredProducts.length);

    setActiveIndex(nextIndex);
    scrollToCard(nextIndex);
  };

  const stopInertia = () => {
    if (inertiaFrameRef.current !== null) {
      window.cancelAnimationFrame(inertiaFrameRef.current);
      inertiaFrameRef.current = null;
    }
  };

  const startInertia = () => {
    if (!sliderRef.current) {
      return;
    }

    stopInertia();

    let velocity = dragVelocityRef.current;
    if (Math.abs(velocity) < INERTIA_MIN_START_SPEED) {
      return;
    }

    // Aplica inercia suave para manter o gesto natural apos soltar o mouse.
    const animate = () => {
      if (!sliderRef.current) {
        return;
      }

      sliderRef.current.scrollLeft -= velocity * 16;
      velocity *= INERTIA_FRICTION;

      if (Math.abs(velocity) > INERTIA_MIN_STOP_SPEED) {
        inertiaFrameRef.current = window.requestAnimationFrame(animate);
      } else {
        inertiaFrameRef.current = null;
      }
    };

    inertiaFrameRef.current = window.requestAnimationFrame(animate);
  };

  const stopMouseDrag = () => {
    const wasDragging = isMouseDraggingRef.current;

    isMouseDraggingRef.current = false;
    setIsDragging(false);

    if (wasDragging) {
      startInertia();
    }
  };

  const handleMouseDown = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current || event.button !== 0) {
      return;
    }

    // Ativa arraste apenas para mouse tradicional, evitando conflito com touch.
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    stopInertia();
    isMouseDraggingRef.current = true;
    setIsDragging(true);
    dragStartXRef.current = event.clientX;
    dragStartScrollLeftRef.current = sliderRef.current.scrollLeft;
    lastDragXRef.current = event.clientX;
    lastDragTimeRef.current = performance.now();
    dragVelocityRef.current = 0;
  };

  const handleMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current || !isMouseDraggingRef.current) {
      return;
    }

    const deltaX = event.clientX - dragStartXRef.current;
    sliderRef.current.scrollLeft = dragStartScrollLeftRef.current - deltaX;

    const now = performance.now();
    const timeDiff = now - lastDragTimeRef.current;

    if (timeDiff > 0) {
      const posDiff = event.clientX - lastDragXRef.current;
      dragVelocityRef.current = posDiff / timeDiff;
      lastDragXRef.current = event.clientX;
      lastDragTimeRef.current = now;
    }
  };

  useEffect(() => {
    return () => {
      stopInertia();
    };
  }, []);

  return (
    <section className="reveal-group mt-6 pt-16 sm:pt-0">
      <div className="reveal-item glass-card rounded-none sm:rounded-[2.5rem] p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
              Vitrine de Produtos
            </p>
            <h2 className="font-title mt-2 text-3xl font-bold text-zinc-900 dark:text-white">
              Escolha sua categoria
            </h2>
          </div>
        </div>

        <nav
          className="mt-6 flex flex-wrap gap-2"
          aria-label="Filtros de categoria"
        >
          {tabs.map((tab) => {
            const isActive = tab === activeTab;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                  isActive
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </nav>

        <div className="mt-4 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => setIsAutoScrollEnabled((current) => !current)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
              isAutoScrollEnabled
                ? "bg-teal-500 text-white dark:text-zinc-950"
                : "bg-slate-200 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300"
            }`}
          >
            Auto-scroll: {isAutoScrollEnabled ? "Ligado" : "Desligado"}
          </button>
        </div>

        <div className="mt-6 relative">
          <button
            type="button"
            onClick={() => scrollCards("left")}
            aria-label="Ver cards anteriores"
            className="hidden md:flex absolute -left-1 top-1/2 z-20 h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-zinc-900/45 text-white/90 shadow-md backdrop-blur-sm opacity-55 transition-all hover:scale-105 hover:bg-zinc-900/70 hover:opacity-100 dark:border-white/10 dark:bg-white/45 dark:text-zinc-900"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => scrollCards("right")}
            aria-label="Ver próximos cards"
            className="hidden md:flex absolute -right-1 top-1/2 z-20 h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-zinc-900/45 text-white/90 shadow-md backdrop-blur-sm opacity-55 transition-all hover:scale-105 hover:bg-zinc-900/70 hover:opacity-100 dark:border-white/10 dark:bg-white/45 dark:text-zinc-900"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div
            ref={sliderRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              stopMouseDrag();
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={stopMouseDrag}
            onScroll={handleSliderScroll}
            className={`flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden select-none ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
          >
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group min-w-65 sm:min-w-75 lg:min-w-[320px] snap-start overflow-hidden rounded-3xl border border-teal-900/10 bg-white/80 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-zinc-900/60"
              >
                <button
                  type="button"
                  onClick={() => openProductViewer(product)}
                  onMouseDown={(event) => event.stopPropagation()}
                  className="relative h-44 w-full overflow-hidden cursor-zoom-in"
                  aria-label={`Abrir visualizador de imagens do modelo ${product.name}`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className={`h-44 w-full object-cover transition-opacity duration-300 ${product.hoverImage ? "group-hover:opacity-0" : ""}`}
                  />
                  {product.hoverImage && (
                    <img
                      src={product.hoverImage}
                      alt={`${product.name} detalhe`}
                      loading="lazy"
                      className="absolute inset-0 h-44 w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  )}
                </button>

                <div className="space-y-3 p-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 dark:text-teal-400">
                      {product.category}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-zinc-900 dark:text-white">
                      {product.name}
                    </h3>
                  </div>

                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">
                    {product.priceHint}
                  </p>

                  <a
                    href={getProductWhatsAppHref(whatsappNumber, product.name)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-full bg-teal-500 px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-teal-400 dark:text-zinc-950"
                  >
                    Solicitar Orçamento
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-5 flex justify-center gap-2">
            {filteredProducts.map((product, index) => (
              <button
                key={`indicator-${product.id}`}
                type="button"
                onClick={() => {
                  setActiveIndex(index);
                  scrollToCard(index);
                }}
                aria-label={`Ir para ${product.name}`}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeIndex
                    ? "w-8 bg-teal-500 dark:bg-teal-400"
                    : "w-2.5 bg-slate-300 hover:bg-slate-400 dark:bg-zinc-700 dark:hover:bg-zinc-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {isViewerOpen && (
        <div
          className="fixed inset-0 z-120 flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Visualizador de imagens do produto"
          onClick={closeViewer}
        >
          <div
            className="relative w-full max-w-5xl rounded-3xl bg-zinc-950/90 p-4 sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeViewer}
              className="absolute right-3 top-3 z-20 h-10 w-10 rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Fechar visualizador"
            >
              ×
            </button>

            <p className="mb-3 pr-12 text-sm font-semibold text-zinc-100">
              {viewerTitle}
            </p>

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black">
              <img
                src={viewerImages[viewerIndex]}
                alt={`${viewerTitle} - imagem ${viewerIndex + 1}`}
                className="h-[56vh] w-full object-contain sm:h-[62vh]"
              />

              <button
                type="button"
                onClick={showPreviousImage}
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/75"
                aria-label="Imagem anterior"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={showNextImage}
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/75"
                aria-label="Próxima imagem"
              >
                ›
              </button>
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {viewerImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setViewerIndex(index)}
                  className={`overflow-hidden rounded-lg border transition-all ${
                    index === viewerIndex
                      ? "border-teal-400"
                      : "border-white/20 hover:border-white/40"
                  }`}
                  aria-label={`Selecionar imagem ${index + 1}`}
                >
                  <img
                    src={image}
                    alt={`Miniatura ${index + 1}`}
                    className="h-14 w-14 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
