import { Button } from "@/components/ui/button";
import { GraduationCap, Building2, Home } from "lucide-react";

interface NavigationProps {
  currentView: 'landing' | 'student' | 'recruiter';
  onViewChange: (view: 'landing' | 'student' | 'recruiter') => void;
}

export const Navigation = ({ currentView, onViewChange }: NavigationProps) => {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-light rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground">ResumeMatch Pro</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant={currentView === 'landing' ? 'default' : 'ghost'}
              onClick={() => onViewChange('landing')}
              className="flex items-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Button>
            
            <Button
              variant={currentView === 'student' ? 'default' : 'ghost'}
              onClick={() => onViewChange('student')}
              className="flex items-center space-x-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student Portal</span>
            </Button>
            
            <Button
              variant={currentView === 'recruiter' ? 'default' : 'ghost'}
              onClick={() => onViewChange('recruiter')}
              className="flex items-center space-x-2"
            >
              <Building2 className="w-4 h-4" />
              <span>Recruiter Dashboard</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};