/* ============================================================
   screens-school.jsx — School user end-to-end journey
   ============================================================ */
const {
  Row, Col, Spacer, Line, H1, H2, H3, Lead, Txt, Up, Ref,
  Card, Ph, Box, Annot, Field, Btn, Chip, Tag, Dot, Steps, PBar,
  Bars, Cols, Donut, Table, Legend, AppBar, Avatar, cx,
} = window;

/* emissions categories (shared palette) */
const CATS = [
  { l: "Energy — gas & electricity", v: 41.2, c: "oklch(0.52 0.11 152)" },
  { l: "Transport & travel", v: 22.8, c: "oklch(0.66 0.09 168)" },
  { l: "Food & catering", v: 14.1, c: "oklch(0.70 0.10 128)" },
  { l: "Procurement & goods", v: 11.6, c: "oklch(0.62 0.05 285)" },
  { l: "Waste", v: 6.3, c: "oklch(0.74 0.12 70)" },
  { l: "Water", v: 4.0, c: "oklch(0.74 0.07 230)" },
];

const MHead = ({ title, back, go, right }) => (
  <div className="row ac jb" style={{ padding: "10px 16px", borderBottom: "1px solid var(--line-soft)" }}>
    <div className="row ac gap10">
      {back && <span style={{ cursor: "pointer", color: "var(--ink-soft)", fontSize: 18 }} onClick={() => go(back)}>‹</span>}
      <b style={{ fontSize: 15 }}>{title}</b>
    </div>
    {right}
  </div>
);

const MTab = () => (
  <div className="row" style={{ borderTop: "1px solid var(--line-soft)", padding: "9px 0 4px" }}>
    {[["◳", "Home"], ["＋", "Calculate"], ["▦", "Report"], ["✓", "Plan"]].map(([i, l], k) => (
      <div key={l} className="f1 col ac gap6" style={{ color: k === 0 ? "var(--accent-deep)" : "var(--ink-faint)" }}>
        <span style={{ fontSize: 17 }}>{i}</span><span style={{ fontSize: 10, fontWeight: 600 }}>{l}</span>
      </div>
    ))}
  </div>
);

/* ============================================================
   Calculator — real data-collection questions (V2 25/26 sheet)
   ============================================================ */
const CALC_SECTIONS = ["Your details", "Energy, Waste & Water", "Transport", "Food", "Purchasing & Uniform"];
const SECTION_REF = ["Confirm details", "Section 1", "Section 2", "Section 3", "Section 4"];
const WHY = [
  "These operational figures normalise your footprint (per pupil, per m²) and scale several of the estimates.",
  "Energy is usually the largest source of a school's emissions. Use your annual bills for accuracy.",
  "Covers vehicles you own or lease, school trips, and how staff & pupils travel in each day.",
  "Your meal mix and the number of meat-free days drive your catering emissions.",
  "A spend-based estimate for goods & services. Uniform is measured but reported separately.",
];
const DD = {
  fuel: ["Natural Gas", "Butane", "CNG", "LNG", "LPG", "Propane", "Burning Oil", "Fuel Oil", "Coal", "Biogas", "Landfill Gas", "Biopropane", "Biomethane", "Wood Chips", "Wood Logs", "Wood Pellets", "Grass/straw"],
  units: ["kg", "tonnes", "litres", "kWh", "cubic metres", "GJ"],
  freq: ["Multiple times a week", "Weekly", "Every two weeks", "Monthly"],
  mode: ["Road", "Rail", "Sea", "Air"],
};

const YesNo = ({ v }) => (
  <div className="yesno"><span className={cx("yesno__o", v === "Yes" && "on")}>Yes</span><span className={cx("yesno__o", v === "No" && "on")}>No</span></div>
);
const SubHead = ({ title, scope }) => {
  const cls = scope === "Scope 1" ? " scopetag--1" : scope === "Scope 2" ? " scopetag--2" : scope === "Scope 3" ? " scopetag--3" : "";
  return <div className="subhead"><b>{title}</b>{scope && <span className={"scopetag" + cls}>{scope}</span>}</div>;
};
const Q = ({ n, q, tip, children }) => (
  <div className="qblock">
    <Row g={12} as>
      {n != null && <span className="qnum">{n}</span>}
      <div className="col gap8 f1" style={{ minWidth: 0 }}>
        <div className="qtext">{q}</div>
        {children}
        {tip && <div className="qtip">{tip}</div>}
      </div>
    </Row>
  </div>
);
const Spend = ({ n, label, ex }) => (
  <div className="field" style={{ width: "calc(50% - 7px)" }}>
    <div className="flabel"><span className="mono xs" style={{ color: "var(--accent-deep)" }}>{n}</span>&nbsp;{label}</div>
    <div className="input"><span>£0</span></div>
    <div className="fhint">{ex}</div>
  </div>
);

