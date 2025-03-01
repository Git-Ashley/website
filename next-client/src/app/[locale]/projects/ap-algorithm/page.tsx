import { BlurFade } from "@/components/ui/blur-fade";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{locale: string}>;
};

export default async function ApAlgorithm({ params }: Props) {
  const t = getTranslations('');
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <BlurFade>
      <p>{"This project involves the design and implementation of algorithms on graphs with the highlight being the Auslander-Parter planarity testing algorithm. Users can choose to draw their own graphs or select from a list of demo graphs."}</p>
      <br/>{"NOTE BEFORE USING THE SOFTWARE:"}
      <br/>{"1. This implementation of the Auslander-Parter algorithm only operates on biconnected graphs so be sure any custom drawn graphs are biconnected ("}<a href="https://en.wikipedia.org/wiki/Biconnected_graph"><u>{"what is a biconnected graph?"}</u></a>{"). Adapting the algorithm to detect and test each biconnected component is possible but is beyond the scope of the project."}
      <br/>{"2. On the graph-drawing panel (or the panel after you select a demo graph)... The text on the buttons may be cut off on some devices. The ordering is: \"Submit\", \"Back\", \"Clear\"(graph drawing), \"Help\" (for draw instructions)"}
      <br/>{"3. In the next panel (from the graph-drawing panel), the 3 buttons at the top is for the algorithm mode; just select AP-Alg if you are unsure."}
      <br/>
      <br/>{"Download: "}<a className="underline text-blue-500" href="/GraphAlgorithms.jar">GraphAlgorithms.jar</a>
      <br/>{"It has been tested with Java 1.7 and 1.8. 1.6 and lower may or may not work."}
      <br/><a href="https://github.com/Git-Ashley/Graph-Theory-Algorithms/blob/master/src/Algorithms/AuslanderParter.java"><u>{"View code on Github"}</u></a>{" Note: This project was originally part of a maths degree and even though it has been re-written since, I was still a novice developer at the time of the re-write, so some design choices will be questionable to professional developers."}
      <br/>
      <br/>{"The relevant section of my dissertation to understand how the Auslander-Parter algorithm works:"}
      <br/><object height="1000" width="800" data="/Auslander-Parter.pdf"></object>
    </BlurFade>
  )
}