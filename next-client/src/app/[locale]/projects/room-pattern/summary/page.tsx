import { Link } from "@/src/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BlurFade } from "@/components/ui/blur-fade";
import { Suspense } from "react";
import { Placeholder } from "../../project-placeholder";

type Props = {
  params: Promise<{locale: string}>;
};

export default async function RoomPatternPage({ params }: Props) {
  const t = await getTranslations('roomsummary');
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Suspense fallback={<Placeholder/>}>
      <BlurFade className="[&_a]:underline [&_a]:text-blue-500">
        <h2 style={{textAlign: 'center'}}><b>{t("TITLE")}</b></h2>

        <p>
        {t("LINE_1")}

        <br/><br/>Client Room git repo: <a href="https://github.com/Git-Ashley/client-room" target="_blank">https://github.com/Git-Ashley/client-room</a>
        <br/>Server Room git repo: <a href="https://github.com/Git-Ashley/server-room" target="_blank">https://github.com/Git-Ashley/server-room</a>
        </p>

        <br/>
        <h3><b>{t("TITLE_4")}</b></h3>
        <p>
        {t("LINE_2")} <Link locale={locale} href='/projects/room-pattern/samples'>{t("LINE_3")}</Link>. {t("LINE_4")} <a href="https://github.com/Git-Ashley/room-samples/blob/master/api-docs.md#class-room" target="_blank">Room</a>, {t("LINE_5")} <a href="https://github.com/Git-Ashley/room-samples/blob/master/api-docs.md#client-side-module" target="_blank">{t("LINE_6")}</a> {t("LINE_7")}
        </p>
        <p>
        {t("LINE_8")} <a href="https://github.com/Git-Ashley/room-samples/blob/master/api-docs.md#hook-roomonjoinrequestclient-userinfo" target="_blank">{t("LINE_9")}</a>.
        </p>
        <br/>
        <h4><b>{t("TITLE_2")}</b></h4>
        <p>
        <a target="_blank" href="https://github.com/Git-Ashley/room-samples/blob/master/api-docs.md#class-client">Client</a> {t("LINE_10")}
        </p>
        <br/>
        <h4><b>{t("TITLE_3")}</b></h4>
        <p>
        {t("LINE_11")} <a target="_blank" href="https://github.com/Git-Ashley/room-samples/blob/master/api-docs.md#class-client">client</a> {t("LINE_12")}
        </p>
      </BlurFade>
    </Suspense>
  )
}