const API_URL = "http://localhost:8000";

export const uploadResume = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/api/upload/resume`, {
    method: "POST",
    body: formData,
  });

  return await res.json();
};

export const uploadJob = async (file: File, title: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("title", title);

  const res = await fetch(`${API_URL}/api/upload/job`, {
    method: "POST",
    body: formData,
  });

  return await res.json();
};