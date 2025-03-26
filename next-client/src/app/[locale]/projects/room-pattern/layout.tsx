"use client"

import { ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslations } from "next-intl";
import { useSelectedLayoutSegments } from "next/navigation";
import { use } from "react";
import { useRouter } from "@/src/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
  children: ReactNode;
};

export default function RoomPatternLayout({ params, children }: Props) {
  const t = useTranslations('');
  const { locale } = use(params);
  const [path] = useSelectedLayoutSegments()

  const router = useRouter()

  return (
    <div className="max-w-[800px] mx-auto">
      <Tabs value={path} className="mx-auto w-[300px] text-center mb-10 mt-3">
        <TabsList className="[&_*]:cursor-pointer grid w-full grid-cols-3">
          <TabsTrigger onClick={() => router.push("/projects/room-pattern/summary")} value="summary">{t("Summary")}</TabsTrigger>
          <TabsTrigger onClick={() => router.push("/projects/room-pattern/samples")} value="samples">{t("Samples")}</TabsTrigger>
          <TabsTrigger onClick={() => router.push("/projects/room-pattern/docs")} value="docs">API Docs</TabsTrigger>
        </TabsList>
      </Tabs>
      {children}
    </div>
  )
}