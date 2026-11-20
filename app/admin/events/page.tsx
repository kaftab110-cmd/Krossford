"use client";

import Link from "next/link";
import { useState } from "react";

const FIXED = [
  { title: "New Year", month: 0, day: 1, religion: "Worldwide", color: "bg-zinc-700" },
  { title: "Valentine Day", month: 1, day: 14, religion: "Worldwide", color: "bg-pink-600" },
  { title: "Women Day", month: 2, day: 8, religion: "Worldwide", color: "bg-pink-600" },
  { title: "Vaisakhi", month: 3, day: 14, religion: "Sikh", color: "bg-orange-500" },
  { title: "Christmas", month: 11, day: 25, religion: "Christian", color: "bg-red-600" },
  { title: "Boxing Day", month: 11, day: 26, religion: "Christian", color: "bg-red-600" },
];

const APPROX = [
  { title: "Ramadan Start", baseYear: 2026, baseMonth: 1, baseDay: 18, religion: "Muslim", color: "bg-green-600" },
  { title: "Eid ul Fitr", baseYear: 2026, baseMonth: 2, baseDay: 20, religion: "Muslim", color: "bg-green-600" },
  { title: "Eid ul Azha", baseYear: 2026, baseMonth: 4, baseDay: 27, religion: "Muslim", color: "bg-green-600" },
  { title: "Holi", baseYear: 2026, baseMonth: 2, baseDay: 4, religion: "Hindu", color: "bg-amber-500" },
  { title: "Raksha Bandhan", baseYear: 2026, baseMonth: 7, baseDay: 28, religion: "Hindu", color: "bg-amber-500" },
  { title: "Diwali", baseYear: 2026, baseMonth: 10, baseDay: 8, religion: "Hindu", color: "bg-amber-500" },
  { title: "Navratri", baseYear: 2026, baseMonth: 9, baseDay: 10, religion: "Hindu", color: "bg-amber-500" },
  { title: "Guru Nanak Jayanti", baseYear: 2026, baseMonth: 10, baseDay: 24, religion: "Sikh", color: "bg-orange-500" },
  { title: "Passover", baseYear: 2026, baseMonth: 3, baseDay: 1, religion: "Jewish", color: "bg-blue-600" },
  { title: "Rosh Hashanah", baseYear: 2026, baseMonth: 8, baseDay: 11, religion: "Jewish", color: "bg-blue-600" },
  { title: "Yom Kippur", baseYear: 2026, baseMonth: 8, baseDay: 20, religion: "Jewish", color: "bg-blue-600" },
  { title: "Hanukkah", baseYear: 2026, baseMonth: 11, baseDay: 4, religion: "Jewish", color: "bg-blue-600" },
  { title: "Easter", baseYear: 2026, baseMonth: 3, baseDay: 5, religion: "Christian", color: "bg-red-600" },
  { title: "Vesak", baseYear: 2026, baseMonth: 4, baseDay: 31, religion: "Buddhist", color: "bg-purple-600" },
  { title: "Chinese New Year", baseYear: 2026, baseMonth: 1, baseDay: 17, religion: "Chinese", color: "bg-red-500" },
];

function getDateForYear(item: any, year: number) {
  if (item.month !== undefined) return new Date(year, item.month, item.day);
  const diff = year - item.baseYear;
  const d = new Date(item.baseYear, item.baseMonth, item.baseDay);
  d.setDate(d.getDate() - diff * 11);
  d.setFullYear(year);
  return d;
}

function getBlackFriday(year: number) {
  let last = new Date(year, 10, 30);
  while (last.getDay() !== 5) last.setDate(last.getDate() - 1);
  return last;
}

function daysLeft(d: Date) { return Math.ceil((d.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)); }

function reminderFor(days: number) {
  if (days < 0) return "Guzar gaya";
  if (days === 0) return "AJ HAI - 0";
  if (days <= 10) return "10 DIN - FINAL STOCK";
  if (days <= 20) return "20 DIN - PACKING";
  if (days <= 30) return "30 DIN - SHOOT";
  if (days <= 45) return "45 DIN - PRODUCTION";
  if (days <= 90) return "90 DIN - STOCK READY KARO";
  return `${days} din baaki`;
}

