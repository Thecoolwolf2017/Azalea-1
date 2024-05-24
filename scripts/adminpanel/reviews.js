import { ConfiguratorSub as o } from "../configuratorOptions";
import { Database as e } from "../db";
import { ActionForm as r } from "../form_func";
import t from "../moment";
import { uiManager as n } from "../uis";
export const REVIEWS = function () {
  return (
    n.addUI("Azalea0.9/ReviewViewer", (o) => {
      let n = new r(),
        s = [],
        i = new e("Reviews").get("Reviews", []),
        f = 0;
      for (const o of i) f += o.rating;
      let m = f / i.length;
      s.push("§aAverage: §r" + (isNaN(m) ? "No Reviews" : `${m}`)), s.push("");
      for (const o of i)
        s.push(`§dFrom §e${o.sentBy} §7§o(${t(o.sentAt).fromNow()})`),
          s.push(`§a${o.rating}/10`),
          s.push(`§f${o.moreInfo}`),
          s.push("");
      n.button("Ok", null, () => {}),
        n.body(s.join("\n§r")),
        n.show(o, !1, () => {});
    }),
    new o("§6Reviews", "textures/azalea_icons/10").setCallback(() => {})
  );
};
