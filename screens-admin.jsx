/* ============================================================
   screens-admin.jsx — KBT administrator + PNZ Advisory admin
   ============================================================ */
const {
  Row: ARow, Col: ACol, Spacer: ASpacer, Line: ALine, H1: AH1, H2: AH2, H3: AH3, Lead: ALead, Txt: ATxt, Up: AUp, Ref: ARef,
  Card: ACard, Ph: APh, Box: ABox, Annot: AAnnot, Field: AField, Btn: ABtn, Chip: AChip, Tag: ATag, Dot: ADot,
  Bars: ABars, Cols: ACols, Donut: ADonut, Table: ATable, Legend: ALegend, AppBar: AAppBar, Avatar: AAvatar, cx: acx, PBar: APBar,
} = window;

/* generic admin shell with left rail */
const AdminShell = ({ railTitle, items, active, role, user, children, go }) => (
  <div className="row" style={{ minHeight: 600 }}>
    <div className="rail">
      <div className="applogo" style={{ padding: "2px 10px 14px" }}><span className="nav__mark" style={{ width: 22, height: 22, fontSize: 11 }}>C</span> Admin</div>
      <div className="rail__head">{railTitle}</div>
      {items.map(it => <div key={it} className={acx("rail__item", it === active && "rail__item--on")} style={{ justifyContent: "space-between" }}>{it}</div>)}
    </div>
    <div className="f1" style={{ minWidth: 0 }}>
      <AAppBar role={role} active={role === "kbt" ? "Dashboard" : "Model"} user={user} go={go} />
      <div className="wf">{children}</div>
    </div>
  </div>
);

