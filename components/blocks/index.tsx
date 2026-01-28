import { tinaField } from "tinacms/dist/react";
import { Page } from "../../tina/__generated__/types";
import { Hero } from "./hero";
import { Content } from "./content";
import { Features } from "./features";
import { Testimonial } from "./testimonial";
import { Video } from "./video";
import { Callout } from "./callout";
import { Stats } from "./stats";
import { CallToAction } from "./call-to-action";
import { Home } from "./home";
import { Team } from "./team";
import { Services } from "./services";
import { Reference } from "./reference";
import { Contact } from "./contact";

export const Blocks = (props: Partial<Omit<Page, "id" | "_sys" | "_values">> & { blocks?: any[] | null }) => {
  if (!props.blocks) return null;
  return (
    <>
      {props.blocks.map(function (block, i) {
        return (
          <div key={i} data-tina-field={tinaField(block)}>
            <Block {...block} />
          </div>
        );
      })}
    </>
  );
};

const Block = (block: any) => {
  switch (block.__typename) {
    case "PageBlocksHome":
      return <Home data={block} />;
    case "PageBlocksTeam":
      return <Team data={block} />;
    case "PageBlocksServices":
      return <Services data={block} />;
    case "PageBlocksReference":
      return <Reference data={block} />;
    case "PageBlocksContact":
      return <Contact data={block} />;
    case "PageBlocksVideo":
      return <Video data={block} />;
    case "PageBlocksHero":
      return <Hero data={block} />;
    case "PageBlocksCallout":
      return <Callout data={block} />;
    case "PageBlocksStats":
      return <Stats data={block} />;
    case "PageBlocksContent":
      return <Content data={block} />;
    case "PageBlocksFeatures":
      return <Features data={block} />;
    case "PageBlocksTestimonial":
      return <Testimonial data={block} />;
    case "PageBlocksCta":
      return <CallToAction data={block} />;
    default:
      return null;
  }
};
