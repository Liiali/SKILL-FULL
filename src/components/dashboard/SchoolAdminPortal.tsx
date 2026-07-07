import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Award, BookOpen, CheckCircle2, RefreshCw, Users, ShieldCheck, HelpCircle, BarChart2, PlusCircle, ArrowRight, Trash2 } from 'lucide-react';

export default function SchoolAdminPortal({ userName, schoolName }: { userName: string; schoolName?: string }) {
  const [classes, setClasses] = useState([
    { name: 'Advanced Academic Writing (C1)', teacher: 'Dr. Sarah Adams', studentsCount: 18, efficiency: '98%' },
    { name: 'Essential Foundational Conversational (A2)', teacher: 'Prof. Paul Sterling', studentsCount: 14, efficiency: '91%' },
    { name: 'Linguistic Inversions Syntax (B2)', teacher: 'Dr. Sarah Adams', studentsCount: 22, efficiency: '95%' },
    { name: 'Business Phonetic Intonation (B1)', teacher: 'Prof. Paul Sterling', studentsCount: 11, efficiency: '94%' },
  ]);

  const [newClassName, setNewClassName] = useState('');
  const [newTeacher, setNewTeacher] = useState('Dr. Sarah Adams');
  const [newCount, setNewCount] = useState('15');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddClass = (e: FormEvent) => {
    e.preventDefault();
    if (!newClassName) {
      alert('Please provide a class name.');
      return;
    }

    const newClassObj = {
      name: newClassName,
      teacher: newTeacher,
      studentsCount: parseInt(newCount) || 10,
      efficiency: '100%',
    };

    setClasses((prev) => [newClassObj, ...prev]);
    setNewClassName('');
    setShowAddForm(false);
  };

  const handleDeleteClass = (idxToDelete: number) => {
    setClasses((prev) => prev.filter((_, idx) => idx !== idxToDelete));
  };

  return (
    <div className="space-y-6" id="school-admin-portal-container">
      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="text-left z-10">
          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest font-mono">School Administrator Console</span>
          <h2 className="text-2xl font-black font-display text-slate-900 mt-0.5">{schoolName || 'Skill Full Campus Office'}</h2>
          <p className="text-xs text-slate-500 font-light mt-1">Hello, Administrator {userName}. Review metrics, teacher enrollment catalogs, and classroom logs.</p>
        </div>

        <div className="flex gap-2 shrink-0 z-10">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-150 rounded-xl text-[10px] font-bold font-mono uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" /> SECURED PROTOCOL
          </div>
        </div>
      </motion.div>

      {/* Statistics Metric Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4" id="school-admin-metrics">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-left">
          <span className="block text-[8px] font-black text-slate-400 uppercase tracking-wider font-mono">Total Student Enrollment</span>
          <span className="block text-2xl font-black text-slate-900 mt-1 font-mono">842 Students</span>
          <span className="text-[10px] text-emerald-600 font-semibold font-mono mt-1 block">▲ +12% this semester</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-left">
          <span className="block text-[8px] font-black text-slate-400 uppercase tracking-wider font-mono">Active Lecturers</span>
          <span className="block text-2xl font-black text-indigo-600 mt-1 font-mono">24 Mentors</span>
          <span className="text-[10px] text-slate-400 font-medium mt-1 block">Full Faculty Capacity</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-left">
          <span className="block text-[8px] font-black text-slate-400 uppercase tracking-wider font-mono">Class Log registries</span>
          <span className="block text-2xl font-black text-slate-900 mt-1 font-mono">{classes.length} Rooms</span>
          <span className="text-[10px] text-slate-400 font-medium mt-1 block">CEFR-audited rooms</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-left">
          <span className="block text-[8px] font-black text-slate-400 uppercase tracking-wider font-mono">Faculty Efficiency Rating</span>
          <span className="block text-2xl font-black text-emerald-600 mt-1 font-mono">94.8%</span>
          <span className="text-[10px] text-emerald-600 font-semibold font-mono mt-1 block">Top 1% Global rating</span>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Class Management Catalog */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 pb-3 border-b border-slate-100 gap-3">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-indigo-600" />
                <h3 className="font-black font-display text-sm text-slate-900">Interactive School Classroom Logs</h3>
              </div>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px] uppercase rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <PlusCircle className="w-4 h-4" /> Add Classroom
              </button>
            </div>

            {/* Quick Add Form Expanded inside card */}
            {showAddForm && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-4 bg-slate-50 border border-slate-200 rounded-2xl mb-5 space-y-3"
                onSubmit={handleAddClass}
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[8px] font-black text-slate-400 uppercase tracking-wider font-mono mb-1">Class Title (e.g. TOEFL prep)</label>
                    <input
                      type="text"
                      value={newClassName}
                      onChange={(e) => setNewClassName(e.target.value)}
                      placeholder="e.g. Conversational A1"
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] font-black text-slate-400 uppercase tracking-wider font-mono mb-1">Academic Mentor</label>
                    <select
                      value={newTeacher}
                      onChange={(e) => setNewTeacher(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold cursor-pointer focus:outline-none"
                    >
                      <option value="Dr. Sarah Adams">Dr. Sarah Adams</option>
                      <option value="Prof. Paul Sterling">Prof. Paul Sterling</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[8px] font-black text-slate-400 uppercase tracking-wider font-mono mb-1">Target Seat limit</label>
                    <input
                      type="number"
                      value={newCount}
                      onChange={(e) => setNewCount(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-end pt-1">
                  <button type="submit" className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px] uppercase rounded-lg shadow-sm">
                    Confirm Registry
                  </button>
                  <button type="button" onClick={() => setShowAddForm(false)} className="px-3 py-1.5 border border-slate-200 text-slate-600 font-semibold text-[10px] uppercase rounded-lg hover:bg-slate-100">
                    Cancel
                  </button>
                </div>
              </motion.form>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs" id="school-classes-table">
                <thead>
                  <tr className="border-b border-slate-100 font-mono text-slate-400 text-[9px] uppercase font-black">
                    <th className="pb-3 font-semibold">Classroom Name</th>
                    <th className="pb-3 font-semibold">Faculty Lead</th>
                    <th className="pb-3 font-semibold">Active Seats</th>
                    <th className="pb-3 font-semibold">Syllabus Progress</th>
                    <th className="pb-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {classes.map((cls, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-all">
                      <td className="py-3.5 font-bold text-slate-800">{cls.name}</td>
                      <td className="py-3.5 font-semibold text-slate-650">{cls.teacher}</td>
                      <td className="py-3.5 font-mono text-slate-700">{cls.studentsCount} Students</td>
                      <td className="py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-600 rounded-full" style={{ width: cls.efficiency }} />
                          </div>
                          <span className="font-mono text-[10px] font-bold text-slate-600">{cls.efficiency}</span>
                        </div>
                      </td>
                      <td className="py-3.5 text-right">
                        <button
                          onClick={() => handleDeleteClass(idx)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Classroom Log"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Administration Bulletins */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-left">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <h3 className="font-black font-display text-sm text-slate-900">Linguistic Directives</h3>
            </div>

            <div className="space-y-4">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                <span className="text-[8px] font-bold text-indigo-600 font-mono uppercase">CEFR Compliance audit</span>
                <h4 className="text-xs font-bold text-slate-800 mt-0.5">Linguistic Intonation updates</h4>
                <p className="text-[11px] text-slate-500 font-light mt-1">Please notify all lecturers that the new phonetic oral standards have been aligned to the July 2026 guidelines.</p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                <span className="text-[8px] font-bold text-emerald-600 font-mono uppercase">Enrollment targets met</span>
                <h4 className="text-xs font-bold text-slate-800 mt-0.5">C1 Student quotas completed</h4>
                <p className="text-[11px] text-slate-500 font-light mt-1">Our secondary campus registries have registered over 140 students in advanced C1 courses, a new academic benchmark.</p>
              </div>

              <button className="w-full py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer">
                Issue Faculty Memo
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