const ADMIN_SCREENS = {

  /* ---------------- KBT: ANALYTICS DASHBOARD ---------------- */
  kbtanalytics: {
    title: "KBT — platform analytics", group: "KBT admin", num: "K1",
    render: ({ go }) => (
      <AdminShell railTitle="Keep Britain Tidy" role="kbt" user="KB" go={go} active="Dashboard"
        items={["Dashboard", "Users & settings", "Groups", "Content", "National data", "Audit log", "Comms"]}>
        <ARow g={14} ac jb>
          <div className="col gap6"><AH1>Platform dashboard</AH1><span className="sm muted">Sign-ups, completions & engagement across England <ARef>KBT-04</ARef></span></div>
          <ARow g={8}><AChip on>This academic year</AChip><ABtn sm>⬇ Export</ABtn></ARow>
        </ARow>
        <div style={{ height: 16 }} />
        <ARow g={14}>{[["Settings registered", "5,420", "▲ 8%"], ["Footprints completed", "4,180", "▲ 12%"], ["Plans created", "2,640", "new"], ["Active groups", "186", "▲ 4%"]].map(([a, b, c]) => <ACard key={a} className="col gap4 f1" pad={14}><span className="up">{a}</span><b style={{ fontSize: 22 }}>{b}</b><span className="xs" style={{ color: "var(--accent-deep)" }}>{c}</span></ACard>)}</ARow>
        <div style={{ height: 16 }} />
        <ARow g={16} as>
          <ACard style={{ flex: 1 }} className="col gap12"><ARow ac jb><AUp>Registrations over time</AUp><ATag tone="green">+1,120 this term</ATag></ARow><ACols data={[{ l: "Sep", v: 30, c: "var(--accent-mid)" }, { l: "Oct", v: 52, c: "var(--accent-mid)" }, { l: "Nov", v: 71, c: "var(--accent-mid)" }, { l: "Dec", v: 60, c: "var(--accent-mid)" }, { l: "Jan", v: 84, c: "var(--accent)" }, { l: "Feb", v: 96, c: "var(--accent)" }, { l: "Mar", v: 78, c: "var(--accent)" }]} /></ACard>
          <ACard style={{ flex: "0 0 300px" }} className="col gap12"><AUp>By setting type</AUp><ADonut segs={[{ v: 58, c: "oklch(0.52 0.11 152)" }, { v: 27, c: "oklch(0.66 0.09 168)" }, { v: 15, c: "oklch(0.74 0.07 230)" }]} center={<div className="xs faint mono">5,420</div>} /><ALegend items={[{ l: "Primary 58%", c: "oklch(0.52 0.11 152)" }, { l: "Secondary 27%", c: "oklch(0.66 0.09 168)" }, { l: "Nursery/FE 15%", c: "oklch(0.74 0.07 230)" }]} /></ACard>
        </ARow>
        <div style={{ height: 16 }} />
        <ARow g={16} as>
          <ACard style={{ flex: 1 }} className="col gap10"><ARow ac jb><AUp>Regional engagement</AUp><ARef>KBT-04</ARef></ARow><ABars data={[{ l: "North West", v: 820 }, { l: "London", v: 760 }, { l: "South East", v: 690 }, { l: "Yorkshire", v: 540 }, { l: "Midlands", v: 510 }]} /></ACard>
          <ACard soft style={{ flex: "0 0 300px" }} className="col gap10"><ARow g={8} ac><span>📣</span><AH3>National data export <ARef>KBT-05</ARef></AH3></ARow><ATxt sm muted>Aggregated & anonymised dataset for reporting and media, respecting governance rules.</ATxt><ABtn sm>Configure & export</ABtn></ACard>
        </ARow>
      </AdminShell>
    ),
  },

  /* ---------------- KBT: USERS & SETTINGS ---------------- */
  kbtusers: {
    title: "KBT — users & settings", group: "KBT admin", num: "K2",
    render: ({ go }) => (
      <AdminShell railTitle="Keep Britain Tidy" role="kbt" user="KB" go={go} active="Users & settings"
        items={["Dashboard", "Users & settings", "Groups", "Content", "National data", "Audit log", "Comms"]}>
        <ARow g={14} ac jb>
          <div className="col gap6"><ARow g={12} ac><AH1>Users & settings</AH1><ARef>KBT-01</ARef></ARow><span className="sm muted">Manage users, settings, roles & permissions across the platform.</span></div>
          <ARow g={8}><ABtn sm>＋ Add user</ABtn><ABtn sm primary>＋ Add setting</ABtn></ARow>
        </ARow>
        <div style={{ height: 16 }} />
        <ARow g={8} ac wrap>
          <AField w={280} sel placeholder="🔍 Search settings, users, URN…" />
          <AChip on>All</AChip><AChip>Settings</AChip><AChip>Users</AChip><AChip>Groups</AChip>
          <ASpacer /><span className="sm faint mono">5,420 settings · 9,310 users</span>
        </ARow>
        <div style={{ height: 14 }} />
        <ACard pad={0}>
          <ATable cols={[{ t: "Setting", w: "26%" }, "URN", "Group", "Users", "Role access", "Status", ""]} rows={[
            ["Riverside Primary", "123456", "Leeds CC", "3", <ARow g={5}><ATag tone="green">Lead</ATag><ATag tone="grey">+2</ATag></ARow>, <ATag tone="green">Active</ATag>, "⋯"],
            ["Hillside Academy", "234567", "Northern Trust", "5", <ATag tone="green">Lead</ATag>, <ATag tone="green">Active</ATag>, "⋯"],
            ["Oakwood Nursery", "345678", "—", "1", <ATag tone="grey">Viewer</ATag>, <ATag tone="amber">Unverified</ATag>, "⋯"],
            ["Eastgate College", "456789", "—", "4", <ARow g={5}><ATag tone="green">Lead</ATag><ATag tone="grey">+3</ATag></ARow>, <ATag tone="green">Active</ATag>, "⋯"],
            ["St Mary's CofE", "567890", "Diocese of York", "2", <ATag tone="green">Lead</ATag>, <ATag tone="green">Active</ATag>, "⋯"],
          ]} />
        </ACard>
        <div style={{ height: 14 }} />
        <AAnnot><b>REG-03 / KBT-06</b> — RBAC with least-privilege; all administrative changes captured in the audit log with user & timestamp.</AAnnot>
      </AdminShell>
    ),
  },

  /* ---------------- KBT: CONTENT ---------------- */
  kbtcontent: {
    title: "KBT — content management", group: "KBT admin", num: "K3",
    render: ({ go }) => (
      <AdminShell railTitle="Keep Britain Tidy" role="kbt" user="KB" go={go} active="Content"
        items={["Dashboard", "Users & settings", "Groups", "Content", "National data", "Audit log", "Comms"]}>
        <ARow g={14} ac jb>
          <div className="col gap6"><ARow g={12} ac><AH1>Content & resources</AH1><ARef>KBT-03</ARef></ARow><span className="sm muted">Publish guidance & resources without a code release.</span></div>
          <ABtn sm primary>＋ New resource</ABtn>
        </ARow>
        <div style={{ height: 16 }} />
        <ARow g={16} as>
          <ACard pad={0} style={{ flex: 1 }}>
            <ATable cols={[{ t: "Title", w: "40%" }, "Section", "Status", "Updated"]} rows={[
              ["Reducing your energy use", "Guidance", <ATag tone="green">Published</ATag>, "2 Jun"],
              ["Sustainable travel plan toolkit", "Resources", <ATag tone="green">Published</ATag>, "28 May"],
              ["DfE Climate Action Plan explainer", "Guidance", <ATag tone="amber">Draft</ATag>, "11 Jun"],
              ["Catering & food waste guide", "Resources", <ATag tone="green">Published</ATag>, "3 May"],
              ["Welcome / getting started", "Onboarding", <ATag tone="sky">Scheduled</ATag>, "—"],
            ]} />
          </ACard>
          <ACol g={14} style={{ flex: "0 0 300px" }}>
            <ACard className="col gap10"><AUp>Editor</AUp><AField label="Title" value="DfE Climate Action Plan explainer" /><AField label="Section" sel value="Guidance" /><ABox style={{ height: 90 }} className="ph">rich text body</ABox><ARow g={8}><ABtn sm>Save draft</ABtn><ABtn sm primary>Publish</ABtn></ARow></ACard>
            <AAnnot>CMS-managed — content areas editable by KBT staff, no deployment needed.</AAnnot>
          </ACol>
        </ARow>
      </AdminShell>
    ),
  },

  /* ---------------- PNZ: EMISSIONS FACTORS ---------------- */
  pnzfactors: {
    title: "PNZ — emissions factors", group: "PNZ admin", num: "P1",
    render: ({ go }) => (
      <AdminShell railTitle="PNZ Advisory" role="pnz" user="PZ" go={go} active="Factors"
        items={["Model overview", "Emissions factors", "Benchmarks", "Validation ranges", "Methodology", "Sandbox", "Data QA"]}>
        <ARow g={14} ac jb>
          <div className="col gap6"><ARow g={12} ac><AH1>Emissions factors</AH1><ARef>PNZ-01</ARef></ARow><span className="sm muted">Versioned, effective-dated factor sets referenced by the engine <ARef>ENG-02</ARef></span></div>
          <ARow g={8}><AChip on>2025 set (live)</AChip><AChip>2024 set</AChip><ABtn sm primary>＋ New version</ABtn></ARow>
        </ARow>
        <div style={{ height: 16 }} />
        <ACard className="row ac jb" soft style={{ borderColor: "var(--accent-mid)" }}>
          <ARow g={20} ac><div className="col gap4"><span className="up">Active set</span><b>UK Gov GHG 2025 v1.2</b></div><ALine style={{ width: 1, height: 36 }} /><div className="col gap4"><span className="up">Effective</span><b className="mono sm">01 Apr 2025 →</b></div><ALine style={{ width: 1, height: 36 }} /><div className="col gap4"><span className="up">Status</span><ATag tone="green"><ADot tone="green" /> Published</ATag></div></ARow>
          <ARow g={8}><ABtn sm>Duplicate</ABtn><ABtn sm>View history</ABtn></ARow>
        </ACard>
        <div style={{ height: 14 }} />
        <ACard pad={0}>
          <ATable zebra cols={[{ t: "Activity", w: "30%" }, "Unit", "Factor (kgCO₂e)", "Scope", "Source", "Effective"]} rows={[
            ["Natural gas", "kWh", "0.18293", "1", "BEIS 2025", "Apr 2025"],
            ["Grid electricity", "kWh", "0.20705", "2", "BEIS 2025", "Apr 2025"],
            ["Water supply", "m³", "0.14400", "3", "BEIS 2025", "Apr 2025"],
            ["Car — average", "mile", "0.27430", "3", "BEIS 2025", "Apr 2025"],
            ["General waste — landfill", "tonne", "446.242", "3", "BEIS 2025", "Apr 2025"],
          ]} />
        </ACard>
        <div style={{ height: 14 }} />
        <AAnnot><b>ENG-02 / ENG-05</b> — each completed report records the factor set version used, so historical results stay reproducible.</AAnnot>
      </AdminShell>
    ),
  },

  /* ---------------- PNZ: BENCHMARKS & RANGES ---------------- */
  pnzbench: {
    title: "PNZ — benchmarks & ranges", group: "PNZ admin", num: "P2",
    render: ({ go }) => (
      <AdminShell railTitle="PNZ Advisory" role="pnz" user="PZ" go={go} active="Validation ranges"
        items={["Model overview", "Emissions factors", "Benchmarks", "Validation ranges", "Methodology", "Sandbox", "Data QA"]}>
        <ARow g={12} ac><AH1>Benchmarks & validation ranges</AH1><ARef>PNZ-02</ARef></ARow>
        <ALead>Configurable benchmarks by phase/type/size, and per-input validation ranges & error checks — editable without a code deployment <ARef>ENG-04</ARef>.</ALead>
        <div style={{ height: 16 }} />
        <ARow g={16} as>
          <ACard style={{ flex: 1 }} className="col gap12"><ARow ac jb><AUp>Benchmarks by phase <ARef>ENG-03</ARef></AUp><ABtn sm>＋ Add</ABtn></ARow>
            <ATable cols={["Phase", "Metric", "Avg", "Top 25%"]} rows={[["Primary", "tCO₂e / pupil", "0.29", "0.19"], ["Secondary", "tCO₂e / pupil", "0.41", "0.28"], ["Nursery", "tCO₂e / m²", "0.034", "0.022"], ["FE College", "tCO₂e / pupil", "0.55", "0.38"]]} />
          </ACard>
          <ACard style={{ flex: 1 }} className="col gap12"><ARow ac jb><AUp>Validation ranges <ARef>ENG-04</ARef></AUp><ABtn sm>＋ Add rule</ABtn></ARow>
            <ATable cols={["Input", "Min", "Max", "Action"]} rows={[
              ["Gas (kWh/m²)", "20", "180", <ATag tone="amber">Warn</ATag>],
              ["Electricity (kWh/m²)", "15", "120", <ATag tone="amber">Warn</ATag>],
              ["Pupils", "1", "3,000", <ATag tone="grey">Error</ATag>],
              ["Floor area (m²)", "50", "60,000", <ATag tone="grey">Error</ATag>],
            ]} />
          </ACard>
        </ARow>
        <div style={{ height: 14 }} />
        <ACard soft className="col gap10"><AUp>Edit rule — Gas (kWh/m²)</AUp><ARow g={14} ac><AField label="Min" value="20" w={120} /><AField label="Max" value="180" w={120} /><AField label="On breach" sel value="Warn" w={160} /><AField label="Message" value="Above expected for floor area" /></ARow><ARow g={8} je><ABtn sm>Cancel</ABtn><ABtn sm primary>Save rule</ABtn></ARow></ACard>
      </AdminShell>
    ),
  },

  /* ---------------- PNZ: METHODOLOGY & SANDBOX ---------------- */
  pnzmethod: {
    title: "PNZ — methodology & sandbox", group: "PNZ admin", num: "P3",
    render: ({ go }) => (
      <AdminShell railTitle="PNZ Advisory" role="pnz" user="PZ" go={go} active="Methodology"
        items={["Model overview", "Emissions factors", "Benchmarks", "Validation ranges", "Methodology", "Sandbox", "Data QA"]}>
        <ARow g={14} ac jb>
          <div className="col gap6"><ARow g={12} ac><AH1>Methodology versions</AH1><ARef>PNZ-03</ARef></ARow><span className="sm muted">Versioned calculation parameters with preview before publish <ARef>ENG-01</ARef></span></div>
          <ABtn sm primary>＋ Draft new version</ABtn>
        </ARow>
        <div style={{ height: 16 }} />
        <ARow g={16} as>
          <ACard pad={0} style={{ flex: 1 }}>
            <ATable cols={[{ t: "Version", w: "20%" }, "Summary", "Status", "Effective"]} rows={[
              ["v3.2", "2025 factors, revised transport scopes", <ATag tone="green"><ADot tone="green" /> Live</ATag>, "Apr 2025"],
              ["v3.1", "Added procurement category", <ATag tone="grey">Archived</ATag>, "Sep 2024"],
              ["v4.0-beta", "Scope 3 expansion, food model", <ATag tone="amber"><ADot tone="amber" /> Draft</ATag>, "—"],
            ]} />
          </ACard>
          <ACard style={{ flex: "0 0 320px", borderColor: "var(--accent-mid)" }} className="col gap12">
            <ARow g={8} ac><span>🧪</span><AH3>Sandbox <ARef>PNZ-06</ARef></AH3></ARow>
            <ATxt sm muted>Test methodology changes against a sample data pack before they affect live results.</ATxt>
            <ABox style={{ padding: 14 }} className="col gap8">
              <ARow ac jb><span className="sm muted">Test pack</span><b className="sm mono">50 settings</b></ARow>
              <ARow ac jb><span className="sm muted">v3.2 → v4.0-beta</span><ATag tone="amber">+6.4% avg</ATag></ARow>
              <APBar pct={70} />
            </ABox>
            <AAnnot><b>ENG-06</b> — restatement preserves prior results; historical reports stay immutable.</AAnnot>
            <ARow g={8} je><ABtn sm>Run test</ABtn><ABtn sm primary>Publish v4.0</ABtn></ARow>
          </ACard>
        </ARow>
      </AdminShell>
    ),
  },
};

window.ADMIN_SCREENS = ADMIN_SCREENS;
