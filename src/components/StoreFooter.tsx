type StoreFooterProps = {
  mapsUrl: string;
};

export default function StoreFooter({ mapsUrl }: StoreFooterProps) {
  return (
    <footer className="reveal-group mt-6 border-t border-slate-200 px-6 py-10 text-center text-sm text-slate-600 dark:border-white/5 dark:text-zinc-400">
      <div className="reveal-item mx-auto flex max-w-4xl flex-col items-center gap-2">
        <p className="font-title text-lg font-semibold text-zinc-900 dark:text-white">
          Renato Óculos - Jaboatão dos Guararapes
        </p>
        <p>
          Avenida Barretos De Menezes, 628 - E - Prazeres, Jaboatão dos
          Guararapes - PE, 54310-310
        </p>
        <p>Segunda a Sexta: 08h às 17h | Sábado: 08h às 13h</p>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex rounded-full border border-teal-500/40 px-5 py-2 text-sm font-semibold text-teal-700 transition-all hover:bg-teal-500 hover:text-white dark:text-teal-300"
        >
          Ver no Google Maps
        </a>
        <p className="mt-3 text-xs text-slate-500 dark:text-zinc-500">
          © {new Date().getFullYear()} Renato Óculos
        </p>
      </div>
    </footer>
  );
}
