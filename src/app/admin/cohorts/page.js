"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  IoAdd, IoClose, IoPencil, IoTrash, IoCalendar, IoTime,
  IoPeople, IoCheckmarkCircle, IoAlertCircle, IoEllipseOutline,
  IoBanOutline, IoReload, IoChevronDown, IoLogOut,
} from "react-icons/io5";
import { INDIVIDUAL_MODULES, fmt } from "@/lib/packages";
import cohort from "@/data/cohorts.json"
import Image from 'next/image';

/* ─── helpers ─── */
const fmtDate   = (iso) => iso ? new Date(iso).toLocaleDateString("en-NG", { year:"numeric", month:"short", day:"numeric" }) : "—";
const fmtInput  = (iso) => iso ? new Date(iso).toISOString().split("T")[0] : "";
const daysUntil = (iso) => iso ? Math.ceil((new Date(iso) - new Date()) / 86400000) : null;

const STATUS_META = {
  upcoming:  { label:"Upcoming",  color:"text-blue-400",  bg:"bg-blue-400/10",  border:"border-blue-400/30",  icon:<IoEllipseOutline /> },
  active:    { label:"Active",    color:"text-green-400", bg:"bg-green-400/10", border:"border-green-400/30", icon:<IoCheckmarkCircle /> },
  completed: { label:"Completed", color:"text-gray-400",  bg:"bg-gray-400/10",  border:"border-gray-400/30",  icon:<IoCheckmarkCircle /> },
  cancelled: { label:"Cancelled", color:"text-red-400",   bg:"bg-red-400/10",   border:"border-red-400/30",   icon:<IoBanOutline /> },
};

/* Package options — IDs match lib/packages.js */
const PKG_OPTIONS = [
  { id:"fullstack",    label:"Fullstack Bundle" },
  ...INDIVIDUAL_MODULES.map((m) => ({ id: m.id, label: m.name })),
];

const EMPTY_FORM = {
  name:"", startDate:"", endDate:"", enrollmentDeadline:"",
  maxSeats:30, status:"upcoming", classFormat:"hybrid",
  packageIds:[], notes:"", isPublic:true,
};

