"use client";

import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ChevronsDownUp, ChevronsUpDown } from "lucide-react";

type Props = {
  main: string[];
  extra: string[];
};
export const ExpandableBadges = ({ main, extra }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded} className="flex flex-col items-center">
      <div className="text-center flex justify-center max-w-[500px] flex-wrap gap-1">
        {main.map(label => <Badge key={label}>{label}</Badge>)}
        <CollapsibleContent asChild className="text-center">
          <>{extra.map(label => <Badge key={label}>{label}</Badge>)}</>
        </CollapsibleContent>
      </div>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" size="icon" className="mt-1.5">
          {isExpanded ? <ChevronsDownUp className="size-5 text-primary-50" /> : <ChevronsUpDown className="size-5 text-primary-50" />}
          <span className="sr-only">Toggle</span>
        </Button>
      </CollapsibleTrigger>
    </Collapsible>
  )
}