export default function AdminEvents() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const changeMonth = (dir: number) => {
    let m = viewMonth + dir;
    let y = viewYear;
    if (m < 0) { m = 11; y = y - 1; }
    if (m > 11) { m = 0; y = y + 1; }
    setViewMonth(m); setViewYear(y);
  };

  const allItems: any[] = [
    ...FIXED.map((f) => ({ ...f, date: new Date(viewYear, f.month, f.day), approx: false })),
    ...APPROX.map((a) => ({ ...a, date: getDateForYear(a, viewYear), approx: true })),
    { title: "Black Friday", religion: "Worldwide", color: "bg-zinc-700", date: getBlackFriday(viewYear), approx: false },
  ];

  const monthEvents = allItems.filter((e) => e.date.getMonth() === viewMonth && e.date.getFullYear() === viewYear).sort((a, b) => a.date.getDate() - b.date.getDate());

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: any[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const monthName = new Date(viewYear, viewMonth, 1).toLocaleString("en-US", { month: "long" });

  const upcoming = [...FIXED.map((f) => ({ ...f, date: (() => { let d = new Date(today.getFullYear(), f.month, f.day); if (d.getTime() < today.getTime()) d = new Date(today.getFullYear() + 1, f.month, f.day); return d; })(), approx: false })),
    ...APPROX.map((a) => ({ ...a, date: getDateForYear(a, today.getFullYear()), approx: true })),
  ].map((e: any) => {
    let d = e.date;
    if (d.getTime() < today.getTime()) d = getDateForYear(e, today.getFullYear() + 1);
    return { ...e, date: d };
  }).filter((e) => daysLeft(e.date) >= 0 && daysLeft(e.date) <= 100).sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
          <Link href="/admin" className="bg-zinc-900 border border-zinc-700 px-3 py-1.5 rounded text-xs font-bold hover:border-amber-400">← Back to Dashboard</Link>
          <span className="text-xs text-zinc-400">{monthName} {viewYear}</span>
        </div>

        <h1 className="font-serif tracking-[0.25em] font-bold text-amber-400 uppercase text-center text-2xl">KROSSFORD Worldwide Calendar</h1>

        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded text-xs flex flex-wrap gap-2">
          <span className="bg-green-600 px-2 py-1 rounded">Muslim</span>
          <span className="bg-amber-500 px-2 py-1 rounded text-black">Hindu</span>
          <span className="bg-orange-500 px-2 py-1 rounded">Sikh</span>
          <span className="bg-blue-600 px-2 py-1 rounded">Jewish</span>
          <span className="bg-red-600 px-2 py-1 rounded">Christian</span>
          <span className="bg-purple-600 px-2 py-1 rounded">Buddhist</span>
          <span className="text-zinc-400 ml-2">APPROX = Month/Week fix, Date +/- 2-3 din</span>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded p-4">
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => changeMonth(-1)} className="bg-zinc-950 border border-zinc-800 px-3 py-1 rounded text-xs">{"< Prev"}</button>
            <h2 className="font-bold text-amber-400">{monthName} {viewYear}</h2>
            <button onClick={() => changeMonth(1)} className="bg-zinc-950 border border-zinc-800 px-3 py-1 rounded text-xs">{"Next >"}</button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text- text-zinc-500 mb-1">
            <span>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, idx) => {
              if (!day) return <div key={idx} className="min-h- bg-zinc-950/50 rounded" />;
              const dayEvents = monthEvents.filter((e) => e.date.getDate() === day);
              const isToday = day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
              return (
                <div key={idx} className={`min-h- p-1 rounded border text-left ${isToday ? "border-amber-400 bg-zinc-800" : "border-zinc-800 bg-zinc-950"}`}>
                  <p className={`text- font-bold ${isToday ? "text-amber-400" : "text-zinc-300"}`}>{day}</p>
                  {dayEvents.map((ev: any, j: number) => (
                    <p key={j} className={`text- px-1 py-0.5 rounded mt-1 text-white ${ev.color}`}>{ev.title}</p>
                  ))}
                </div>
              );
            })}
          </div>

          <p className="text- text-zinc-500 mt-3">Is month me {monthEvents.length} events hain — Sab religions ke ek hi calendar me.</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded p-4 space-y-3">
          <h3 className="font-bold text-amber-400 text-sm">AANE WALE REMINDERS — System Khud Bata Raha Hai</h3>
          {upcoming.length === 0 && <p className="text-xs text-zinc-400">Agle 100 din me koi bara event nahi hai.</p>}
          {upcoming.map((ev: any, i: number) => (
            <div key={i} className="flex justify-between gap-3 border-b border-zinc-800 pb-2 text-xs">
              <div>
                <p className="font-bold text-white">{ev.title} <span className="text-zinc-500">— {ev.religion}</span></p>
                <p className="text-zinc-400">{ev.date.toDateString()} {ev.approx ? "• APPROX" : "• FIXED"}</p>
                <p className="text-amber-400 font-bold">{reminderFor(daysLeft(ev.date))}</p>
              </div>
              <p className="text-amber-400 font-bold whitespace-nowrap">{daysLeft(ev.date)} din baaki</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}