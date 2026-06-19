/* ============================================================
   screens-group.jsx — Group administrator (LA / MAT / faith group)
   ============================================================ */
const {
  Row: GRow, Col: GCol, Spacer: GSpacer, Line: GLine, H1: GH1, H2: GH2, H3: GH3, Lead: GLead, Txt: GTxt, Up: GUp, Ref: GRef,
  Card: GCard, Ph: GPh, Box: GBox, Annot: GAnnot, Field: GField, Btn: GBtn, Chip: GChip, Tag: GTag, Dot: GDot,
  Bars: GBars, Cols: GCols, Donut: GDonut, Table: GTable, Legend: GLegend, AppBar: GAppBar, Avatar: GAvatar, cx: gcx, PBar: GPBar,
} = window;

const SETTINGS = [
  ["Riverside Primary", "Primary", "Complete", "98.4", "5 actions"],
  ["Hillside Academy", "Secondary", "In progress", "—", "—"],
  ["St Mary's CofE", "Primary", "Complete", "64.1", "3 actions"],
  ["Oakwood Nursery", "Nursery", "Not started", "—", "—"],
  ["Eastgate College", "FE College", "Complete", "412.6", "8 actions"],
  ["Meadow Lane Primary", "Primary", "In progress", "—", "2 actions"],
];
const stMap = { Complete: "green", "In progress": "sky", "Not started": "grey" };

