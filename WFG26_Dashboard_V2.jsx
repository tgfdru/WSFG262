import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart, Line, Area } from "recharts";

const C = {
  navy: "#0F1B2D", deep: "#1A365D", blue: "#2B6CB0", lblue: "#63B3ED", cyan: "#00D4FF",
  gold: "#F6AD55", amber: "#ED8936", green: "#48BB78", red: "#FC8181", dred: "#E53E3E",
  white: "#FFFFFF", g100: "#F7FAFC", g200: "#EDF2F7", g300: "#E2E8F0", g500: "#A0AEC0", g700: "#4A5568", g900: "#1A202C",
  // Division colors
  cafr: "#E53E3E", wnafr: "#2B6CB0", wsa: "#48BB78",
};

// =============== DATA ===============
const divColors = { CAFrPD: C.cafr, WNAFrPD: C.wnafr, "WSA FrPD": C.wsa };

const divSummary = [
  { div: "CAFrPD", n: 19, experience: 4.00, effectiveness: 4.63, coaching: 4.74, facilities: 2.32, schedule: 3.63, intensity: 2.68, composite: 3.67 },
  { div: "WNAFrPD", n: 12, experience: 4.75, effectiveness: 4.75, coaching: 5.00, facilities: 3.50, schedule: 4.58, intensity: 2.42, composite: 4.17 },
  { div: "WSA FrPD", n: 29, experience: 4.90, effectiveness: 4.79, coaching: 4.90, facilities: 3.66, schedule: 4.69, intensity: 2.79, composite: 4.29 },
];

const divDetails = {
  CAFrPD: {
    n: 19, color: C.cafr,
    experience: [{ name: "Excellent", count: 8, pct: 42.1 }, { name: "Very Good", count: 5, pct: 26.3 }, { name: "Good", count: 4, pct: 21.1 }, { name: "Fair", count: 2, pct: 10.5 }],
    effectiveness: [{ name: "Very Effective", count: 13, pct: 68.4 }, { name: "Effective", count: 5, pct: 26.3 }, { name: "Neutral", count: 1, pct: 5.3 }],
    coaching: [{ name: "Excellent", count: 16, pct: 84.2 }, { name: "Very Good", count: 2, pct: 10.5 }, { name: "Fair", count: 1, pct: 5.3 }],
    facilities: [{ name: "Fully Adequate", count: 2, pct: 10.5 }, { name: "Mostly Adequate", count: 6, pct: 31.6 }, { name: "Somewhat Inadequate", count: 7, pct: 36.8 }, { name: "Inadequate", count: 4, pct: 21.1 }],
    schedule: [{ name: "Very Satisfied", count: 6, pct: 31.6 }, { name: "Satisfied", count: 6, pct: 31.6 }, { name: "Neutral", count: 2, pct: 10.5 }, { name: "Dissatisfied", count: 4, pct: 21.1 }, { name: "Very Dissatisfied", count: 1, pct: 5.3 }],
    intensity: [{ name: "Very Appropriate", count: 14, pct: 73.7 }, { name: "Appropriate", count: 4, pct: 21.1 }, { name: "Too High", count: 1, pct: 5.3 }],
    bottomRespondents: [
      { name: "Barkawi, Abdul R", total: "16/25", fac: "Inadequate", sched: "Dissatisfied" },
      { name: "Dossari, Mansoar M", total: "16/25", fac: "Mostly Adequate", sched: "Dissatisfied" },
      { name: "Alotaibi, Faisal H", total: "17/25", fac: "Inadequate", sched: "Very Dissatisfied" },
    ],
    topbox: { experience: 42.1, effectiveness: 68.4, coaching: 84.2, facilities: 10.5, schedule: 31.6, intensity: 73.7 },
    correlations: [
      { pair: "Facilities ↔ Schedule", r: 0.326 },
      { pair: "Facilities ↔ Experience", r: 0.279 },
      { pair: "Schedule ↔ Experience", r: 0.405 },
    ],
  },
  WNAFrPD: {
    n: 12, color: C.wnafr,
    experience: [{ name: "Excellent", count: 9, pct: 75.0 }, { name: "Very Good", count: 3, pct: 25.0 }],
    effectiveness: [{ name: "Very Effective", count: 9, pct: 75.0 }, { name: "Effective", count: 3, pct: 25.0 }],
    coaching: [{ name: "Excellent", count: 12, pct: 100.0 }],
    facilities: [{ name: "Fully Adequate", count: 7, pct: 58.3 }, { name: "Mostly Adequate", count: 4, pct: 33.3 }, { name: "Somewhat Inadequate", count: 1, pct: 8.3 }],
    schedule: [{ name: "Very Satisfied", count: 8, pct: 66.7 }, { name: "Satisfied", count: 3, pct: 25.0 }, { name: "Neutral", count: 1, pct: 8.3 }],
    intensity: [{ name: "Very Appropriate", count: 6, pct: 50.0 }, { name: "Appropriate", count: 5, pct: 41.7 }, { name: "Too High", count: 1, pct: 8.3 }],
    bottomRespondents: [
      { name: "Banjar, Amr A", total: "22/25", fac: "Mostly Adequate", sched: "Satisfied" },
      { name: "Husaeni, Hamdan A", total: "23/25", fac: "Somewhat Inad.", sched: "Neutral" },
      { name: "Ghamdi, Anwar S", total: "23/25", fac: "Fully Adequate", sched: "Satisfied" },
    ],
    topbox: { experience: 75.0, effectiveness: 75.0, coaching: 100.0, facilities: 58.3, schedule: 66.7, intensity: 50.0 },
    correlations: [
      { pair: "Facilities ↔ Schedule", r: 0.504 },
      { pair: "Facilities ↔ Experience", r: 0.149 },
      { pair: "Schedule ↔ Experience", r: -0.075 },
    ],
  },
  "WSA FrPD": {
    n: 29, color: C.wsa,
    experience: [{ name: "Excellent", count: 26, pct: 89.7 }, { name: "Very Good", count: 3, pct: 10.3 }],
    effectiveness: [{ name: "Very Effective", count: 23, pct: 79.3 }, { name: "Effective", count: 6, pct: 20.7 }],
    coaching: [{ name: "Excellent", count: 26, pct: 89.7 }, { name: "Very Good", count: 3, pct: 10.3 }],
    facilities: [{ name: "Fully Adequate", count: 22, pct: 75.9 }, { name: "Mostly Adequate", count: 4, pct: 13.8 }, { name: "Somewhat Inadequate", count: 3, pct: 10.3 }],
    schedule: [{ name: "Very Satisfied", count: 23, pct: 79.3 }, { name: "Satisfied", count: 3, pct: 10.3 }, { name: "Neutral", count: 3, pct: 10.3 }],
    intensity: [{ name: "Very Appropriate", count: 24, pct: 82.8 }, { name: "Appropriate", count: 4, pct: 13.8 }, { name: "Too High", count: 1, pct: 3.4 }],
    bottomRespondents: [
      { name: "Islam, Mohammed E", total: "20/25", fac: "Mostly Adequate", sched: "Neutral" },
      { name: "Alahmdi, Ali H", total: "21/25", fac: "Somewhat Inad.", sched: "Neutral" },
      { name: "Malki, Tareq S", total: "22/25", fac: "Mostly Adequate", sched: "Satisfied" },
    ],
    topbox: { experience: 89.7, effectiveness: 79.3, coaching: 89.7, facilities: 75.9, schedule: 79.3, intensity: 82.8 },
    correlations: [
      { pair: "Facilities ↔ Schedule", r: 0.638 },
      { pair: "Facilities ↔ Experience", r: 0.510 },
      { pair: "Schedule ↔ Experience", r: 0.536 },
    ],
  },
};

