import { useState } from 'react';
import { initialClassrooms, initialStudents, Classroom } from '../../data';
import { Award, BookOpen, Plus, TrendingUp, Users, Settings, ShieldCheck } from 'lucide-react';

export default function SchoolAdminPortal() {
  const [classrooms, setClassrooms] = useState<Classroom[]>(initialClassrooms);
  const [activeCurriculumTab, setActiveCurriculumTab] = useState<'CEFR' | 'STAFF' | 'REPORTS'>('CEFR');

  const cefrTracks = [
    { code: 'A1-A2', title: 'CEFR Foundation', desc: 'Basic vocabulary, simple phrases, and sound recognition tracks', courses: 4, activeStudents: 55 },
    { code: 'B1-B2', title: 'Immersive Intermediate', desc: 'Fluency drills, business speaking scenarios, and intermediate listening tracks', courses: 8, activeStudents: 120 },
    { code: 'C1-C2', title: 'Mastery & Executive Speech', desc: 'Advanced rhetoric, native expression, idiomatic registers', courses: 6, activeStudents: 42 },
  ];

  return (
    <div className="space-y-8" id="school-admin-workspace">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit">
            <ShieldCheck className="w-3.5 h-3.5" />
            School Admin Workspace
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Academic Operations & Curriculums
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Configure learning pathways, analyze grade distributions, and evaluate institutional benchmarks.
          </p>
        </div>
      </div>

      {/* Ratios Metrics Rows */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="admin-kpis">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 flex items-center gap-5 shadow-sm">
          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Active Students</span>
            <h3 className="text-2xl font-black text-slate-800 mt-0.5">{initialStudents.length + 42}</h3>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 flex items-center gap-5 shadow-sm">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Managed Classrooms</span>
            <h3 className="text-2xl font-black text-slate-800 mt-0.5">{classrooms.length}</h3>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 flex items-center gap-5 shadow-sm">
          <div className="p-4 rounded-2xl bg-violet-50 border border-violet-100 text-violet-600">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Average CEFR Score</span>
            <h3 className="text-2xl font-black text-violet-600 mt-0.5">86.4%</h3>
          </div>
        </div>
      </div>

      {/* Main layout tabs */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden" id="curriculum-tabs-container">
        <div className="border-b border-slate-100 px-6 py-4 bg-slate-50/50 flex items-center justify-between">
          <div className="flex gap-4">
            {(['CEFR', 'STAFF', 'REPORTS'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveCurriculumTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCurriculumTab === tab
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab === 'CEFR' ? 'CEFR Curriculums' : tab === 'STAFF' ? 'Lecturer Profiles' : 'Performance Audits'}
              </button>
            ))}
          </div>
          <button className="p-2 rounded-xl text-slate-400 hover:text-slate-600 cursor-pointer">
            <Settings className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 md:p-8">
          {activeCurriculumTab === 'CEFR' && (
            <div className="space-y-6" id="cefr-curriculum-list">
              <h3 className="font-extrabold text-lg text-slate-800 tracking-tight">Standard English Pathways</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cefrTracks.map((track) => (
                  <div key={track.code} className="border border-slate-200/70 rounded-2xl p-6 hover:border-slate-300 transition-all">
                    <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-bold">
                      {track.code}
                    </span>
                    <h4 className="font-bold text-slate-800 text-base mt-3">{track.title}</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">{track.desc}</p>
                    <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-100 text-xs">
                      <div>
                        <span className="text-slate-400 font-medium">Courses</span>
                        <span className="font-bold text-slate-800 block mt-0.5">{track.courses} Units</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-medium">Enrolled</span>
                        <span className="font-bold text-indigo-600 block mt-0.5">{track.activeStudents} Active</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeCurriculumTab === 'STAFF' && (
            <div className="space-y-4" id="staff-roster-list">
              <h3 className="font-extrabold text-lg text-slate-800 tracking-tight">Registered Academic Lecturers</h3>
              <div className="border border-slate-200/60 rounded-2xl overflow-hidden divide-y divide-slate-100">
                {[
                  { name: 'Dr. Sarah Jameson', dept: 'English Rhetoric', email: 'sarah.j@school.edu', status: 'ACTIVE' },
                  { name: 'Prof. Lucas Vance', dept: 'CEFR Assessments', email: 'l.vance@school.edu', status: 'ACTIVE' },
                  { name: 'Emily Thorne', dept: 'Phonetics & Accent', email: 'e.thorne@school.edu', status: 'ON_LEAVE' },
                ].map((lecturer) => (
                  <div key={lecturer.email} className="p-4 sm:flex items-center justify-between gap-4 bg-white hover:bg-slate-50/50 transition-all">
                    <div>
                      <span className="font-bold text-slate-800 text-sm block">{lecturer.name}</span>
                      <span className="text-xs text-slate-400 block">{lecturer.dept}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 sm:mt-0 text-xs">
                      <span className="text-slate-500">{lecturer.email}</span>
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        lecturer.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {lecturer.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeCurriculumTab === 'REPORTS' && (
            <div className="space-y-4" id="performance-audits">
              <h3 className="font-extrabold text-lg text-slate-800 tracking-tight">Institutional Audit Logs</h3>
              <div className="p-6 rounded-2xl border border-indigo-100 bg-indigo-50/20 text-slate-600 text-xs space-y-2">
                <p className="flex items-center gap-2 text-indigo-900 font-bold">
                  <TrendingUp className="w-4 h-4 text-indigo-600" />
                  Grade Average Increased By +4.2% This Quarter
                </p>
                <p className="leading-relaxed text-slate-500">
                  Student speaking streak averages have expanded to 14 consecutive study days. Institutional engagement rates are exceptionally strong in Intermediate level classrooms.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
