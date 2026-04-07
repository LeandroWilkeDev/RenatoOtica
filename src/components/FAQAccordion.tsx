import { useState } from "react";

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    id: "prazo",
    question: "Qual é o prazo médio de entrega dos óculos?",
    answer:
      "O prazo varia conforme o tipo de lente e tratamento escolhido, mas normalmente entregamos entre 3 e 7 dias úteis.",
  },
  {
    id: "exame",
    question: "Vocês realizam exame de vista na loja?",
    answer:
      "Sim. Oferecemos exame de vista com profissional parceiro e equipamentos digitais. Consulte disponibilidade de agenda via WhatsApp.",
  },
  {
    id: "garantia",
    question: "Como funciona a garantia dos produtos?",
    answer:
      "Nossas armações e lentes possuem garantia contra defeitos de fabricação. O prazo e cobertura variam por fabricante e são informados no atendimento.",
  },
  {
    id: "pagamento",
    question: "Quais formas de pagamento são aceitas?",
    answer:
      "Aceitamos PIX, cartões de débito e crédito, além de parcelamento em condições especiais conforme a campanha vigente.",
  },
];

export default function FAQAccordion() {
  const [openItem, setOpenItem] = useState<string | null>(faqs[0].id);

  const toggleItem = (id: string) => {
    setOpenItem((currentOpenItem) => (currentOpenItem === id ? null : id));
  };

  return (
    <section className="reveal-group mt-6 pt-16 sm:pt-0">
      <article className="reveal-item glass-card rounded-none sm:rounded-[2.5rem] p-8 sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
          FAQ
        </p>
        <h2 className="font-title mt-2 text-3xl font-bold text-zinc-900 dark:text-white">
          Perguntas Frequentes
        </h2>

        <div className="mt-6 space-y-3">
          {faqs.map((item) => {
            const isOpen = openItem === item.id;

            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white/80 dark:border-white/10 dark:bg-zinc-900/60"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.question}
                  </span>
                  <span className="text-xl leading-none text-teal-600 dark:text-teal-400">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </article>
    </section>
  );
}
