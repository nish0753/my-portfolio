import { useState, type ChangeEvent } from "react";
import { Upload, FileText, X, Download, Eye, Link } from "lucide-react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { storage, db } from "../../lib/firebase";
import Button from "../ui/Button";
import GlassCard from "../ui/GlassCard";
import Input from "../ui/Input";

interface ResumeUploadProps {
  currentResumeUrl?: string;
}

export default function ResumeUpload({ currentResumeUrl }: ResumeUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [resumeUrl, setResumeUrl] = useState(currentResumeUrl || "");
  const [previewUrl, setPreviewUrl] = useState(currentResumeUrl || "");
  const [urlInput, setUrlInput] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);

  const handleUrlSubmit = async () => {
    if (!urlInput.trim()) {
      alert("Please enter a valid URL");
      return;
    }

    if (!db) {
      alert("Firebase is not configured.");
      return;
    }

    try {
      await setDoc(doc(db, "settings", "resume"), {
        url: urlInput,
        updatedAt: new Date().toISOString(),
        fileName: "Resume",
      });

      setResumeUrl(urlInput);
      setPreviewUrl(urlInput);
      setUrlInput("");
      setShowUrlInput(false);
      alert("Resume URL saved successfully!");
    } catch (error: any) {
      console.error("Error saving resume URL:", error);
      alert(`Error: ${error?.message || "Unknown error"}`);
    }
  };

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    if (!storage || !db) {
      alert(
        "Firebase is not configured. Please add your Firebase credentials.",
      );
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Create storage reference
      const storageRef = ref(storage, `resume/resume-${Date.now()}.pdf`);

      // Upload file
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload error:", error);
          console.error("Error code:", error.code);
          console.error("Error message:", error.message);
          alert(
            `Error uploading resume: ${error.message || "Unknown error"}. Check console for details.`,
          );
          setUploading(false);
        },
        async () => {
          // Get download URL
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);

          // Save to Firestore
          if (db) {
            await setDoc(doc(db, "settings", "resume"), {
              url: downloadUrl,
              updatedAt: new Date().toISOString(),
              fileName: file.name,
            });
          }

          setResumeUrl(downloadUrl);
          setPreviewUrl(downloadUrl);
          setUploading(false);
          setUploadProgress(0);
          alert("Resume uploaded successfully!");
        },
      );
    } catch (error: any) {
      console.error("Error uploading resume:", error);
      console.error("Error code:", error?.code);
      console.error("Error message:", error?.message);
      alert(
        `Error uploading resume: ${error?.message || "Unknown error"}. Check console for details.`,
      );
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete the resume?")) return;

    if (!storage || !db) {
      alert("Firebase is not configured.");
      return;
    }

    try {
      // Delete from storage
      if (resumeUrl) {
        const fileRef = ref(storage, resumeUrl);
        await deleteObject(fileRef);
      }

      // Delete from Firestore
      await setDoc(doc(db, "settings", "resume"), {
        url: null,
        updatedAt: new Date().toISOString(),
      });

      setResumeUrl("");
      setPreviewUrl("");
      alert("Resume deleted successfully!");
    } catch (error) {
      console.error("Error deleting resume:", error);
      alert("Error deleting resume. Please try again.");
    }
  };

  return (
    <GlassCard>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="text-purple-400" size={28} />
            Resume Management
          </h2>
        </div>

        {/* Upload Section */}
        {!resumeUrl && !uploading && (
          <>
            <div className="border-2 border-dashed border-glass-border rounded-xl p-8 text-center hover:border-purple-400 transition-colors">
              <label className="cursor-pointer block">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-lg font-semibold mb-2">Upload Resume</p>
                <p className="text-sm text-gray-400">
                  Click to select a PDF file (max 5MB)
                </p>
                <p className="text-xs text-red-400 mt-2">
                  Note: Requires Firebase Blaze (paid) plan
                </p>
              </label>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-400 mb-3">OR</p>
              {!showUrlInput ? (
                <Button
                  onClick={() => setShowUrlInput(true)}
                  variant="secondary"
                  className="w-full"
                >
                  <Link className="mr-2" size={18} />
                  Add Resume URL Instead (Free Alternative)
                </Button>
              ) : (
                <div className="space-y-3">
                  <Input
                    type="url"
                    placeholder="Enter resume URL (Google Drive, Dropbox, etc.)"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleUrlSubmit} className="flex-1">
                      Save URL
                    </Button>
                    <Button
                      onClick={() => {
                        setShowUrlInput(false);
                        setUrlInput("");
                      }}
                      variant="ghost"
                    >
                      Cancel
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Tip: Upload to Google Drive, set to "Anyone with link can
                    view", then paste the link here
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Upload Progress */}
        {uploading && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Uploading...</span>
              <span className="text-purple-400 font-semibold">
                {Math.round(uploadProgress)}%
              </span>
            </div>
            <div className="w-full bg-glass rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Resume Preview */}
        {resumeUrl && !uploading && (
          <div className="space-y-4">
            <div className="border border-glass-border rounded-xl p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <FileText className="text-purple-400" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold">Resume.pdf</p>
                    <p className="text-sm text-gray-400">Uploaded</p>
                  </div>
                </div>
                <Button
                  onClick={handleDelete}
                  variant="ghost"
                  className="text-red-400 hover:text-red-300"
                >
                  <X size={20} />
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => window.open(resumeUrl, "_blank")}
                  variant="secondary"
                  className="flex-1"
                >
                  <Eye className="mr-2" size={18} />
                  Preview
                </Button>
                <Button
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = resumeUrl;
                    link.download = "resume.pdf";
                    link.click();
                  }}
                  variant="secondary"
                  className="flex-1"
                >
                  <Download className="mr-2" size={18} />
                  Download
                </Button>
              </div>
            </div>

            {/* PDF Preview iframe */}
            <div className="border border-glass-border rounded-xl overflow-hidden">
              <iframe
                src={`${previewUrl}#toolbar=0`}
                className="w-full h-[600px]"
                title="Resume Preview"
              />
            </div>

            <div className="text-center">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Button variant="secondary">
                  <Upload className="mr-2" size={18} />
                  Upload New Resume
                </Button>
              </label>
            </div>
          </div>
        )}
      </div>
    </GlassCard>
  );
}
