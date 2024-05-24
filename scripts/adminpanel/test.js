import { system as o } from "@minecraft/server";
import { ConfiguratorSub as t } from "../configuratorOptions";
import { Database as e } from "../db";
import { ActionForm as n, ModalForm as m } from "../form_func";
import { uiManager as l } from "../uis";
import i from "../icons";
export const ADMIN_TEST = function () {
  return (
    l.addUI("Azalea0.9.0/FormcmdAdd", function (o) {
      new m()
        .textField("ID", "Type a form ID", null, () => {})
        .textField("Title", "Type a form title", null, () => {})
        .textField("Body", "Type a form body", null, () => {})
        .show(o, !1, (o, t) => {
          if (t.canceled) return;
          let n = t.formValues[0],
            m = t.formValues[1],
            i = t.formValues[2],
            d = new e("ActionForms"),
            r = d.get("ActionForms", []);
          r.find((o) => o.id == n) ||
            (r.push({ id: n, title: m, body: i, commands: [] }),
            d.set("ActionForms", r),
            l.open("Azalea0.9.0/FormcmdRoot", o));
        });
    }),
    l.addUI("Azalea0.9.0/FormcmdFormEditCommandsRoot", function (o, t) {
      let i = new e("ActionForms"),
        d = i.get("ActionForms", []),
        r = d.findIndex((o) => o.id == t);
      if (!r < 0) return l.open("Azalea0.9.0/FormcmdRoot", o);
      let a = d[r],
        c = new n(),
        s = a.commands ? a.commands : [];
      c.button("Add button", null, (o) => {
        let t = new m();
        t.title("Add command"),
          t.textField("Text", "Type the text of the button", null),
          t.textField("Command", "Type the command of the button", null),
          t.textField("Icon", "Type the icon name", null),
          t.show(o, !1, (o, t) => {
            let e = { text: t.formValues[0], command: t.formValues[1] };
            t.formValues[2] && (e.icon = t.formValues[2]),
              s.push(e),
              (d[r].commands = s),
              i.set("ActionForms", d);
          });
      });
      for (let o = 0; o < s.length; o++) {
        let t = s[o];
        c.button(`${t.text}\n${t.command}`, null, (e) => {
          let n = new m();
          n.title("Edit command"),
            n.textField("Text", "Type the text of the button", t.text),
            n.textField("Command", "Type the command of the button", t.command),
            n.textField("Icon", "Type the icon name", t.icon ? t.icon : null),
            n.toggle("Remove?", null),
            n.show(e, !1, (t, e) => {
              if (
                (e.formValues[2] &&
                  ((s[o].icon = e.formValues[2]),
                  (d[r].commands = s),
                  i.set("ActionForms", d)),
                e.formValues[3])
              )
                return (
                  s.splice(o, 1),
                  (d[r].commands = s),
                  void i.set("ActionForms", d)
                );
              (s[o].text = e.formValues[0]),
                (s[o].command = e.formValues[1]),
                (d[r].commands = s),
                i.set("ActionForms", d);
            });
        });
      }
      c.show(o, !1, (o, t) => {});
    }),
    l.addUI("Azalea0.9.0/FormPreview", function (t, m) {
      let d = new e("ActionForms").get("ActionForms", []),
        r = d.findIndex((o) => o.id == m);
      if (!r < 0) return l.open("Azalea0.9.0/FormcmdRoot", t);
      let a = d[r],
        c = a.commands ? a.commands : [],
        s = new n().title(a.title).body(a.body);
      c.length || s.button("§4Exit", "textures/azalea_icons/2", () => {});
      for (const t of c) {
        let e = t.icon ? i.get(t.icon) : null;
        s.button(t.text, e ? e.path : null, (e) => {
          o.run(() => {
            e.runCommand(t.command);
          });
        });
      }
      s.show(t, !1, () => {});
    }),
    l.addUI("Azalea0.9.0/FormcmdFormEditDisplay", function (o, t) {
      let n = new e("ActionForms"),
        i = n.get("ActionForms", []),
        d = i.findIndex((o) => o.id == t);
      if (!d < 0) return l.open("Azalea0.9.0/FormcmdRoot", o);
      let r = i[d],
        a = new m();
      a.textField("Title", "Enter a form title", r.title, () => {}),
        a.textField("Body", "Enter a form body", r.body, () => {}),
        a.show(o, !1, (o, t) => {
          t.canceled ||
            ((i[d].title = t.formValues[0]),
            (i[d].body = t.formValues[1]),
            n.set("ActionForms", i),
            l.open("Azalea0.9.0/FormcmdRoot", o));
        });
    }),
    l.addUI("Azalea0.9.0/FormcmdFormEditOptions", function (o, t) {
      if (!new e("ActionForms").get("ActionForms", []).find((o) => o.id == t))
        return l.open("Azalea0.9.0/FormcmdRoot", o);
      let m = new n();
      m.button("Edit Commands", null, (o) => {
        l.open("Azalea0.9.0/FormcmdFormEditCommandsRoot", o, t);
      }),
        m.button("Edit Display", null, (o) => {
          l.open("Azalea0.9.0/FormcmdFormEditDisplay", o, t);
        }),
        m.show(o, !1, () => {});
    }),
    l.addUI("Azalea0.9.0/FormcmdFormEditRoot", function (o, t) {
      let m = new e("ActionForms"),
        i = m.get("ActionForms", []),
        d = i.findIndex((o) => o.id == t);
      if (d < 0) return l.open("Azalea0.9.0/FormcmdRoot", o);
      let r = i[d],
        a = new n();
      a.title(`Edit "${r.title}"`),
        a.button("Edit", null, (o, t) => {
          l.open("Azalea0.9.0/FormcmdFormEditOptions", o, r.id);
        }),
        a.button("Preview", null, (o, t) => {
          l.open("Azalea0.9.0/FormPreview", o, r.id);
        }),
        a.button("Delete", null, (o, t) => {
          i.splice(d, 1), m.set("ActionForms", i);
        }),
        a.show(o, !1, () => {});
    }),
    l.addUI("Azalea0.9.0/FormcmdRoot", function (o) {
      let t = new n(),
        m = new e("ActionForms").get("ActionForms", []);
      t.button("§4Exit", "textures/azalea_icons/2", () => {}),
        t.button("§2Add", "textures/azalea_icons/1", () => {
          l.open("Azalea0.9.0/FormcmdAdd", o);
        });
      for (const o of m)
        t.button(`§8${o.title}\n${o.id}`, null, (t, e) => {
          l.open("Azalea0.9.0/FormcmdFormEditRoot", t, o.id);
        });
      t.show(o, !1, () => {});
    }),
    new t("§tForms", "textures/azalea_icons/9").setCallback((o) => {
      l.open("Azalea0.9.0/FormcmdRoot", o);
    })
  );
};