/* ─── StatusBadge ─── */
function StatusBadge({ status }) {
  const m = STATUS_META[status] ?? STATUS_META.upcoming;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${m.color} ${m.bg} ${m.border}`}>
      <span className="text-sm">{m.icon}</span>{m.label}
    </span>
  );
}

/* ─── Seat fill bar ─── */
function SeatBar({ enrolled, max }) {
  const pct   = max > 0 ? Math.min(100, (enrolled / max) * 100) : 0;
  const color = pct >= 90 ? "bg-red-400" : pct >= 70 ? "bg-amber-400" : "bg-green-400";
  return (
    <div>
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span>{enrolled} enrolled</span>
        <span>{max - enrolled} left</span>
      </div>
      <div className="h-1.5 rounded-full bg-academy-primary/20 overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width:`${pct}%` }} />
      </div>
    </div>
  );
}

/* ─── Timeline strip ─── */
function Timeline({ cohort }) {
  const now   = new Date();
  const start = new Date(cohort.startDate);
  const end   = new Date(cohort.endDate);
  const pct   = end > start ? Math.max(0, Math.min(100, ((now - start) / (end - start)) * 100)) : 0;
  return (
    <div className="mt-3">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>{fmtDate(cohort.startDate)}</span>
        <span>{fmtDate(cohort.endDate)}</span>
      </div>
      <div className="relative h-2 rounded-full bg-academy-primary/20 overflow-hidden">
        <div className="h-full rounded-full bg-academy-yellow/60 transition-all" style={{ width:`${pct}%` }} />
        {pct > 0 && pct < 100 && (
          <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-academy-yellow border-2 border-academy-dark shadow"
               style={{ left:`calc(${pct}% - 6px)` }} />
        )}
      </div>
    </div>
  );
}

/* ─── Create / Edit modal ─── */
function CohortModal({ initial, onSave, onClose }) {
  const [form,   setForm]   = useState(initial ?? EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [err,    setErr]    = useState("");

  const set        = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const togglePkg  = (id)   => set("packageIds",
    form.packageIds.includes(id) ? form.packageIds.filter((p) => p !== id) : [...form.packageIds, id]);

  const handleSave = async () => {
    if (!form.name || !form.startDate || !form.endDate || !form.enrollmentDeadline) {
      setErr("Please fill in all required fields."); return;
    }
    setSaving(true); setErr("");
    try   { await onSave(form); onClose(); }
    catch (e) { setErr(e.message); }
    finally   { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-academy-deep border border-academy-primary/30 rounded-2xl shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-academy-primary/20 sticky top-0 bg-academy-deep z-10">
          <h2 className="text-xl font-bold text-white">{initial ? "Edit Cohort" : "New Cohort"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors"><IoClose size={22} /></button>
        </div>

        <div className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Cohort Name *</label>
            <input value={form.name} onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Cohort 3 — May 2026"
              className="w-full bg-academy-dark border border-academy-primary/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-academy-yellow transition-colors" />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[["startDate","Start Date *"],["endDate","End Date *"],["enrollmentDeadline","Enrollment Deadline *"]].map(([k,lbl]) => (
              <div key={k}>
                <label className="block text-gray-300 text-sm font-medium mb-2">{lbl}</label>
                <input type="date" value={fmtInput(form[k])} onChange={(e) => set(k, e.target.value)}
                  className="w-full bg-academy-dark border border-academy-primary/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-academy-yellow transition-colors" />
              </div>
            ))}
          </div>

          {/* Seats / Status / Format */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Max Seats</label>
              <input type="number" min={1} value={form.maxSeats} onChange={(e) => set("maxSeats", Number(e.target.value))}
                className="w-full bg-academy-dark border border-academy-primary/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-academy-yellow transition-colors" />
            </div>
            {[["status","Status",Object.entries(STATUS_META).map(([k,v])=>({k,v:v.label}))],
              ["classFormat","Format",[{k:"online",v:"Online"},{k:"offline",v:"Offline"},{k:"hybrid",v:"Hybrid"}]]
            ].map(([field,lbl,opts]) => (
              <div key={field}>
                <label className="block text-gray-300 text-sm font-medium mb-2">{lbl}</label>
                <div className="relative">
                  <select value={form[field]} onChange={(e) => set(field, e.target.value)}
                    className="w-full appearance-none bg-academy-dark border border-academy-primary/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-academy-yellow transition-colors pr-10">
                    {opts.map(({k,v}) => <option key={k} value={k}>{v}</option>)}
                  </select>
                  <IoChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>

          {/* Packages */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-3">
              Courses in this Cohort <span className="text-gray-500 font-normal">(leave empty = all)</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PKG_OPTIONS.map((pkg) => {
                const on = form.packageIds.includes(pkg.id);
                return (
                  <button key={pkg.id} type="button" onClick={() => togglePkg(pkg.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs transition-all ${on
                      ? "border-academy-yellow bg-academy-yellow/10 text-academy-yellow"
                      : "border-academy-primary/20 bg-academy-dark text-gray-400 hover:border-academy-primary/50"}`}>
                    {on ? <IoCheckmarkCircle /> : <IoEllipseOutline />} {pkg.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Notes</label>
            <textarea value={form.notes} onChange={(e) => set("notes", e.target.value)}
              rows={3} placeholder="Internal notes…"
              className="w-full bg-academy-dark border border-academy-primary/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-academy-yellow transition-colors resize-none" />
          </div>

          {/* Public toggle */}
          <label className="flex items-center gap-3 cursor-pointer">
            <div onClick={() => set("isPublic", !form.isPublic)}
              className={`relative w-11 h-6 rounded-full transition-colors ${form.isPublic ? "bg-academy-yellow" : "bg-academy-primary/30"}`}>
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${form.isPublic ? "translate-x-5" : "translate-x-0"}`} />
            </div>
            <span className="text-gray-300 text-sm">Visible on public site</span>
          </label>

          {err && <p className="text-red-400 text-sm">{err}</p>}

          <div className="flex gap-3 pt-2">
            <button onClick={onClose}    className="btn-secondary flex-1 py-3">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 py-3 disabled:opacity-50">
              {saving ? "Saving…" : initial ? "Save Changes" : "Create Cohort"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Main page
═══════════════════════════════════════════ */
export default function AdminCohorts() {
  const [cohorts,  setCohorts]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [modal,    setModal]    = useState(null);
  const [filter,   setFilter]   = useState("all");
  const [deleting, setDeleting] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res  = await fetch("/api/cohorts");
    const json = await res.json();
    if (json.success) setCohorts(json.data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async (form) => {
    const res  = await fetch("/api/cohorts", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) });
    const json = await res.json();
    if (!json.success) throw new Error(json.error);
    await load();
  };

  const handleEdit = async (form) => {
    const res  = await fetch(`/api/cohorts/${form._id}`, { method:"PATCH", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) });
    const json = await res.json();
    if (!json.success) throw new Error(json.error);
    await load();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this cohort? This cannot be undone.")) return;
    setDeleting(id);
    await fetch(`/api/cohorts/${id}`, { method:"DELETE" });
    await load();
    setDeleting(null);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method:"POST" });
    window.location.href = "/admin/login";
  };

  const stats = {
    total:    cohorts.length,
    active:   cohorts.filter((c) => c.status === "active").length,
    upcoming: cohorts.filter((c) => c.status === "upcoming").length,
    enrolled: cohorts.reduce((s, c) => s + (c.enrolledCount ?? 0), 0),
  };

  const filtered = filter === "all" ? cohorts : cohorts.filter((c) => c.status === filter);

  return (
    <main className="min-h-screen bg-academy-dark">
      {/* Top bar */}
      <header className="border-b border-academy-primary/20 bg-academy-deep/60 backdrop-blur sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-academy-yellow font-bold text-lg tracking-tight">
              <Image
                            src={"/logo-academy.png"}
                            alt="Academy Logo"
                            width={150}
                            height={150}
                          />
                          
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-2xl font-bold text-academy-yellow mt-2">Academy</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={load} className="text-gray-400 hover:text-white p-2 transition-colors" title="Refresh">
              <IoReload size={18} />
            </button>
            <button onClick={handleLogout} className="flex items-center gap-1.5 text-gray-400 hover:text-red-400 text-sm transition-colors">
              <IoLogOut /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Cohort Management</h1>
            <p className="text-gray-400 text-sm mt-1">Track enrollment windows, start dates, and class schedules</p>
          </div>
          <button onClick={() => setModal("create")} className="btn-primary flex items-center gap-2 px-5 py-3">
            <IoAdd size={20} /> New Cohort
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label:"Total Cohorts",  value:stats.total,    color:"text-white",           icon:<IoCalendar /> },
            { label:"Active Now",     value:stats.active,   color:"text-green-400",       icon:<IoCheckmarkCircle /> },
            { label:"Upcoming",       value:stats.upcoming, color:"text-blue-400",        icon:<IoTime /> },
            { label:"Total Enrolled", value:stats.enrolled, color:"text-academy-yellow",  icon:<IoPeople /> },
          ].map(({ label, value, color, icon }) => (
            <div key={label} className="bg-academy-deep/50 border border-academy-primary/20 rounded-xl p-5">
              <div className={`text-2xl mb-2 ${color}`}>{icon}</div>
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
              <p className="text-gray-500 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap">
          {["all","upcoming","active","completed","cancelled"].map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-4 py-1.5 rounded-full text-sm transition-colors capitalize ${
                filter === s
                  ? "bg-academy-yellow text-academy-dark font-semibold"
                  : "bg-academy-deep/40 border border-academy-primary/20 text-gray-400 hover:text-white"}`}>
              {s}
            </button>
          ))}
        </div>

        {/* Cohort list */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-academy-yellow/30 border-t-academy-yellow rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <IoCalendar className="text-gray-600 text-5xl mx-auto mb-4" />
            <p className="text-gray-500">No cohorts found. Create your first one.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((cohort) => {
              const dStart  = daysUntil(cohort.startDate);
              const dEnd    = daysUntil(cohort.endDate);
              const dEnroll = daysUntil(cohort.enrollmentDeadline);
              return (
                <div key={cohort._id} className="bg-academy-deep/40 border border-academy-primary/20 rounded-2xl p-6 hover:border-academy-primary/40 transition-all">
                  {/* Top row */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-white font-semibold text-lg capitalize">{cohort.name}</h3>
                        <StatusBadge status={cohort.status} />
                        {!cohort.isPublic && (
                          <span className="text-xs text-gray-500 bg-gray-500/10 border border-gray-500/20 px-2 py-0.5 rounded-full">Hidden</span>
                        )}
                      </div>
                      <p className="text-gray-500 text-xs capitalize">
                        {cohort.classFormat} ·{" "}
                        {cohort.packageIds?.length > 0
                          ? cohort.packageIds.map((id) => PKG_OPTIONS.find((p) => p.id === id)?.label ?? id).join(", ")
                          : "All courses"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button onClick={() => setModal(cohort)}
                        className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm px-3 py-1.5 rounded-lg border border-academy-primary/20 hover:border-academy-primary/50 transition-all">
                        <IoPencil size={14} /> Edit
                      </button>
                      <button onClick={() => handleDelete(cohort.id)} disabled={deleting === cohort._id}
                        className="flex items-center gap-1.5 text-red-400/70 hover:text-red-400 text-sm px-3 py-1.5 rounded-lg border border-red-500/10 hover:border-red-500/30 transition-all disabled:opacity-40">
                        {deleting === cohort._id ? <IoReload className="animate-spin" size={14} /> : <IoTrash size={14} />} Delete
                      </button>
                    </div>
                  </div>

                  <Timeline cohort={cohort} />

                  {/* Info grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 pt-5 border-t border-academy-primary/10">
                    <div>
                      <p className="text-gray-500 text-xs">Start Date</p>
                      <p className="text-white text-sm font-medium mt-0.5">{fmtDate(cohort.startDate)}</p>
                      {cohort.status === "upcoming" && dStart > 0 && (
                        <p className="text-blue-400 text-xs mt-0.5">in {dStart} days</p>
                      )}
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">End Date</p>
                      <p className="text-white text-sm font-medium mt-0.5">{fmtDate(cohort.endDate)}</p>
                      {cohort.status === "active" && dEnd > 0 && (
                        <p className="text-amber-400 text-xs mt-0.5">{dEnd} days left</p>
                      )}
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Enrollment Closes</p>
                      <p className="text-white text-sm font-medium mt-0.5">{fmtDate(cohort.enrollmentDeadline)}</p>
                      {dEnroll > 0 && (
                        <p className={`text-xs mt-0.5 ${dEnroll <= 7 ? "text-red-400" : "text-gray-400"}`}>
                          {dEnroll} days to deadline
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Seats</p>
                      <SeatBar enrolled={cohort.enrolledCount ?? 0} max={cohort.maxSeats ?? 30} />
                    </div>
                  </div>

                  {cohort.notes && (
                    <p className="mt-4 text-gray-500 text-xs border-t border-academy-primary/10 pt-4 flex items-start gap-1.5">
                      <IoAlertCircle className="text-gray-600 flex-shrink-0 mt-0.5" /> {cohort.notes}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {modal && (
        <CohortModal
          initial={modal === "create" ? null : modal}
          onSave={modal === "create" ? handleCreate : handleEdit}
          onClose={() => setModal(null)}
        />
      )}
    </main>
  );
}