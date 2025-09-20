import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Upload, 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  MoreHorizontal,
  TrendingUp,
  Users,
  Target,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockJobDescriptions = [
  {
    id: 1,
    title: "Senior Software Engineer",
    department: "Engineering",
    applicants: 24,
    status: "Active",
    uploadDate: "2024-01-20"
  },
  {
    id: 2,
    title: "Data Scientist",
    department: "Analytics",
    applicants: 18,
    status: "Active",
    uploadDate: "2024-01-18"
  },
  {
    id: 3,
    title: "Frontend Developer",
    department: "Engineering",
    applicants: 31,
    status: "Paused",
    uploadDate: "2024-01-15"
  }
];

const mockCandidates = [
  {
    id: 1,
    name: "Alex Johnson",
    jobTitle: "Senior Software Engineer",
    relevanceScore: 92,
    fitVerdict: "High",
    missingSkills: ["Kubernetes", "GraphQL"],
    submittedDate: "2024-01-22",
    university: "MIT",
    gpa: "3.8"
  },
  {
    id: 2,
    name: "Sarah Chen",
    jobTitle: "Senior Software Engineer",
    relevanceScore: 87,
    fitVerdict: "High",
    missingSkills: ["Docker", "AWS Lambda"],
    submittedDate: "2024-01-21",
    university: "Stanford",
    gpa: "3.9"
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    jobTitle: "Senior Software Engineer",
    relevanceScore: 73,
    fitVerdict: "Medium",
    missingSkills: ["React Native", "TypeScript", "MongoDB"],
    submittedDate: "2024-01-20",
    university: "UC Berkeley",
    gpa: "3.6"
  },
  {
    id: 4,
    name: "Emily Wang",
    jobTitle: "Senior Software Engineer",
    relevanceScore: 68,
    fitVerdict: "Medium",
    missingSkills: ["Node.js", "PostgreSQL", "Redis"],
    submittedDate: "2024-01-19",
    university: "Carnegie Mellon",
    gpa: "3.7"
  },
  {
    id: 5,
    name: "David Kim",
    jobTitle: "Senior Software Engineer",
    relevanceScore: 58,
    fitVerdict: "Low",
    missingSkills: ["Python", "Machine Learning", "AWS", "Jenkins"],
    submittedDate: "2024-01-18",
    university: "Georgia Tech",
    gpa: "3.4"
  }
];

