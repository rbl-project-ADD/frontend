/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { CloudUpload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { recognizeImage } from "@/services/api";

export default function ImageRecognition() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
      setProgress(100); // Show completed upload immediately
      setIsUploading(false);
    }
  };

  // Handle drag events
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files).filter(
        file => file.type.startsWith('image/')
      );
      setFiles(droppedFiles);
      setProgress(100); // Show completed upload immediately
      setIsUploading(false);
    }
  };

  // Handle click on the dropzone
  const handleAreaClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Remove a file from the selection
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setResults(null);
  };

  // Handle prompt input change
  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (files.length === 0) return;
    
    try {
      setIsProcessing(true);
      setError(null);
      
      const formData = new FormData();
      
      // Append the first file (you might want to handle multiple files differently)
      formData.append('file', files[0]);
      
      // Append the prompt if available
      if (prompt) {
        formData.append('prompt', prompt);
      }
      
      const response = await recognizeImage(formData);
      setResults(response);
    } catch (err) {
      console.error('Error processing image:', err);
      setError('Failed to process the image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Image Recognition & Translation</CardTitle>
        <CardDescription>
          Upload images to analyze text, translate content, or ask questions about the image.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div
          className={cn(
            "flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-10 transition-colors cursor-pointer",
            isDragging 
              ? "border-primary bg-primary/5" 
              : "border-zinc-200 dark:border-zinc-800 hover:border-primary/50 hover:bg-zinc-50 dark:hover:bg-zinc-900/50",
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleAreaClick}
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          
          <CloudUpload className="w-16 h-16 text-zinc-500 dark:text-zinc-400 mb-4" />
          
          <div className="text-center space-y-2">
            <p className="font-medium">Drop your image here or click to browse</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Supports JPG, PNG, GIF up to 10MB
            </p>
          </div>
        </div>

        {files.length > 0 && (
          <>
            <div>
              <h3 className="font-medium mb-3">Selected Image</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {files.map((file, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-video rounded-md bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                      {file.type.startsWith('image/') ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-zinc-400" />
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <p className="text-xs mt-1 truncate">{file.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium">Ask a Question or Provide Instructions</h3>
              <Textarea 
                placeholder="E.g., 'Translate text in this image to English' or 'What does this text say?'" 
                value={prompt}
                onChange={handlePromptChange}
                className="min-h-[100px]"
              />
            </div>
          </>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 rounded-md text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        {results && (
          <div className="border rounded-md p-4 bg-zinc-50 dark:bg-zinc-900">
            <h3 className="font-medium mb-2">Results</h3>
            <div className="whitespace-pre-wrap">{
              typeof results === 'string' 
                ? results 
                : JSON.stringify(results, null, 2)
            }</div>
          </div>
        )}
      </CardContent>

      {files.length > 0 && (
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => {
            setFiles([]);
            setPrompt("");
            setResults(null);
            setError(null);
          }}>
            Clear All
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : 'Analyze Image'}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}