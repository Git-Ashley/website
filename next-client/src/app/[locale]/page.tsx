import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
//import prisma from '@/lib/prisma'
import { Suspense } from 'react';
import { NeonSign } from '@/components/neon-sign';
import { BentoThingy } from '@/components/bento-grid';
import {
  FileText,
  Folders,
  Briefcase,
  GraduationCap,
  Languages,
  Mail,
} from 'lucide-react'
import { Marquee } from '@/components/ui/marquee';
import { projects } from './projects/projects';
import Image from 'next/image';
import { BlurFade } from '@/components/ui/blur-fade';
import { BaseCvCard, CvCard } from '@/components/cv-card';
import { PhotoWidget } from './components/PhotoWidget';
import { ExpandableBadges } from '@/components/ExpandableBadges';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  params: Promise<{locale: string}>;
};

/*const Test = async () => {
  const user = await prisma.users.findFirst();
  return (
    <div>{JSON.stringify(user)}</div>
  )
}*/

/* 
 * Neon sign: Make some of the letters a slightly different shades of green.
 * Or add pulsating to some letters: https://www.youtube.com/watch?v=QUjljSPKVII
 * Maybe add a faded-in wall in the part of the screen it's in too...
 * https://css-tricks.com/how-to-create-neon-text-with-css/ 
 * fonts: https://fonts.google.com/specimen/Pacifico?categoryFilters=Feeling:%2FExpressive%2FCute
 * https://fonts.google.com/specimen/Yellowtail?categoryFilters=Feeling:%2FExpressive%2FCute
 * https://fonts.google.com/specimen/Neonderthaw?categoryFilters=Feeling:%2FExpressive%2FCute&query=neon
 * 
 * Amazing: https://codepen.io/KryptoniteDove/pen/PzzmVB
 * 
 * Then default site to dark.
 *
*/

const keySkills = [
  "Fullstack",
  "Next.js",
  "React",
  "Shadcn",
  "Tailwind",
  "Vite",
  "Express",
  "AWS",
  "SST",
  "Docker",
  "Postgres",
  "MongoDB",
  "Prompt coding",
];

const otherSkills = [
  "Tanstack Query",
  "C++",
  "Unreal Engine 5",
  "WebSockets",
  "Website Hosting",
];

const statClasses = "text-sm flex items-center gap-2.5 text-primary-80"

const LoadingSkeleton = () => (
  <div className="mt-5">
    <section className="flex mb-20">
      <div className="px-12">
        <Skeleton className="h-[150px] w-[150px] rounded-full" />
      </div>
      <div className="space-y-2 px-5">
        <Skeleton className="h-6 w-[200px]" />
        <Skeleton className="mb-4 h-5 w-[230px]" />
        <Skeleton className="h-4 w-[280px]" />
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[240px]" />
        <Skeleton className="h-4 w-[180px]" />
      </div>
    </section>
    <section className="text-center flex justify-center">
      <Skeleton className="h-10 w-[480px]" />
    </section>
    <section className='grid grid-cols-1 md:grid-cols-2 justify-center py-24 max-w-[800px] mx-auto gap-5 md:gap-14'>
      <Skeleton className="h-[350px] w-[300px] col-span-1" />
      <Skeleton className="h-[350px] w-[300px] col-span-1" />
    </section>
  </div>
);