export const RecruiterDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [filterBy, setFilterBy] = useState("all");
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const { toast } = useToast();

  const filteredCandidates = mockCandidates
    .filter(candidate => {
      const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          candidate.university.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterBy === "all" || candidate.fitVerdict.toLowerCase() === filterBy;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "relevance":
          return b.relevanceScore - a.relevanceScore;
        case "name":
          return a.name.localeCompare(b.name);
        case "date":
          return new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime();
        default:
          return 0;
      }
    });

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

  const handleJobUpload = () => {
    toast({
      title: "Job description uploaded!",
      description: "Processing job requirements and preparing for candidate matching.",
    });
  };

  const handleDownloadReport = (candidateName: string) => {
    toast({
      title: "Report downloading",
      description: `Detailed analysis report for ${candidateName} is being prepared.`,
    });
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-foreground mb-2">Recruiter Dashboard</h1>
        <p className="text-muted-foreground">Manage job postings and analyze candidate applications with AI insights</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="card-professional animate-scale-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Jobs</p>
                <p className="text-3xl font-bold text-primary">12</p>
              </div>
              <FileText className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-professional animate-scale-in" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Applicants</p>
                <p className="text-3xl font-bold text-success">248</p>
              </div>
              <Users className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-professional animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Matches</p>
                <p className="text-3xl font-bold text-warning">47</p>
              </div>
              <Target className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-professional animate-scale-in" style={{ animationDelay: '0.3s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Match Time</p>
                <p className="text-3xl font-bold text-foreground">2.4s</p>
              </div>
              <Clock className="w-8 h-8 text-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="jobs" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="jobs">Job Management</TabsTrigger>
          <TabsTrigger value="candidates">Candidate Analysis</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="space-y-6">
          <Card className="card-professional animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-5 h-5 text-primary" />
                <span>Upload Job Description</span>
              </CardTitle>
              <CardDescription>
                Upload job descriptions to start matching with qualified candidates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-6">
                <Button onClick={handleJobUpload} className="btn-professional">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Job Description
                </Button>
                <p className="text-sm text-muted-foreground">Supports PDF and DOCX files</p>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Active Job Postings</h4>
                {mockJobDescriptions.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                    <div>
                      <h5 className="font-medium">{job.title}</h5>
                      <p className="text-sm text-muted-foreground">{job.department} • {job.applicants} applicants</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={job.status === "Active" ? "default" : "secondary"}>
                        {job.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="candidates" className="space-y-6">
          {/* Search and Filters */}
          <Card className="card-professional">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search candidates..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance Score</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="date">Date Applied</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={filterBy} onValueChange={setFilterBy}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Candidates</SelectItem>
                      <SelectItem value="high">High Fit</SelectItem>
                      <SelectItem value="medium">Medium Fit</SelectItem>
                      <SelectItem value="low">Low Fit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "table" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("table")}
                  >
                    Table
                  </Button>
                  <Button
                    variant={viewMode === "cards" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("cards")}
                  >
                    Cards
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Candidates Display */}
          {viewMode === "table" ? (
            <Card className="card-professional animate-slide-up">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidate</TableHead>
                      <TableHead>University</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Fit</TableHead>
                      <TableHead>Missing Skills</TableHead>
                      <TableHead>Applied</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCandidates.map((candidate) => (
                      <TableRow key={candidate.id} className="hover:bg-accent/50">
                        <TableCell>
                          <div>
                            <div className="font-medium">{candidate.name}</div>
                            <div className="text-sm text-muted-foreground">GPA: {candidate.gpa}</div>
                          </div>
                        </TableCell>
                        <TableCell>{candidate.university}</TableCell>
                        <TableCell>
                          <span className={`text-2xl font-bold ${getScoreColor(candidate.relevanceScore)}`}>
                            {candidate.relevanceScore}%
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge className={getScoreBadgeClass(candidate.fitVerdict)}>
                            {candidate.fitVerdict}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {candidate.missingSkills.slice(0, 2).map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {candidate.missingSkills.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{candidate.missingSkills.length - 2} more
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {candidate.submittedDate}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDownloadReport(candidate.name)}
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCandidates.map((candidate, index) => (
                <Card key={candidate.id} className="card-professional card-hover animate-scale-in" 
                      style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{candidate.name}</CardTitle>
                        <CardDescription>{candidate.university} • GPA: {candidate.gpa}</CardDescription>
                      </div>
                      <div className={`text-2xl font-bold ${getScoreColor(candidate.relevanceScore)}`}>
                        {candidate.relevanceScore}%
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Fit Level:</span>
                        <Badge className={getScoreBadgeClass(candidate.fitVerdict)}>
                          {candidate.fitVerdict}
                        </Badge>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium text-muted-foreground mb-2 block">
                          Missing Skills:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {candidate.missingSkills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4">
                        <span className="text-xs text-muted-foreground">
                          Applied: {candidate.submittedDate}
                        </span>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDownloadReport(candidate.name)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-professional animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span>Match Quality Trends</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">High Quality Matches</span>
                    <span className="text-sm font-medium">↑ 24%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Processing Time</span>
                    <span className="text-sm font-medium">↓ 15%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Candidate Satisfaction</span>
                    <span className="text-sm font-medium">↑ 8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-professional animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle>Top Skills in Demand</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">React/JavaScript</span>
                    <span className="text-sm font-medium">89%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Cloud Technologies</span>
                    <span className="text-sm font-medium">76%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Data Analysis</span>
                    <span className="text-sm font-medium">68%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Machine Learning</span>
                    <span className="text-sm font-medium">54%</span>
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