const SectionForm = ({ idx }) => {
  if (idx === 0) return (
    <Col g={2}>
      <Q n="·" q="In the last 12 months, how many members of staff did you have?" tip="Include all staff who regularly work at your setting — teachers, admin, cleaners, catering staff, caretakers, etc.">
        <Field w={180} value="48" />
      </Q>
      <Q n="·" q="In the last 12 months, how many students attended your school?"><Field w={180} value="412" /></Q>
      <Q n="·" q="How many days are you open for teaching each week?"><Field w={120} value="5" /></Q>
      <Q n="·" q="How many weeks are you open in the academic year?"><Field w={120} value="39" /></Q>
    </Col>
  );

  if (idx === 1) return (
    <Col g={2}>
      <SubHead title="Fuel" scope="Scope 1" />
      <Q n="1.1" q="In the last 12 months, what types of fuel, and how much, did you use in your school buildings?" tip="Review your annual gas bill — usually obtainable via your Finance Manager.">
        <Table cols={[{ t: "Fuel type", w: "46%" }, "Amount", "Unit"]} rows={[
          [<Field sel value="Natural Gas" />, <Field value="84,200" />, <Field sel value="kWh" />],
          [<Field sel placeholder="Add a fuel type…" />, <Field placeholder="0" />, <Field sel placeholder="Unit" />],
        ]} />
      </Q>
      <SubHead title="Electricity" scope="Scope 2" />
      <Q n="1.2" q="Over the last 12 months, how much electricity (in kWh) did your school use from your energy supplier?" tip="Review your annual electricity bill — usually obtainable via your Finance Manager.">
        <Field w={220} value="61,500" hint="kWh / year" />
      </Q>
      <Q n="1.3" q="Was that electricity purchased on a renewable or ‘green’ tariff?" tip="Only select Yes if you buy 100% renewable electricity backed by a REGO certificate, or generate 100% on-site. Yes reports electricity emissions as zero (market-based); No uses the UK grid average (location-based)."><YesNo v="No" /></Q>
      <Q n="1.4" q="Over the last 12 months, did your school generate its own renewable electricity on-site?" tip="e.g. solar panels, a small wind turbine, micro-hydro, or a biomass/biogas boiler."><YesNo v="No" /></Q>
      <Q n="1.5" q="Roughly how much electricity (in kWh) did your school generate from those on-site systems?"><Field w={220} placeholder="0" hint="kWh / year" /></Q>
      <SubHead title="Waste" scope="Scope 3" />
      <Q n="1.6–1.8" q="How many of the following bins were at your school, and how often were they collected?" tip="Only count bins collected by your waste company. Don't count smaller bins emptied into larger ones. Sanitary bins go under general waste.">
        <Table cols={[{ t: "Bin", w: "26%" }, "240L", "360L", "660L", "1100L", "Collection"]} rows={[
          ["General", <Field value="3" />, <Field placeholder="0" />, <Field placeholder="0" />, <Field placeholder="0" />, <Field sel value="Weekly" />],
          ["Recycling", <Field value="2" />, <Field placeholder="0" />, <Field placeholder="0" />, <Field placeholder="0" />, <Field sel value="Weekly" />],
          ["Garden", <Field placeholder="0" />, <Field placeholder="0" />, <Field placeholder="0" />, <Field placeholder="0" />, <Field sel placeholder="—" />],
        ]} />
        <div style={{ height: 8 }} />
        <Table cols={[{ t: "Food waste", w: "26%" }, "50L", "120L", "240L", "Collection"]} rows={[
          ["Food", <Field value="1" />, <Field placeholder="0" />, <Field placeholder="0" />, <Field sel value="Multiple times a week" />],
        ]} />
      </Q>
      <SubHead title="Water" scope="Scope 3" />
      <Q n="1.9" q="In the last 12 months, roughly how much water (in m³) did your school use?" tip="On your water bill. Combine fresh (potable) water and sewerage / treatment / waste-water."><Field w={220} value="1,840" hint="m³ / year" /></Q>
      <Q n="1.10" q="Roughly how much did your school spend on water?"><Field w={220} placeholder="£0" /></Q>
    </Col>
  );

  if (idx === 2) return (
    <Col g={2}>
      <SubHead title="School vehicles" scope="Scope 1" />
      <Q n="2.1" q="In the last 12 months, did your school own or operate any vehicles?" tip="Include any long-term lease vehicles."><YesNo v="Yes" /></Q>
      <Q n="2.2 / 2.4" q="How many vehicles did your school own, and how many miles did they travel?" tip="Mileage is in logbooks or MOT records. For battery & plug-in hybrid EVs, only count miles where the vehicle was NOT charged on-site (on-site charging is already in your electricity figure).">
        <Table cols={[{ t: "Vehicle type", w: "44%" }, "Number owned", "Miles travelled"]} rows={
          ["Car", "Battery EV", "Plug-in Hybrid EV", "Van", "Minibus", "Coach"].map((v, i) => [v, <Field placeholder="0" value={i === 4 ? "1" : undefined} />, <Field placeholder="0" value={i === 4 ? "4,200" : undefined} />])
        } />
      </Q>
      <Q n="2.3" q="Roughly how much did your school spend on fuel for school-owned vehicles?"><Field w={220} placeholder="£0" /></Q>
      <SubHead title="School trips" scope="Scope 3" />
      <Q n="2.5 / 2.6" q="How many international school trips did you take — and by what mode, distance and party size?" tip="For trips using several modes, tell us about the mode used for the longest leg. You don't need to log trips in school-owned vehicles or on foot.">
        <Table cols={[{ t: "Trip name (reference)", w: "34%" }, "Mode", "Distance (miles, round-trip)", "People (incl. staff)"]} rows={[
          [<Field placeholder="e.g. Year 10 France" />, <Field sel placeholder="Sea / Air…" />, <Field placeholder="0" />, <Field placeholder="0" />],
        ]} />
      </Q>
      <Q n="2.7 / 2.8" q="How many UK school trips did you take — and by what mode, distance and party size?" tip="Combine recurring trips (e.g. weekly swimming) into one row using the cumulative distance of all repeats.">
        <Table cols={[{ t: "Trip name (reference)", w: "34%" }, "Mode", "Distance (miles, round-trip)", "People (incl. staff)"]} rows={[
          [<Field value="Swimming (weekly)" />, <Field sel value="Road" />, <Field value="420" />, <Field value="32" />],
          [<Field placeholder="Add a trip…" />, <Field sel placeholder="Mode" />, <Field placeholder="0" />, <Field placeholder="0" />],
        ]} />
      </Q>
      <SubHead title="Staff & student commuting" scope="Scope 3" />
      <Q n="2.9 / 2.11" q="On an average day, what percentage of students and staff travel to school by each mode?" tip="You'll need a quick travel survey for this — a template is available to download.">
        <Table cols={[{ t: "Mode", w: "40%" }, "% of students", "% of staff"]} rows={
          ["Car", "Battery EV", "Plug-in hybrid EV", "Bus", "Tram / train", "Walk / wheel"].map(m => [m, <Field placeholder="0%" />, <Field placeholder="0%" />])
        } />
      </Q>
      <Q n="2.10 / 2.12" q="On average, how far do staff and students travel to get to school (one-way)?">
        <Table cols={[{ t: "Distance (one-way)", w: "40%" }, "No. of students", "No. of staff"]} rows={
          ["0–5 miles", "5–10 miles", "10–15 miles", "15–20 miles", "20–25 miles", "25–30 miles", "30+ miles"].map(d => [d, <Field placeholder="0" />, <Field placeholder="0" />])
        } />
      </Q>
    </Col>
  );

  if (idx === 3) return (
    <Col g={2}>
      <SubHead title="Food" scope="Scope 3" />
      <Q n="3.1" q="In the last 12 months, did your school serve hot meals?" tip="Speak to your Catering Manager or equivalent to find this out."><YesNo v="Yes" /></Q>
      <Q n="3.2" q="In an average week, how many meals including meat does your school serve?" tip="The total number of meat meals served — not how often a meat meal appears on the menu (e.g. 100 pupils × 5 days = 500)."><Field w={180} value="1,450" hint="meals / week" /></Q>
      <Q n="3.3" q="In an average week, how many vegetarian meals does your school serve?" tip="Vegetarian = meat/fish free, but may include dairy and eggs."><Field w={180} value="520" hint="meals / week" /></Q>
      <Q n="3.4" q="In an average week, how many vegan meals does your school serve?" tip="Fully plant-based = no meat, fish, dairy or eggs."><Field w={180} value="180" hint="meals / week" /></Q>
      <Q n="3.5" q="In an average week, how many 100% meat-free days does your school offer?" tip="No meat or fish served anywhere in school that day."><Field w={120} value="1" hint="days / week" /></Q>
      <Q n="3.6" q="In an average week, how many 100% plant-based days does your school offer?" tip="No meat, fish, dairy or eggs served anywhere in school that day."><Field w={120} placeholder="0" hint="days / week" /></Q>
    </Col>
  );

  /* idx === 4 */
  return (
    <Col g={2}>
      <SubHead title="Purchasing" scope="Scope 3" />
      <Q n="4.1–4.10" q="In the last 12 months, roughly how much did your school spend on each of these? You can use rounded figures." tip="Exclude anything already counted elsewhere: electricity, fuel, water, waste collection, school vehicles and food/catering. Exclude regular staff pay, but include one-off spend on repairs, building work, training or workshops.">
        <Row g={14} wrap>
          <Spend n="4.1" label="Cleaning supplies & PPE" ex="Soap, paper towels, cleaning spray, gloves, bin bags" />
          <Spend n="4.2" label="Computer & electronic products" ex="Laptops, tablets, projectors, monitors, printers" />
          <Spend n="4.3" label="Furniture" ex="Desks, chairs, shelving, storage, cabinets" />
          <Spend n="4.4" label="Machinery & equipment" ex="3D printers, microscopes, power tools, vacuums" />
          <Spend n="4.5" label="Textiles" ex="Uniform, sports kit, costumes, curtains, tea towels" />
          <Spend n="4.6" label="Other manufactured goods" ex="Paper, pens, books, toys & games, instruments" />
          <Spend n="4.7" label="Building services" ex="Maintenance, cleaning, grounds, pest control" />
          <Spend n="4.8" label="IT services" ex="Internet, software licences, IT maintenance" />
          <Spend n="4.9" label="Security services" ex="Guards, alarm response, sign-in systems" />
          <Spend n="4.10" label="Other professional services" ex="Legal/HR, accountancy, training, design" />
        </Row>
      </Q>
      <SubHead title="Uniform" scope="Out of scope" />
      <Q n="4.11" q="In the last 12 months, did students have to buy a uniform from an external supplier?" tip="Uniform you buy in yourself goes under Textiles (4.5) above."><YesNo v="Yes" /></Q>
      <Q n="4.12" q="If yes, what percentage of uniforms were re-worn?" tip="Items worn for more than one academic year — second-hand, uniform banks/swap shops, or re-worn by the same pupil. An approximate figure is fine."><Field w={140} value="35%" /></Q>
      <Q n="4.13" q="Did students have to buy a sports kit from an external supplier?"><YesNo v="No" /></Q>
      <Q n="4.14" q="If yes, what percentage of sports kits were re-worn?"><Field w={140} placeholder="0%" /></Q>
      <Annot><b>Reported separately</b> — global carbon accounting places parent-bought uniform outside a school's operational boundary, so uniform emissions sit outside your total but still appear as a focus area in your report.</Annot>
    </Col>
  );
};

