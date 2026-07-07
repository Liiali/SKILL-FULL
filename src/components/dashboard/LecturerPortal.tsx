import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { initialClassrooms, initialFeedbackLogs, Classroom, FeedbackLog, initialStudents } from '../../data';
import { Plus, Trash2, CheckCircle, GraduationCap, Users, Calendar, Award, MessageSquare } from 'lucide-react';

export default function LecturerPortal() {
  const { user } = useAuth();
  const [classrooms, setClassrooms] = useState<Classroom[]>(initialClassrooms);
  const [feedbackLogs, setFeedbackLogs] = useState<FeedbackLog[]>(initialFeedbackLogs);
  const [dbError, setDbError] = useState('');

  // Form states
  const [showClassModal, setShowClassModal] = useState(false);
  const [className, setClassName] = useState('');
  const [classRoom, setClassRoom] = useState('');
  const [classCount, setClassCount] = useState('15');

  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [category, setCategory] = useState('Speaking Practice');
  const [feedbackText, setFeedbackText] = useState('');

  // Fetch real data on mount
  useEffect(() => {
    fetchClassrooms();
    fetchFeedback();
  }, []);

  const fetchClassrooms = async () => {
    try {
      const res = await fetch('/api/classrooms');
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setClassrooms(data);
        }
      }
    } catch (err) {
      console.warn('Real database unreachable, using structured memory state:', err);
    }
  };

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

  const handleAddClassroom = async (e: React.FormEvent) => {
    e.preventDefault();
    setDbError('');
    if (!className || !classRoom) return;

    const payload = {
      name: className,
      room: classRoom,
      studentCount: parseInt(classCount) || 0,
      averageScore: 85.0
    };

    try {
      const res = await fetch('/api/classrooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const newRoom = await res.json();
        setClassrooms([newRoom, ...classrooms]);
      } else {
        const errData = await res.json();
        if (errData.code === 'DATABASE_UNREACHABLE') {
          setDbError(errData.error);
        }
        // Fallback to local state if database connection is blocked
        const localRoom = { id: Math.random().toString(), ...payload };
        setClassrooms([localRoom, ...classrooms]);
      }
    } catch (err) {
      // Offline fallback
      const localRoom = { id: Math.random().toString(), ...payload };
      setClassrooms([localRoom, ...classrooms]);
    }

    setClassName('');
    setClassRoom('');
    setShowClassModal(false);
  };

  const handleAddFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    setDbError('');
    if (!studentName || !feedbackText) return;

    const payload = {
      studentName,
      category,
      feedbackText,
      status: 'APPROVED',
      authorName: user ? `${user.firstName} ${user.lastName}` : 'Lecturer',
      authorRole: 'LECTURER'
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

    setStudentName('');
    setFeedbackText('');
    setShowFeedbackModal(false);
  };

  const handleDeleteFeedback = async (id: string) => {
    try {
      const res = await fetch(`/api/feedback/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setFeedbackLogs(feedbackLogs.filter(log => log.id !== id));
      } else {
        setFeedbackLogs(feedbackLogs.filter(log => log.id !== id));
      }
    } catch (err) {
      setFeedbackLogs(feedbackLogs.filter(log => log.id !== id));
    }
  };

  return (
    <div className="space-y-8" id="lecturer-workspace">
      {/* Header banner */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider">
            Lecturer Portal
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Classroom Progress & Speech Tracker
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Review language learning metrics, manage assignments, and log performance trajectories.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowClassModal(true)}
            className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 cursor-pointer transition-all"
            id="btn-add-class"
          >
            <Plus className="w-4 h-4" />
            Add Classroom
          </button>
          <button
            onClick={() => setShowFeedbackModal(true)}
            className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 cursor-pointer transition-all"
            id="btn-log-evaluation"
          >
            <Plus className="w-4 h-4" />
            Log Evaluation
          </button>
        </div>
      </div>

      {dbError && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 text-amber-700 text-xs" id="db-alert">
          <span className="font-bold">Database Status:</span> {dbError}
        </div>
      )}

      {/* Grid of Classrooms */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="classroom-grid">
        {classrooms.map((room) => (
          <div key={room.id} className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 hover:shadow-md transition-all">
            <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 w-12 h-12 flex items-center justify-center mb-4">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-800 text-base tracking-tight">{room.name}</h3>
            <span className="text-xs font-medium text-slate-400 block mt-1">{room.room}</span>

            <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-100">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Students</span>
                <span className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5 mt-0.5">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  {room.studentCount}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Avg Score</span>
                <span className="text-sm font-extrabold text-indigo-600 flex items-center gap-1.5 mt-0.5">
                  <Award className="w-3.5 h-3.5 text-indigo-500" />
                  {room.averageScore}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Speech Evaluations / Feedback logs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-500" />
              Recent Trajectory Logs
            </h2>
            <span className="text-xs text-slate-400 font-medium">Updated live</span>
          </div>

          <div className="space-y-4" id="feedback-logs-list">
            {feedbackLogs.map((log) => (
              <div key={log.id} className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                      {log.category}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {log.createdAt ? new Date(log.createdAt).toLocaleDateString() : 'Today'}
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-800 tracking-tight">
                    {log.studentName}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {log.feedbackText}
                  </p>
                  <div className="text-[11px] text-slate-400">
                    Logged by <span className="font-bold text-slate-600">{log.authorName || 'Lecturer'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    {log.status}
                  </span>
                  <button
                    onClick={() => handleDeleteFeedback(log.id)}
                    className="p-2 rounded-xl text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                    title="Delete Log"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar roster */}
        <div className="space-y-6">
          <h2 className="text-lg font-extrabold text-slate-800 tracking-tight">
            Immersive Students Roster
          </h2>
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-4">
            {initialStudents.map((st) => (
              <div key={st.id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-all">
                <div>
                  <span className="font-extrabold text-sm text-slate-800 block">{st.name}</span>
                  <span className="text-xs text-slate-400 block">{st.email}</span>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-bold">
                    {st.level}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-1">🔥 {st.streak} Day Streak</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Classroom Modal */}
      {showClassModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-8 w-full max-w-md animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-extrabold text-slate-900 mb-6 tracking-tight">Create Classroom</h3>
            <form onSubmit={handleAddClassroom} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Classroom Name</label>
                <input
                  type="text"
                  required
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="Advanced English B2"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Room Number</label>
                <input
                  type="text"
                  required
                  value={classRoom}
                  onChange={(e) => setClassRoom(e.target.value)}
                  placeholder="Room 101"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Student Count</label>
                <input
                  type="number"
                  value={classCount}
                  onChange={(e) => setClassCount(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 transition-all outline-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowClassModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold cursor-pointer"
                >
                  Save Classroom
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Evaluation Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-8 w-full max-w-md animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-extrabold text-slate-900 mb-6 tracking-tight">Log Student Evaluation</h3>
            <form onSubmit={handleAddFeedback} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Student Name</label>
                <select
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 transition-all outline-none"
                >
                  <option value="">-- Choose Student --</option>
                  {initialStudents.map((st) => (
                    <option key={st.id} value={st.name}>{st.name} ({st.level})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Evaluation Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 transition-all outline-none"
                >
                  <option value="Speaking Practice">Speaking Practice</option>
                  <option value="Vocabulary Expansion">Vocabulary Expansion</option>
                  <option value="Daily Study Track">Daily Study Track</option>
                  <option value="Listening Aptitude">Listening Aptitude</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Feedback Description</label>
                <textarea
                  required
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Excellent fluency during discussions..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 transition-all outline-none min-h-[100px]"
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
                  Submit Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
