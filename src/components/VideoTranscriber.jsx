import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Youtube, 
  Wand2, 
  Loader2, 
  Check, 
  X, 
  Copy, 
  Download, 
  Share2,
  PlayCircle,
  Bookmark,
  FileText,
  Clock
} from "lucide-react";
import PlaylistButton from "./playlist/PlaylistButton";

const VideoTranscriber = () => {
  const [url, setUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [error, setError] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [chapters, setChapters] = useState([]);
  const [copied, setCopied] = useState(false);
  const [activeChapter, setActiveChapter] = useState(null);
  
  const inputRef = useRef(null);
  const progressInterval = useRef(null);

  // Validate YouTube URL
  useEffect(() => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})(\S*)?$/;
    setIsValidUrl(youtubeRegex.test(url));
    setError("");
  }, [url]);

  // Simulate processing steps
  useEffect(() => {
    if (isProcessing) {
      progressInterval.current = setInterval(() => {
        setProcessingStep(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval.current);
            return 100;
          }
          return prev + 5;
        });
      }, 150);
    } else {
      clearInterval(progressInterval.current);
    }

    return () => clearInterval(progressInterval.current);
  }, [isProcessing]);

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isValidUrl) {
      setError("Please enter a valid YouTube URL");
      inputRef.current.focus();
      return;
    }

    setIsProcessing(true);
    setProcessingStep(0);
    setError("");
    
    try {
      // Extract video ID from URL
      const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      const videoId = videoIdMatch ? videoIdMatch[1] : null;
      
      if (!videoId) {
        throw new Error("Could not extract video ID from URL");
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock video data
      const mockVideoData = {
        id: videoId,
        url: url,
        title: "AI and the Future of Video Content Analysis",
        channelName: "Future Tech Insights",
        duration: 1215, // 20:15 in seconds
        thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        processingStatus: "completed"
      };
      
      // Mock transcript with timestamps
      const mockTranscript = `
        [00:00] Welcome to our video on AI and the future of video content analysis.
        [00:15] Today we'll explore how machine learning is revolutionizing the way we interact with video content.
        [00:30] From automatic transcription to sentiment analysis, the capabilities are expanding rapidly.
        [01:25] Our first topic covers the evolution of video transcription technology.
        [02:10] Early systems had high error rates and struggled with different accents and background noise.
        [03:45] Modern AI systems can now achieve accuracy rates of over 95% in ideal conditions.
        [05:20] Next, let's discuss content categorization and tagging.
        [07:18] AI can now automatically identify objects, people, and even activities in videos.
        [08:55] This enables powerful search functionality across large video libraries.
        [10:30] Our third section covers sentiment analysis in video content.
        [12:40] Using facial recognition and speech patterns, AI can determine emotional states.
        [15:22] These capabilities open new possibilities for content creators and marketers.
        [17:05] Looking forward, we expect integration with real-time translation systems.
        [18:10] Cross-language video understanding will break down remaining barriers.
        [19:30] Thank you for watching! Please subscribe for more insights on AI technology.
      `;
      
      // Mock chapters for the video
      const mockChapters = [
        {
          id: 1,
          title: "Introduction to AI Video Analysis",
          timestamp: "00:00",
          timeInSeconds: 0,
          content: "The video begins with an introduction to artificial intelligence and its applications in video content analysis. The presenter outlines the topics that will be covered throughout the presentation, setting expectations for viewers about the revolutionary nature of machine learning in the video space. This section provides a broad overview of how AI is changing the way we interact with video content across industries."
        },
        {
          id: 2,
          title: "Evolution of Video Transcription",
          timestamp: "01:25",
          timeInSeconds: 85,
          content: "This chapter traces the development of automated transcription technologies from their early days to current state-of-the-art systems. The presenter discusses how early transcription systems struggled with accuracy, especially with different accents and background noise, achieving only 60-70% accuracy. Modern AI-powered systems now regularly achieve over 95% accuracy in ideal conditions and continue to improve with specialized training. The section highlights key breakthroughs in speech recognition that made this progress possible."
        },
        {
          id: 3,
          title: "Content Categorization and Tagging",
          timestamp: "05:20",
          timeInSeconds: 320,
          content: "This section explores how AI can automatically categorize and tag video content based on visual and audio information. The presenter demonstrates systems that can identify objects, people, scenes, and even specific activities within videos without human intervention. These capabilities enable powerful search functionality across large video libraries, making content discovery much more efficient. Examples of how streaming platforms use these technologies to improve user experience are discussed in detail."
        },
        {
          id: 4,
          title: "Sentiment Analysis in Video",
          timestamp: "10:30",
          timeInSeconds: 630,
          content: "The video examines how artificial intelligence can analyze sentiment in video content through multiple channels. Using facial recognition, voice tone analysis, and speech patterns, AI systems can now determine emotional states and reactions with increasing accuracy. The presenter explains how content creators and marketers can leverage these insights to better understand audience engagement and optimize their content accordingly. Several case studies demonstrating successful applications of sentiment analysis are presented."
        },
        {
          id: 5,
          title: "Future Developments and Conclusion",
          timestamp: "17:05",
          timeInSeconds: 1025,
          content: "In this final section, the presenter discusses emerging trends and future developments in AI video analysis. Particular attention is given to integration with real-time translation systems that will enable cross-language video understanding and break down remaining barriers to global content consumption. The video concludes with a summary of key points and encourages viewers to stay updated on these rapidly evolving technologies by subscribing to the channel for more insights."
        }
      ];
      
      setVideoData(mockVideoData);
      setTranscript(mockTranscript);
      setChapters(mockChapters);
      setActiveChapter(mockChapters[0].id);
      
    } catch (err) {
      setError(err.message || "Failed to process video. Please try again.");
    } finally {
      setIsProcessing(false);
      setProcessingStep(100);
    }
  };

  // Handle copy to clipboard
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  // Get formatted chapter content for copying
  const getFormattedChapterContent = (chapter) => {
    return `[${chapter.timestamp}] ${chapter.title}\n${chapter.content}`;
  };

  // Copy full transcript with chapter information
  const copyFullTranscriptWithChapters = () => {
    const formattedText = chapters.map(chapter => 
      `[${chapter.timestamp}] ${chapter.title}\n${chapter.content}`
    ).join('\n\n');
    
    handleCopy(formattedText);
  };

  // Reset the form
  const handleReset = () => {
    setUrl("");
    setIsValidUrl(false);
    setIsProcessing(false);
    setProcessingStep(0);
    setError("");
    setVideoData(null);
    setTranscript("");
    setChapters([]);
    setActiveChapter(null);
    inputRef.current.focus();
  };

  // Handle clicking on a chapter timestamp
  const handleChapterClick = (chapterId) => {
    setActiveChapter(chapterId);
    // In a real implementation, this would seek the video to the chapter's timestamp
    console.log(`Seeking to chapter ${chapterId}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-gradient">Video Transcription</span> with Chapters
          </h1>
          <p className="text-surface-600 dark:text-surface-300">
            Transcribe any YouTube video with automatically detected chapters and timestamps
          </p>
        </div>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="neu-card mb-8"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Youtube size={20} className="text-surface-400" />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste YouTube URL here (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ)"
                className="input-field pl-10"
                disabled={isProcessing || videoData !== null}
              />
              {url && (
                <button
                  type="button"
                  onClick={() => setUrl("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  aria-label="Clear input"
                >
                  <X size={18} className="text-surface-400 hover:text-surface-600 dark:hover:text-surface-200" />
                </button>
              )}
            </div>
            
            {error && (
              <div className="text-red-500 text-sm px-2">
                {error}
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={!url || isProcessing || videoData !== null}
                className={`btn ${
                  isValidUrl && !isProcessing && videoData === null
                    ? "btn-primary"
                    : "btn-outline opacity-70"
                } flex-1 gap-2`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Processing Video...
                  </>
                ) : videoData ? (
                  <>
                    <Check size={18} />
                    Video Processed
                  </>
                ) : (
                  <>
                    <Wand2 size={18} />
                    Transcribe with Chapters
                  </>
                )}
              </button>
              
              {videoData && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn btn-outline gap-2"
                >
                  <X size={18} />
                  New Video
                </button>
              )}
            </div>
          </form>
        </motion.div>

        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Processing Video</h3>
              <div className="text-surface-500 dark:text-surface-400 text-sm">
                {processingStep < 25 ? "Analyzing video..." : 
                 processingStep < 50 ? "Extracting audio..." : 
                 processingStep < 75 ? "Transcribing content..." : 
                 "Generating chapters..."}
              </div>
            </div>
            
            <div className="w-full h-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${processingStep}%` }}
                className="h-full bg-gradient-to-r from-primary to-secondary"
              />
            </div>
            
            <div className="mt-4 text-sm text-surface-500 dark:text-surface-400 flex items-center gap-2">
              <Loader2 size={14} className="animate-spin" />
              Please wait while we process your video. This may take a few minutes for longer videos...
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {videoData && chapters.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="card overflow-hidden lg:col-span-1">
                  <div className="aspect-video w-full bg-surface-800 relative overflow-hidden">
                    {videoData.thumbnailUrl && (
                      <img 
                        src={videoData.thumbnailUrl} 
                        alt={videoData.title} 
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/40 rounded-full p-2">
                        <PlayCircle size={48} className="text-white" />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-900/90 to-transparent flex items-end p-4">
                      <div className="text-white">
                        <h3 className="font-semibold text-lg line-clamp-1">{videoData.title}</h3>
                        <p className="text-surface-200 text-sm">{videoData.channelName}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <div className="px-3 py-1 rounded-full bg-surface-100 dark:bg-surface-700 text-sm flex items-center gap-1">
                        <Clock size={14} />
                        {videoData.duration ? 
                          `${Math.floor(videoData.duration / 60)}:${String(videoData.duration % 60).padStart(2, '0')}` : 
                          "00:00"}
                      </div>
                      <div className="px-3 py-1 rounded-full bg-surface-100 dark:bg-surface-700 text-sm flex items-center gap-1">
                        <FileText size={14} />
                        {chapters.length} Chapters
                      </div>
                    </div>
                    
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <span className="w-1 h-5 bg-primary rounded"></span>
                      Video Chapters
                    </h4>
                    
                    <div className="space-y-3 max-h-64 overflow-y-auto pr-2 scrollbar-hide">
                      {chapters.map((chapter) => (
                        <button
                          key={chapter.id}
                          onClick={() => handleChapterClick(chapter.id)}
                          className={`w-full text-left p-3 rounded-lg transition-colors ${
                            activeChapter === chapter.id 
                              ? "bg-primary/10 dark:bg-primary/20 border-l-4 border-primary" 
                              : "bg-surface-50 dark:bg-surface-700 hover:bg-surface-100 dark:hover:bg-surface-600"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="clickable-timestamp">
                              {chapter.timestamp}
                            </span>
                            <span className={`font-medium ${activeChapter === chapter.id ? "text-primary" : ""}`}>
                              {chapter.title}
                            </span>
                          </div>
                          <p className="text-xs text-surface-500 dark:text-surface-400 line-clamp-1">
                            {chapter.content.substring(0, 80)}...
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-2">
                  <div className="card h-full flex flex-col">
                    <div className="border-b border-surface-200 dark:border-surface-700 p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Transcript with Chapters</h3>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={copyFullTranscriptWithChapters}
                            className="btn btn-outline py-1.5 px-3 text-sm gap-1"
                            title="Copy full transcript with chapters"
                          >
                            {copied ? <Check size={14} /> : <Copy size={14} />}
                            {copied ? "Copied" : "Copy All"}
                          </button>
                          <PlaylistButton transcript={videoData} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-grow overflow-y-auto p-6 scrollbar-hide">
                      <div className="space-y-6">
                        {chapters.map((chapter) => (
                          <div 
                            key={chapter.id} 
                            className={`transcript-chapter group ${activeChapter === chapter.id ? "animate-pulse-light" : ""}`}
                            id={`chapter-${chapter.id}`}
                          >
                            <h3 className="chapter-heading">
                              <button 
                                onClick={() => handleChapterClick(chapter.id)}
                                className="clickable-timestamp"
                              >
                                {chapter.timestamp}
                              </button>
                              <span>{chapter.title}</span>
                              <div className="chapter-actions ml-auto">
                                <button 
                                  onClick={() => handleCopy(getFormattedChapterContent(chapter))}
                                  className="p-1 rounded-md hover:bg-surface-100 dark:hover:bg-surface-700"
                                  title="Copy this chapter"
                                >
                                  <Copy size={14} />
                                </button>
                                <button 
                                  className="p-1 rounded-md hover:bg-surface-100 dark:hover:bg-surface-700"
                                  title="Bookmark this chapter"
                                >
                                  <Bookmark size={14} />
                                </button>
                              </div>
                            </h3>
                            <div className="chapter-content">
                              {chapter.content}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border-t border-surface-200 dark:border-surface-700 p-4 flex justify-between">
                      <div className="text-sm text-surface-500 dark:text-surface-400">
                        Auto-generated transcription may not be 100% accurate
                      </div>
                      <div className="flex gap-2">
                        <button className="btn btn-outline py-1.5 px-3 text-sm gap-1">
                          <Download size={14} />
                          Download
                        </button>
                        <button className="btn btn-primary py-1.5 px-3 text-sm gap-1">
                          <Share2 size={14} />
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card p-4 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Raw Transcript</h3>
                  <button 
                    onClick={() => handleCopy(transcript)}
                    className="btn btn-outline py-1.5 px-3 text-sm gap-1"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                
                <div className="max-h-64 overflow-y-auto scrollbar-hide bg-surface-50 dark:bg-surface-800 rounded-lg p-4 text-sm font-mono whitespace-pre-line">
                  {transcript}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default VideoTranscriber;