const radarData = [
  { subject: "Experience", CAFrPD: 80.0, WNAFrPD: 95.0, "WSA FrPD": 98.0 },
  { subject: "Effectiveness", CAFrPD: 92.6, WNAFrPD: 95.0, "WSA FrPD": 95.9 },
  { subject: "Coaching", CAFrPD: 94.7, WNAFrPD: 100, "WSA FrPD": 98.0 },
  { subject: "Facilities", CAFrPD: 57.9, WNAFrPD: 87.5, "WSA FrPD": 91.4 },
  { subject: "Schedule", CAFrPD: 72.6, WNAFrPD: 91.7, "WSA FrPD": 93.8 },
  { subject: "Intensity", CAFrPD: 89.5, WNAFrPD: 80.6, "WSA FrPD": 93.1 },
];

const overallDist = {
  experience: [{ name: "Excellent", count: 43, pct: 71.7 }, { name: "Very Good", count: 11, pct: 18.3 }, { name: "Good", count: 4, pct: 6.7 }, { name: "Fair", count: 2, pct: 3.3 }],
  effectiveness: [{ name: "Very Effective", count: 45, pct: 75.0 }, { name: "Effective", count: 14, pct: 23.3 }, { name: "Neutral", count: 1, pct: 1.7 }],
  coaching: [{ name: "Excellent", count: 54, pct: 90.0 }, { name: "Very Good", count: 5, pct: 8.3 }, { name: "Fair", count: 1, pct: 1.7 }],
  facilities: [{ name: "Fully Adequate", count: 31, pct: 51.7 }, { name: "Mostly Adequate", count: 14, pct: 23.3 }, { name: "Somewhat Inadequate", count: 11, pct: 18.3 }, { name: "Inadequate", count: 4, pct: 6.7 }],
  schedule: [{ name: "Very Satisfied", count: 37, pct: 61.7 }, { name: "Satisfied", count: 12, pct: 20.0 }, { name: "Neutral", count: 6, pct: 10.0 }, { name: "Dissatisfied", count: 4, pct: 6.7 }, { name: "Very Dissatisfied", count: 1, pct: 1.7 }],
  intensity: [{ name: "Very Appropriate", count: 44, pct: 73.3 }, { name: "Appropriate", count: 13, pct: 21.7 }, { name: "Too High", count: 3, pct: 5.0 }],
};

const corrMatrix = [
  { row: "Experience", Experience: 1.0, Effectiveness: 0.43, Coaching: 0.46, Facilities: 0.53, Schedule: 0.53, Intensity: 0.24 },
  { row: "Effectiveness", Experience: 0.43, Effectiveness: 1.0, Coaching: 0.37, Facilities: 0.26, Schedule: 0.39, Intensity: 0.43 },
  { row: "Coaching", Experience: 0.46, Effectiveness: 0.37, Coaching: 1.0, Facilities: 0.10, Schedule: 0.38, Intensity: 0.16 },
  { row: "Facilities", Experience: 0.53, Effectiveness: 0.26, Coaching: 0.10, Facilities: 1.0, Schedule: 0.60, Intensity: 0.15 },
  { row: "Schedule", Experience: 0.53, Effectiveness: 0.39, Coaching: 0.38, Facilities: 0.60, Schedule: 1.0, Intensity: 0.27 },
  { row: "Intensity", Experience: 0.24, Effectiveness: 0.43, Coaching: 0.16, Facilities: 0.15, Intensity: 0.27, Schedule: 0.27 },
];

