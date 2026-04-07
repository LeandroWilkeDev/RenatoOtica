type PrescriptionBannerProps = {
  whatsappNumber: string;
};

export default function PrescriptionBanner({
  whatsappNumber,
}: PrescriptionBannerProps) {
  const message = encodeURIComponent(
    "Olá! Já tenho minha receita médica e quero enviar uma foto para receber um orçamento técnico.",
  );

  return (
    <section className="reveal-group mt-6 pt-16 sm:pt-0">
      <article className="reveal-item relative overflow-hidden rounded-none sm:rounded-[2.5rem] border border-teal-500/30 bg-gradient-to-r from-slate-50 via-white to-slate-100 p-8 shadow-lg dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800 dark:border-teal-400/30">
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-teal-500/20 blur-[90px]" />
        <div className="relative flex flex-col items-start gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-title text-3xl font-extrabold text-zinc-900 dark:text-white">
              Já possui sua receita médica?
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-700 dark:text-zinc-300">
              Envie uma foto agora e receba um orçamento técnico personalizado
              via WhatsApp.
            </p>
          </div>

          <a
            href={`https://wa.me/${whatsappNumber}?text=${message}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-7 py-3.5 text-sm font-bold text-white transition-all hover:scale-105 hover:bg-teal-500 dark:bg-white dark:text-zinc-950 dark:hover:bg-teal-400"
          >
            Enviar Receita agora
          </a>
        </div>
      </article>
    </section>
  );
}
