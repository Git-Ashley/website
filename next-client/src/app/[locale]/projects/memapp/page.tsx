import { BlurFade } from "@/components/ui/blur-fade";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";

type Props = {
  params: Promise<{locale: string}>;
};

export default async function Memapp({ params }: Props) {
  const t = await getTranslations('');
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <BlurFade>
      <section className="container">
        <div className="col-md-10 col-md-offset-1">
          <div className="text-center text-[23px]/[30px] font-medium">Memapp</div>
          <br/>

          <Image width={900} height={634} alt="Memapp demo" src="/images/memapp-screenshot.png" />
          <br />
          <br />
          <p>{t('MEMAPP_DESCRIPTION')}</p>

          <br />
          <br/>Git: <a className="text-blue-500 underline" href="https://github.com/Git-Ashley/playlist/tree/japanese" target="_blank">https://github.com/Git-Ashley/playlist/tree/japanese</a>.
        </div>
      </section>
    </BlurFade>
  )
}

// 1365x959