import type { ReactNode } from "react";
import { toast } from "sonner";
import { whatsappUrl } from "@/content/site";

/** Abre WhatsApp con mensaje prellenado; si no hay número configurado, muestra aviso de demostración. */
export function WhatsAppLink({ message, className, children }: { message: string; className?: string; children: ReactNode }) {
  const url = whatsappUrl(message);
  if (url) {
    return <a href={url} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>;
  }
  return (
    <button type="button" className={className}
      onClick={() => toast("Modo demostración", { description: "El número oficial de WhatsApp del club aún no está configurado." })}>
      {children}
    </button>
  );
}