const CalcScreen = ({ go, variant, device }) => {
  const [sec, setSec] = React.useState(1);
  const pct = Math.round((sec / (CALC_SECTIONS.length - 1)) * 100);

  if (device === "mobile") return (
    <div className="col">
      <MHead title="Energy, Waste & Water" back="home" go={go} right={<span className="xs faint mono">2 / 5</span>} />
      <div style={{ padding: "0 16px" }}><PBar pct={40} /></div>
      <div className="col gap14" style={{ padding: 16 }}>
        <Annot><b>Auto-saved</b> as you go — resume any time.</Annot>
        <SubHead title="Electricity" scope="Scope 2" />
        <Field label="1.2 Electricity used from supplier" value="61,500" hint="kWh / year" />
        <div className="qblock" style={{ borderBottom: 0, paddingTop: 4 }}>
          <div className="qtext" style={{ marginBottom: 8 }}>1.3 Was it on a renewable / green tariff?</div><YesNo v="No" />
        </div>
        <Field label="1.5 Electricity generated on-site" placeholder="0" hint="kWh / year" />
        <SubHead title="Water" scope="Scope 3" />
        <Field label="1.9 Water used" value="1,840" hint="m³ / year" />
        <Row g={10}><Btn full>Save & exit</Btn><Btn primary full onClick={() => go("review")}>Next →</Btn></Row>
      </div>
      <MTab />
    </div>
  );

  return (
    <div><AppBar role="school" active="Calculate" go={go} />
      <div className="wf">
        <Row g={14} ac jb>
          <div className="col gap6"><H1>2025/26 carbon footprint</H1><span className="sm muted mono">Reporting period · academic year · 5 sections</span></div>
          <Row g={10} ac><Tag tone="amber"><Dot tone="amber" /> Draft saved</Tag><Btn sm>Save & exit</Btn></Row>
        </Row>
        <div style={{ height: 18 }} />

        {variant === 0 && (/* Stepped wizard */
          <Col g={18}>
            <Steps steps={CALC_SECTIONS} current={sec} />
            <Row g={26} as>
              <Card style={{ flex: 1, minWidth: 0 }}>
                <Row g={10} ac jb><H2>{CALC_SECTIONS[sec]}</H2><Ref>{SECTION_REF[sec]}</Ref></Row>
                <Line style={{ margin: "12px 0 2px" }} />
                <SectionForm idx={sec} />
              </Card>
              <Col g={12} style={{ flex: "0 0 248px" }}>
                <Card soft><Up>Progress</Up><div style={{ height: 10 }} /><PBar pct={pct} /><div className="xs faint" style={{ marginTop: 6 }}>Section {sec + 1} of {CALC_SECTIONS.length}</div></Card>
                <Card soft className="col gap8"><Up>Why we ask</Up><Txt sm muted>{WHY[sec]}</Txt></Card>
                <Annot><b>Auto-save</b> — inputs are validated against PNZ ranges with inline warnings; pre-filled from last year where available.</Annot>
              </Col>
            </Row>
            <Row g={10} je>
              <Btn onClick={() => (sec > 0 ? setSec(sec - 1) : go("home"))}>‹ {sec > 0 ? CALC_SECTIONS[sec - 1] : "Dashboard"}</Btn>
              {sec < CALC_SECTIONS.length - 1
                ? <Btn primary onClick={() => setSec(sec + 1)}>Continue to {CALC_SECTIONS[sec + 1]} ›</Btn>
                : <Btn primary onClick={() => go("review")}>Review & submit →</Btn>}
            </Row>
          </Col>
        )}

        {variant === 1 && (/* Accordion */
          <Col g={12}>
            <Annot>Complete the five sections in any order — each expands in place. Inputs are validated inline and auto-saved.</Annot>
            {CALC_SECTIONS.map((c, i) => (
              <Card key={c} pad={0}>
                <Row ac jb style={{ padding: "14px 18px", cursor: "pointer", background: i === sec ? "var(--accent-soft)" : "transparent" }} onClick={() => setSec(i === sec ? -1 : i)}>
                  <Row g={10} ac>
                    <span className="step__n" style={{ width: 22, height: 22, fontSize: 11, ...(i < 1 ? { background: "var(--accent)", color: "#fff", borderColor: "var(--accent)" } : {}) }}>{i < 1 ? "✓" : i + 1}</span>
                    <b style={{ fontSize: 14 }}>{c}</b>
                    {i < 1 ? <Tag tone="green">Done</Tag> : i === sec ? <Tag tone="amber">Open</Tag> : null}
                  </Row>
                  <span className="faint">{i === sec ? "▴" : "▾"}</span>
                </Row>
                {i === sec && <div style={{ padding: "2px 18px 18px" }}><SectionForm idx={i} /></div>}
              </Card>
            ))}
            <Row g={10} je><Btn>Save draft</Btn><Btn primary onClick={() => go("review")}>Review & submit →</Btn></Row>
          </Col>
        )}

        {variant === 2 && (/* Single scroll */
          <Row g={26} as>
            <Col g={8} style={{ flex: "0 0 196px", position: "sticky", top: 0 }}>
              <Up>On this page</Up>
              {CALC_SECTIONS.map((c, i) => (
                <div key={c} className={cx("rail__item", i === sec && "rail__item--on")} style={{ justifyContent: "space-between" }} onClick={() => setSec(i)}>
                  <span>{c}</span>{i < 1 && <span style={{ color: "var(--accent)" }}>✓</span>}
                </div>
              ))}
              <div style={{ height: 8 }} /><PBar pct={pct} /><div className="xs faint" style={{ marginTop: 6 }}>1 of 5 complete</div>
            </Col>
            <Col g={16} style={{ flex: 1, minWidth: 0 }}>
              <Annot>All five sections on one scrollable page with a sticky index. Auto-saves throughout.</Annot>
              {CALC_SECTIONS.map((c, i) => (
                <Card key={c} style={i < sec ? { opacity: .72 } : {}}>
                  <Row g={10} ac jb><H2>{c}</H2>{i < 1 ? <Tag tone="green">Complete</Tag> : <Ref>{SECTION_REF[i]}</Ref>}</Row>
                  <Line style={{ margin: "12px 0 2px" }} />
                  <SectionForm idx={i} />
                </Card>
              ))}
              <Row g={10} je><Btn primary onClick={() => go("review")}>Review & submit footprint →</Btn></Row>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

const SCHOOL_SCREENS = {

  /* ---------------- SIGN IN ---------------- */
  signin: {
    title: "Sign in / Landing", group: "School journey", num: "S1",
    render: ({ go }) => (
      <div className="row" style={{ minHeight: 560 }}>
        <div className="col gap20" style={{ flex: "0 0 46%", background: "var(--accent-soft)", padding: "44px 40px", justifyContent: "center" }}>
          <div className="row ac gap10"><span className="nav__mark" style={{ width: 30, height: 30 }}>C</span><b style={{ fontSize: 16 }}>Count Your Carbon</b></div>
          <H1 style={{ fontSize: 30, maxWidth: 360 }}>Measure, understand and cut your school's carbon footprint.</H1>
          <Lead style={{ maxWidth: 340 }}>The free carbon calculator for UK schools, colleges and nurseries — by Eco-Schools & Keep Britain Tidy.</Lead>
          <Row g={20} ac>
            <div><div className="h2">5,000+</div><div className="xs muted">schools signed up</div></div>
            <div><div className="h2">4,000+</div><div className="xs muted">footprints completed</div></div>
          </Row>
          <Ph h={120} w={300} label="brand imagery / award badges" />
        </div>
        <div className="col gap16" style={{ flex: 1, padding: "56px 52px", justifyContent: "center" }}>
          <H2>Sign in to continue</H2>
          <Field label="Email address" req placeholder="name@school.sch.uk" />
          <Field label="Password" req placeholder="••••••••" />
          <Row g={10} ac jb><Chip>Remember me</Chip><a className="sm" style={{ color: "var(--accent-deep)" }}>Forgot password?</a></Row>
          <Btn primary full onClick={() => go("home")}>Sign in</Btn>
          <Row g={10} ac><Line /><span className="xs faint mono">OR</span><Line /></Row>
          <Btn full>Continue with DfE Sign-in / Microsoft</Btn>
          <Annot><b>NFR-11</b> — optional SSO (DfE Sign-in / Microsoft / Google for Education), confirmed in Discovery.</Annot>
          <Row g={6} ac jc><span className="sm muted">New here?</span><a className="sm" style={{ color: "var(--accent-deep)", cursor: "pointer", fontWeight: 600 }} onClick={() => go("register")}>Register your school →</a></Row>
        </div>
      </div>
    ),
  },

  /* ---------------- REGISTER ---------------- */
  register: {
    title: "Register a school", group: "School journey", num: "S2", mobile: true,
    render: ({ go, device }) => {
      if (device === "mobile") return (
        <div className="col">
          <MHead title="Register setting" back="signin" go={go} right={<Ref>REG-01</Ref>} />
          <div className="col gap14" style={{ padding: 16 }}>
            <PBar pct={33} /><div className="xs faint mono">Step 1 of 3 · About your school</div>
            <Field label="School type" req sel placeholder="School / College / Nursery" />
            <Field label="School name" req placeholder="e.g. Riverside Primary" />
            <Field label="URN / UKPRN" req placeholder="123456" hint="Unique reference — validated for duplicates" />
            <Field label="Postcode" req placeholder="LS1 4AB" />
            <Field label="Phase of education" sel placeholder="Primary" />
            <Btn primary full onClick={() => go("verify")}>Continue</Btn>
          </div>
          <MTab />
        </div>
      );
      return (
        <div><AppBar role="school" active="Home" go={go} />
          <div className="wf">
            <Row g={14} ac><H1>Register your school</H1><Ref>REG-01</Ref></Row>
            <Steps steps={["School", "Account", "Profile"]} current={0} />
            <div style={{ height: 18 }} />
            <Row g={26} as>
              <Card style={{ flex: 1 }}>
                <Up>About your school</Up><div style={{ height: 14 }} />
                <Col g={14}>
                  <Row g={14}><Field half label="School type" req sel placeholder="School / College / Nursery" /><Field half label="Phase of education" sel placeholder="Primary" /></Row>
                  <Field label="School name" req placeholder="e.g. Riverside Primary School" />
                  <Row g={14}><Field half label="URN / UKPRN" req placeholder="123456" hint="Validated against existing schools" /><Field half label="Local authority" sel placeholder="Select LA" /></Row>
                  <Field label="Address" req placeholder="Street, town, postcode" />
                  <Field label="Key characteristics" ta placeholder="Pupil age range, special unit, etc. (optional)" />
                </Col>
              </Card>
              <Col g={14} style={{ flex: "0 0 290px" }}>
                <Annot><b>REG-01 / REG-08</b> — unique identifier enforced; GDPR consent + privacy notice captured here with version & timestamp.</Annot>
                <Card soft><Up>Consent</Up><div style={{ height: 10 }} />
                  <Row g={9} as><Box w={18} h={18} style={{ flex: "0 0 18px", marginTop: 1 }} /><Txt sm muted>I agree to the privacy notice and processing of setting data.</Txt></Row>
                  <div style={{ height: 10 }} />
                  <Row g={9} as><Box w={18} h={18} style={{ flex: "0 0 18px", marginTop: 1 }} /><Txt sm muted>Send me Eco-Schools updates (optional).</Txt></Row>
                </Card>
                <Btn primary full onClick={() => go("verify")}>Continue to account →</Btn>
              </Col>
            </Row>
          </div>
        </div>
      );
    },
  },

  /* ---------------- VERIFY / ACCOUNT ---------------- */
  verify: {
    title: "Account & verification", group: "School journey", num: "S3",
    render: ({ go }) => (
      <div><AppBar role="school" active="Home" go={go} />
        <div className="wf">
          <Steps steps={["School", "Account", "Profile"]} current={1} />
          <div style={{ height: 22 }} />
          <Row g={26} as>
            <Card style={{ flex: 1 }}>
              <Row g={12} ac><H2>Create your account</H2><Ref>REG-02</Ref></Row><div style={{ height: 14 }} />
              <Col g={14}>
                <Row g={14}><Field half label="Full name" req placeholder="Alex Lead" /><Field half label="Role at setting" sel placeholder="Sustainability Lead" /></Row>
                <Field label="Work email" req value="a.lead@riverside.sch.uk" />
                <Field label="Create password" req placeholder="••••••••" hint="Min 12 chars · 1 number · 1 symbol" />
                <Field label="Confirm password" req placeholder="••••••••" />
              </Col>
            </Card>
            <Col g={14} style={{ flex: "0 0 320px" }}>
              <Card soft className="col gap12" style={{ alignItems: "center", textAlign: "center", padding: 24 }}>
                <Ph h={70} w={70} label="✉" style={{ borderRadius: "50%" }} />
                <H3>Verify your email</H3>
                <Txt sm muted>We'll send a verification link to confirm your address before your account activates.</Txt>
                <Tag tone="amber"><Dot tone="amber" /> Awaiting verification</Tag>
              </Card>
              <Annot><b>REG-02</b> — email verification, password policy, reset flow & lockout on repeated failed attempts.</Annot>
              <Btn primary full onClick={() => go("profile")}>Verify & continue →</Btn>
            </Col>
          </Row>
        </div>
      </div>
    ),
  },

  /* ---------------- SETTING PROFILE ---------------- */
  profile: {
    title: "Setting profile", group: "School journey", num: "S4",
    render: ({ go }) => (
      <div><AppBar role="school" active="Home" go={go} />
        <div className="wf">
          <Steps steps={["School", "Account", "Profile"]} current={2} />
          <div style={{ height: 20 }} />
          <Row g={14} ac><H1>School profile</H1><Ref>REG-05</Ref></Row>
          <Lead>Operational characteristics feed the carbon calculation. You can update these any time.</Lead>
          <div style={{ height: 18 }} />
          <Row g={26} as>
            <Card style={{ flex: 1 }}>
              <Up>Operational characteristics</Up><div style={{ height: 14 }} />
              <Row g={14} wrap>
                <Field w="calc(50% - 7px)" label="Gross internal floor area (m²)" req placeholder="3,400" />
                <Field w="calc(50% - 7px)" label="Number of pupils" req placeholder="412" />
                <Field w="calc(50% - 7px)" label="Number of staff (FTE)" placeholder="48" />
                <Field w="calc(50% - 7px)" label="Weeks open per year" placeholder="39" />
                <Field w="calc(50% - 7px)" label="Has kitchen / catering on site" sel placeholder="Yes" />
                <Field w="calc(50% - 7px)" label="Building age band" sel placeholder="1945–1975" />
              </Row>
            </Card>
            <Col g={14} style={{ flex: "0 0 300px" }}>
              <Card><Row g={10} ac jb><Up>Team</Up><Ref>REG-04</Ref></Row><div style={{ height: 12 }} />
                <Row g={9} ac><Avatar>AL</Avatar><div className="col"><Txt sm style={{ fontWeight: 600 }}>Alex Lead</Txt><span className="xs faint">Lead · you</span></div></Row>
                <div style={{ height: 10 }} />
                <Btn sm full>＋ Invite contributor / viewer</Btn>
              </Card>
              <Card><Row g={10} ac jb><Up>Group</Up><Ref>REG-06</Ref></Row><div style={{ height: 10 }} />
                <Field sel placeholder="Link to LA / MAT / faith group" hint="Sends a request to the group admin for approval" />
              </Card>
              <Btn primary full onClick={() => go("home")}>Save & go to dashboard →</Btn>
            </Col>
          </Row>
        </div>
      </div>
    ),
  },

  /* ---------------- HOME DASHBOARD ---------------- */
  home: {
    title: "School dashboard", group: "School journey", num: "S5", mobile: true,
    variants: ["Status hub", "Task-first"],
    render: ({ go, variant, device }) => {
      if (device === "mobile") return (
        <div className="col">
          <MHead title="Riverside Primary" go={go} right={<Avatar>AL</Avatar>} />
          <div className="col gap14" style={{ padding: 16 }}>
            <Card soft className="col gap10">
              <Up>2024/25 footprint</Up>
              <Row g={10} ac><div className="h1" style={{ fontSize: 30 }}>98.4</div><div className="col"><span className="sm" style={{ fontWeight: 700 }}>tCO₂e</span><span className="xs muted">▼ 12% vs last year</span></div></Row>
              <Btn primary full onClick={() => go("report")}>View report</Btn>
            </Card>
            <Card className="col gap10">
              <Row ac jb><Txt sm style={{ fontWeight: 600 }}>2025/26 calculation</Txt><Tag tone="amber">In progress</Tag></Row>
              <PBar pct={40} /><span className="xs faint">2 of 5 sections</span>
              <Btn full onClick={() => go("calc")}>Resume calculation</Btn>
            </Card>
            <Card className="col gap10">
              <Row ac jb><Txt sm style={{ fontWeight: 600 }}>Decarbonisation plan</Txt><Tag tone="green">5 actions</Tag></Row>
              <Btn full onClick={() => go("plan")}>Open plan</Btn>
            </Card>
          </div>
          <MTab />
        </div>
      );
      const taskFirst = variant === 1;
      return (
        <div><AppBar role="school" active="Home" go={go} />
          <div className="wf">
            <Row g={14} ac jb>
              <div className="col gap6"><H1>Riverside Primary School</H1><span className="sm muted mono">URN 123456 · Primary · Leeds LA</span></div>
              <Tag tone="green"><Dot tone="green" /> Eco-Schools member</Tag>
            </Row>
            <div style={{ height: 18 }} />
            {taskFirst ? (
              <Col g={16}>
                <Card className="row ac jb" style={{ background: "var(--accent-soft)", borderColor: "var(--accent-mid)" }}>
                  <div className="col gap6"><H2>Finish your 2025/26 footprint</H2><Txt muted>2 of 5 sections complete — pick up where you left off.</Txt><div style={{ width: 280 }}><PBar pct={40} /></div></div>
                  <Btn primary onClick={() => go("calc")}>Resume calculation →</Btn>
                </Card>
                <Row g={16}>
                  {[["View 2024/25 report", "report", "Your last completed footprint"], ["Open decarbonisation plan", "plan", "5 actions · 2 in progress"], ["Update setting profile", "profile", "Floor area, pupils, staff"]].map(([t, d, s]) => (
                    <Card key={t} className="col gap8 f1" style={{ cursor: "pointer" }}>
                      <H3>{t}</H3><Txt sm muted>{s}</Txt><a className="sm" style={{ color: "var(--accent-deep)", cursor: "pointer", fontWeight: 600 }} onClick={() => go(d)}>Open →</a>
                    </Card>
                  ))}
                </Row>
              </Col>
            ) : (
              <Row g={20} as>
                <Col g={16} style={{ flex: 1 }}>
                  <Card>
                    <Row ac jb><Up>Current footprint · 2024/25</Up><Ref>RPT-01</Ref></Row><div style={{ height: 12 }} />
                    <Row g={24} ac>
                      <Donut segs={CATS.map(c => ({ v: c.v, c: c.c }))} center={<div><div className="h2">98.4</div><div className="xs faint mono">tCO₂e</div></div>} />
                      <Col g={9} style={{ flex: 1 }}>
                        <Bars data={CATS.slice(0, 4)} />
                        <a className="sm" style={{ color: "var(--accent-deep)", cursor: "pointer", fontWeight: 600 }} onClick={() => go("report")}>Full report →</a>
                      </Col>
                    </Row>
                  </Card>
                  <Card><Up>Year-on-year</Up><div style={{ height: 12 }} />
                    <Cols data={[{ l: "22/23", v: 124, c: "var(--block-2)" }, { l: "23/24", v: 112, c: "var(--accent-mid)" }, { l: "24/25", v: 98, c: "var(--accent)" }, { l: "25/26", v: 45, ghost: true, c: "var(--block-2)" }]} />
                  </Card>
                </Col>
                <Col g={16} style={{ flex: "0 0 320px" }}>
                  <Card style={{ borderColor: "var(--accent-mid)" }}>
                    <Row ac jb><Txt sm style={{ fontWeight: 700 }}>2025/26 calculation</Txt><Tag tone="amber">In progress</Tag></Row>
                    <div style={{ height: 10 }} /><PBar pct={40} /><div className="xs faint" style={{ marginTop: 6 }}>2 of 5 sections · saved 2 days ago</div>
                    <div style={{ height: 12 }} /><Btn primary full onClick={() => go("calc")}>Resume →</Btn>
                  </Card>
                  <Card><Row ac jb><Txt sm style={{ fontWeight: 700 }}>Decarbonisation plan</Txt><Ref>PLAN-01</Ref></Row>
                    <div style={{ height: 10 }} /><Row g={10}><Tag tone="green">5 actions</Tag><Tag tone="sky">2 in progress</Tag></Row>
                    <div style={{ height: 12 }} /><Btn full onClick={() => go("plan")}>Open plan →</Btn>
                  </Card>
                  <Card soft><Up>Resources</Up><div style={{ height: 10 }} /><Col g={8}>{["Reducing energy use", "Sustainable travel plan", "DfE Climate Action Plan guide"].map(r => <Row key={r} g={8} ac><Dot tone="green" /><Txt sm muted>{r}</Txt></Row>)}</Col></Card>
                </Col>
              </Row>
            )}
          </div>
        </div>
      );
    },
  },

  /* ---------------- CALCULATION JOURNEY ---------------- */
  calc: {
    title: "Calculation journey", group: "School journey", num: "S6", mobile: true,
    variants: ["Stepped wizard", "Accordion", "Single scroll"],
    render: (ctx) => <CalcScreen {...ctx} />,
  },

  /* ---------------- ESTIMATE / PROXY ---------------- */
  estimate: {
    title: "Estimate missing data", group: "School journey", num: "S6b",
    render: ({ go }) => (
      <div><AppBar role="school" active="Calculate" go={go} />
        <div className="wf" style={{ maxWidth: 720, margin: "0 auto" }}>
          <Row g={12} ac><H1>Estimate missing data</H1><Ref>CALC-06</Ref></Row>
          <Lead>Don't have a metered figure? Use a proxy method. Estimated inputs are clearly flagged in your data and report.</Lead>
          <div style={{ height: 18 }} />
          <Col g={12}>
            {[["Estimate from floor area", "Uses gross internal area × a typical intensity benchmark for your phase.", true],
              ["Estimate from £ spend", "Convert annual energy spend to kWh using average unit prices.", false],
              ["Copy last year + adjust", "Pre-fill from 2024/25 and apply a % change.", false]].map(([t, d, on]) => (
              <Card key={t} className="row ac jb" style={on ? { borderColor: "var(--accent-mid)", background: "var(--accent-soft)" } : {}}>
                <Row g={12} ac><span className="step__n" style={{ width: 20, height: 20, ...(on ? { background: "var(--accent)", borderColor: "var(--accent)" } : {}) }} />{" "}<div className="col gap4"><H3>{t}</H3><Txt sm muted>{d}</Txt></div></Row>
              </Card>
            ))}
          </Col>
          <div style={{ height: 14 }} />
          <Card soft className="row ac jb"><div className="col gap4"><Txt sm style={{ fontWeight: 600 }}>Estimated result</Txt><span className="xs faint">Flagged as estimate in report</span></div><div className="h2">≈ 6.1 tCO₂e <Tag tone="amber">est.</Tag></div></Card>
          <div style={{ height: 16 }} />
          <Row g={10} je><Btn onClick={() => go("calc")}>‹ Back</Btn><Btn primary onClick={() => go("calc")}>Use this estimate</Btn></Row>
        </div>
      </div>
    ),
  },

  /* ---------------- REVIEW & SUBMIT ---------------- */
  review: {
    title: "Review & submit", group: "School journey", num: "S7",
    render: ({ go }) => (
      <div><AppBar role="school" active="Calculate" go={go} />
        <div className="wf" style={{ maxWidth: 860, margin: "0 auto" }}>
          <Row g={12} ac><H1>Review your 2025/26 footprint</H1><Ref>CALC-07</Ref></Row>
          <Lead>Check each category before generating your report. You can still edit anything.</Lead>
          <div style={{ height: 18 }} />
          <Card pad={0}>
            <Table cols={[{ t: "Category", w: "40%" }, "Data source", "Result", ""]} rows={CATS.map((c, i) => [
              <Row g={9} ac><span className="swatch" style={{ background: c.c }} />{c.l}</Row>,
              i === 3 ? <Tag tone="amber">Estimated</Tag> : <Tag tone="grey">Metered</Tag>,
              <b className="mono">{c.v} t</b>,
              <a className="sm" style={{ color: "var(--accent-deep)", cursor: "pointer" }} onClick={() => go("calc")}>Edit</a>,
            ])} />
          </Card>
          <div style={{ height: 16 }} />
          <Row g={16} ac jb>
            <Card soft className="row ac gap16" style={{ flex: 1 }}><div className="col gap4"><Up>Total</Up><div className="h1">98.4 <span className="sm faint">tCO₂e</span></div></div><Line style={{ width: 1, height: 40 }} /><Txt sm muted>Methodology v3.2 · 2025 factor set <Ref>ENG-05</Ref></Txt></Card>
          </Row>
          <div style={{ height: 16 }} />
          <Row g={10} je><Btn onClick={() => go("calc")}>‹ Back to edit</Btn><Btn primary onClick={() => go("report")}>Submit & generate report →</Btn></Row>
        </div>
      </div>
    ),
  },

  /* ---------------- FOOTPRINT REPORT ---------------- */
  report: {
    title: "Footprint report", group: "School journey", num: "S8", mobile: true,
    variants: ["Overview cards", "Story column", "Data-dense"],
    render: ({ go, variant, device }) => {
      const bench = [{ l: "Your setting", v: 98, c: "var(--accent)" }, { l: "Similar primaries (avg)", v: 121, c: "var(--block-2)" }, { l: "Top 25%", v: 76, c: "var(--accent-mid)" }];
      if (device === "mobile") return (
        <div className="col">
          <MHead title="2024/25 Report" back="home" go={go} right={<span className="sm muted">⬇</span>} />
          <div className="col gap14" style={{ padding: 16 }}>
            <Card soft className="col ac gap10" style={{ padding: 20 }}>
              <Donut segs={CATS.map(c => ({ v: c.v, c: c.c }))} center={<div><div className="h2">98.4</div><div className="xs faint mono">tCO₂e</div></div>} />
              <Tag tone="green">▼ 12% vs 2023/24</Tag>
            </Card>
            <Card><Up>By category</Up><div style={{ height: 10 }} /><Bars data={CATS.slice(0, 4)} /></Card>
            <Card soft><Up>Vs similar settings</Up><div style={{ height: 10 }} /><Bars data={bench} /></Card>
            <Btn primary full onClick={() => go("plan")}>Build my plan →</Btn>
            <Btn full>⬇ Download PDF</Btn>
          </div>
          <MTab />
        </div>
      );
      return (
        <div><AppBar role="school" active="Report" go={go} />
          <div className="wf">
            <Row g={14} ac jb>
              <div className="col gap6"><H1>Carbon footprint report</H1><span className="sm muted mono">Riverside Primary · 2024/25 · methodology v3.2 <Ref>ENG-05</Ref></span></div>
              <Row g={8} ac><Btn sm>⬇ PDF <Ref>RPT-03</Ref></Btn><Btn sm>⬇ CSV <Ref>RPT-04</Ref></Btn><Btn sm primary onClick={() => go("plan")}>Build plan →</Btn></Row>
            </Row>
            <div style={{ height: 18 }} />

            {variant === 0 && (/* Overview cards */
              <Col g={16}>
                <Row g={16} as>
                  <Card className="col gap8" style={{ flex: "0 0 30%" }}><Up>Total emissions</Up><div className="h1" style={{ fontSize: 40 }}>98.4</div><span className="sm muted">tCO₂e · <span style={{ color: "var(--accent-deep)" }}>▼12% YoY</span></span></Card>
                  <Card className="col gap8" style={{ flex: 1 }}><Row ac jb><Up>Breakdown by category</Up><Ref>RPT-01</Ref></Row><Row g={20} ac><Donut segs={CATS.map(c => ({ v: c.v, c: c.c }))} center={<div className="xs faint mono">6 cats</div>} /><div className="f1"><Bars data={CATS} /></div></Row></Card>
                </Row>
                <Row g={16} as>
                  <Card className="col gap10 f1"><Row ac jb><Up>Benchmark <Ref>RPT-02</Ref></Up><Tag tone="green">Below average</Tag></Row><Bars data={bench} /><Txt sm muted>You emit 19% less than comparable primary settings of similar floor area.</Txt></Card>
                  <Card className="col gap10 f1"><Row ac jb><Up>Year-on-year <Ref>RPT-05</Ref></Up></Row><Cols data={[{ l: "22/23", v: 124, c: "var(--block-2)" }, { l: "23/24", v: 112, c: "var(--accent-mid)" }, { l: "24/25", v: 98, c: "var(--accent)" }]} /></Card>
                </Row>
                <Card style={{ background: "var(--accent-soft)", borderColor: "var(--accent-mid)" }}><Row g={12} as><span style={{ fontSize: 18 }}>💡</span><div className="col gap4"><H3>Where to focus <Ref>RPT-06</Ref></H3><Txt muted>Energy is 42% of your footprint. Switching to a renewable electricity tariff and an LED retrofit could cut ~14 tCO₂e.</Txt></div><Spacer /><Btn primary onClick={() => go("plan")}>Add to plan</Btn></Row></Card>
              </Col>
            )}

            {variant === 1 && (/* Story column */
              <div style={{ maxWidth: 720, margin: "0 auto" }}>
                <Col g={20}>
                  <Card className="col ac gap12" style={{ padding: 30 }}>
                    <Up>Your 2024/25 footprint is</Up><div className="h1" style={{ fontSize: 56 }}>98.4 <span className="sm faint">tCO₂e</span></div>
                    <Tag tone="green">▼ 12% lower than last year</Tag>
                    <Donut segs={CATS.map(c => ({ v: c.v, c: c.c }))} center={<div className="xs faint mono">by cat.</div>} />
                    <Legend items={CATS.map(c => ({ l: c.l.split(" — ")[0].split(" & ")[0], c: c.c }))} />
                  </Card>
                  <Card><H3>Your biggest impact areas <Ref>RPT-06</Ref></H3><div style={{ height: 12 }} /><Bars data={CATS} /></Card>
                  <Card><H3>How you compare <Ref>RPT-02</Ref></H3><div style={{ height: 12 }} /><Bars data={bench} /><div style={{ height: 8 }} /><Txt sm muted>Compared with primary settings of a similar size in England.</Txt></Card>
                  <Card style={{ background: "var(--accent-soft)", borderColor: "var(--accent-mid)" }} className="col gap10"><H3>What to do next</H3><Txt muted>Build a decarbonisation plan targeting energy and transport — your two largest sources.</Txt><Btn primary onClick={() => go("plan")}>Start my plan →</Btn></Card>
                </Col>
              </div>
            )}

            {variant === 2 && (/* Data-dense */
              <Row g={20} as>
                <Col g={16} style={{ flex: 1 }}>
                  <Row g={16}>{[["Total", "98.4 tCO₂e", "▼12%"], ["Per pupil", "0.24 tCO₂e", "▼9%"], ["Per m²", "29 kgCO₂e", "▼7%"], ["Largest", "Energy 42%", ""]].map(([a, b, c]) => <Card key={a} className="col gap4 f1" pad={14}><span className="xs faint mono up">{a}</span><b style={{ fontSize: 17 }}>{b}</b><span className="xs" style={{ color: "var(--accent-deep)" }}>{c}</span></Card>)}</Row>
                  <Card pad={0}><div style={{ padding: "14px 18px" }}><Row ac jb><Up>Emissions by category & scope <Ref>ENG-07</Ref></Up><Tag tone="grey">tCO₂e</Tag></Row></div>
                    <Table zebra cols={["Category", "Scope", "Activity", "tCO₂e", "% total", "vs LY"]} rows={[
                      ["Energy — gas", "1", "84,200 kWh", "15.4", "16%", "▼4%"],
                      ["Energy — electricity", "2", "61,500 kWh", "25.8", "26%", "▼11%"],
                      ["Transport & travel", "3", "—", "22.8", "23%", "▲2%"],
                      ["Food & catering", "3", "—", "14.1", "14%", "▼6%"],
                      ["Procurement", "3", "—", "11.6", "12%", "—"],
                      ["Waste", "3", "—", "6.3", "6%", "▼8%"],
                      ["Water", "3", "—", "4.0", "4%", "▼3%"],
                    ]} />
                  </Card>
                </Col>
                <Col g={16} style={{ flex: "0 0 300px" }}>
                  <Card><Up>Trend <Ref>RPT-05</Ref></Up><div style={{ height: 10 }} /><Cols data={[{ l: "22/23", v: 124, c: "var(--block-2)" }, { l: "23/24", v: 112, c: "var(--accent-mid)" }, { l: "24/25", v: 98, c: "var(--accent)" }]} h={110} /></Card>
                  <Card><Up>Benchmark <Ref>RPT-02</Ref></Up><div style={{ height: 10 }} /><Bars data={bench} /></Card>
                  <Card soft className="col gap8"><Row g={8} ac><span>♿</span><Txt sm style={{ fontWeight: 600 }}>Accessible view <Ref>RPT-07</Ref></Txt></Row><Txt sm muted>Every chart has a data-table & alt-text alternative (WCAG 2.2 AA).</Txt></Card>
                </Col>
              </Row>
            )}
          </div>
        </div>
      );
    },
  },

  /* ---------------- DECARBONISATION PLAN ---------------- */
  plan: {
    title: "Decarbonisation plan", group: "School journey", num: "S9", mobile: true,
    variants: ["Kanban by status", "Table list"],
    render: ({ go, variant, device }) => {
      const actions = [
        { t: "Switch to a renewable electricity tariff", area: "Energy", impact: "14 tCO₂e", owner: "Business mgr", due: "Sep 2026", st: "Planned" },
        { t: "LED lighting retrofit — main block", area: "Energy", impact: "5 tCO₂e", owner: "Site team", due: "Dec 2026", st: "In progress" },
        { t: "Walk-to-school week programme", area: "Transport", impact: "3 tCO₂e", owner: "Eco-committee", due: "Mar 2027", st: "In progress" },
        { t: "Reduce food waste in canteen", area: "Food", impact: "2 tCO₂e", owner: "Catering", due: "Jun 2027", st: "Done" },
        { t: "Improve recycling segregation", area: "Waste", impact: "1.5 tCO₂e", owner: "Eco-committee", due: "—", st: "Planned" },
      ];
      const stTone = { Planned: "grey", "In progress": "sky", Done: "green" };
      if (device === "mobile") return (
        <div className="col">
          <MHead title="Our plan" back="home" go={go} right={<span className="sm muted">⬇</span>} />
          <div className="col gap12" style={{ padding: 16 }}>
            <Row g={8}><Tag tone="green">25.5 tCO₂e targeted</Tag><Tag tone="sky">2 active</Tag></Row>
            {actions.slice(0, 4).map((a, i) => (
              <Card key={i} className="col gap6"><Row ac jb><Tag tone={stTone[a.st]}>{a.st}</Tag><span className="xs faint mono">{a.impact}</span></Row><Txt sm style={{ fontWeight: 600 }}>{a.t}</Txt><span className="xs faint">{a.area} · {a.due}</span></Card>
            ))}
            <Btn primary full>＋ Add action</Btn>
          </div>
          <MTab />
        </div>
      );
      return (
        <div><AppBar role="school" active="Plan" go={go} />
          <div className="wf">
            <Row g={14} ac jb>
              <div className="col gap6"><Row g={12} ac><H1>Decarbonisation plan</H1><Ref>PLAN-01</Ref></Row><span className="sm muted">Targeting 25.5 tCO₂e of reductions · aligned to DfE Climate Action Plan <Ref>PLAN-04</Ref></span></div>
              <Row g={8} ac><Btn sm onClick={() => go("planexport")}>⬇ Export <Ref>PLAN-05</Ref></Btn><Btn sm primary>＋ Add action</Btn></Row>
            </Row>
            <div style={{ height: 18 }} />
            {variant === 0 ? (/* Kanban */
              <Row g={16} as>
                {["Planned", "In progress", "Done"].map(col => (
                  <Col g={12} key={col} style={{ flex: 1 }}>
                    <Row g={8} ac><Dot tone={stTone[col]} /><b className="sm">{col}</b><span className="xs faint">({actions.filter(a => a.st === col).length})</span></Row>
                    {actions.filter(a => a.st === col).map((a, i) => (
                      <Card key={i} className="col gap8" pad={14}>
                        <Row ac jb><Tag tone="green">{a.area}</Tag><span className="xs faint mono">{a.impact}</span></Row>
                        <Txt sm style={{ fontWeight: 600 }}>{a.t}</Txt>
                        <Line /><Row ac jb><span className="xs faint">{a.owner}</span><span className="xs faint mono">{a.due}</span></Row>
                      </Card>
                    ))}
                    <Btn sm ghost full>＋ Add to {col.toLowerCase()}</Btn>
                  </Col>
                ))}
              </Row>
            ) : (/* Table */
              <Col g={14}>
                <Row g={8} ac><Up>Action library</Up><Ref>PLAN-02</Ref><span className="sm muted">— add from templates mapped to your impact areas, or create custom.</span></Row>
                <Card pad={0}>
                  <Table cols={[{ t: "Action", w: "34%" }, "Impact area", "Owner", "Target date", "Expected impact", "Status"]} rows={actions.map(a => [
                    <Txt sm style={{ fontWeight: 600 }}>{a.t}</Txt>, <Tag tone="grey">{a.area}</Tag>, a.owner, <span className="mono sm">{a.due}</span>, <b className="mono sm">{a.impact}</b>, <Tag tone={stTone[a.st]}>{a.st}</Tag>,
                  ])} />
                </Card>
                <Annot><b>PLAN-03 / PLAN-06</b> — owner, target date, status & expected impact per action; progress links to your next footprint re-measurement.</Annot>
              </Col>
            )}
          </div>
        </div>
      );
    },
  },

  /* ---------------- PLAN EXPORT ---------------- */
  planexport: {
    title: "Export plan / CAP", group: "School journey", num: "S10",
    render: ({ go }) => (
      <div><AppBar role="school" active="Plan" go={go} />
        <div className="wf" style={{ maxWidth: 880, margin: "0 auto" }}>
          <Row g={12} ac><H1>Export your plan</H1><Ref>PLAN-05</Ref></Row>
          <Lead>Download a ready-to-share plan, framed to support your DfE Climate Action Plan.</Lead>
          <div style={{ height: 18 }} />
          <Row g={20} as>
            <Card style={{ flex: "0 0 300px" }} className="col gap12">
              <Up>Format</Up>
              {[["Branded PDF", "Formatted report for governors & DfE", true], ["CSV (data)", "Actions, owners, dates, impact", false], ["DfE CAP template", "Mapped to Climate Action Plan headings", false]].map(([t, d, on]) => (
                <Card key={t} soft={!on} className="row ac gap10" style={on ? { borderColor: "var(--accent-mid)", background: "var(--accent-soft)" } : {}}>
                  <span className="step__n" style={{ width: 18, height: 18, ...(on ? { background: "var(--accent)", borderColor: "var(--accent)" } : {}) }} />
                  <div className="col gap4"><Txt sm style={{ fontWeight: 600 }}>{t}</Txt><span className="xs faint">{d}</span></div>
                </Card>
              ))}
              <Annot><b>PLAN-04</b> — output framed to support a DfE Climate Action Plan & Sustainability Lead.</Annot>
              <Btn primary full>⬇ Download plan</Btn>
            </Card>
            <Card style={{ flex: 1 }} className="col gap12">
              <Up>Preview</Up>
              <Box style={{ padding: 20 }} className="col gap12">
                <Row ac jb><b>Riverside Primary — Decarbonisation Plan 2025/26</b><span className="nav__mark" style={{ width: 22, height: 22, fontSize: 11 }}>C</span></Row>
                <Line />
                <Ph h={70} label="footprint summary chart" />
                <div className="col gap8">{["Switch to renewable tariff — 14 tCO₂e", "LED retrofit — 5 tCO₂e", "Walk-to-school week — 3 tCO₂e"].map(r => <Row key={r} g={8} ac><Dot tone="green" /><Txt sm>{r}</Txt></Row>)}</div>
                <Ph h={40} label="DfE Climate Action Plan alignment" />
              </Box>
              <Row g={10} je><Btn onClick={() => go("plan")}>‹ Back to plan</Btn></Row>
            </Card>
          </Row>
        </div>
      </div>
    ),
  },
};

window.SCHOOL_SCREENS = SCHOOL_SCREENS;
window.CATS = CATS;
window.MTab = MTab;
window.MHead = MHead;
