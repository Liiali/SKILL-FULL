import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, BookOpen, CheckCircle2, MessageSquare, Star, Users, Check, X, AlertCircle, Sparkles, Send } from 'lucide-react';

export default function LecturerPortal({ userName }: { userName: string }) {
  const classrooms = [
    {
      id: 'C1',
      name: 'Advanced English B2 (Room 401)',
      studentsCount: 18,
      attendanceRate: '96.2%',
      students: [
        { name: 'Arthur Pendelton', level: 'B2', status: 'Present', accuracy: '94%' },
        { name: 'Hiro Pendelton', level: 'B2', status: 'Present', accuracy: '92%' },
        { name: 'Elena Rostova', level: 'B2', status: 'Absent', accuracy: '89%' },
        { name: 'Yuki Sato', level: 'B2', status: 'Present', accuracy: '96%' },
      ],
      pendingSubmissions: [
        { id: 101, student: 'Yuki Sato', assignment: 'Phonetic Inversion Recording', date: 'Just now', audioUrl: 'yuki_oral_b2.wav' },
        { id: 102, student: 'Arthur Pendelton', assignment: 'Subjunctive Syntax Writing', date: '2 hours ago', audioUrl: 'arthur_syntax.pdf' },
      ],
    },
    {
      id: 'C2',
      name: 'Business Communication (Room 102)',
      studentsCount: 12,
      attendanceRate: '100%',
      students: [
        { name: 'Marcus Aurel', level: 'C1', status: 'Present', accuracy: '97%' },
        { name: 'Cleopatra Jones', level: 'C1', status: 'Present', accuracy: '95%' },
        { name: 'Lucius Vane', level: 'C1', status: 'Present', accuracy: '91%' },
      ],
      pendingSubmissions: [
        { id: 201, student: 'Marcus Aurel', assignment: 'Pitch Presentation Pitch Deck', date: '1 day ago', audioUrl: 'marcus_deck.pdf' },
      ],
    },
  ];

  const [selectedClassIdx, setSelectedClassIdx] = useState(0);
  const activeClass = classrooms[selectedClassIdx];

  // Grade/Evaluation state
  const [submissions, setSubmissions] = useState(activeClass.pendingSubmissions);
  const [evaluatedId, setEvaluatedId] = useState<number | null>(null);
  const [gradeScore, setGradeScore] = useState('95');
  const [feedbackText, setFeedbackText] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleReviewSubmission = (subId: number) => {
    setEvaluatedId(subId);
    setGradeScore('95');
    setFeedbackText('');
    setSuccessMessage('');
  };

  const submitEvaluation = (e: FormEvent) => {
    e.preventDefault();
    if (!feedbackText) {
      alert('Please fill out custom mentor feedback before registering logs.');
      return;
    }

    setSuccessMessage('Evaluation successfully logged in student CEFR file!');
    setTimeout(() => {
      // Remove evaluated item from active view
      setSubmissions((prev) => prev.filter((s) => s.id !== evaluatedId));
      setEvaluatedId(null);
      setSuccessMessage('');
    }, 1500);
  };

  return (
    <div className="space-y-6" id="lecturer-portal-container">
      {/* Header card with class toggles */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="text-left z-10">
          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest font-mono">Lecturer Dashboard</span>
          <h2 className="text-2xl font-black font-display text-slate-900 mt-0.5">Welcome, Mentor {userName}</h2>
          <p className="text-xs text-slate-500 font-light mt-1">Review active student groups, homework submissions, and attendance logs.</p>
        </div>

        {/* Classroom picker tabs */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto z-10" id="lecturer-class-switcher">
          {classrooms.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedClassIdx(idx);
                setSubmissions(classrooms[idx].pendingSubmissions);
                setEvaluatedId(null);
              }}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                selectedClassIdx === idx
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                  : 'bg-slate-50 border-slate-200 text-slate-650 hover:bg-slate-100'
              }`}
            >
              {c.name.split(' (')[0]}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Classroom Student Grid */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-left">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <h3 className="font-black font-display text-sm text-slate-900">Active Classroom Attendance Grid</h3>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 font-mono uppercase">
                <span>Group Size: {activeClass.studentsCount}</span>
                <span>•</span>
                <span>Attendance: {activeClass.attendanceRate}</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs" id="attendance-table">
                <thead>
                  <tr className="border-b border-slate-100 font-mono text-slate-400 text-[9px] uppercase font-black">
                    <th className="pb-3 font-semibold">Student Name</th>
                    <th className="pb-3 font-semibold">Target Level</th>
                    <th className="pb-3 font-semibold">Recent Accuracy</th>
                    <th className="pb-3 text-right font-semibold">Status Today</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {activeClass.students.map((student, sIdx) => (
                    <tr key={sIdx} className="hover:bg-slate-50/50 transition-all">
                      <td className="py-3.5 font-bold text-slate-800">{student.name}</td>
                      <td className="py-3.5">
                        <span className="px-2 py-0.5 bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold font-mono rounded text-[9px]">
                          {student.level}
                        </span>
                      </td>
                      <td className="py-3.5 font-semibold text-slate-700 font-mono">{student.accuracy}</td>
                      <td className="py-3.5 text-right">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                          student.status === 'Present'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                            : 'bg-red-50 text-red-700 border border-red-100'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${student.status === 'Present' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Homework Submissions Evaluation Widgets */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-left">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <h3 className="font-black font-display text-sm text-slate-900">Evaluate Homework & Oral Logs</h3>
              </div>
              <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-100 font-bold font-mono">
                {submissions.length} PENDING
              </span>
            </div>

            {submissions.length === 0 ? (
              <div className="text-center py-10" id="no-pending-submissions">
                <span className="text-3xl">🎉</span>
                <h4 className="text-sm font-bold text-slate-800 mt-2">All Caught Up!</h4>
                <p className="text-xs text-slate-500 font-light mt-1">Excellent job reviewing and grading current language submissions.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {submissions.map((sub) => {
                  const isBeingReviewed = evaluatedId === sub.id;
                  return (
                    <div
                      key={sub.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        isBeingReviewed ? 'border-indigo-500 bg-indigo-50/20' : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <span className="text-[9px] font-bold text-indigo-600 font-mono uppercase tracking-widest">{sub.assignment}</span>
                          <h4 className="text-xs font-bold text-slate-900 mt-0.5">{sub.student}</h4>
                          <span className="block text-[8px] text-slate-400 font-mono mt-0.5">{sub.date}</span>
                        </div>
                        <button
                          onClick={() => handleReviewSubmission(sub.id)}
                          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px] uppercase rounded-lg shadow-sm transition-all cursor-pointer"
                        >
                          Review
                        </button>
                      </div>

                      {/* Review Area Expansion inside the selected card */}
                      <AnimatePresence>
                        {isBeingReviewed && (
                          <motion.form
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-4 pt-4 border-t border-slate-200 space-y-3 overflow-hidden text-left"
                            onSubmit={submitEvaluation}
                          >
                            {successMessage ? (
                              <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-xl text-[10px] font-bold flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 animate-bounce" />
                                <span>{successMessage}</span>
                              </div>
                            ) : (
                              <>
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="block text-[8px] font-black text-slate-450 uppercase tracking-wider font-mono mb-1">
                                      CEFR Grade (out of 100)
                                    </label>
                                    <input
                                      type="number"
                                      min="0"
                                      max="100"
                                      value={gradeScore}
                                      onChange={(e) => setGradeScore(e.target.value)}
                                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-slate-800"
                                      required
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[8px] font-black text-slate-450 uppercase tracking-wider font-mono mb-1">
                                      Reference URL
                                    </label>
                                    <input
                                      type="text"
                                      disabled
                                      value={sub.audioUrl}
                                      className="w-full px-3 py-1.5 bg-slate-100 border border-slate-250 text-slate-450 rounded-lg text-xs font-mono select-none"
                                    />
                                  </div>
                                </div>

                                <div>
                                  <label className="block text-[8px] font-black text-slate-450 uppercase tracking-wider font-mono mb-1">
                                    Linguistic Feedback / Corrections *
                                  </label>
                                  <textarea
                                    rows={2}
                                    placeholder="Enter grammar corrections, tone alignments, and feedback..."
                                    value={feedbackText}
                                    onChange={(e) => setFeedbackText(e.target.value)}
                                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-slate-800"
                                    required
                                  />
                                </div>

                                <div className="flex gap-2">
                                  <button
                                    type="submit"
                                    className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px] uppercase rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-sm"
                                  >
                                    <Send className="w-3.5 h-3.5" /> Log Score
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setEvaluatedId(null)}
                                    className="px-3 py-2 border border-slate-200 text-slate-600 text-[10px] font-bold rounded-lg uppercase hover:bg-slate-50"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </>
                            )}
                          </motion.form>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
