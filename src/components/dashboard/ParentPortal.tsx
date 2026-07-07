import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { initialFeedbackLogs, FeedbackLog, initialStudents } from '../../data';
import { Users, Award, LineChart, Plus, MessageSquare, Heart, ShieldAlert } from 'lucide-react';

export default function ParentPortal() {
  const { user } = useAuth();
  const [feedbackLogs, setFeedbackLogs] = useState<FeedbackLog[]>(initialFeedbackLogs);
  const [dbError, setDbError] = useState('');

  // Form state
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [childName, setChildName] = useState('Hiro Pendelton');
  const [category, setCategory] = useState('Daily Study Track');
  const [feedbackText, setFeedbackText] = useState('');

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const res = await fetch('/api/feedback');
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setFeedbackLogs(data);
        }
      }
    } catch (err) {
      console.warn('Real database unreachable, using structured memory state:', err);
    }
  };

  const handleAddFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    setDbError('');
    if (!feedbackText) return;

    const payload = {
      studentName: childName,
      category,
      feedbackText,
      status: 'PENDING',
      authorName: user ? `${user.firstName} ${user.lastName}` : 'Parent',
      authorRole: 'PARENT'
    };

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const newLog = await res.json();
        setFeedbackLogs([newLog, ...feedbackLogs]);
      } else {
        const errData = await res.json();
        if (errData.code === 'DATABASE_UNREACHABLE') {
          setDbError(errData.error);
        }
        const localLog = { id: Math.random().toString(), date: '2026-07-07', ...payload };
        setFeedbackLogs([localLog, ...feedbackLogs]);
      }
    } catch (err) {
      const localLog = { id: Math.random().toString(), date: '2026-07-07', ...payload };
      setFeedbackLogs([localLog, ...feedbackLogs]);
    }

    setFeedbackText('');
    setShowFeedbackModal(false);
  };

  return (
    <div className="space-y-8" id="parent-workspace">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            Supportive Parent Workspace
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Track Children's CEFR Progression
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Monitor learning speeds, examine weekly streaks, and submit feedback logs directly to school mentors.
          </p>
        </div>
        <button
          onClick={() => setShowFeedbackModal(true)}
          className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 cursor-pointer transition-all shrink-0"
          id="btn-parent-feedback"
        >
          <Plus className="w-4 h-4" />
          Send Parent Note
        </button>
      </div>

      {dbError && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 text-amber-700 text-xs" id="parent-db-alert">
          <span className="font-bold">Database Sync Status:</span> {dbError}
        </div>
      )}

      {/* Grid of Children Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="children-roster-grid">
        {initialStudents.slice(0, 3).map((child) => (
          <div key={child.id} className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-800 text-base">{child.name}</h3>
                <span className="text-xs text-slate-400 font-medium">Immersive Track</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-black">
                {child.level} Grade
              </span>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-100 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Streak count</span>
                <span className="font-bold text-rose-500">🔥 {child.streak} Study Days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Course completion</span>
                <span className="font-bold text-slate-800">{child.progress}%</span>
              </div>
            </div>

            {/* Custom mini progress line */}
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full rounded-full transition-all" style={{ width: `${child.progress}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Feedback log timeline */}
      <div className="space-y-6">
        <h2 className="text-lg font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-indigo-500" />
          Feedback & Mentor Communications
        </h2>

        <div className="space-y-4" id="parent-feedback-timeline">
          {feedbackLogs.map((log) => (
            <div key={log.id} className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold">
                    {log.category}
                  </span>
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider pl-2 border-l border-slate-200">
                    Student: {log.studentName}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed pt-1">
                  {log.feedbackText}
                </p>
                <div className="text-[10px] text-slate-400 pt-1">
                  Posted by <span className="font-bold text-slate-500">{log.authorName} ({log.authorRole})</span>
                </div>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full font-bold text-[9px] tracking-wider shrink-0 uppercase border ${
                log.status === 'COMPLETED' || log.status === 'APPROVED'
                  ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                  : 'bg-amber-50 border-amber-100 text-amber-600 animate-pulse'
              }`}>
                {log.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Parent Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-8 w-full max-w-md animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-extrabold text-slate-900 mb-6 tracking-tight">Send Parent Note</h3>
            <form onSubmit={handleAddFeedback} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Select Child</label>
                <select
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 transition-all outline-none"
                >
                  <option value="Hiro Pendelton">Hiro Pendelton</option>
                  <option value="Elena Pendelton">Elena Pendelton</option>
                  <option value="Arthur Pendelton">Arthur Pendelton</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Note Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 transition-all outline-none"
                >
                  <option value="Daily Study Track">Daily Study Track</option>
                  <option value="Speaking Practice">Speaking Practice</option>
                  <option value="General Progress Enquiry">General Progress Enquiry</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Message Description</label>
                <textarea
                  required
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Ask a question or log custom home-learning streak remarks..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 transition-all outline-none min-h-[110px]"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowFeedbackModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold cursor-pointer"
                >
                  Post Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
