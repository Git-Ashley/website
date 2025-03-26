import { BlurFade } from "@/components/ui/blur-fade";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { Placeholder } from "../project-placeholder";

type Props = {
  params: Promise<{locale: string}>;
};

export default async function ApAlgorithm({ params }: Props) {
  const t = await getTranslations('appage');
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Suspense fallback={<Placeholder/>}>
      <BlurFade className="max-w-[800px] mx-auto">
        <p>{t("LINE_1")}</p>
        <br/>{t("LINE_2")}
        <br/>1. {t("LINE_3")} <a className="text-blue-600" target="_blank" href="https://en.wikipedia.org/wiki/Biconnected_graph">{t("LINE_4")}</a> {t("LINE_5")}
        <br/>2. {t("LINE_6")}
        <br/>3. {t("LINE_7")}
        <br/>
        <br/>{t("LINE_8")} <a className="underline text-blue-500" href="/GraphAlgorithms.jar">GraphAlgorithms.jar</a>
        <br/>{t("LINE_9")}
        <br/><a href="https://github.com/Git-Ashley/Graph-Theory-Algorithms/blob/master/src/Algorithms/AuslanderParter.java"><u>{t("LINE_11")}</u></a> {t("LINE_10")}
        <br/>
        <br/>{t("LINE_12")}
        <br/>
        {locale === "fr" && (
          <div className="text-red-500">{"La thèse n'est pas disponible en français"}</div>
        )}
        <object height="1000" width="800" data="/Auslander-Parter.pdf"></object>
      </BlurFade>
    </Suspense>
  )
}