import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, CheckCircle, Clock, AlertCircle, TrendingUp, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockApplications = [
  {
    id: 1,
    jobTitle: "Software Engineer Intern",
    company: "TechCorp Inc.",
    status: "Processed",
    relevanceScore: 85,
    fitVerdict: "High",
    submittedDate: "2024-01-15",
    feedback: ["Strong programming skills", "Relevant project experience", "Consider adding cloud certifications"]
  },
  {
    id: 2,
    jobTitle: "Data Analyst",
    company: "DataFlow Solutions",
    status: "Pending",
    relevanceScore: 72,
    fitVerdict: "Medium",
    submittedDate: "2024-01-18",
    feedback: ["Good analytical background", "Add SQL certifications", "Include more visualization projects"]
  },
  {
    id: 3,
    jobTitle: "Frontend Developer",
    company: "WebDesign Pro",
    status: "Processed",
    relevanceScore: 91,
    fitVerdict: "High",
    submittedDate: "2024-01-20",
    feedback: ["Excellent React skills", "Strong portfolio", "Perfect match for role requirements"]
  }
];

export const StudentDashboard = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file.type.includes('pdf') && !file.type.includes('docx')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or DOCX file",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast({
            title: "Resume uploaded successfully!",
            description: "Your resume is being processed and will be ready shortly.",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Processed":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "Pending":
        return <Clock className="w-4 h-4 text-warning" />;
      default:
        return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreBadgeClass = (verdict: string) => {
    switch (verdict) {
      case "High":
        return "status-high";
      case "Medium":
        return "status-medium";
      case "Low":
        return "status-low";
      default:
        return "";
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-foreground mb-2">Student Dashboard</h1>
        <p className="text-muted-foreground">Track your applications and improve your resume with AI-powered insights</p>
      </div>

      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Upload Resume</TabsTrigger>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
          <TabsTrigger value="insights">Improvement Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <Card className="card-professional animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-5 h-5 text-primary" />
                <span>Upload Your Resume</span>
              </CardTitle>
              <CardDescription>
                Upload your resume in PDF or DOCX format to get matched with relevant opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                  dragActive 
                    ? "border-primary bg-primary/5 scale-105" 
                    : "border-border hover:border-primary/50 hover:bg-primary/5"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-light rounded-full flex items-center justify-center">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {dragActive ? "Drop your resume here" : "Drag & drop your resume"}
                    </h3>
                    <p className="text-muted-foreground mb-4">or click to browse files</p>
                    <Button variant="outline" className="mb-2">
                      Choose File
                    </Button>
                    <p className="text-sm text-muted-foreground">Supports PDF and DOCX files up to 10MB</p>
                  </div>
                </div>
              </div>

              {isUploading && (
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading resume...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          <div className="grid gap-6">
            {mockApplications.map((application) => (
              <Card key={application.id} className="card-professional card-hover animate-scale-in">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{application.jobTitle}</CardTitle>
                      <CardDescription className="text-lg">{application.company}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(application.status)}
                      <Badge variant="outline">{application.status}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Relevance Score</h4>
                      <div className={`text-3xl font-bold ${getScoreColor(application.relevanceScore)}`}>
                        {application.relevanceScore}%
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Fit Verdict</h4>
                      <Badge className={getScoreBadgeClass(application.fitVerdict)}>
                        {application.fitVerdict} Suitability
                      </Badge>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Submitted</h4>
                      <p className="text-sm">{application.submittedDate}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">AI Feedback</h4>
                    <div className="space-y-2">
                      {application.feedback.map((feedback, index) => (
                        <div key={index} className="flex items-start space-x-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                          <span>{feedback}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-professional animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span>Skills to Improve</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Cloud Technologies</span>
                      <span className="text-sm text-muted-foreground">60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Machine Learning</span>
                      <span className="text-sm text-muted-foreground">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">DevOps</span>
                      <span className="text-sm text-muted-foreground">35%</span>
                    </div>
                    <Progress value={35} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-professional animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-success" />
                  <span>Recommended Certifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-success/5 rounded-lg border border-success/20">
                    <span className="font-medium">AWS Cloud Practitioner</span>
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                      High Priority
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-warning/5 rounded-lg border border-warning/20">
                    <span className="font-medium">Google Data Analytics</span>
                    <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                      Medium Priority
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border">
                    <span className="font-medium">Docker Certified Associate</span>
                    <Badge variant="outline">
                      Low Priority
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};