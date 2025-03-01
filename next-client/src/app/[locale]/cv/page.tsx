import { CvCard } from '@/components/cv-card';
import { BlurFade } from '@/components/ui/blur-fade'
import { getTranslations, setRequestLocale } from 'next-intl/server';

const BLUR_FADE_DELAY = 0.04;

type Props = {
  params: Promise<{locale: string}>;
};

export default async function About({ params }: Props) {
  const t = await getTranslations('');
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="w-[600px] flex flex-col gap-12">
      <section id="work" className="pt-10">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 2.05}>
            <CvCard
              logoUrl="/images/quadrivia-logo.jpeg"
              altText="Quadrivia"
              subtitle="Quadrivia"
              website="https://www.quadrivia.ai/"
              title="Senior Frontend Engineer"
              badges={["React", "Vite", "Tailwind", "ShadCn", "TypeScript", "React-router v7", "Remix"]}
              period={`${"November"} 2024 - ${"February"} 2025`}
              description={"3 month contract. I helped to bring a greenfield project up a few gears. Started by updating to TS, Vite, Tailwind, ShadCN, React Router v7 and Storybook from CRA + JS. Then built out the front-end foundations for \"Qu for Clinicians\" - an AI helper for clinicians to manage patients."}
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
              period={`${"February"} 2022 - ${"January"} 2024`}
              description={"Worked on a marketplace platform for contractors and property agents. I led several projects from conception to release, and was the go to person for refactoring large modules of unruly code. I made heavy use of React Query here, which replaced Flux, simplified data flow and reduced unnecessary data fetching."}
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
              period={`${"January"} 2021 - ${"February"} 2022`}
              description={"Worked with various services, web apps and mobile apps to connect food suppliers with employers. Duties involved owning projects, unit testing, feature development/enhancement, code reviews."}
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
              period={`${"June"} 2019 - ${"June"} 2020`}
              description={"Worked on the frontend, and devops. Created/improved features to allow users to extract data from potentially millions of documents via AI. I also created a custom solution to run cypress tests in parallel, which massively sped up completion time of the test suite."}
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
              period={`${"March"} 2018 - ${"June"} 2019`}
              description={"Developed features for a marketplace style app where people looking for carers can be matched with carers who bid for work. Also created in-house admin tools for our staff to manage clients and carers."}
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
              period={`${"July"} 2017 - ${"September"} 2017`}
              description={"Developed features and foundations of a recruitment app (greenfield project), aimed at trades people."}
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
              period={`${"February"} 2015 - ${"April"} 2016`}
              description={"C++ Full-stack role. I created algorithms to help detect fraudulent behaviour in stock markets, as well as contributing to other areas of the system, data-integration, database management, linux build system, desktop and web front-end, client APIs and some client-facing tasks and attendance of Fintech events. Joined the web team full-time for last 5 months there and helped develop the web interface with AngularDart."}
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
              period={`${"July"} 2014 - ${"Feburary"} 2015`}
              description="Worked closely with business analysts to enhance and develop new features."
            />
          </BlurFade>
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Education & certificates</h2>
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
              altText="University of Brighton, UK"
              subtitle="French language proficiency test; Upper intermediate / advanced."
              description="Speaking & Writing: NCLC 8 / B2+. Reading: NCLC 7 / B2. Listening: NCLC 10 / C2."
              title="TCF Canada, NCLC 8 (B2-C1)"
              period={`${"May"} 2024`}
            />
          </BlurFade>
        </div>
      </section>
    </div>
  )
}
