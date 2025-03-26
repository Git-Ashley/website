"use client"
import { Link } from "@/src/i18n/routing";
import { useLocale } from "next-intl";

export default function LobbyLoading() {
  const locale = useLocale();
  return (
    <div className="px-10 pt-5">
      {locale === "fr" ?
        "Cette démonstration nécessite un serveur qui n'est pas disponible pour le moment. Veuillez demander à Ashley d'activer le serveur pour une démonstration du site. Pour l'instant, vous pouvez consulter une version hors ligne "
        : "This demo requires a server which is not available at this time. Please ask Ashley to switch the server on for a site demo. For now, you can view a less interactive version "}

      <Link className="text-blue-500" locale={locale} href="/projects/social-app/lobby-test">{locale === "fr" ? "ici" : "here"}</Link>
    </div>
  );
}