import { CvCard } from '@/components/cv-card';
import { BlurFade } from '@/components/ui/blur-fade'
import { Skeleton } from '@/components/ui/skeleton';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { title } from 'process';
import { Suspense } from 'react';

const BLUR_FADE_DELAY = 0.04;

type Props = {
  params: Promise<{locale: string}>;
};

const itemPlaceholder = ([title, metaInfo]: string[]) => (
  <div key={title + metaInfo} className="flex">
    <div className="flex-none">
      <Skeleton className="rounded-full size-12 m-auto" />
    </div>
    <div className="flex-grow ml-4 items-center flex-col group">
      <div className="flex flex-col">
        <div className="mt-1 mb-2 flex items-center justify-between gap-x-2 text-base">
          <Skeleton className={`h-4 ${title}`} />
          <Skeleton className="h-4 w-40 text-right" />
        </div>
        <Skeleton className={`h-3 ${metaInfo}`} />
      </div>
    </div>
  </div>
);

const Placeholder = () => (
  <div className="w-[600px] flex flex-col gap-12">
    <section className="pt-10">
      <div className="flex min-h-0 flex-col gap-y-3">
        <Skeleton className="h-6 w-50" />
        {[
          ["w-55", "w-20"],
          ["w-50", "w-16"],
          ["w-48", "w-24"],
          ["w-40", "w-20"],
          ["w-60", "w-26"],
          ["w-57", "w-22"],
          ["w-55", "w-18"],
          ["w-52", "w-19"],
        ].map(itemPlaceholder)}
      </div>
    </section>
    <section>
      <div className="flex min-h-0 flex-col gap-y-3">
        <Skeleton className="h-6 w-70" />
        {[
          ["w-48", "w-24"],
          ["w-55", "w-18"],
        ].map(itemPlaceholder)}
      </div>
    </section>
  </div>
);

export default async function About({ params }: Props) {
  const t = await getTranslations('cvpage');
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Suspense fallback={<Placeholder />}>
      <div className="w-[600px] flex flex-col gap-12 px-4 md:px-0">
        <section id="work" className="pt-10">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade>
              <h2 className="text-xl font-bold">{t("work_xp")}</h2>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 2.05}>
              <CvCard
                logoUrl="/images/quadrivia-logo.jpeg"
                altText="Quadrivia"
                subtitle="Quadrivia"
                website="https://www.quadrivia.ai/"
                title="Senior Frontend Engineer"
                badges={["React", "Vite", "Tailwind", "ShadCn", "TypeScript", "React-router v7", "Remix"]}
                period={`${t("NOV")} 2024 - ${t("FEB")} 2025`}
                description={t("QUADRIVIA")}
              />
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 2.1}>
              <CvCard
                logoUrl="/images/plentific-logo.jpeg"
                altText="Plentific"
                subtitle="Plentific"
                website="https://www.plentific.com/"
                title="Senior Software Engineer"
                badges={["Frontend", "React", "Next.js", "TypeScript", "Flux"]}
                period={`${t("FEB")} 2022 - ${t("JAN")} 2024`}
                description={t("PLENTIFIC")}
              />
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 2.15}>
              <CvCard
                logoUrl="/images/feedr-logo.jpeg"
                altText="Feedr"
                subtitle="Feedr"
                website="https://feedr.co/"
                title="Senior Software Engineer"
                badges={["Fullstack", "Node.js", "TypeScript", "Tanstack Query", "GraphQL", "MongoDB", "iOS", "Android"]}
                period={`${t("JAN")} 2021 - ${t("FEB")} 2022`}
                description={t("FEEDR")}
              />
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 2.2}>
              <CvCard
                logoUrl="/images/imanage-logo.jpeg"
                altText="iManage"
                subtitle="iManage"
                website="https://imanage.com/"
                title="Software Engineer"
                badges={["Frontend", "React", "Ramda", "styled-components", "Redux", "Docker", "Cypress"]}
                period={`${t("JUN")} 2019 - ${t("JUN")} 2020`}
                description={t("IMANAGE")}
              />
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 2.25}>
              <CvCard
                logoUrl="/images/supercarers-logo.jpeg"
                altText="SuperCarers"
                subtitle="SuperCarers"
                website="https://supercarers.com/"
                title="Software Developer"
                badges={["Frontend", "React", "Jekyll", "Jest", "Enzyme", "Selenium", "styled-components", "Redux"]}
                period={`${t("MAR")} 2018 - ${t("JUN")} 2019`}
                description={t("SUPERCARERS")}
              />
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 2.3}>
              <CvCard
                logoUrl="/images/office-building.png"
                altText="Dev2Rights"
                subtitle="Dev2Rights"
                website="https://find-and-update.company-information.service.gov.uk/company/07650103"
                title="Full Stack Engineer"
                badges={["Fullstack", "React", "Flux", "AWSLambda", "Cloudfront", "S3"]}
                period={`${t("JUL")} 2017 - ${t("SEP")} 2017`}
                description={t("D2R")}
              />
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 2.35}>
              <CvCard
                avatarClassName="bg-white"
                logoUrl="/images/ancoa-logo.png"
                altText="Ancoa"
                subtitle="Ancoa"
                website="https://find-and-update.company-information.service.gov.uk/company/06609971"
                title="Software Engineer"
                badges={["C++", "Fullstack"]}
                period={`${t("FEB")} 2015 - ${t("APR")} 2016`}
                description={t("ANCOA")}
              />
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 2.4}>
              <CvCard
                logoUrl="/images/sword-apak-logo.png"
                altText="Sword APAK"
                subtitle="Sword APAK"
                website="https://www.sword-group.com/"
                title="Graduate Developer"
                badges={["Fullstack", "C++", ".NET Framework"]}
                period={`${t("JUL")} 2014 - ${t("FEB")} 2015`}
                description={t("APAK")}
              />
            </BlurFade>
          </div>
        </section>
        <section id="education">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <h2 className="text-xl font-bold">{t("EDUCATION_SECTION_TITLE")}</h2>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 6 + 0.05}>
              <CvCard
                logoUrl="/images/uni-brighton-logo.jpeg"
                altText="University of Brighton, UK"
                subtitle="University of Brighton, UK"
                title="Bachelor's Degree of Mathematics (BSc)"
                period="2011 - 2014"
              />
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 6 + 0.1}>
              <CvCard
                logoUrl="/images/fei-logo.png"
                altText="French certificate"
                subtitle={t("TCF_SUBTITLE")}
                description={t("TCF")}
                title="TCF Canada, NCLC 8 (B2-C1)"
                period={`${t("MAY")} 2024`}
              />
            </BlurFade>
          </div>
        </section>
      </div>
    </Suspense>
  )
}
