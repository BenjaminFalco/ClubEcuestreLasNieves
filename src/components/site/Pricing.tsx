import { useState } from "react";
import { Check } from "lucide-react";
import { boarding, clp, legalNotices, pricingPlans, pricingProvisional, type Plan } from "@/content/site";
import { WhatsAppLink } from "./WhatsApp";

const freqs = [
  { perWeek: 1, label: "Una vez por semana" },
  { perWeek: 2, label: "Dos veces por semana" },
  { perWeek: 3, label: "Tres veces por semana" },
];

function PlanCard({ plan, highlighted }: { plan: Plan; highlighted?: boolean }) {
  return (
    <article className={`relative flex flex-col border p-7 transition-colors ${highlighted ? "border-primary bg-primary text-primary-foreground" : "bg-card"}`}>
      {highlighted && <span className="absolute -top-3 left-7 bg-accent px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-accent-foreground">Sugerido para usted</span>}
      <h3 className="text-2xl">{plan.name}</h3>
      <p className={`mt-1 text-sm ${highlighted ? "opacity-80" : "text-muted-foreground"}`}>{plan.detail}</p>
      <p className="mt-6 font-display text-4xl">{clp(plan.price)}</p>
      <p className={`text-xs uppercase tracking-[0.18em] ${highlighted ? "opacity-70" : "text-muted-foreground"}`}>{plan.unit}</p>
      <ul className="mt-6 flex-1 space-y-2 text-sm">
        {plan.includes.map((i) => <li key={i} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-leather" />{i}</li>)}
      </ul>
      <WhatsAppLink message={`Hola, me interesa el ${plan.name}. ¿Podrían darme más información?`}
        className={`mt-7 justify-center ${highlighted ? "btn-ghost" : "btn-primary"}`}>Consultar este plan</WhatsAppLink>
    </article>
  );
}

export function PricingSection() {
  const [tab, setTab] = useState<"clases" | "pension">("clases");
  const [perWeek, setPerWeek] = useState<number | null>(null);
  const needed = perWeek ? perWeek * 4 : null;
  const monthly = pricingPlans.filter((p) => p.unit === "mensual");
  const suggested = needed ? monthly.find((p) => (p.classesPerMonth ?? 0) === needed)?.id : null;

  return (
    <section id="tarifas" className="bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">Tarifas</p>
            <h2 className="mt-4 text-5xl leading-[1.05] lg:text-6xl">Planes pensados para<br /><em>cada ritmo de aprendizaje</em></h2>
          </div>
          <div role="tablist" aria-label="Categorías de tarifas" className="flex border lg:col-span-5 lg:justify-self-end">
            {([["clases", "Clases y planes"], ["pension", "Pensión equina"]] as const).map(([id, label]) => (
              <button key={id} role="tab" aria-selected={tab === id} aria-controls={`panel-${id}`} id={`tab-${id}`}
                onClick={() => setTab(id)}
                className={`px-6 py-3 text-sm transition-colors ${tab === id ? "bg-primary text-primary-foreground" : "hover:bg-card"}`}>{label}</button>
            ))}
          </div>
        </div>

        {pricingProvisional && <p className="mt-6 text-sm italic text-accent">{legalNotices.prices}</p>}

        {tab === "clases" ? (
          <div id="panel-clases" role="tabpanel" aria-labelledby="tab-clases" className="mt-12">
            <fieldset className="border bg-card p-6 lg:flex lg:items-center lg:gap-8">
              <legend className="sr-only">¿Con qué frecuencia le gustaría montar?</legend>
              <p className="font-display text-xl lg:w-64" aria-hidden>¿Con qué frecuencia le gustaría montar?</p>
              <div className="mt-4 flex flex-wrap gap-2 lg:mt-0">
                {freqs.map((f) => (
                  <label key={f.perWeek} className={`cursor-pointer border px-4 py-2.5 text-sm transition-colors ${perWeek === f.perWeek ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary"}`}>
                    <input type="radio" name="freq" className="sr-only" checked={perWeek === f.perWeek} onChange={() => setPerWeek(f.perWeek)} />
                    {f.label}
                  </label>
                ))}
              </div>
              <p aria-live="polite" className="mt-4 text-sm text-muted-foreground lg:mt-0 lg:ml-auto lg:max-w-xs">
                {needed ? `≈ ${needed} clases en un mes de referencia de 4 semanas.` : "Seleccione una frecuencia para ver el plan sugerido."}
                {" "}Es una guía: horarios y plan final se confirman con el club.
              </p>
            </fieldset>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {pricingPlans.map((p) => <PlanCard key={p.id} plan={p} highlighted={suggested === p.id} />)}
            </div>
          </div>
        ) : (
          <div id="panel-pension" role="tabpanel" aria-labelledby="tab-pension" className="mt-12 grid gap-8 lg:grid-cols-2">
            <PlanCard plan={boarding} />
            <div className="self-center text-muted-foreground">
              <p className="font-display text-3xl text-foreground">Su caballo, en buenas manos.</p>
              <p className="mt-4 leading-relaxed">Las condiciones específicas de la pensión —alimentación, horarios de acceso y uso de espacios— se acuerdan directamente con el club.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