export default async function DashboardPage({ params }: Props) {
  const t = await getTranslations('');
  const homeT = await getTranslations('homepage');

  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <Suspense fallback={<LoadingSkeleton/>}>
      <BlurFade className="mt-5">
        <section className="flex mb-20 flex-wrap justify-center gap-5">
          <PhotoWidget />
          <span>
            <h2 className="text-center md:text-start text-2xl font-medium text-primary">Ashley Phillips</h2>
            <h3 className="text-center md:text-start text-lg font-medium text-primary mb-3">{homeT("TITLE")}</h3>
            <div className={statClasses}><Briefcase size={16}/> {homeT("XP")}</div>
            <div className={statClasses}><GraduationCap size={16}/> Bsc Mathematics</div>
            <div className={statClasses}><Languages size={16}/> {homeT("LANGS")}</div>
            <div className={statClasses}><Mail size={16}/> ashp1621@gmail.com</div>
          </span>
        </section>
        <section>
          <ExpandableBadges
            main={keySkills}
            extra={otherSkills}
          />
        </section>
        {/*Experience in big data real-time analytics, many different kinds of applications from banking to e-commerce in several programming languages and frameworks across the full stack and software life cycle, with an understanding of the need to balance time constraints with careful design and best practices.*/}
        <section className='grid grid-cols-1 md:grid-cols-2 justify-center py-24 max-w-[800px] mx-auto gap-5 md:gap-14'>
          <BentoThingy
            Icon={FileText}
            name={t("CV")}
            locale={locale}
            href="/cv"
            cta={t("MORE")}
            className="h-[350px] w-[300px] col-span-1"
            background={(
              <div className="flex flex-col gap-1 pointer-events-none w-[265px] [mask-image:linear-gradient(to_top,transparent_36%,#000_72%)]">
                <BaseCvCard
                  logoUrl="/images/quadrivia-logo.jpeg"
                  altText="Quadrivia"
                  subtitle="Quadrivia"
                  title="Senior Frontend Engineer"
                  badges={["React", "Vite", "Tailwind", "ShadCn", "TypeScript", "React-router v7", "Remix"]}
                />
                <BaseCvCard
                  logoUrl="/images/plentific-logo.jpeg"
                  altText="Plentific"
                  subtitle="Plentific"
                  title="Senior Software Engineer"
                  badges={["Frontend", "React", "Next.js", "TypeScript", "Flux"]}
                />
                <BaseCvCard
                  logoUrl="/images/feedr-logo.jpeg"
                  altText="Feedr"
                  subtitle="Feedr"
                  title="Senior Software Engineer"
                  badges={["Fullstack", "Node.js", "TypeScript", "Tanstack Query", "GraphQL", "MongoDB", "iOS", "Android"]}
                />
                <BaseCvCard
                  logoUrl="/images/imanage-logo.jpeg"
                  altText="iManage"
                  subtitle="iManage"
                  title="Software Engineer"
                  badges={["Frontend", "React", "Ramda", "styled-components", "Redux", "Docker", "Cypress"]}
                />
                <BaseCvCard
                  logoUrl="/images/supercarers-logo.jpeg"
                  altText="SuperCarers"
                  subtitle="SuperCarers"
                  title="Software Developer"
                  badges={["Frontend", "React", "Jekyll", "Jest", "Enzyme", "Selenium", "styled-components", "Redux"]}
                />
                <BaseCvCard
                  logoUrl="/images/office-building.png"
                  altText="Dev2Rights"
                  subtitle="Dev2Rights"
                  title="Full Stack Engineer"
                  badges={["Fullstack", "React", "Flux", "AWSLambda", "Cloudfront", "S3"]}
                />
                <BaseCvCard
                  avatarClassName="bg-white"
                  logoUrl="/images/ancoa-logo.png"
                  altText="Ancoa"
                  subtitle="Ancoa"
                  title="Software Engineer"
                  badges={["C++", "Fullstack"]}
                />
              </div>
            )}
          />
          <BentoThingy
            Icon={Folders}
            name={t("Projects")}
            //description="Lots of projects..."
            locale={locale}
            href="/projects"
            cta={t("MORE")}
            className="h-[350px] w-[300px] col-span-1"
            background={(
              <Marquee
                pauseOnHover
                className="w-full absolute top-0 [mask-image:linear-gradient(to_right,transparent_0%,black_6%,black_94%,transparent_100%)]"
              >
                {projects(t).map(({ image, title }, idx) => (
                  <figure
                    key={idx}
                    className={`
                      relative h-[220px] w-[280px] cursor-pointer overflow-hidden rounded-xl border p-1
                      border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]
                      dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]
                      transform-gpu transition-all duration-300 ease-out hover:blur-none flex justify-center"
                    `}
                  >
                    <Image src={image} alt={title} width={280} height={220} className="rounded-md" />
                  </figure>
                ))}
              </Marquee>
            )}
          />
        </section>
      </BlurFade>
    </Suspense>
  )
}