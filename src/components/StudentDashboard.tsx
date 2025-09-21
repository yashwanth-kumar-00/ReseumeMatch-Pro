import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Upload,
  FileText,
  CheckCircle,
  Clock,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// --- Backend response type for a resume ---
interface Resume {
  id: number;
  filename: string;
  text: string;
  created_at: string;
}

export const StudentDashboard = () => {
  const [applications, setApplications] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  // --- Fetch resumes from backend on load ---
  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:8000/api/upload/resumes");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
        toast({
          title: "Error",
          description: "Could not load your resumes.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchApplications();
  }, [toast]);

  // --- Drag & Drop handlers ---
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleResumeDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setResumeFile(e.dataTransfer.files[0]);
    }
  };

  // --- Upload resume to backend ---
  const handleFileUpload = async (resume: File) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", resume);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/upload/resume", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const newApplication = await response.json();
      setApplications((prev) => [newApplication, ...prev]);
      setResumeFile(null);
      toast({
        title: "Upload Complete!",
        description: "Your resume has been saved.",
      });
    } catch (error) {
      console.error("File upload error:", error);
      toast({
        title: "Upload Failed",
        description: "Could not upload your resume.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // --- Helper for status icon ---
  const getStatusIcon = (id: number) => {
    return id ? (
      <CheckCircle className="w-4 h-4 text-green-500" />
    ) : (
      <Clock className="w-4 h-4 text-yellow-500" />
    );
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <p className="text-muted-foreground">
          Upload and track your resumes with AI-powered insights
        </p>
      </div>

      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">New Resume</TabsTrigger>
          <TabsTrigger value="applications">My Resumes</TabsTrigger>
        </TabsList>

        {/* Upload Tab */}
        <TabsContent value="upload" className="space-y-6">
          <Card onDragEnter={handleDrag}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload />
                <span>Upload Resume</span>
              </CardTitle>
              <CardDescription>
                Drag and drop or select a resume file to save.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div
                  className={`mt-2 relative border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                    dragActive ? "border-primary bg-primary/5 scale-105" : "border-border"
                  } ${resumeFile ? "border-green-500 bg-green-500/5" : ""}`}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleResumeDrop}
                >
                  <FileText className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                  <p className="font-semibold">
                    {resumeFile ? resumeFile.name : "Drag & drop resume here"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    or click to select a file
                  </p>
                  <input
                    type="file"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    accept=".pdf,.docx,.txt"
                    onChange={(e) =>
                      e.target.files && setResumeFile(e.target.files[0])
                    }
                  />
                </div>
              </div>
              <div>
                <Button
                  className="w-full"
                  disabled={!resumeFile || isUploading}
                  onClick={() => {
                    if (resumeFile) {
                      handleFileUpload(resumeFile);
                    }
                  }}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
                    </>
                  ) : (
                    "Upload Resume"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Applications Tab */}
        <TabsContent value="applications" className="space-y-6">
          {isLoading ? (
            <div className="flex justify-center p-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : applications.length > 0 ? (
            applications.map((app) => (
              <Card key={app.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{app.filename}</CardTitle>
                      <CardDescription>ID: {app.id}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(app.id)}
                      <Badge variant="outline">Saved</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">
                        Created At
                      </h4>
                      <p>{new Date(app.created_at).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">
                        Preview
                      </h4>
                      <p className="text-sm line-clamp-3">{app.text}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="text-center p-12">
              <h3 className="text-xl font-semibold">No Resumes Found</h3>
              <p className="text-muted-foreground mt-2">
                Upload a resume to get started!
              </p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};