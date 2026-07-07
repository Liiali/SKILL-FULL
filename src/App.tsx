import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CurriculumShowcase from './components/CurriculumShowcase';
import LearningPillars from './components/LearningPillars';
import Testimonials from './components/Testimonials';
import PricingSection from './components/PricingSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import StudentPlacementModal from './components/StudentPlacementModal';
import LoginView from './components/auth/LoginView';
import RegisterView from './components/auth/RegisterView';
import DashboardLayout from './components/dashboard/DashboardLayout';
import { motion, AnimatePresence } from 'motion/react';

function MainAppContent() {
  const { activePage } = useAuth();
  const [isPlacementOpen, setIsPlacementOpen] = useState(false);
  const [selectedLevelId, setSelectedLevelId] = useState('A1');

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Trigger student diagnostics
  const handleStartLearning = () => {
    setIsPlacementOpen(true);
  };

  // On diagnostic test finish
  const handleSelectLevel = (levelId: string) => {
    setSelectedLevelId(levelId);
    // Smooth scroll to curriculum showcase section
    setTimeout(() => {
      scrollToSection('levels');
    }, 100);
  };

  return (
    <AnimatePresence mode="wait">
      {activePage === 'landing' && (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans selection:bg-indigo-500/20 selection:text-indigo-950"
        >
          {/* 1. Navigation Bar */}
          <Navbar
            onStartLearning={handleStartLearning}
            scrollToSection={scrollToSection}
          />

          {/* 2. Hero Section */}
          <Hero
            onStartLearning={handleStartLearning}
            scrollToSection={scrollToSection}
          />

          {/* 3. Curriculum levels showcase (A1 - C2) */}
          <CurriculumShowcase
            onStartLearning={handleStartLearning}
            selectedLevelId={selectedLevelId}
          />

          {/* 4. The 5-Dimension Learning Experience (Pillars) */}
          <LearningPillars />

          {/* 5. Global Social Proof & Reviews (The Trust Engine) */}
          <Testimonials />

          {/* 6. Subscription Plans */}
          <PricingSection
            onStartLearning={handleStartLearning}
          />

          {/* 7. Client Support & Contact Form */}
          <ContactSection />

          {/* 8. Structural Footer */}
          <Footer
            scrollToSection={scrollToSection}
          />

          {/* 9. Student Level Diagnostic Modal */}
          <StudentPlacementModal
            isOpen={isPlacementOpen}
            onClose={() => setIsPlacementOpen(false)}
            onSelectLevel={handleSelectLevel}
          />
        </motion.div>
      )}

      {activePage === 'login' && (
        <motion.div
          key="login"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.25 }}
        >
          <LoginView />
        </motion.div>
      )}

      {activePage === 'register' && (
        <motion.div
          key="register"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.25 }}
        >
          <RegisterView />
        </motion.div>
      )}

      {activePage === 'dashboard' && (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DashboardLayout />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
