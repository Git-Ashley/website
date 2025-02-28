import { getTranslations, setRequestLocale } from "next-intl/server";
import { BlurFade } from "@/components/ui/blur-fade";

type Props = {
  params: {locale: string};
};

export default async function Docs({ params }: Props) {
  const t = getTranslations('');
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <BlurFade>
      See <a className="underline text-blue-600" target="_blank" href="https://github.com/Git-Ashley/room-samples/blob/master/api-docs.md">API docs</a> on Github.
    </BlurFade>
  )
}