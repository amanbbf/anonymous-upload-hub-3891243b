import { useState } from "react";
import { Upload, CheckCircle2, Copy, FileIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [shareLink, setShareLink] = useState("");

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setIsUploading(true);
    setUploadProgress(0);
    setUploadComplete(false);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadComplete(true);
          // Generate a simulated share link
          const simulatedLink = `${window.location.origin}/file/${Math.random().toString(36).substring(7)}`;
          setShareLink(simulatedLink);
          toast.success("File uploaded successfully!");
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    toast.success("Link copied to clipboard!");
  };

  const handleReset = () => {
    setUploadedFile(null);
    setIsUploading(false);
    setUploadProgress(0);
    setUploadComplete(false);
    setShareLink("");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            Share Files Instantly
          </h1>
          <p className="text-muted-foreground text-lg">
            Upload your files and get a shareable link in seconds
          </p>
        </div>

        <Card className="p-8 shadow-2xl border-border/50 backdrop-blur-sm bg-card/95">
          {!uploadComplete ? (
            <>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                  isDragging
                    ? "border-primary bg-primary/5 scale-105"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex flex-col items-center gap-4">
                  <div
                    className={`p-6 rounded-full bg-gradient-to-br from-primary to-accent transition-all duration-300 ${
                      isDragging ? "scale-110 shadow-upload" : ""
                    }`}
                  >
                    <Upload className="w-10 h-10 text-primary-foreground" />
                  </div>

                  {!isUploading ? (
                    <>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          Drop your files here
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          or click to browse
                        </p>
                      </div>

                      <label htmlFor="file-upload">
                        <Button
                          variant="default"
                          size="lg"
                          className="cursor-pointer"
                          asChild
                        >
                          <span>Select File</span>
                        </Button>
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileSelect}
                      />
                    </>
                  ) : (
                    <div className="w-full space-y-4">
                      <div className="flex items-center gap-3">
                        <FileIcon className="w-8 h-8 text-primary flex-shrink-0" />
                        <div className="flex-1 text-left">
                          <p className="font-medium text-foreground truncate">
                            {uploadedFile?.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {uploadedFile && formatFileSize(uploadedFile.size)}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Progress value={uploadProgress} className="h-2" />
                        <p className="text-sm text-muted-foreground text-center">
                          Uploading... {uploadProgress}%
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-4">
                No registration required • Secure file transfer
              </p>
            </>
          ) : (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="p-6 rounded-full bg-success/10">
                  <CheckCircle2 className="w-16 h-16 text-success" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Upload Complete!
                </h3>
                <p className="text-muted-foreground">
                  Your file is ready to share
                </p>
              </div>

              <div className="flex items-center gap-3">
                <FileIcon className="w-6 h-6 text-primary flex-shrink-0" />
                <div className="flex-1 text-left">
                  <p className="font-medium text-foreground truncate">
                    {uploadedFile?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {uploadedFile && formatFileSize(uploadedFile.size)}
                  </p>
                </div>
              </div>

              <Card className="p-4 bg-muted/50 border-border">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={shareLink}
                    readOnly
                    className="flex-1 bg-transparent border-none outline-none text-foreground text-sm truncate"
                  />
                  <Button
                    onClick={handleCopyLink}
                    size="sm"
                    variant="default"
                    className="flex-shrink-0"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </Card>

              <Button
                onClick={handleReset}
                variant="outline"
                size="lg"
                className="w-full"
              >
                Upload Another File
              </Button>
            </div>
          )}
        </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