// =============== COMPONENTS ===============

const border = `1px solid ${C.g300}`;
const ca = { textAlign: "center" };

function KPI({ label, value, sub, icon, color }) {
  return (
    <div style={{ background: C.white, borderRadius: 14, padding: "20px 16px", borderLeft: `5px solid ${color}`, boxShadow: "0 3px 18px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: 14 }}>
      <span style={{ fontSize: 30 }}>{icon}</span>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: C.g500, textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
        <div style={{ fontSize: 24, fontWeight: 900, color: C.navy }}>{value}</div>
        {sub && <div style={{ fontSize: 11, color, fontWeight: 600 }}>{sub}</div>}
      </div>
    </div>
  );
}

function Section({ num, title, sub }) {
  return (
    <div style={{ marginBottom: 20, borderBottom: `3px solid ${C.blue}`, paddingBottom: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ background: C.deep, color: C.white, borderRadius: 8, padding: "5px 12px", fontSize: 12, fontWeight: 800 }}>{num}</span>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 900, color: C.navy }}>{title}</h2>
      </div>
      {sub && <p style={{ margin: "4px 0 0 0", fontSize: 12, color: C.g500, fontStyle: "italic" }}>{sub}</p>}
    </div>
  );
}

function Table({ headers, rows, small }) {
  const fs = small ? 10 : 12;
  return (
    <div style={{ overflowX: "auto", borderRadius: 10, boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: fs }}>
        <thead><tr>{headers.map((h, i) => (
          <th key={i} style={{ background: C.deep, color: C.white, padding: small ? "8px 10px" : "10px 12px", textAlign: i === 0 ? "left" : "center", fontWeight: 700, fontSize: fs - 1, whiteSpace: "nowrap" }}>{h}</th>
        ))}</tr></thead>
        <tbody>{rows.map((row, ri) => (
          <tr key={ri} style={{ background: ri % 2 === 0 ? C.white : C.g100 }}>{row.map((cell, ci) => (
            <td key={ci} style={{ padding: small ? "7px 10px" : "9px 12px", textAlign: ci === 0 ? "left" : "center", borderBottom: `1px solid ${C.g200}`, color: C.g700 }}>{cell}</td>
          ))}</tr>
        ))}</tbody>
      </table>
    </div>
  );
}

function DivBadge({ name, n, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
      <div style={{ width: 6, height: 40, borderRadius: 3, background: color }} />
      <div>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: C.navy }}>{name}</h3>
        <span style={{ fontSize: 12, color: C.g500 }}>n = {n} respondents | Department: WR/CR FrPD</span>
      </div>
    </div>
  );
}

