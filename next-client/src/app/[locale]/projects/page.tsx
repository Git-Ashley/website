import { ProjectCard } from '@/components/project-card'
import { BlurFade } from '@/components/ui/blur-fade'
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { projects } from './projects';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';

type Props = {
  params: Promise<{locale: string}>;
};

const Placeholder = () => (
  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
    {Array.from({ length: 5 }).map((_, i) => (
      <Skeleton key={i} className="h-[354px] w-[394px]" />
    ))}
  </div>
);

export default async function About({ params }: Props) {
  const t = await getTranslations('');
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Suspense fallback={<Placeholder/>}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
        {projects(t).map((project, id) => (
          <BlurFade
            key={project.title}
            delay={id * 0.05}
          >
            <ProjectCard {...project} locale={locale} />
          </BlurFade>
        ))}
      </div>
    </Suspense>
  )
}