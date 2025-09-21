import React, { useState } from "react";
import { uploadResume, uploadJob } from "../api/backend";

const Upload: React.FC = () => {
  const [resumeId, setResumeId] = useState<number | null>(null);
  const [jobId, setJobId] = useState<number | null>(null);

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const res = await uploadResume(e.target.files[0]);
    console.log("Resume uploaded:", res);
    setResumeId(res.id);
  };

  const handleJobUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const res = await uploadJob(e.target.files[0], "Software Engineer");
    console.log("Job uploaded:", res);
    setJobId(res.id);
  };

  return (
    <div>
      <h2>Upload Resume & Job</h2>
      <input type="file" onChange={handleResumeUpload} />
      <input type="file" onChange={handleJobUpload} />
      <p>Resume ID: {resumeId}</p>
      <p>Job ID: {jobId}</p>
    </div>
  );
};

export default Upload;