/* ============================================================
   wf-kit.jsx — wireframe primitives, exported to window
   ============================================================ */
const { useState } = React;

const cx = (...a) => a.filter(Boolean).join(" ");

/* layout helpers */
const Row = ({ g = 12, ac, jb, je, jc, wrap, as, ae, className, style, children }) =>
  <div className={cx("row", `gap${g}`, ac && "ac", as && "as", ae && "ae", jb && "jb", je && "je", jc && "jc", wrap && "wrap", className)} style={style}>{children}</div>;
const Col = ({ g = 12, ac, className, style, children }) =>
  <div className={cx("col", `gap${g}`, ac && "ac", className)} style={style}>{children}</div>;
const Spacer = () => <div className="f1" />;
const Line = ({ style }) => <div className="line" style={style} />;

/* text */
const H1 = ({ children, style }) => <div className="h1" style={style}>{children}</div>;
const H2 = ({ children, style }) => <div className="h2" style={style}>{children}</div>;
const H3 = ({ children, style }) => <div className="h3" style={style}>{children}</div>;
const Lead = ({ children, style }) => <div className="lead" style={style}>{children}</div>;
const Txt = ({ children, muted, sm, className, style }) => <div className={cx("txt", muted && "muted", sm && "sm", className)} style={style}>{children}</div>;
const Up = ({ children, style }) => <div className="up" style={style}>{children}</div>;
const Ref = ({ children }) => <span className="ref">{children}</span>;

/* surfaces */
const Card = ({ soft, ghost, pad, className, style, children }) =>
  <div className={cx("card", soft && "card--soft", ghost && "card--ghost", className)} style={{ ...(pad != null ? { padding: pad } : {}), ...style }}>{children}</div>;

const Ph = ({ h = 120, w, label = "placeholder", style }) =>
  <div className="ph" style={{ height: h, width: w, ...style }}>{label}</div>;

const Box = ({ h, w, className, style, children }) =>
  <div className={cx("box", className)} style={{ height: h, width: w, ...style }}>{children}</div>;

/* annotation */
const Annot = ({ children }) => <div className="annot"><span>✎</span><div>{children}</div></div>;

/* form */
const Field = ({ label, req, value, placeholder, hint, error, ta, sel, w, half, style }) => (
  <div className="field" style={{ width: w, flex: half ? 1 : undefined, ...style }}>
    {label && <div className="flabel">{label}{req && <span className="req">*</span>}</div>}
    <div className={cx("input", ta && "input--ta", sel && "input--sel", value && "input--filled", error && "input--err")}>
      <span>{value || placeholder || ""}</span>
      {sel && <span className="faint">▾</span>}
    </div>
    {error ? <div className="ferr">▲ {error}</div> : hint ? <div className="fhint">{hint}</div> : null}
  </div>
);

const Btn = ({ children, primary, ghost, sm, full, onClick, style }) =>
  <button className={cx("btn", primary && "btn--primary", ghost && "btn--ghost", sm && "btn--sm", full && "btn--full")} onClick={onClick} style={style}>{children}</button>;

const Chip = ({ children, on, onClick }) => <button className={cx("chip", on && "chip--on")} onClick={onClick}>{children}</button>;

const Tag = ({ children, tone = "grey" }) => <span className={cx("tag", `tag--${tone}`)}>{children}</span>;
const Dot = ({ tone = "grey" }) => {
  const map = { green: "var(--accent)", amber: "var(--warn)", grey: "var(--ink-faint)", sky: "var(--sky)", red: "oklch(0.6 0.16 30)" };
  return <span className="dotind" style={{ background: map[tone] }} />;
};

/* steps */
const Steps = ({ steps, current }) => (
  <div className="steps">
    {steps.map((s, i) => (
      <div key={i} className={cx("step", i < current && "step--done", i === current && "step--on")}>
        {i > 0 && <div className="step__bar" style={{ background: i <= current ? "var(--accent)" : "var(--line)" }} />}
        <div className="step__n">{i < current ? "✓" : i + 1}</div>
        <div className="step__l">{s}</div>
      </div>
    ))}
  </div>
);

const PBar = ({ pct }) => <div className="pbar"><div className="pbar__fill" style={{ width: pct + "%" }} /></div>;

/* horizontal bar chart */
const Bars = ({ data }) => {
  const max = Math.max(...data.map(d => d.v));
  return (
    <div className="bars">
      {data.map((d, i) => (
        <div className="barrow" key={i}>
          <div className="sm" style={{ color: "var(--ink)", display: "flex", alignItems: "center", gap: 7 }}>
            <span className="swatch" style={{ background: d.c || "var(--accent-mid)" }} />{d.l}
          </div>
          <div className="bartrack"><div className="barfill" style={{ width: (d.v / max * 100) + "%", background: d.c || "var(--accent-mid)" }} /></div>
          <div className="barval">{d.v}</div>
        </div>
      ))}
    </div>
  );
};

/* column chart (year trend) */
const Cols = ({ data, h = 150 }) => {
  const max = Math.max(...data.map(d => d.v));
  return (
    <div>
      <div className="cbars" style={{ height: h }}>
        {data.map((d, i) => (
          <div key={i} className={cx("cbar", d.ghost && "cbar--ghost")} style={{ height: (d.v / max * 100) + "%", background: d.c }} title={d.v} />
        ))}
      </div>
      <div className="row" style={{ marginTop: 8 }}>
        {data.map((d, i) => <div key={i} className="f1 center xs faint mono">{d.l}</div>)}
      </div>
    </div>
  );
};

/* donut via conic-gradient */
const Donut = ({ segs, center }) => {
  let acc = 0;
  const stops = segs.map(s => { const a = acc; acc += s.v; return `${s.c} ${a}% ${acc}%`; }).join(",");
  return (
    <div className="donut" style={{ background: `conic-gradient(${stops})` }}>
      <div className="donut__hole">{center}</div>
    </div>
  );
};

/* table */
const Table = ({ cols, rows, zebra }) => (
  <table className={cx("tbl", zebra && "tbl--zebra")}>
    <thead><tr>{cols.map((c, i) => <th key={i} style={{ width: c.w }}>{c.t || c}</th>)}</tr></thead>
    <tbody>{rows.map((r, i) => <tr key={i}>{r.map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody>
  </table>
);

const Legend = ({ items }) => (
  <div className="legend">{items.map((it, i) => <span key={i}><span className="swatch" style={{ background: it.c }} />{it.l}</span>)}</div>
);

/* app chrome (in-screen product top bar) */
const AppBar = ({ active = "Home", role = "school", user = "SL", go }) => {
  const navs = {
    school: ["Home", "Calculate", "Report", "Plan"],
    group: ["Overview", "Settings", "Reports"],
    kbt: ["Dashboard", "Users", "Content"],
    pnz: ["Model", "Factors", "QA"],
  }[role];
  return (
    <div className="appbar">
      <div className="applogo"><span className="nav__mark">C</span> Count Your Carbon</div>
      <div className="appbar__nav">{navs.map(n => <a key={n} className={cx(n === active && "on")}>{n}</a>)}</div>
      <Spacer />
      <div className="sm muted">🔍</div>
      <div className="avatar">{user}</div>
    </div>
  );
};

const Avatar = ({ children }) => <div className="avatar">{children}</div>;

Object.assign(window, {
  cx, Row, Col, Spacer, Line, H1, H2, H3, Lead, Txt, Up, Ref,
  Card, Ph, Box, Annot, Field, Btn, Chip, Tag, Dot, Steps, PBar,
  Bars, Cols, Donut, Table, Legend, AppBar, Avatar,
});
