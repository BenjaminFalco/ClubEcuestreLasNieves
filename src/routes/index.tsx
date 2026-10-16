import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Instagram, Facebook, MapPin, Phone, Mail, Clock, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/site/Header";
import { WhatsAppLink } from "@/components/site/WhatsApp";
import { PricingSection } from "@/components/site/Pricing";
import { InquiryForm } from "@/components/site/InquiryForm";
import { brand, contact, gallery, galleryIsIllustrative, images, instructors, legalNotices, services, socialLinks } from "@/content/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ecuestre Las Nieves — Club de Polo & Equitación" },
      { name: "description", content: "Clases de equitación, polo, planes mensuales y pensión equina en Ecuestre Las Nieves. Consulte por WhatsApp." },
      { property: "og:title", content: "Ecuestre Las Nieves — Club de Polo & Equitación" },
      { property: "og:description", content: "Pasión, técnica y tradición ecuestre. Clases, polo y pensión equina." },
    ],
  }),
  component: Index,
});

function Pending({ label }: { label: string }) {
  return <span className="italic text-muted-foreground">{label} — pendiente de confirmación</span>;
}

async function share() {
  const data = { title: brand.name, url: window.location.href };
  try {
    if (navigator.share) { await navigator.share(data); return; }
    await navigator.clipboard.writeText(data.url);
    toast("Enlace copiado al portapapeles");
  } catch { /* cancelado por el usuario */ }
}

