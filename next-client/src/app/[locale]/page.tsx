import { getTranslations } from 'next-intl/server';
import { Button } from "@/components/ui/button"
import { Link } from '@/src/i18n/routing'
import { setRequestLocale } from 'next-intl/server';
import prisma from '@/lib/prisma'
import { Suspense } from 'react';
import { NeonSign } from '@/components/neon-sign';
import { projects } from './projects/page';
import { BentoCard, BentoGrid } from '@/components/bento-grid';
import { FileText } from 'lucide-react'
import { Marquee } from '@/components/ui/marquee';
import { cn } from '@/lib/utils';

type Props = {
  params: {locale: string};
};

const Test = async () => {
  const user = await prisma.users.findFirst();
  return (
    <div>{JSON.stringify(user)}</div>
  )
}
export default async function DashboardPage({ params }: Props) {
  const t = await getTranslations('');

  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <div>
      <section className='flex flex-col items-center justify-center py-24'>
        <div>
          {/*<NeonSign />*/}
          {/*<Test />*/}
        </div>
        <BentoCard
          Icon={FileText}
          name="Save your files"
          description="We automatically save your files as you type."
          href="#"
          cta="Learn more"
          className="h-[350px] w-[250px]"
          background={(
            <Marquee
              pauseOnHover
              className="absolute top-10 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
            >
              {projects.map(({ image, title }, idx) => (
                <figure
                  key={idx}
                  className={`
                    "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
                    "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                    "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
                    "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
                  `}
                >
                  <div className="flex flex-row items-center gap-2">
                    <div className="flex flex-col">
                      <figcaption className="text-sm font-medium dark:text-white ">
                        {image}
                      </figcaption>
                    </div>
                  </div>
                  <blockquote className="mt-2 text-xs">{title}</blockquote>
                </figure>
              ))}
            </Marquee>
          )}
        />
      </section>
    </div>
  )
}

/*
import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons";
import { BellIcon, Share2Icon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import AnimatedBeamMultipleOutputDemo from "@/registry/example/animated-beam-multiple-outputs";
import AnimatedListDemo from "@/registry/example/animated-list-demo";
import { BentoCard, BentoGrid } from "@/registry/magicui/bento-grid";
import { Marquee } from "@/registry/magicui/marquee";

const files = [
  {
    name: "bitcoin.pdf",
    body: "Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.",
  },
  {
    name: "finances.xlsx",
    body: "A spreadsheet or worksheet is a file made of rows and columns that help sort data, arrange data easily, and calculate numerical data.",
  },
  {
    name: "logo.svg",
    body: "Scalable Vector Graphics is an Extensible Markup Language-based vector image format for two-dimensional graphics with support for interactivity and animation.",
  },
  {
    name: "keys.gpg",
    body: "GPG keys are used to encrypt and decrypt email, files, directories, and whole disk partitions and to authenticate messages.",
  },
  {
    name: "seed.txt",
    body: "A seed phrase, seed recovery phrase or backup seed phrase is a list of words which store all the information needed to recover Bitcoin funds on-chain.",
  },
];

*/