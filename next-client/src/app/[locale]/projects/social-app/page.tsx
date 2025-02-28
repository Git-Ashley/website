import { BlurFade } from "@/components/ui/blur-fade";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: {locale: string};
};

export default async function SocialApp({ params }: Props) {
  const t = getTranslations('');
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <BlurFade>
      Social App
    </BlurFade>
  )
}