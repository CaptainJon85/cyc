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

const SCHOOL_SCREENS = {

  /* ---------------- SIGN IN ---------------- */
  signin: {
    title: "Sign in / Landing", group: "School journey", num: "S1",
    render: ({ go }) => (
      <div className="row" style={{ minHeight: 560 }}>
        <div className="col gap20" style={{ flex: "0 0 46%", background: "var(--accent-soft)", padding: "44px 40px", justifyContent: "center" }}>
          <div className="row ac gap10"><span className="nav__mark" style={{ width: 30, height: 30 }}>C</span><b style={{ fontSize: 16 }}>Count Your Carbon</b></div>
          <H1 style={{ fontSize: 30, maxWidth: 360 }}>Measure, understand and cut your setting's carbon footprint.</H1>
          <Lead style={{ maxWidth: 340 }}>The free carbon calculator for UK schools, colleges and nurseries — by Eco-Schools & Keep Britain Tidy.</Lead>
          <Row g={20} ac>
            <div><div className="h2">5,000+</div><div className="xs muted">settings signed up</div></div>
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
          <Row g={6} ac jc><span className="sm muted">New here?</span><a className="sm" style={{ color: "var(--accent-deep)", cursor: "pointer", fontWeight: 600 }} onClick={() => go("register")}>Register your setting →</a></Row>
        </div>
      </div>
    ),
  },

  /* ---------------- REGISTER ---------------- */
  register: {
    title: "Register a setting", group: "School journey", num: "S2", mobile: true,
    render: ({ go, device }) => {
      if (device === "mobile") return (
        <div className="col">
          <MHead title="Register setting" back="signin" go={go} right={<Ref>REG-01</Ref>} />
          <div className="col gap14" style={{ padding: 16 }}>
            <PBar pct={33} /><div className="xs faint mono">Step 1 of 3 · About your setting</div>
            <Field label="Setting type" req sel placeholder="School / College / Nursery" />
            <Field label="Setting name" req placeholder="e.g. Riverside Primary" />
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
            <Row g={14} ac><H1>Register your setting</H1><Ref>REG-01</Ref></Row>
            <Steps steps={["Setting", "Account", "Profile"]} current={0} />
            <div style={{ height: 18 }} />
            <Row g={26} as>
              <Card style={{ flex: 1 }}>
                <Up>About your setting</Up><div style={{ height: 14 }} />
                <Col g={14}>
                  <Row g={14}><Field half label="Setting type" req sel placeholder="School / College / Nursery" /><Field half label="Phase of education" sel placeholder="Primary" /></Row>
                  <Field label="Setting name" req placeholder="e.g. Riverside Primary School" />
                  <Row g={14}><Field half label="URN / UKPRN" req placeholder="123456" hint="Validated against existing settings" /><Field half label="Local authority" sel placeholder="Select LA" /></Row>
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
          <Steps steps={["Setting", "Account", "Profile"]} current={1} />
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
          <Steps steps={["Setting", "Account", "Profile"]} current={2} />
          <div style={{ height: 20 }} />
          <Row g={14} ac><H1>Setting profile</H1><Ref>REG-05</Ref></Row>
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
              <PBar pct={45} /><span className="xs faint">3 of 6 categories</span>
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
                  <div className="col gap6"><H2>Finish your 2025/26 footprint</H2><Txt muted>3 of 6 categories complete — pick up where you left off.</Txt><div style={{ width: 280 }}><PBar pct={45} /></div></div>
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
                    <div style={{ height: 10 }} /><PBar pct={45} /><div className="xs faint" style={{ marginTop: 6 }}>3 of 6 categories · saved 2 days ago</div>
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
    render: ({ go, variant, device }) => {
      const fields = [
        { l: "Mains gas used", ph: "84,200", u: "kWh / year", hint: "From annual bills or meter readings" },
        { l: "Mains electricity used", ph: "61,500", u: "kWh / year" },
        { l: "Electricity from renewable tariff", ph: "0", u: "kWh / year", hint: "Reduces your reported emissions" },
        { l: "Heating oil / LPG", ph: "—", u: "litres / year", est: true },
      ];
      if (device === "mobile") return (
        <div className="col">
          <MHead title="Energy" back="home" go={go} right={<span className="xs faint mono">2 / 6</span>} />
          <div style={{ padding: "0 16px" }}><PBar pct={33} /></div>
          <div className="col gap14" style={{ padding: 16 }}>
            <Annot><b>CALC-02</b> — auto-saved as you go. Resume any time.</Annot>
            {fields.slice(0, 3).map((f, i) => (
              <Field key={i} label={`${f.l} (${f.u})`} placeholder={f.ph} hint={f.hint} error={i === 0 ? "Above expected range — check the value" : null} />
            ))}
            <Row g={8} ac><Box w={18} h={18} /><Txt sm muted>I don't have this — estimate it <Ref>CALC-06</Ref></Txt></Row>
            <Row g={10}><Btn full>Save & exit</Btn><Btn primary full onClick={() => go("review")}>Next →</Btn></Row>
          </div>
        </div>
      );

      const CategoryForm = ({ compact }) => (
        <Col g={14}>
          {!compact && <Annot><b>CALC-03</b> — inline validation against PNZ ranges: contextual help, warnings and hard errors. <b>CALC-02</b> save-and-resume; <b>CALC-05</b> pre-fills from last period.</Annot>}
          <Row g={14} wrap>
            {fields.map((f, i) => (
              <Field key={i} w="calc(50% - 7px)" label={f.l} req={i < 2} placeholder={f.ph} hint={f.u + (f.hint ? " · " + f.hint : "")}
                error={i === 0 ? "84,200 is above the expected range for this floor area" : null} value={f.est ? "" : undefined} />
            ))}
          </Row>
          <Row g={10} ac>
            <Chip on><Dot tone="green" /> Metered data</Chip>
            <Chip>Estimate / proxy <Ref>CALC-06</Ref></Chip>
            <Spacer />
            <a className="sm muted" style={{ cursor: "pointer" }} onClick={() => go("estimate")}>No data? Use an estimate →</a>
          </Row>
        </Col>
      );

      const cats = ["Energy", "Transport", "Food & catering", "Procurement", "Waste", "Water"];

      return (
        <div><AppBar role="school" active="Calculate" go={go} />
          <div className="wf">
            <Row g={14} ac jb>
              <div className="col gap6"><H1>2025/26 carbon footprint</H1><span className="sm muted mono">Reporting period · academic year</span></div>
              <Row g={10} ac><Tag tone="amber"><Dot tone="amber" /> Draft saved</Tag><Btn sm>Save & exit</Btn></Row>
            </Row>
            <div style={{ height: 18 }} />

            {variant === 0 && (/* Stepped wizard */
              <Col g={18}>
                <Steps steps={cats} current={1} />
                <Row g={26} as>
                  <Card style={{ flex: 1 }}>
                    <Row g={10} ac jb><H2>Energy — gas & electricity</H2><Ref>CALC-01</Ref></Row>
                    <div style={{ height: 14 }} /><CategoryForm />
                  </Card>
                  <Col g={12} style={{ flex: "0 0 250px" }}>
                    <Card soft><Up>Progress</Up><div style={{ height: 10 }} /><PBar pct={33} /><div className="xs faint" style={{ marginTop: 6 }}>2 of 6 categories</div></Card>
                    <Card soft className="col gap8"><Up>Why we ask</Up><Txt sm muted>Energy is typically the largest source of a school's emissions. Use annual bills for accuracy.</Txt></Card>
                  </Col>
                </Row>
                <Row g={10} je><Btn>‹ Back</Btn><Btn primary onClick={() => go("review")}>Continue to Transport ›</Btn></Row>
              </Col>
            )}

            {variant === 1 && (/* Accordion */
              <Col g={12}>
                <Annot><b>CALC-03</b> — categories expand/collapse; complete in any order. Validation shown inline per field.</Annot>
                {cats.map((c, i) => (
                  <Card key={c} className="col gap0" pad={0}>
                    <Row ac jb style={{ padding: "14px 18px", cursor: "pointer", background: i === 1 ? "var(--accent-soft)" : "transparent" }}>
                      <Row g={10} ac><span className="step__n" style={{ width: 22, height: 22, fontSize: 11, ...(i === 0 ? { background: "var(--accent)", color: "#fff", borderColor: "var(--accent)" } : {}) }}>{i === 0 ? "✓" : i + 1}</span><b style={{ fontSize: 14 }}>{c}</b>{i === 0 && <Tag tone="green">Done · 18.2 tCO₂e</Tag>}{i === 1 && <Tag tone="amber">Open</Tag>}</Row>
                      <span className="faint">{i === 1 ? "▴" : "▾"}</span>
                    </Row>
                    {i === 1 && <div style={{ padding: "4px 18px 18px" }}><CategoryForm compact /></div>}
                  </Card>
                ))}
                <Row g={10} je><Btn>Save draft</Btn><Btn primary onClick={() => go("review")}>Review & submit →</Btn></Row>
              </Col>
            )}

            {variant === 2 && (/* Single scroll */
              <Row g={26} as>
                <Col g={10} style={{ flex: "0 0 190px", position: "sticky", top: 0 }}>
                  <Up>On this page</Up>
                  {cats.map((c, i) => <div key={c} className={cx("rail__item", i === 1 && "rail__item--on")} style={{ justifyContent: "space-between" }}><span>{c}</span>{i === 0 && <span style={{ color: "var(--accent)" }}>✓</span>}</div>)}
                  <div style={{ height: 8 }} /><PBar pct={33} /><div className="xs faint" style={{ marginTop: 6 }}>2 of 6 done</div>
                </Col>
                <Col g={18} style={{ flex: 1 }}>
                  <Annot><b>Single long form</b> — all categories on one scrollable page with a sticky section index. Auto-saves throughout <b>(CALC-02)</b>.</Annot>
                  <Card style={{ opacity: .65 }}><Row ac jb><H3>Energy ✓</H3><Tag tone="green">18.2 tCO₂e</Tag></Row></Card>
                  <Card><Row g={10} ac jb><H2>Transport & travel</H2><Ref>CALC-01</Ref></Row><div style={{ height: 14 }} /><CategoryForm compact /></Card>
                  <Card style={{ opacity: .55 }}><H3 style={{ color: "var(--ink-faint)" }}>Food & catering</H3></Card>
                  <Card style={{ opacity: .55 }}><H3 style={{ color: "var(--ink-faint)" }}>Procurement & goods</H3></Card>
                  <Row g={10} je><Btn primary onClick={() => go("review")}>Submit footprint →</Btn></Row>
                </Col>
              </Row>
            )}
          </div>
        </div>
      );
    },
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
