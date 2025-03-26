import { type ProjectCardProps } from '@/components/project-card'

export function projects(t: (str: string) => string): ProjectCardProps[] {
  return [
    {
      title: "Memapp",
      description: t("MEMAPP_SUMMARY"),
      dates: "2021",
      tags: ["JavaScript"],
      href: "/projects/memapp",
      image: "/images/memapp-thumbnail.png",
      //Git: https://github.com/Git-Ashley/playlist/tree/japanese
    },
    {
      title: "Social App",
      description: t("SOCIAL_APP_SUMMARY"),
      dates: "2017",
      tags: ["JavaScript"],
      href: "/projects/social-app/lobby",
      image: "/images/social-app-thumbnail.png",
    },
    {
      title: "Room pattern",
      description: t("ROOM__SUMMARY"),
      dates: "2017",
      tags: ["JavaScript"],
      href: "/projects/room-pattern/summary",
      image: "/images/room-thumbnail.png",
    },
    {
      title: "Node Shooter",
      description: t("NS_SUMMARY"),
      dates: "2016",
      tags: ["JavaScript"],
      href: "/projects/node-shooter",
      image: "/images/nb-thumbnail.png",
    },
    {
      title: "Auslander-Parter Algorithm",
      description: t("AP_SUMMARY"),
      dates: "2014",
      tags: ["JavaScript"],
      href: "/projects/ap-algorithm",
      image: "/images/ap-thumbnail.png",
    },
  ];
}