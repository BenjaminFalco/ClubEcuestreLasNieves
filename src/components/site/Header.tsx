import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { brand, navigation } from "@/content/site";
import { WhatsAppLink } from "./WhatsApp";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navigation.forEach((n) => { const el = document.getElementById(n.id); if (el) obs.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); obs.disconnect(); };
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled || open ? "bg-background/95 backdrop-blur border-b" : "bg-transparent"}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 lg:px-10">
        <a href="#inicio" className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-card ring-1 ring-border">
            <img src={brand.logo} alt="Logo oficial Ecuestre Las Nieves" width={48} height={48} className="h-full w-full object-contain" />
          </span>
          <span className={`hidden leading-tight sm:block ${scrolled || open ? "text-foreground" : "text-primary-foreground"}`}>
            <span className="block font-display text-xl">{brand.name}</span>
            <span className="block text-[0.65rem] uppercase tracking-[0.2em] opacity-75">{brand.tagline}</span>
          </span>
        </a>
        <nav aria-label="Principal" className="hidden xl:block">
          <ul className={`flex gap-7 text-sm ${scrolled ? "text-foreground" : "text-primary-foreground"}`}>
            {navigation.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} aria-current={active === n.id ? "true" : undefined}
                  className={`border-b pb-1 transition-colors hover:border-current ${active === n.id ? "border-current" : "border-transparent"}`}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <WhatsAppLink message="Hola, quisiera hacer una consulta sobre el club." className="btn-primary hidden md:inline-flex">
            <MessageCircle className="h-4 w-4" /> Consultar por WhatsApp
          </WhatsAppLink>
          <button type="button" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
            className={`p-2 xl:hidden ${scrolled || open ? "text-foreground" : "text-primary-foreground"}`}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Móvil" className="border-t bg-background px-5 pb-8 xl:hidden">
          <ul className="divide-y">
            {navigation.map((n) => (
              <li key={n.id}><a href={`#${n.id}`} onClick={() => setOpen(false)} className="block py-4 font-display text-2xl">{n.label}</a></li>
            ))}
          </ul>
          <WhatsAppLink message="Hola, quisiera hacer una consulta sobre el club." className="btn-primary mt-6 w-full justify-center">
            <MessageCircle className="h-4 w-4" /> Consultar por WhatsApp
          </WhatsAppLink>
        </nav>
      )}
    </header>
  );
}
