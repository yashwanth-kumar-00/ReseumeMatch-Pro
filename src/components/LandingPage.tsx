import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Target, Users, BarChart3, CheckCircle, ArrowRight } from "lucide-react";

interface LandingPageProps {
  onViewChange: (view: 'student' | 'recruiter') => void;
}

export const LandingPage = ({ onViewChange }: LandingPageProps) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/30 py-24">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-fade-in">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
              AI-Powered Resume Matching
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Perfect Resume Matches, 
              <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                {" "}Every Time
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              Connect talented students with the right opportunities through intelligent resume analysis, 
              comprehensive skill matching, and actionable feedback.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="btn-hero text-lg px-8 py-6"
                onClick={() => onViewChange('student')}
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Your Resume
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-primary/20 hover:bg-primary/5"
                onClick={() => onViewChange('recruiter')}
              >
                <Users className="w-5 h-5 mr-2" />
                Find Top Talent
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-glow"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary-light/10 rounded-full animate-glow" style={{ animationDelay: '1s' }}></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose ResumeMatch Pro?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Streamline your recruitment process with cutting-edge AI technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-professional card-hover animate-scale-in">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-light rounded-xl flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Smart Matching</CardTitle>
                <CardDescription>
                  AI-powered algorithms analyze resumes and match them with job requirements in seconds
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="card-professional card-hover animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-success to-success/80 rounded-xl flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Detailed Analytics</CardTitle>
                <CardDescription>
                  Get comprehensive relevance scores, skill analysis, and improvement recommendations
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="card-professional card-hover animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-warning to-warning/80 rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Instant Feedback</CardTitle>
                <CardDescription>
                  Real-time processing with immediate results and actionable insights for improvement
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-primary-light/5">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of students and recruiters who have found their perfect match
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="btn-professional text-lg px-8 py-6"
                onClick={() => onViewChange('student')}
              >
                Start as Student
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-primary/20 hover:bg-primary/5"
                onClick={() => onViewChange('recruiter')}
              >
                Start as Recruiter
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};