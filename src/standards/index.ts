import { ariaAttrs } from "./aria-attrs";
import { ariaRoles } from "./aria-roles";
import { dpubRoles } from "./dpub-roles";
import { graphicsRoles } from "./graphics-roles";
import { htmlElms } from "./html-elms";
import { cssColors } from "./css-colors";

interface Standards {
  ariaAttrs: typeof ariaAttrs;
  ariaRoles: typeof ariaRoles;
  dpubRoles: typeof dpubRoles;
  graphicsRoles: typeof graphicsRoles;
  htmlElms: typeof htmlElms;
  cssColors: typeof cssColors;
}

const standards: Standards = {
  ariaAttrs,
  ariaRoles,
  dpubRoles,
  graphicsRoles,
  htmlElms,
  cssColors,
} as const;

export default standards;
