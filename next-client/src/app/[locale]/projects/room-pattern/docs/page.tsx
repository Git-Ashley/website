import { getTranslations, setRequestLocale } from "next-intl/server";
import { BlurFade } from "@/components/ui/blur-fade";

type Props = {
  params: Promise<{locale: string}>;
};

export default async function Docs({ params }: Props) {
  const t = await getTranslations('roomdocs');
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <BlurFade>
      {t("LINE_1")} <a className="underline text-blue-600" target="_blank" href="https://github.com/Git-Ashley/room-samples/blob/master/api-docs.md">{t("LINE_2")}</a> {t("LINE_3")}.
    </BlurFade>
  )
}