import { ProjectCard, type ProjectCardProps } from '@/components/project-card'
import { BlurFade } from '@/components/ui/blur-fade'
import { getTranslations, setRequestLocale } from 'next-intl/server';

export const projects: ProjectCardProps[] = [
  {
    title: "Social App",
    description: "Lobby integrated with Node Shooter",
    dates: "Jan 2024 - Feb 2024",
    tags: ["JavaScript"],
    href: "/projects/social-app",
    image: "/images/social-app-thumbnail.png",
  },
  {
    title: "Memapp",
    description: "Spaced repetition learning app",
    dates: "Jan 2024 - Feb 2024",
    tags: ["JavaScript"],
    href: "/projects/memapp",
    image: "/images/memapp-thumbnail.png",
    //Git: https://github.com/Git-Ashley/playlist/tree/japanese
  },
  {
    title: "Room pattern",
    description: "Client & Backend package to aid with communication for a room of clients",
    dates: "Jan 2024 - Feb 2024",
    tags: ["JavaScript"],
    href: "/projects/room-pattern/summary",
    image: "/images/room-thumbnail.png",
  },
  {
    title: "Node Shooter",
    description: "Loopless game server experiment",
    dates: "Jan 2024 - Feb 2024",
    tags: ["JavaScript"],
    href: "/projects/node-shooter",
    image: "/images/nb-thumbnail.png",
  },
  {
    title: "Auslander-Parter Algorithm",
    description: "Implementation of the Auslander-Parter planarity testing agorithm",
    dates: "Jan 2024 - Feb 2024",
    tags: ["JavaScript"],
    href: "/projects/ap-algorithm",
    image: "/images/ap-thumbnail.png",
  },
]

type Props = {
  params: {locale: string};
};

export default async function About({ params }: Props) {
  const t = getTranslations('');
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
      {projects.map((project, id) => (
        <BlurFade
          key={project.title}
          delay={id * 0.05}
        >
          <ProjectCard {...project} locale={locale} />
        </BlurFade>
      ))}
    </div>
  )
}

// auto-carousel ?
/* 
 * Neon sign: Make some of the letters a bit different shades of green.
 * Or add pulsating to some letters: https://www.youtube.com/watch?v=QUjljSPKVII
 * Maybe add a faded-in wall in the part of the screen it's in too...
 * !!!!!! OMG: https://css-tricks.com/how-to-create-neon-text-with-css/ 
 * fonts: https://fonts.google.com/specimen/Pacifico?categoryFilters=Feeling:%2FExpressive%2FCute
 * https://fonts.google.com/specimen/Yellowtail?categoryFilters=Feeling:%2FExpressive%2FCute
 * https://fonts.google.com/specimen/Neonderthaw?categoryFilters=Feeling:%2FExpressive%2FCute&query=neon
 * 
 * 
 * Amazing: https://codepen.io/KryptoniteDove/pen/PzzmVB
 * Could do a simple arrow, or a person pointing
 * 
 * HOME PAGE - NEON SIGN AND NEON ANIMATION OF PERSON WITH HAMER OR STH
 * THE HOME PAGE IS FOR FUN.
 * THE OHER PAGES ARE MORE SERIOUS + NO NEON (may be too annoying)
 * 
 * SITE MUST DEFAULT TO DARK.
 * 
 * Srsly, How to make neon sign work in light mode though?
 *
*/