// Contenido central del sitio. Edite aquí sin tocar componentes.
// `provisional: true` = contenido de demostración pendiente de aprobación del club.
import logoAsset from "@/assets/logo-las-nieves.jpg.asset.json";
import hero from "@/assets/hero.jpg";
import polo from "@/assets/polo.jpg";
import stable from "@/assets/stable.jpg";
import lesson from "@/assets/lesson.jpg";

export const brand = {
  name: "Ecuestre Las Nieves",
  tagline: "Club de Polo & Equitación",
  logo: logoAsset.url,
  provider: "FalcoDevs",
};

// Deje en null lo que el club aún no confirma: el sitio mostrará un estado "pendiente".
export const contact = {
  whatsapp: null as string | null, // ej. "56912345678" (solo dígitos)
  phone: null as string | null,
  email: null as string | null,
  address: null as string | null,
  hours: null as string | null,
  mapUrl: null as string | null,
};

export const socialLinks = {
  instagram: null as string | null,
  facebook: null as string | null,
};

export const campaign = { utmSource: "sitio-web" };

export const navigation = [
  { id: "inicio", label: "Inicio" },
  { id: "club", label: "El Club" },
  { id: "clases", label: "Clases" },
  { id: "tarifas", label: "Tarifas" },
  { id: "instalaciones", label: "Instalaciones" },
  { id: "pension", label: "Pensión Equina" },
  { id: "contacto", label: "Contacto" },
];

export const images = { hero, polo, stable, lesson };

export const services = [
  {
    id: "equitacion",
    eyebrow: "01",
    title: "Clases de equitación",
    text: "Clases guiadas para quienes dan sus primeros pasos y para jinetes que buscan perfeccionar su técnica, con foco en la seguridad y el vínculo con el caballo.",
    points: ["Clases individuales", "Caballo y equipo incluidos", "Todas las edades"],
    image: lesson,
    provisional: true,
    enabled: true,
  },
  {
    id: "polo",
    eyebrow: "02",
    title: "Polo",
    text: "Una introducción al polo desde la monta y el manejo del taco, para descubrir un deporte de tradición, estrategia y trabajo en equipo.",
    points: ["Iniciación al polo", "Práctica en cancha", "Ambiente de club"],
    image: polo,
    provisional: true,
    enabled: true,
  },
  {
    id: "pension",
    eyebrow: "03",
    title: "Pensión equina",
    text: "Un espacio para el cuidado diario de su caballo, con supervisión, alimentación y acceso a los espacios de práctica según condiciones del club.",
    points: ["Box individual", "Forraje diario", "Supervisión"],
    image: stable,
    provisional: true,
    enabled: true,
  },
];

export type Plan = {
  id: string;
  name: string;
  price: number;
  unit: string;
  classesPerMonth?: number;
  detail: string;
  includes: string[];
};

export const pricingPlans: Plan[] = [
  { id: "individual", name: "Clase Individual", price: 40000, unit: "por clase", classesPerMonth: 1, detail: "Duración aproximada de 60 minutos.", includes: ["Equipo básico de monta", "Caballo y montura", "Picadero", "Instructor"] },
  { id: "esencial", name: "Plan Esencial", price: 120000, unit: "mensual", classesPerMonth: 4, detail: "4 clases al mes.", includes: ["Caballo y montura", "Picadero", "Instructor"] },
  { id: "plus", name: "Plan Plus", price: 200000, unit: "mensual", classesPerMonth: 8, detail: "8 clases al mes.", includes: ["Caballo y montura", "Picadero", "Instructor"] },
  { id: "premium", name: "Plan Premium", price: 280000, unit: "mensual", classesPerMonth: 12, detail: "12 clases al mes.", includes: ["Caballo y montura", "Picadero", "Instructor"] },
];

export const boarding: Plan = {
  id: "pension", name: "Pensión Equina", price: 330000, unit: "mensual",
  detail: "Cuidado integral para su caballo.",
  includes: ["Box individual", "Forraje diario", "Supervisión", "4 clases al mes", "Acceso al picadero según condiciones"],
};

export const pricingProvisional = true;

export const gallery = [
  { src: hero, alt: "Jinete en picadero con cordillera al fondo", category: "Canchas y espacios de práctica" },
  { src: stable, alt: "Caballo asomado desde su box", category: "Caballos y cuidado diario" },
  { src: lesson, alt: "Instructora acompañando a una alumna a caballo", category: "Clases y aprendizaje" },
  { src: polo, alt: "Jugador de polo en plena jugada", category: "Polo y actividades ecuestres" },
];
export const galleryIsIllustrative = true;

export const instructors: { name: string; role: string; photo?: string }[] = []; // vacío = sección oculta

export const legalNotices = {
  prices: "Valores de referencia sujetos a confirmación.",
  images: "Imágenes ilustrativas. Serán reemplazadas por fotografías oficiales del club.",
  privacy: "Usaremos sus datos solo para responder esta consulta. No se comparten con terceros.",
};

export const clp = (n: number) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(n);

export function whatsappUrl(message: string, source = campaign.utmSource) {
  if (!contact.whatsapp) return null;
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(`${message}\n\n(origen: ${source})`)}`;
}
