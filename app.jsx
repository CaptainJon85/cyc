/* ============================================================
   app.jsx — shell: navigator, routing, variants, device, overview
   ============================================================ */
const { useState: useS, useEffect: useE } = React;

const ALL = { ...window.SCHOOL_SCREENS, ...window.GROUP_SCREENS, ...window.ADMIN_SCREENS };

/* ---------- Overview flow map (special screen) ---------- */
const OverviewScreen = ({ go }) => {
  const Node = ({ id, k, t, d }) => (
    <div className="node" onClick={() => go(id)}>
      <div className="node__k">{k}</div><div className="node__t">{t}</div>{d && <div className="node__d">{d}</div>}
    </div>
  );
  const Arrow = () => <div className="arrow">→</div>;
  return (
    <div className="wf" style={{ padding: "30px 34px" }}>
      <window.Row g={14} ac jb>
        <div className="col gap6"><window.H1>Count Your Carbon V2 — wireframe map</window.H1><window.Lead>Mid-fi clickable wireframes across all four user roles. Click any screen to open it; use the device toggle for mobile views and the tabs for layout variations.</window.Lead></div>
      </window.Row>
      <div style={{ height: 8 }} />
      <window.Row g={10} wrap>
        <window.Tag tone="green">11 school screens</window.Tag><window.Tag tone="sky">2 group screens</window.Tag><window.Tag tone="grey">3 KBT screens</window.Tag><window.Tag tone="amber">3 PNZ screens</window.Tag><window.Tag tone="green">5 with mobile</window.Tag><window.Tag tone="grey">4 with variants</window.Tag>
      </window.Row>
      <div style={{ height: 22 }} />
      <div className="map">
        <div className="swimlane">
          <div className="swimlane__t"><window.Dot tone="green" /><b className="sm">School user — end-to-end journey</b><window.Tag tone="green">primary flow</window.Tag></div>
          <div className="maprow">
            <Node id="signin" k="S1" t="Sign in" d="Landing + SSO" /><Arrow />
            <Node id="register" k="S2" t="Register setting" d="URN, type, phase" /><Arrow />
            <Node id="profile" k="S4" t="Profile" d="Floor area, pupils" /><Arrow />
            <Node id="home" k="S5" t="Dashboard" d="2 variants" /><Arrow />
            <Node id="calc" k="S6" t="Calculate" d="3 variants" /><Arrow />
            <Node id="report" k="S8" t="Report" d="3 variants" /><Arrow />
            <Node id="plan" k="S9" t="Plan" d="2 variants" />
          </div>
        </div>
        <div className="maprow" style={{ alignItems: "stretch" }}>
          <div className="swimlane f1">
            <div className="swimlane__t"><window.Dot tone="sky" /><b className="sm">Group admin</b></div>
            <div className="maprow"><Node id="group" k="G1" t="Group dashboard" d="3 variants" /><Arrow /><Node id="groupsetting" k="G2" t="Setting detail" /></div>
          </div>
          <div className="swimlane f1">
            <div className="swimlane__t"><window.Dot tone="grey" /><b className="sm">KBT admin</b></div>
            <div className="maprow"><Node id="kbtanalytics" k="K1" t="Analytics" /><Node id="kbtusers" k="K2" t="Users" /><Node id="kbtcontent" k="K3" t="Content" /></div>
          </div>
          <div className="swimlane f1">
            <div className="swimlane__t"><window.Dot tone="amber" /><b className="sm">PNZ admin</b></div>
            <div className="maprow"><Node id="pnzfactors" k="P1" t="Factors" /><Node id="pnzbench" k="P2" t="Ranges" /><Node id="pnzmethod" k="P3" t="Methodology" /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- order & nav groups ---------- */
const ORDER = ["overview",
  "signin", "register", "verify", "profile", "home", "calc", "estimate", "review", "report", "plan", "planexport",
  "group", "groupsetting",
  "kbtanalytics", "kbtusers", "kbtcontent",
  "pnzfactors", "pnzbench", "pnzmethod"];

const META = { overview: { title: "Overview & flow map", group: "Overview", num: "—" }, ...ALL };

const GROUPS = (() => {
  const seen = {}; const out = [];
  ORDER.forEach(id => { const g = META[id].group; if (!seen[g]) { seen[g] = []; out.push([g, seen[g]]); } seen[g].push(id); });
  return out;
})();

const MonitorIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>;
const PhoneIcon = () => <svg width="13" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M11 18h2" /></svg>;

const LS = "cyc_wf_state_v1";

function App() {
  const init = (() => { try { return JSON.parse(localStorage.getItem(LS)) || {}; } catch (e) { return {}; } })();
  const [cur, setCur] = useS(init.cur && META[init.cur] ? init.cur : "overview");
  const [device, setDevice] = useS(init.device || "desktop");
  const [variants, setVariants] = useS(init.variants || {});
  const canvasRef = React.useRef(null);

  useE(() => { try { localStorage.setItem(LS, JSON.stringify({ cur, device, variants })); } catch (e) {} }, [cur, device, variants]);

  const go = (id) => { if (!META[id]) return; setCur(id); if (canvasRef.current) canvasRef.current.scrollTop = 0; };
  const meta = META[cur];
  const hasMobile = !!(ALL[cur] && ALL[cur].mobile);
  const showMobile = hasMobile && device === "mobile";
  const variantList = ALL[cur] && ALL[cur].variants;
  const vIdx = variants[cur] || 0;
  const ctx = { go, variant: vIdx, device: showMobile ? "mobile" : "desktop" };

  const idx = ORDER.indexOf(cur);
  const content = cur === "overview" ? <OverviewScreen go={go} /> : ALL[cur].render(ctx);

  return (
    <div className="app">
      {/* sidebar */}
      <aside className="nav">
        <div className="nav__brand">
          <div className="nav__logo"><span className="nav__mark">C</span><div><div className="nav__title">Count Your Carbon</div><div className="nav__sub">V2 · wireframes · v0.1</div></div></div>
        </div>
        <div className="nav__scroll">
          {GROUPS.map(([g, ids]) => (
            <div className="nav__group" key={g}>
              <div className="nav__grouplabel">{g}</div>
              {ids.map(id => (
                <button key={id} className={window.cx("nav__item", id === cur && "nav__item--on")} onClick={() => go(id)}>
                  <span className="nav__num">{META[id].num}</span>
                  <span className="f1">{META[id].title}</span>
                  {ALL[id] && ALL[id].mobile && <span style={{ color: "var(--ink-faint)" }} title="has mobile view"><PhoneIcon /></span>}
                  {ALL[id] && ALL[id].variants && <span className="xs faint mono" title="layout variants">×{ALL[id].variants.length}</span>}
                </button>
              ))}
            </div>
          ))}
        </div>
      </aside>

      {/* main */}
      <div className="main">
        <div className="topbar">
          <span className="topbar__crumb">{meta.group}</span>
          <span className="faint">/</span>
          <span className="topbar__title">{meta.title}</span>
          <div className="topbar__spacer" />
          {variantList && (
            <div className="tabs">
              {variantList.map((v, i) => (
                <button key={v} className={window.cx("tab", i === vIdx && "tab--on")} onClick={() => setVariants(s => ({ ...s, [cur]: i }))}>{v}</button>
              ))}
            </div>
          )}
          {hasMobile && (
            <div className="seg">
              <button className={device === "desktop" ? "on" : ""} onClick={() => setDevice("desktop")} title="Desktop"><MonitorIcon /></button>
              <button className={device === "mobile" ? "on" : ""} onClick={() => setDevice("mobile")} title="Mobile"><PhoneIcon /></button>
            </div>
          )}
          <div className="navbtns">
            <button disabled={idx <= 0} onClick={() => go(ORDER[idx - 1])} title="Previous">‹</button>
            <button disabled={idx >= ORDER.length - 1} onClick={() => go(ORDER[idx + 1])} title="Next">›</button>
          </div>
        </div>

        <div className={window.cx("canvas", showMobile && "canvas--mobile")} ref={canvasRef}>
          {cur === "overview" ? (
            <div className="frame" style={{ width: 1180 }}>{content}</div>
          ) : showMobile ? (
            <div className="phone">
              <div className="phone__screen">
                <div className="phone__notch" />
                <div className="phone__status"><span>9:41</span><span>📶 100%</span></div>
                <div className="phone__body">{content}</div>
              </div>
            </div>
          ) : (
            <div className="frame">
              <div className="frame__bar"><span className="dot" /><span className="dot" /><span className="dot" /><span className="frame__url">countyourcarbon.org.uk / {cur}</span></div>
              <div className="frame__body">{content}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