const GROUP_SCREENS = {

  group: {
    title: "Group dashboard", group: "Group admin", num: "G1",
    variants: ["KPI + roster", "Map + list", "Cards grid"],
    render: ({ go, variant }) => {
      const kpis = [["Settings in group", "24", ""], ["Footprints complete", "16", "67%"], ["Plans created", "11", "46%"], ["Group total", "2,140 tCO₂e", "▼8%"]];
      return (
        <GRow g={0} className="row" style={{ minHeight: 600 }}>
          {/* group rail */}
          <div className="rail">
            <div className="applogo" style={{ padding: "2px 10px 14px" }}><span className="nav__mark" style={{ width: 22, height: 22, fontSize: 11 }}>C</span> Group</div>
            <div className="rail__head">Leeds City Council</div>
            {["Overview", "Settings", "Reports", "Engagement", "Group targets"].map((r, i) => <div key={r} className={gcx("rail__item", i === 0 && "rail__item--on")}>{r}</div>)}
            <div style={{ height: 18 }} />
            <div className="rail__head">Admin</div>
            {["Associations", "Members"].map(r => <div key={r} className="rail__item">{r}</div>)}
          </div>
          <div className="f1" style={{ minWidth: 0 }}>
            <GAppBar role="group" active="Overview" go={go} user="LA" />
            <div className="wf">
              <GRow g={14} ac jb>
                <div className="col gap6"><GRow g={12} ac><GH1>Leeds City Council</GH1><GTag tone="grey">Local authority · 24 settings</GTag></GRow><span className="sm muted">Engagement, footprint & planning across your group <GRef>GRP-01</GRef></span></div>
                <GRow g={8} ac><GBtn sm>⬇ Export <GRef>GRP-03</GRef></GBtn><GBtn sm primary>Invite setting</GBtn></GRow>
              </GRow>
              <div style={{ height: 16 }} />
              <GRow g={14}>{kpis.map(([a, b, c]) => <GCard key={a} className="col gap4 f1" pad={14}><span className="up">{a}</span><b style={{ fontSize: 22 }}>{b}</b>{c && <span className="xs" style={{ color: "var(--accent-deep)" }}>{c}</span>}</GCard>)}</GRow>
              <div style={{ height: 16 }} />

              {/* filters */}
              <GRow g={8} ac wrap>
                <span className="up">Filter</span>
                <GChip on>All phases</GChip><GChip>Primary</GChip><GChip>Secondary</GChip><GChip>Nursery</GChip>
                <GLine style={{ width: 1, height: 22 }} /><GChip>Region ▾</GChip><GChip>Completion ▾</GChip>
                <GSpacer /><GRef>GRP-02</GRef>
              </GRow>
              <div style={{ height: 14 }} />

              {variant === 0 && (
                <GRow g={20} as>
                  <GCard pad={0} style={{ flex: 1 }}>
                    <div style={{ padding: "14px 18px" }}><GRow ac jb><GUp>Settings roster</GUp><span className="sm faint">6 of 24</span></GRow></div>
                    <GTable cols={["Setting", "Phase", "Footprint", "tCO₂e", "Plan"]} rows={SETTINGS.map(s => [
                      <a className="sm" style={{ fontWeight: 600, color: "var(--accent-deep)", cursor: "pointer" }} onClick={() => go("groupsetting")}>{s[0]}</a>,
                      <GTag tone="grey">{s[1]}</GTag>, <GTag tone={stMap[s[2]]}>{s[2]}</GTag>, <b className="mono sm">{s[3]}</b>, <span className="sm muted">{s[4]}</span>,
                    ])} />
                  </GCard>
                  <GCol g={16} style={{ flex: "0 0 280px" }}>
                    <GCard><GUp>Completion</GUp><div style={{ height: 12 }} /><GDonut segs={[{ v: 67, c: "var(--accent)" }, { v: 33, c: "var(--block-2)" }]} center={<div><b>67%</b><div className="xs faint">done</div></div>} /></GCard>
                    <GCard><GUp>Footprint by phase</GUp><div style={{ height: 12 }} /><GBars data={[{ l: "Secondary", v: 1240 }, { l: "FE College", v: 560 }, { l: "Primary", v: 290 }, { l: "Nursery", v: 50 }]} /></GCard>
                  </GCol>
                </GRow>
              )}

              {variant === 1 && (
                <GRow g={20} as>
                  <GCard style={{ flex: 1 }} className="col gap10"><GUp>Settings map</GUp><GPh h={300} label="map of group settings — pins coloured by completion status" /><GLegend items={[{ l: "Complete", c: "var(--accent)" }, { l: "In progress", c: "var(--sky)" }, { l: "Not started", c: "var(--ink-faint)" }]} /></GCard>
                  <GCard pad={0} style={{ flex: "0 0 340px" }}>
                    <div style={{ padding: "14px 18px" }}><GUp>Nearby settings</GUp></div>
                    {SETTINGS.map((s, i) => <div key={i} className="row ac jb" style={{ padding: "11px 18px", borderTop: "1px solid var(--line-soft)", cursor: "pointer" }} onClick={() => go("groupsetting")}><div className="col gap2"><b className="sm">{s[0]}</b><span className="xs faint">{s[1]}</span></div><GTag tone={stMap[s[2]]}>{s[2]}</GTag></div>)}
                  </GCard>
                </GRow>
              )}

              {variant === 2 && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
                  {SETTINGS.map((s, i) => (
                    <GCard key={i} className="col gap10" style={{ cursor: "pointer" }}>
                      <GRow ac jb><b className="sm">{s[0]}</b><GTag tone={stMap[s[2]]}>{s[2]}</GTag></GRow>
                      <GRow g={8} ac><GTag tone="grey">{s[1]}</GTag></GRow>
                      <GLine />
                      <GRow ac jb><div className="col"><span className="xs faint up">Footprint</span><b className="mono">{s[3]} {s[3] !== "—" && "t"}</b></div><div className="col ae"><span className="xs faint up">Plan</span><span className="sm muted">{s[4]}</span></div></GRow>
                    </GCard>
                  ))}
                </div>
              )}
              <div style={{ height: 14 }} />
              <GAnnot><b>GRP-06</b> — strict data isolation: group admins see only their own group's settings. No cross-group leakage.</GAnnot>
            </div>
          </div>
        </GRow>
      );
    },
  },

  groupsetting: {
    title: "Setting detail (group view)", group: "Group admin", num: "G2",
    render: ({ go }) => (
      <div><GAppBar role="group" active="Settings" go={go} user="LA" />
        <div className="wf">
          <GRow g={10} ac><a className="sm muted" style={{ cursor: "pointer" }} onClick={() => go("group")}>‹ Group</a><span className="faint">/</span><b className="sm">Riverside Primary</b></GRow>
          <div style={{ height: 12 }} />
          <GRow g={14} ac jb>
            <div className="col gap6"><GH1>Riverside Primary School</GH1><span className="sm muted mono">URN 123456 · Primary · joined Sep 2024</span></div>
            <GRow g={8}><GTag tone="green"><GDot tone="green" /> Footprint complete</GTag><GBtn sm>⬇ Export</GBtn></GRow>
          </GRow>
          <div style={{ height: 16 }} />
          <GRow g={16} as>
            <GCol g={16} style={{ flex: 1 }}>
              <GCard><GRow ac jb><GUp>Footprint 2024/25</GUp><GRef>GRP-01</GRef></GRow><div style={{ height: 12 }} /><GRow g={20} ac><GDonut segs={window.CATS.map(c => ({ v: c.v, c: c.c }))} center={<div><b>98.4</b><div className="xs faint">tCO₂e</div></div>} /><div className="f1"><GBars data={window.CATS.slice(0, 4)} /></div></GRow></GCard>
              <GCard><GUp>Decarbonisation plan · 5 actions</GUp><div style={{ height: 12 }} />
                <GTable cols={["Action", "Area", "Impact", "Status"]} rows={[["Renewable tariff", "Energy", "14 t", <GTag tone="grey">Planned</GTag>], ["LED retrofit", "Energy", "5 t", <GTag tone="sky">In progress</GTag>], ["Walk to school", "Transport", "3 t", <GTag tone="sky">In progress</GTag>]]} />
              </GCard>
            </GCol>
            <GCol g={16} style={{ flex: "0 0 280px" }}>
              <GCard className="col gap10"><GUp>Engagement</GUp><GRow ac jb><GTxt sm muted>Last active</GTxt><b className="sm">2 days ago</b></GRow><GRow ac jb><GTxt sm muted>Users</GTxt><b className="sm">3</b></GRow><GRow ac jb><GTxt sm muted>Periods reported</GTxt><b className="sm">2</b></GRow></GCard>
              <GCard className="col gap10"><GUp>Trend</GUp><GCols data={[{ l: "23/24", v: 112, c: "var(--accent-mid)" }, { l: "24/25", v: 98, c: "var(--accent)" }]} h={100} /></GCard>
              <GAnnot>Read-only at group level — the setting owns its own data & plan.</GAnnot>
            </GCol>
          </GRow>
        </div>
      </div>
    ),
  },
};

window.GROUP_SCREENS = GROUP_SCREENS;