function MiniBar({ data, color, height = 180 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="vertical" margin={{ left: 5, right: 25 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={C.g200} />
        <XAxis type="number" tick={{ fontSize: 9 }} />
        <YAxis type="category" dataKey="name" tick={{ fontSize: 9 }} width={120} />
        <Tooltip formatter={v => `${v} responses`} />
        <Bar dataKey="count" fill={color} radius={[0, 5, 5, 0]} barSize={16} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function TopBoxBar({ data, color }) {
  const items = [
    { name: "Experience", val: data.experience },
    { name: "Effectiveness", val: data.effectiveness },
    { name: "Coaching", val: data.coaching },
    { name: "Facilities", val: data.facilities },
    { name: "Schedule", val: data.schedule },
    { name: "Intensity", val: data.intensity },
  ];
  return (
    <div>
      {items.map((it, i) => (
        <div key={i} style={{ marginBottom: 6 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, marginBottom: 2 }}>
            <span style={{ color: C.g700 }}>{it.name}</span>
            <span style={{ fontWeight: 800, color: it.val >= 70 ? C.green : it.val >= 50 ? C.amber : C.dred }}>{it.val}%</span>
          </div>
          <div style={{ height: 10, background: C.g200, borderRadius: 5 }}>
            <div style={{ height: 10, background: it.val >= 70 ? C.green : it.val >= 50 ? C.amber : C.dred, borderRadius: 5, width: `${it.val}%`, transition: "width 0.5s" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function CorrelationHeatmap() {
  const dims = ["Experience", "Effectiveness", "Coaching", "Facilities", "Schedule", "Intensity"];
  const getColor = v => v >= 0.95 ? C.deep : v >= 0.5 ? "#2B6CB0" : v >= 0.35 ? "#63B3ED" : v >= 0.2 ? "#BEE3F8" : "#EDF2F7";
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ borderCollapse: "collapse", margin: "0 auto" }}>
        <thead><tr><th style={{ padding: 6, fontSize: 9 }}></th>
          {dims.map(d => <th key={d} style={{ padding: "6px 4px", fontSize: 9, fontWeight: 700, color: C.navy, writingMode: "vertical-lr", transform: "rotate(180deg)", height: 70 }}>{d}</th>)}
        </tr></thead>
        <tbody>{corrMatrix.map((row, ri) => (
          <tr key={ri}><td style={{ padding: "4px 8px", fontSize: 9, fontWeight: 700, color: C.navy, textAlign: "right" }}>{row.row}</td>
            {dims.map((d, ci) => {
              const v = row[d];
              return <td key={ci} style={{ width: 42, height: 42, textAlign: "center", background: getColor(v), color: v >= 0.5 ? C.white : C.g700, fontSize: 10, fontWeight: v >= 0.5 ? 700 : 400, borderRadius: 3, border: `2px solid ${C.white}` }}>{v.toFixed(2)}</td>;
            })}
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}

function DivisionFullSection({ divName, data }) {
  const qNames = [
    { key: "experience", label: "Overall Experience" },
    { key: "effectiveness", label: "Training Effectiveness" },
    { key: "coaching", label: "Coaching Quality" },
    { key: "facilities", label: "Facilities Adequacy" },
    { key: "schedule", label: "Schedule Satisfaction" },
    { key: "intensity", label: "Training Intensity" },
  ];
  return (
    <div style={{ background: C.white, borderRadius: 16, padding: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.06)", marginBottom: 24, borderTop: `5px solid ${data.color}` }}>
      <DivBadge name={divName} n={data.n} color={data.color} />

      {/* Top-Box Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <div>
          <h4 style={{ margin: "0 0 10px 0", fontSize: 13, color: C.navy, fontWeight: 800 }}>🏆 Top-Box Rates (% choosing highest option)</h4>
          <TopBoxBar data={data.topbox} color={data.color} />
        </div>
        <div>
          <h4 style={{ margin: "0 0 10px 0", fontSize: 13, color: C.navy, fontWeight: 800 }}>🔗 Key Correlations</h4>
          {data.correlations.map((c, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", background: C.g100, borderRadius: 8, marginBottom: 6, fontSize: 11 }}>
              <span style={{ color: C.g700 }}>{c.pair}</span>
              <span style={{ fontWeight: 800, color: c.r >= 0.5 ? C.green : c.r >= 0.3 ? C.amber : C.g500 }}>r = {c.r.toFixed(3)}</span>
            </div>
          ))}
          <div style={{ marginTop: 10 }}>
            <h4 style={{ margin: "0 0 8px 0", fontSize: 13, color: C.navy, fontWeight: 800 }}>⚠️ Lowest-Scoring Respondents</h4>
            <Table small headers={["Name", "Score", "Facilities", "Schedule"]}
              rows={data.bottomRespondents.map(r => [r.name, r.total, r.fac, r.sched])} />
          </div>
        </div>
      </div>

      {/* Distribution Charts */}
      <h4 style={{ margin: "0 0 12px 0", fontSize: 13, color: C.navy, fontWeight: 800 }}>📊 Response Distributions</h4>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
        {qNames.map(q => (
          <div key={q.key} style={{ background: C.g100, borderRadius: 10, padding: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.navy, marginBottom: 8 }}>{q.label}</div>
            <MiniBar data={data[q.key]} color={data.color} height={Math.max(100, data[q.key].length * 32)} />
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 4 }}>
              {data[q.key].map((d, i) => (
                <span key={i} style={{ fontSize: 9, background: C.white, padding: "2px 6px", borderRadius: 4, color: C.g700 }}>{d.name}: <strong>{d.pct}%</strong></span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =============== MAIN ===============
export default function WFG26Report() {
  const [tab, setTab] = useState("exec");

  const tabs = [
    { id: "exec", label: "Executive Summary", icon: "📋" },
    { id: "div", label: "Division Performance", icon: "🏢" },
    { id: "compare", label: "Comparison & Radar", icon: "📊" },
    { id: "corr", label: "Correlation & Drivers", icon: "🔬" },
    { id: "actions", label: "Recommendations", icon: "🎯" },
  ];

  return (
    <div style={{ fontFamily: "'Segoe UI', -apple-system, sans-serif", background: `linear-gradient(180deg, ${C.g100}, ${C.g200})`, minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${C.navy} 0%, ${C.deep} 60%, ${C.blue} 100%)`, padding: "28px 28px 16px", color: C.white }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, opacity: 0.7, textTransform: "uppercase" }}>Saudi Aramco — WR/CR FrPD Department</div>
            <h1 style={{ margin: "4px 0 0", fontSize: 24, fontWeight: 900 }}>WFG-26 Preparation Camp Survey Analysis</h1>
            <p style={{ margin: "4px 0 0", fontSize: 12, opacity: 0.8 }}>60 participants across 3 divisions: CAFrPD (19) · WNAFrPD (12) · WSA FrPD (29)</p>
          </div>
          <div style={{ textAlign: "right", fontSize: 10, opacity: 0.7 }}>
            <div>Report: Feb 2026</div>
            <div>Department: WR/CR FrPD</div>
            <div>Data Completeness: 100%</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 3, marginTop: 16, flexWrap: "wrap" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              background: tab === t.id ? C.white : "rgba(255,255,255,0.12)",
              color: tab === t.id ? C.navy : "rgba(255,255,255,0.9)",
              border: "none", padding: "9px 16px", borderRadius: "8px 8px 0 0",
              fontSize: 11, fontWeight: tab === t.id ? 800 : 500, cursor: "pointer",
            }}>{t.icon} {t.label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "24px 28px", maxWidth: 1200, margin: "0 auto" }}>

        {/* ============ EXECUTIVE SUMMARY ============ */}
        {tab === "exec" && (<div>
          <Section num="01" title="Executive Summary" sub="Department: WR/CR FrPD | All 3 divisions analyzed" />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 14, marginBottom: 24 }}>
            <KPI label="Total Respondents" value="60" icon="👥" color={C.blue} />
            <KPI label="Department" value="WR/CR FrPD" sub="All respondents" icon="🏢" color={C.deep} />
            <KPI label="Overall Satisfaction" value="93%" sub="Positive" icon="⭐" color={C.green} />
            <KPI label="Top Performer" value="WSA FrPD" sub="Avg 4.29/5" icon="🏆" color={C.wsa} />
            <KPI label="Needs Attention" value="CAFrPD" sub="Facilities 2.32/4" icon="⚠️" color={C.cafr} />
          </div>

          {/* Division Quick Compare */}
          <div style={{ background: C.white, borderRadius: 14, padding: 24, boxShadow: "0 3px 18px rgba(0,0,0,0.05)", marginBottom: 24 }}>
            <h3 style={{ margin: "0 0 16px", fontSize: 15, color: C.navy, fontWeight: 800 }}>🏢 Division Performance At-a-Glance</h3>
            <Table headers={["Division", "n", "Experience", "Effectiveness", "Coaching", "Facilities", "Schedule", "Intensity", "Composite"]}
              rows={divSummary.map(d => [d.div, d.n, d.experience.toFixed(2), d.effectiveness.toFixed(2), d.coaching.toFixed(2), d.facilities.toFixed(2), d.schedule.toFixed(2), d.intensity.toFixed(2), d.composite.toFixed(2)])} />
          </div>

          {/* Executive Narrative */}
          <div style={{ background: C.white, borderRadius: 14, padding: 24, boxShadow: "0 3px 18px rgba(0,0,0,0.05)", marginBottom: 24, lineHeight: 1.8 }}>
            <h3 style={{ margin: "0 0 14px", fontSize: 15, color: C.navy }}>📝 Executive Narrative</h3>
            <p style={{ fontSize: 13, color: C.g700, margin: "0 0 10px" }}>
              All 60 respondents belong to <strong>WR/CR FrPD</strong> department, distributed across three divisions. The camp achieved <strong style={{ color: C.green }}>93% overall positive satisfaction</strong>, with coaching quality as the signature strength (90% Excellent).
            </p>
            <p style={{ fontSize: 13, color: C.g700, margin: "0 0 10px" }}>
              <strong style={{ color: C.wsa }}>WSA FrPD leads all dimensions</strong> with a composite average of 4.29/5 — 89.7% rated their experience as Excellent and 75.9% rated facilities as fully adequate. This division represents the benchmark for camp delivery.
            </p>
            <p style={{ fontSize: 13, color: C.g700, margin: "0 0 10px" }}>
              <strong style={{ color: C.cafr }}>CAFrPD is critically under-performing</strong> with a composite of 3.67/5 — only 10.5% rated facilities as fully adequate (vs 75.9% in WSA FrPD), and 26.4% expressed dissatisfaction with the schedule. All 4 "Inadequate" facility ratings and all 5 schedule dissatisfaction cases come from this division.
            </p>
            <p style={{ fontSize: 13, color: C.g700, margin: 0 }}>
              <strong style={{ color: C.wnafr }}>WNAFrPD performs solidly</strong> at 4.17/5 composite with a perfect 100% Excellent coaching score. Their main opportunity area is training intensity, where 8.3% reported "Too High."
            </p>
          </div>

          {/* Top 5 Insights */}
          <div style={{ background: C.white, borderRadius: 14, padding: 24, boxShadow: "0 3px 18px rgba(0,0,0,0.05)" }}>
            <h3 style={{ margin: "0 0 14px", fontSize: 15, color: C.navy }}>🏆 Top 5 Strategic Insights</h3>
            {[
              { icon: "🏗️", title: "CAFrPD Facilities Crisis", desc: "Only 10.5% fully adequate vs 75.9% in WSA FrPD — a 65-point gap. 100% of 'Inadequate' ratings come from CAFrPD.", pri: "Critical", color: C.dred },
              { icon: "⚖️", title: "Massive Division Inequality", desc: "CAFrPD composite (3.67) is 15% below WSA FrPD (4.29). Gap persists across facilities, schedule, and experience.", pri: "Critical", color: C.dred },
              { icon: "🏆", title: "WSA FrPD: The Gold Standard", desc: "89.7% Excellent experience, 79.3% Very Satisfied schedule, 75.9% fully adequate facilities. This is the model to replicate.", pri: "Strategic", color: C.wsa },
              { icon: "🔗", title: "Facilities→Schedule Chain (r=0.60)", desc: "Strongest correlation in dataset. In WSA FrPD (r=0.638), this link is even stronger — proving that fixing facilities auto-fixes scheduling.", pri: "High", color: C.amber },
              { icon: "🛡️", title: "Coaching Shields CAFrPD", desc: "Despite poor facilities, CAFrPD coaching is 84.2% Excellent. Coaches compensate for infrastructure gaps through personal excellence.", pri: "Monitor", color: C.blue },
            ].map((ins, i) => (
              <div key={i} style={{ display: "flex", gap: 14, padding: 14, background: C.g100, borderRadius: 10, marginBottom: 10, borderLeft: `4px solid ${ins.color}` }}>
                <span style={{ fontSize: 22 }}>{ins.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h4 style={{ margin: 0, fontSize: 13, fontWeight: 800, color: C.navy }}>{ins.title}</h4>
                    <span style={{ fontSize: 9, fontWeight: 800, padding: "2px 8px", borderRadius: 10, background: `${ins.color}18`, color: ins.color, textTransform: "uppercase" }}>{ins.pri}</span>
                  </div>
                  <p style={{ margin: "4px 0 0", fontSize: 11, color: C.g700, lineHeight: 1.5 }}>{ins.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>)}

        {/* ============ DIVISION PERFORMANCE ============ */}
        {tab === "div" && (<div>
          <Section num="02" title="Division Performance — Separated Analysis" sub="Each division analyzed independently with full distributions, top-box rates, correlations & critical respondents" />

          {["CAFrPD", "WNAFrPD", "WSA FrPD"].map(divName => (
            <DivisionFullSection key={divName} divName={divName} data={divDetails[divName]} />
          ))}
        </div>)}

        {/* ============ COMPARISON & RADAR ============ */}
        {tab === "compare" && (<div>
          <Section num="03" title="Cross-Division Comparison" sub="Side-by-side performance metrics across all 3 divisions" />

          {/* Radar */}
          <div style={{ background: C.white, borderRadius: 14, padding: 24, boxShadow: "0 3px 18px rgba(0,0,0,0.05)", marginBottom: 24 }}>
            <h3 style={{ margin: "0 0 14px", fontSize: 15, color: C.navy }}>🕸️ Performance Radar (% of Maximum Score)</h3>
            <ResponsiveContainer width="100%" height={380}>
              <RadarChart data={radarData}>
                <PolarGrid stroke={C.g300} />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fontWeight: 700 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 9 }} />
                <Radar name="CAFrPD" dataKey="CAFrPD" stroke={C.cafr} fill={C.cafr} fillOpacity={0.12} strokeWidth={2.5} />
                <Radar name="WNAFrPD" dataKey="WNAFrPD" stroke={C.wnafr} fill={C.wnafr} fillOpacity={0.12} strokeWidth={2.5} />
                <Radar name="WSA FrPD" dataKey="WSA FrPD" stroke={C.wsa} fill={C.wsa} fillOpacity={0.12} strokeWidth={2.5} />
                <Legend />
                <Tooltip formatter={v => `${v}%`} />
              </RadarChart>
            </ResponsiveContainer>
            <p style={{ fontSize: 11, color: C.dred, textAlign: "center", fontWeight: 700 }}>⚠️ CAFrPD dips sharply on Facilities (57.9%) and Schedule (72.6%) — 30+ point gap vs WSA FrPD</p>
          </div>

          {/* Bar Comparison */}
          <div style={{ background: C.white, borderRadius: 14, padding: 24, boxShadow: "0 3px 18px rgba(0,0,0,0.05)", marginBottom: 24 }}>
            <h3 style={{ margin: "0 0 14px", fontSize: 15, color: C.navy }}>📊 Mean Score Comparison by Division</h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={[
                { metric: "Experience", CAFrPD: 4.00, WNAFrPD: 4.75, "WSA FrPD": 4.90 },
                { metric: "Effectiveness", CAFrPD: 4.63, WNAFrPD: 4.75, "WSA FrPD": 4.79 },
                { metric: "Coaching", CAFrPD: 4.74, WNAFrPD: 5.00, "WSA FrPD": 4.90 },
                { metric: "Facilities", CAFrPD: 2.32, WNAFrPD: 3.50, "WSA FrPD": 3.66 },
                { metric: "Schedule", CAFrPD: 3.63, WNAFrPD: 4.58, "WSA FrPD": 4.69 },
                { metric: "Intensity", CAFrPD: 2.68, WNAFrPD: 2.42, "WSA FrPD": 2.79 },
              ]} margin={{ left: 10, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.g200} />
                <XAxis dataKey="metric" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} domain={[0, 5.5]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="CAFrPD" fill={C.cafr} radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="WNAFrPD" fill={C.wnafr} radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="WSA FrPD" fill={C.wsa} radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gap Analysis Table */}
          <div style={{ background: C.white, borderRadius: 14, padding: 24, boxShadow: "0 3px 18px rgba(0,0,0,0.05)", marginBottom: 24 }}>
            <h3 style={{ margin: "0 0 14px", fontSize: 15, color: C.navy }}>📉 Gap Analysis: CAFrPD vs WSA FrPD</h3>
            <Table headers={["Dimension", "CAFrPD", "WSA FrPD", "Gap", "Gap %", "Severity"]}
              rows={[
                ["Facilities", "2.32", "3.66", "−1.34", "−36.6%", "🔴 Critical"],
                ["Schedule", "3.63", "4.69", "−1.06", "−22.6%", "🔴 Critical"],
                ["Experience", "4.00", "4.90", "−0.90", "−18.4%", "🟠 High"],
                ["Coaching", "4.74", "4.90", "−0.16", "−3.3%", "🟢 Minimal"],
                ["Effectiveness", "4.63", "4.79", "−0.16", "−3.3%", "🟢 Minimal"],
                ["Intensity", "2.68", "2.79", "−0.11", "−3.9%", "🟢 Minimal"],
              ]} />
          </div>

          {/* Top-Box Comparison */}
          <div style={{ background: C.white, borderRadius: 14, padding: 24, boxShadow: "0 3px 18px rgba(0,0,0,0.05)" }}>
            <h3 style={{ margin: "0 0 14px", fontSize: 15, color: C.navy }}>🏆 Top-Box Rate Comparison (% choosing highest option)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[
                { metric: "Experience", CAFrPD: 42.1, WNAFrPD: 75.0, "WSA FrPD": 89.7 },
                { metric: "Effectiveness", CAFrPD: 68.4, WNAFrPD: 75.0, "WSA FrPD": 79.3 },
                { metric: "Coaching", CAFrPD: 84.2, WNAFrPD: 100, "WSA FrPD": 89.7 },
                { metric: "Facilities", CAFrPD: 10.5, WNAFrPD: 58.3, "WSA FrPD": 75.9 },
                { metric: "Schedule", CAFrPD: 31.6, WNAFrPD: 66.7, "WSA FrPD": 79.3 },
                { metric: "Intensity", CAFrPD: 73.7, WNAFrPD: 50.0, "WSA FrPD": 82.8 },
              ]} margin={{ left: 10, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.g200} />
                <XAxis dataKey="metric" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} domain={[0, 105]} unit="%" />
                <Tooltip formatter={v => `${v}%`} />
                <Legend />
                <Bar dataKey="CAFrPD" fill={C.cafr} radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="WNAFrPD" fill={C.wnafr} radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="WSA FrPD" fill={C.wsa} radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
            <p style={{ fontSize: 11, color: C.dred, textAlign: "center", fontWeight: 600, marginTop: 6 }}>
              CAFrPD Facilities top-box (10.5%) is 65 points below WSA FrPD (75.9%) — the largest gap in the dataset
            </p>
          </div>
        </div>)}

        {/* ============ CORRELATION & DRIVERS ============ */}
        {tab === "corr" && (<div>
          <Section num="04" title="Correlation Analysis & Key Drivers" sub="Overall and division-level correlation analysis" />

          <div style={{ background: C.white, borderRadius: 14, padding: 24, boxShadow: "0 3px 18px rgba(0,0,0,0.05)", marginBottom: 24 }}>
            <h3 style={{ margin: "0 0 14px", fontSize: 15, color: C.navy }}>🔥 Overall Correlation Heatmap (All 60 Respondents)</h3>
            <CorrelationHeatmap />
          </div>

          {/* Division-level correlations */}
          <div style={{ background: C.white, borderRadius: 14, padding: 24, boxShadow: "0 3px 18px rgba(0,0,0,0.05)", marginBottom: 24 }}>
            <h3 style={{ margin: "0 0 14px", fontSize: 15, color: C.navy }}>🏢 Key Correlations by Division</h3>
            <Table headers={["Correlation Pair", "CAFrPD (n=19)", "WNAFrPD (n=12)", "WSA FrPD (n=29)", "Overall (n=60)"]}
              rows={[
                ["Facilities ↔ Schedule", "0.326", "0.504", "0.638", "0.600"],
                ["Facilities ↔ Experience", "0.279", "0.149", "0.510", "0.525"],
                ["Schedule ↔ Experience", "0.405", "-0.075", "0.536", "0.528"],
              ]} />
            <div style={{ marginTop: 14, padding: 14, background: "#FFF5F5", borderRadius: 10, border: `1px solid ${C.red}` }}>
              <p style={{ margin: 0, fontSize: 12, color: C.dred, fontWeight: 600 }}>
                🔑 Key Finding: The Facilities→Schedule link is strongest in WSA FrPD (r=0.638) where facilities are good. In CAFrPD, the weaker correlation (r=0.326) suggests facilities are so consistently poor that there's less variance to correlate — a "floor effect."
              </p>
            </div>
          </div>

          {/* Hidden Patterns */}
          <div style={{ background: C.white, borderRadius: 14, padding: 24, boxShadow: "0 3px 18px rgba(0,0,0,0.05)" }}>
            <h3 style={{ margin: "0 0 14px", fontSize: 15, color: C.navy }}>🔮 Hidden Patterns & Surprising Findings</h3>
            {[
              { icon: "📊", title: "WNAFrPD Anomaly: Schedule ↔ Experience = -0.075", detail: "Negative correlation is surprising. In WNAFrPD, experience is driven more by coaching (100% Excellent) than by scheduling. This division's satisfaction is coach-dependent, not logistics-dependent." },
              { icon: "🎯", title: "CAFrPD Floor Effect on Facilities", detail: "CAFrPD facilities are so consistently rated low (89.5% below 'Fully Adequate') that there isn't enough variance for strong correlations. The problem is uniform, not variable — everyone agrees facilities are poor." },
              { icon: "🛡️", title: "Coaching Independence Confirmed Across All Divisions", detail: "Coaching quality (r=0.10 with facilities overall) maintains excellence regardless of infrastructure. CAFrPD coaching at 84.2% Excellent despite 2.32/4 facilities proves this is a people-driven, not resource-driven, strength." },
              { icon: "💡", title: "WSA FrPD: The Virtuous Cycle", detail: "In WSA FrPD, all 3 key correlations are strong (0.51-0.64). Good facilities → smooth scheduling → great experience. This 'virtuous cycle' is the model to replicate for CAFrPD." },
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, padding: 14, background: C.g100, borderRadius: 10 }}>
                <span style={{ fontSize: 22 }}>{p.icon}</span>
                <div>
                  <h4 style={{ margin: "0 0 4px", fontSize: 12, fontWeight: 800, color: C.navy }}>{p.title}</h4>
                  <p style={{ margin: 0, fontSize: 11, color: C.g700, lineHeight: 1.6 }}>{p.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>)}

        {/* ============ RECOMMENDATIONS ============ */}
        {tab === "actions" && (<div>
          <Section num="05" title="Strategic Recommendations" sub="Division-specific and department-wide action plan" />

          {[
            { level: "CRITICAL", color: C.dred, bg: "#FFF5F5", target: "CAFrPD Division", items: [
              { action: "Emergency Facility Upgrade for CAFrPD", rationale: "Only 10.5% rated facilities as fully adequate (vs 75.9% WSA FrPD). All 4 'Inadequate' ratings are from CAFrPD. This is a 65-point gap — the largest in the dataset.", kpi: "Facilities top-box: 10.5% → 50%+" },
              { action: "Immediate Resource Rebalancing Across Divisions", rationale: "CAFrPD composite (3.67) is 15% below WSA FrPD (4.29). The gap is concentrated in facilities (-36.6%) and schedule (-22.6%), confirming infrastructure inequality.", kpi: "Division composite variance: reduce by 60%" },
            ]},
            { level: "HIGH", color: C.amber, bg: "#FFFAF0", target: "All Divisions", items: [
              { action: "Restructure Schedule — Separate TFA from Other Games", rationale: "CAFrPD schedule dissatisfaction is 26.4% (vs 0% in WSA FrPD). Multiple respondents explicitly requested separation to avoid conflicts.", kpi: "CAFrPD schedule top-box: 31.6% → 60%+" },
              { action: "Create Personalized Intensity Tracks", rationale: "3 athletes (1 per division) reported 'Too High' intensity. One explicitly requested single daily sessions. Personalized tracks prevent injury.", kpi: "Too High intensity: 5% → 0%" },
            ]},
            { level: "STRATEGIC", color: C.blue, bg: "#EBF8FF", target: "Department-Wide", items: [
              { action: "Replicate WSA FrPD Model for CAFrPD", rationale: "WSA FrPD achieves the 'virtuous cycle' (facilities→schedule→experience, all r>0.5). Document their processes, equipment standards, and scheduling approach as the blueprint.", kpi: "CAFrPD mirrors WSA FrPD within 2 cycles" },
              { action: "Protect & Document Coaching Methodology", rationale: "90% Excellent overall, with 100% in WNAFrPD. This is the department's #1 competitive advantage — must be codified for sustainability.", kpi: "Coaching excellence: maintain ≥85% across all divisions" },
            ]},
            { level: "CONTINUOUS", color: C.green, bg: "#F0FFF4", target: "Survey Design", items: [
              { action: "Expand to 7-Point Scale", rationale: "38.3% perfect scores create ceiling effect. WSA FrPD has 89.7% Excellent — a wider scale would reveal hidden improvement opportunities.", kpi: "Ceiling effect: <20%" },
              { action: "Add Mid-Camp Pulse Surveys", rationale: "Post-camp-only feedback = too late. A 3-question mid-point check enables real-time corrections, especially critical for CAFrPD.", kpi: "Issue detection: pre-camp-end" },
            ]},
          ].map((grp, gi) => (
            <div key={gi} style={{ background: grp.bg, borderRadius: 14, padding: 24, marginBottom: 18, border: `2px solid ${grp.color}15` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span style={{ background: grp.color, color: C.white, padding: "4px 14px", borderRadius: 6, fontSize: 11, fontWeight: 900, letterSpacing: 1 }}>{grp.level}</span>
                <span style={{ fontSize: 12, color: C.g700 }}>Target: <strong>{grp.target}</strong></span>
              </div>
              {grp.items.map((item, ii) => (
                <div key={ii} style={{ background: C.white, borderRadius: 10, padding: 16, marginBottom: ii < grp.items.length - 1 ? 10 : 0, boxShadow: "0 1px 6px rgba(0,0,0,0.03)" }}>
                  <h4 style={{ margin: "0 0 6px", fontSize: 13, fontWeight: 800, color: C.navy }}>{item.action}</h4>
                  <p style={{ margin: "0 0 8px", fontSize: 11, color: C.g700, lineHeight: 1.6 }}>{item.rationale}</p>
                  <span style={{ fontSize: 10, background: C.g100, padding: "4px 10px", borderRadius: 6, color: C.g700 }}>🎯 <strong>KPI:</strong> {item.kpi}</span>
                </div>
              ))}
            </div>
          ))}

          {/* Bottom Line */}
          <div style={{ background: `linear-gradient(135deg, ${C.navy}, ${C.deep})`, borderRadius: 14, padding: 24, color: C.white, textAlign: "center" }}>
            <h3 style={{ margin: "0 0 10px", fontSize: 16, fontWeight: 900 }}>📊 Bottom Line</h3>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.8, opacity: 0.95 }}>
              WR/CR FrPD department runs a <strong>93% positive camp</strong> — but with a hidden <strong>36.6% facility gap</strong> in CAFrPD.
              Replicating WSA FrPD's model (the "virtuous cycle" of facilities → schedule → experience) for CAFrPD is the single highest-ROI investment.
              <br/><strong>One strategic move — equalizing facilities — will cascade across 3 connected dimensions and lift the entire department.</strong>
            </p>
          </div>
        </div>)}

      </div>
    </div>
  );
}