function Index() {
  const visibleServices = services.filter((s) => s.enabled);
  return (
    <>
      <SiteHeader />
      <main>
        {/* HERO */}
        <section id="inicio" className="relative flex min-h-[100svh] items-end overflow-hidden">
          <img src={images.hero} alt="Jinete en un picadero frente a la cordillera nevada al atardecer" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
          <div className="hero-scrim absolute inset-0" />
          <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-32 text-primary-foreground lg:px-10 lg:pb-28">
            <p className="eyebrow rise text-primary-foreground/80">{brand.tagline}</p>
            <h1 className="rise mt-6 max-w-3xl text-6xl leading-[0.95] sm:text-7xl lg:text-8xl">Pasión, Técnica<br />y <em className="text-leather">Tradición</em> Ecuestre</h1>
            <p className="rise mt-8 max-w-xl text-lg leading-relaxed opacity-90">Un espacio para descubrir, desarrollar y vivir la equitación, el polo y el vínculo con los caballos.</p>
            <div className="rise mt-10 flex flex-wrap gap-4">
              <WhatsAppLink message="Hola, quisiera consultar por una clase de equitación." className="btn-primary">Consultar por una clase <ArrowRight className="h-4 w-4" /></WhatsAppLink>
              <a href="#tarifas" className="btn-ghost">Explorar clases y tarifas</a>
            </div>
          </div>
        </section>

        {/* CLUB */}
        <section id="club" className="py-24 lg:py-36">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-12 lg:px-10">
            <div className="lg:col-span-5">
              <p className="eyebrow">El Club</p>
              <h2 className="mt-4 text-5xl leading-[1.05] lg:text-6xl">Donde el caballo<br /><em>marca el ritmo</em></h2>
              <div className="mt-10 flex h-40 w-40 items-center justify-center rounded-full bg-card p-2 ring-1 ring-border">
                <img src={brand.logo} alt="Emblema oficial Ecuestre Las Nieves" width={150} height={150} loading="lazy" className="h-full w-full object-contain" />
              </div>
            </div>
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground lg:col-span-6 lg:col-start-7 lg:pt-16">
              <p className="font-display text-3xl leading-snug text-foreground">Ecuestre Las Nieves es un club dedicado a la equitación y el polo, rodeado de naturaleza y pensado para aprender con calma, disciplina y respeto.</p>
              <p>Recibimos a quienes se acercan por primera vez a los caballos y a jinetes que buscan seguir creciendo. Cada clase pone en el centro el bienestar del animal, la seguridad del alumno y el gusto por compartir en comunidad.</p>
              <p className="text-sm italic">Texto de presentación provisional, sujeto a revisión por el club.</p>
            </div>
          </div>
        </section>

        {/* SERVICIOS */}
        <section id="clases" className="border-t">
          {visibleServices.map((s, i) => (
            <article key={s.id} id={s.id === "pension" ? "pension" : undefined} className="border-b">
              <div className={`mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-28`}>
                <div className={`lg:col-span-6 ${i % 2 ? "lg:order-2 lg:col-start-7" : ""}`}>
                  <img src={s.image} alt={s.title} width={1280} height={1600} loading="lazy" className="aspect-[4/5] w-full object-cover" />
                </div>
                <div className={`lg:col-span-5 ${i % 2 ? "lg:order-1" : "lg:col-start-8"}`}>
                  <p className="font-display text-6xl text-leather">{s.eyebrow}</p>
                  <h2 className="mt-4 text-4xl lg:text-5xl">{s.title}</h2>
                  <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{s.text}</p>
                  <ul className="mt-8 divide-y border-y">
                    {s.points.map((p) => <li key={p} className="py-3 text-sm uppercase tracking-[0.14em]">{p}</li>)}
                  </ul>
                  <div className="mt-8 flex flex-wrap items-center gap-5">
                    <WhatsAppLink message={`Hola, quisiera información sobre ${s.title.toLowerCase()}.`} className="btn-primary">Consultar <ArrowRight className="h-4 w-4" /></WhatsAppLink>
                    <a href="#tarifas" className="text-sm underline underline-offset-4">Ver tarifas</a>
                  </div>
                  {s.provisional && <p className="mt-6 text-xs italic text-muted-foreground">Servicio en demostración, pendiente de confirmación.</p>}
                </div>
              </div>
            </article>
          ))}
        </section>

        <PricingSection />

        {/* INSTALACIONES */}
        <section id="instalaciones" className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-10">
            <p className="eyebrow">Instalaciones</p>
            <h2 className="mt-4 max-w-2xl text-5xl leading-[1.05]">Espacios para practicar,<br /><em>aprender y compartir</em></h2>
            <div className="mt-14 grid gap-4 md:grid-cols-4 md:grid-rows-2">
              {gallery.map((g, i) => (
                <figure key={g.alt} className={`group relative overflow-hidden ${i === 0 ? "md:col-span-2 md:row-span-2" : i === 3 ? "md:col-span-2" : ""}`}>
                  <img src={g.src} alt={g.alt} loading="lazy" className="h-full min-h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <figcaption className="absolute bottom-0 left-0 bg-background/90 px-4 py-2 text-xs uppercase tracking-[0.16em]">{g.category}</figcaption>
                </figure>
              ))}
            </div>
            {galleryIsIllustrative && <p className="mt-4 text-xs italic text-muted-foreground">{legalNotices.images}</p>}
          </div>
        </section>

        {instructors.length > 0 && (
          <section aria-label="Instructores" className="py-24">{/* Se activa al cargar perfiles aprobados */}</section>
        )}

        {/* SOCIAL */}
        <section className="bg-primary py-20 text-primary-foreground">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 lg:flex-row lg:items-center lg:justify-between lg:px-10">
            <div>
              <p className="eyebrow text-leather">Comunidad</p>
              <h2 className="mt-3 text-4xl">Siga la vida del club</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {([["Instagram", socialLinks.instagram, Instagram], ["Facebook", socialLinks.facebook, Facebook]] as const).map(([label, url, Icon]) =>
                url ? (
                  <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="btn-ghost"><Icon className="h-4 w-4" />{label}</a>
                ) : (
                  <span key={label} className="btn-ghost cursor-default opacity-60" title="Enlace pendiente de configuración"><Icon className="h-4 w-4" />{label} · pendiente</span>
                ))}
              <button type="button" onClick={share} className="btn-ghost"><Share2 className="h-4 w-4" />Compartir</button>
            </div>
          </div>
        </section>

        {/* CONTACTO */}
        <section id="contacto" className="py-24 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-16 px-5 lg:grid-cols-12 lg:px-10">
            <div className="lg:col-span-4">
              <p className="eyebrow">Contacto</p>
              <h2 className="mt-4 text-5xl leading-[1.05]">Conversemos sobre<br /><em>su próxima clase</em></h2>
              <ul className="mt-10 space-y-5 text-sm">
                <li className="flex gap-3"><Phone className="h-4 w-4 text-accent" />{contact.phone ?? <Pending label="Teléfono" />}</li>
                <li className="flex gap-3"><Mail className="h-4 w-4 text-accent" />{contact.email ? <a href={`mailto:${contact.email}`}>{contact.email}</a> : <Pending label="Correo" />}</li>
                <li className="flex gap-3"><MapPin className="h-4 w-4 text-accent" />{contact.address ?? <Pending label="Dirección" />}</li>
                <li className="flex gap-3"><Clock className="h-4 w-4 text-accent" />{contact.hours ?? <Pending label="Horarios" />}</li>
              </ul>
              <WhatsAppLink message="Hola, quisiera hacer una consulta sobre el club." className="btn-primary mt-10">Consultar por WhatsApp</WhatsAppLink>
            </div>
            <div className="lg:col-span-7 lg:col-start-6"><InquiryForm /></div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-secondary">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between lg:px-10">
          <div className="flex items-center gap-3">
            <img src={brand.logo} alt="" width={36} height={36} loading="lazy" className="h-9 w-9 rounded-full bg-card" />
            <span>© {new Date().getFullYear()} {brand.name}. Marca y contenidos oficiales propiedad del club.</span>
          </div>
          <span>Prototipo diseñado y desarrollado por {brand.provider}</span>
        </div>
      </footer>
      <Toaster />
    </>
  );
}
