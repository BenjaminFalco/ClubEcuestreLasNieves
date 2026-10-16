import { useState } from "react";
import { z } from "zod";
import { legalNotices } from "@/content/site";

const interests = ["Clases de equitación", "Polo", "Planes mensuales", "Pensión equina", "Otra consulta"];

const schema = z.object({
  name: z.string().trim().min(2, "Ingrese su nombre").max(100),
  phone: z.string().trim().regex(/^\+?[\d\s]{8,15}$/, "Ingrese un teléfono válido, ej. +56 9 1234 5678"),
  email: z.union([z.literal(""), z.string().trim().email("Correo no válido").max(255)]),
  interest: z.string().min(1, "Seleccione un interés"),
  schedule: z.string().max(100),
  message: z.string().max(1000, "Máximo 1000 caracteres"),
  consent: z.literal(true, { errorMap: () => ({ message: "Debe aceptar el uso de sus datos" }) }),
  website: z.string().max(0), // honeypot anti-spam
});

type Status = "idle" | "loading" | "demo";

const field = "mt-2 w-full border bg-card px-4 py-3 text-base outline-none transition-colors focus:border-primary";

export function InquiryForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = { ...Object.fromEntries(fd), consent: fd.get("consent") === "on" };
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => { errs[String(i.path[0])] ??= i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("loading");
    // Prototipo: no se envía ni almacena nada. Conectar a un servicio real antes de producción.
    setTimeout(() => setStatus("demo"), 700);
  }

  if (status === "demo") {
    return (
      <div role="status" className="border border-accent bg-card p-8">
        <p className="eyebrow">Modo demostración</p>
        <p className="mt-3 font-display text-3xl">Formulario validado correctamente</p>
        <p className="mt-3 text-muted-foreground">En este prototipo la consulta <strong>no fue enviada</strong> al club ni se guardaron sus datos. En la versión final llegará directamente al equipo del club.</p>
        <button type="button" onClick={() => setStatus("idle")} className="btn-primary mt-6">Volver al formulario</button>
      </div>
    );
  }

  const err = (k: string) => errors[k] && <p id={`${k}-err`} className="mt-1 text-sm text-destructive">{errors[k]}</p>;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <label className="text-sm">Nombre *<input name="name" autoComplete="name" aria-invalid={!!errors["name"]} aria-describedby="name-err" className={field} />{err("name")}</label>
      <label className="text-sm">Teléfono o WhatsApp *<input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+56 9" aria-invalid={!!errors["phone"]} aria-describedby="phone-err" className={field} />{err("phone")}</label>
      <label className="text-sm">Correo (opcional)<input name="email" type="email" autoComplete="email" aria-invalid={!!errors["email"]} aria-describedby="email-err" className={field} />{err("email")}</label>
      <label className="text-sm">Interés *
        <select name="interest" defaultValue="" aria-invalid={!!errors["interest"]} aria-describedby="interest-err" className={field}>
          <option value="" disabled>Seleccione…</option>
          {interests.map((i) => <option key={i}>{i}</option>)}
        </select>{err("interest")}
      </label>
      <label className="text-sm sm:col-span-2">Día u horario preferido<input name="schedule" placeholder="Ej. sábados en la mañana" className={field} /></label>
      <label className="text-sm sm:col-span-2">Mensaje<textarea name="message" rows={4} className={field} />{err("message")}</label>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <label className="flex gap-3 text-sm text-muted-foreground sm:col-span-2">
        <input type="checkbox" name="consent" className="mt-1 accent-primary" aria-describedby="consent-err" />
        <span>{legalNotices.privacy}{err("consent")}</span>
      </label>
      <div className="sm:col-span-2">
        <button type="submit" disabled={status === "loading"} className="btn-primary disabled:opacity-60">
          {status === "loading" ? "Enviando…" : "Enviar consulta"}
        </button>
      </div>
    </form>
  );
}
