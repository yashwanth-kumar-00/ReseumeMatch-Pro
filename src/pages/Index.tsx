import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { LandingPage } from "@/components/LandingPage";
import { StudentDashboard } from "@/components/StudentDashboard";
import { RecruiterDashboard } from "@/components/RecruiterDashboard";

type ViewType = 'landing' | 'student' | 'recruiter';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('landing');

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentView={currentView} onViewChange={handleViewChange} />
      
      <main>
        {currentView === 'landing' && <LandingPage onViewChange={handleViewChange} />}
        {currentView === 'student' && <StudentDashboard />}
        {currentView === 'recruiter' && <RecruiterDashboard />}
      </main>
    </div>
  );
};

export default Index;
