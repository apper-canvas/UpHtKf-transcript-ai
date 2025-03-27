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
  Clock, 
  FileText, 
  AlignLeft, 
  AlignJustify,
  ListOrdered
} from "lucide-react";

const MainFeature = ({ onTranscriptGenerated }) => {
  const [url, setUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [error, setError] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");
  const [summaryLength, setSummaryLength] = useState("medium"); // short, medium, long, chapters
  const [copied, setCopied] = useState(false);
  const [showChapters, setShowChapters] = useState(true);
  
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
        title: "How AI is Transforming Content Creation",
        channelName: "Tech Insights",
        duration: 485, // 8:05 in seconds
        thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        processingStatus: "completed"
      };
      
      // Mock transcript
      const mockTranscript = `
        [00:00] Welcome to this video about AI and content creation.
        [00:05] Today we'll explore how artificial intelligence is changing the way we create and consume content.
        [00:15] From automated video editing to intelligent summarization, the possibilities are endless.
        [00:30] Let's dive into some real-world examples of AI-powered content tools.
        [01:00] First, we have transcription services that can convert speech to text with remarkable accuracy.
        [01:30] Next, there are AI tools that can generate summaries of long-form content.
        [02:00] These tools use natural language processing to identify key points and themes.
        [02:30] Another exciting application is automated video editing based on content analysis.
        [03:00] AI can identify the most engaging parts of a video and create highlights automatically.
        [03:30] Looking ahead, we can expect even more sophisticated AI tools for content creators.
        [04:00] The future of content creation will likely involve collaboration between humans and AI.
        [04:30] While AI can handle repetitive tasks, human creativity remains essential.
        [05:00] In conclusion, AI is not replacing content creators but empowering them.
        [05:30] Thanks for watching! Don't forget to like and subscribe for more tech insights.
      `;
      
      // Mock summaries
      const mockSummary = {
        short: "This video explores how AI is transforming content creation through tools like automated transcription, summarization, and video editing. While AI handles repetitive tasks, human creativity remains essential in the collaborative future of content creation.",
        medium: "This video discusses the impact of AI on content creation, highlighting several key applications. It covers AI-powered transcription services that convert speech to text, summarization tools that identify key points in long-form content, and automated video editing based on content analysis. The presenter emphasizes that AI is not replacing human creators but rather empowering them by handling repetitive tasks, while human creativity remains essential. The video concludes that the future of content creation will involve collaboration between humans and AI technologies.",
        long: "This comprehensive video explores the transformative impact of artificial intelligence on content creation across multiple domains. The presenter begins by introducing the topic and setting expectations for the discussion around how AI is changing content creation and consumption patterns.\n\nThe video first examines AI-powered transcription services, highlighting their ability to convert speech to text with increasingly high accuracy rates. This technology enables content to become more accessible and repurposable across different formats.\n\nNext, the discussion moves to AI summarization tools that can process long-form content and extract the most important points and themes using natural language processing. These tools help address information overload by condensing content while preserving key insights.\n\nThe presenter then covers automated video editing capabilities, where AI can analyze video content to identify the most engaging segments and automatically create highlights or shorter versions. This technology saves creators significant time in post-production.\n\nLooking toward the future, the video predicts even more sophisticated AI tools for content creators, while emphasizing that the most effective approach will be collaborative, with AI handling repetitive, time-consuming tasks while humans provide creative direction, emotional intelligence, and contextual understanding.\n\nThe video concludes by reinforcing that AI should be viewed not as a replacement for human creators but as a powerful tool that empowers them to focus on higher-value creative work. This human-AI partnership represents the future of content creation across industries.",
        chapters: [
          {
            title: "Introduction to AI in Content Creation",
            timestamp: "00:00",
            content: "The video begins with an introduction to artificial intelligence and its growing role in content creation. The presenter sets the stage by explaining how AI technologies are revolutionizing the way content is created, edited, and consumed across various industries. This section provides a broad overview of the transformative potential of AI in the creative process."
          },
          {
            title: "AI-Powered Transcription Services",
            timestamp: "01:00",
            content: "This chapter explores how AI transcription services have evolved to convert speech to text with remarkable accuracy. The presenter discusses how these tools leverage advanced speech recognition algorithms and machine learning to handle different accents, background noise, and specialized terminology. The section highlights how transcription technology makes content more accessible and enables creators to repurpose audio and video content into written formats efficiently."
          },
          {
            title: "Content Summarization Tools",
            timestamp: "01:30",
            content: "The video delves into AI-powered summarization tools that can process long-form content and extract the most important points and themes. Using natural language processing, these systems can analyze text to identify key information and generate concise summaries of varying lengths. This technology helps address information overload by enabling users to quickly grasp the essence of lengthy content without reading everything in detail."
          },
          {
            title: "Automated Video Editing Applications",
            timestamp: "02:30",
            content: "This section examines how AI is transforming video editing through automated systems that can analyze content and identify the most engaging segments. The presenter demonstrates how these tools can automatically create highlights, trim dead space, and even suggest optimal cuts based on content analysis. This technology significantly reduces the time required for post-production while maintaining quality output."
          },
          {
            title: "Future Developments in AI Tools",
            timestamp: "03:30",
            content: "Looking toward the future, this chapter discusses upcoming developments in AI tools for content creators. The presenter explores emerging technologies like AI-generated visuals, advanced natural language generation, and personalized content delivery systems. This forward-looking section provides insights into how the content creation landscape may evolve in the coming years."
          },
          {
            title: "Human-AI Collaboration",
            timestamp: "04:00",
            content: "This important chapter addresses the relationship between human creators and AI tools. Rather than viewing AI as a replacement for human creativity, the presenter emphasizes that the most effective approach is collaborative. The section explores how AI can handle repetitive, time-consuming tasks while humans provide creative direction, emotional intelligence, and contextual understanding that machines currently cannot replicate."
          },
          {
            title: "Conclusion and Final Thoughts",
            timestamp: "05:00",
            content: "The video concludes by reinforcing that AI should be viewed not as a replacement for content creators but as a powerful tool that empowers them to focus on higher-value creative work. This human-AI partnership represents the future of content creation across industries. The presenter ends with a call to action, encouraging viewers to embrace these new technologies while continuing to develop their unique creative skills."
          }
        ]
      };
      
      setVideoData(mockVideoData);
      setTranscript(mockTranscript);
      updateSummary(mockSummary, summaryLength);
      
      // Add to recent transcripts
      if (onTranscriptGenerated) {
        onTranscriptGenerated(mockVideoData);
      }
      
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

  // Update summary based on length and format
  const updateSummary = (summaryData, length) => {
    if (length === "chapters") {
      setSummary(summaryData.chapters);
    } else {
      setSummary(summaryData[length]);
    }
  };

  // Handle summary length change
  const handleSummaryLengthChange = (length) => {
    setSummaryLength(length);
    
    // Update summary based on length if we have video data
    if (videoData) {
      const summaries = {
        short: "This video explores how AI is transforming content creation through tools like automated transcription, summarization, and video editing. While AI handles repetitive tasks, human creativity remains essential in the collaborative future of content creation.",
        medium: "This video discusses the impact of AI on content creation, highlighting several key applications. It covers AI-powered transcription services that convert speech to text, summarization tools that identify key points in long-form content, and automated video editing based on content analysis. The presenter emphasizes that AI is not replacing human creators but rather empowering them by handling repetitive tasks, while human creativity remains essential. The video concludes that the future of content creation will involve collaboration between humans and AI technologies.",
        long: "This comprehensive video explores the transformative impact of artificial intelligence on content creation across multiple domains. The presenter begins by introducing the topic and setting expectations for the discussion around how AI is changing content creation and consumption patterns.\n\nThe video first examines AI-powered transcription services, highlighting their ability to convert speech to text with increasingly high accuracy rates. This technology enables content to become more accessible and repurposable across different formats.\n\nNext, the discussion moves to AI summarization tools that can process long-form content and extract the most important points and themes using natural language processing. These tools help address information overload by condensing content while preserving key insights.\n\nThe presenter then covers automated video editing capabilities, where AI can analyze video content to identify the most engaging segments and automatically create highlights or shorter versions. This technology saves creators significant time in post-production.\n\nLooking toward the future, the video predicts even more sophisticated AI tools for content creators, while emphasizing that the most effective approach will be collaborative, with AI handling repetitive, time-consuming tasks while humans provide creative direction, emotional intelligence, and contextual understanding.\n\nThe video concludes by reinforcing that AI should be viewed not as a replacement for human creators but as a powerful tool that empowers them to focus on higher-value creative work. This human-AI partnership represents the future of content creation across industries.",
        chapters: [
          {
            title: "Introduction to AI in Content Creation",
            timestamp: "00:00",
            content: "The video begins with an introduction to artificial intelligence and its growing role in content creation. The presenter sets the stage by explaining how AI technologies are revolutionizing the way content is created, edited, and consumed across various industries. This section provides a broad overview of the transformative potential of AI in the creative process."
          },
          {
            title: "AI-Powered Transcription Services",
            timestamp: "01:00",
            content: "This chapter explores how AI transcription services have evolved to convert speech to text with remarkable accuracy. The presenter discusses how these tools leverage advanced speech recognition algorithms and machine learning to handle different accents, background noise, and specialized terminology. The section highlights how transcription technology makes content more accessible and enables creators to repurpose audio and video content into written formats efficiently."
          },
          {
            title: "Content Summarization Tools",
            timestamp: "01:30",
            content: "The video delves into AI-powered summarization tools that can process long-form content and extract the most important points and themes. Using natural language processing, these systems can analyze text to identify key information and generate concise summaries of varying lengths. This technology helps address information overload by enabling users to quickly grasp the essence of lengthy content without reading everything in detail."
          },
          {
            title: "Automated Video Editing Applications",
            timestamp: "02:30",
            content: "This section examines how AI is transforming video editing through automated systems that can analyze content and identify the most engaging segments. The presenter demonstrates how these tools can automatically create highlights, trim dead space, and even suggest optimal cuts based on content analysis. This technology significantly reduces the time required for post-production while maintaining quality output."
          },
          {
            title: "Future Developments in AI Tools",
            timestamp: "03:30",
            content: "Looking toward the future, this chapter discusses upcoming developments in AI tools for content creators. The presenter explores emerging technologies like AI-generated visuals, advanced natural language generation, and personalized content delivery systems. This forward-looking section provides insights into how the content creation landscape may evolve in the coming years."
          },
          {
            title: "Human-AI Collaboration",
            timestamp: "04:00",
            content: "This important chapter addresses the relationship between human creators and AI tools. Rather than viewing AI as a replacement for human creativity, the presenter emphasizes that the most effective approach is collaborative. The section explores how AI can handle repetitive, time-consuming tasks while humans provide creative direction, emotional intelligence, and contextual understanding that machines currently cannot replicate."
          },
          {
            title: "Conclusion and Final Thoughts",
            timestamp: "05:00",
            content: "The video concludes by reinforcing that AI should be viewed not as a replacement for content creators but as a powerful tool that empowers them to focus on higher-value creative work. This human-AI partnership represents the future of content creation across industries. The presenter ends with a call to action, encouraging viewers to embrace these new technologies while continuing to develop their unique creative skills."
          }
        ]
      };
      
      updateSummary(summaries, length);
    }
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
    setSummary("");
    inputRef.current.focus();
  };

  // Get formatted chapter summary for copying
  const getFormattedChapterSummary = () => {
    if (!Array.isArray(summary)) return "";
    
    return summary.map(chapter => 
      `[${chapter.timestamp}] ${chapter.title}\n${chapter.content}\n`
    ).join('\n');
  };

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
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
                  Processing...
                </>
              ) : videoData ? (
                <>
                  <Check size={18} />
                  Processed
                </>
              ) : (
                <>
                  <Wand2 size={18} />
                  Transcribe & Summarize
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
              {processingStep < 33 ? "Extracting audio..." : 
               processingStep < 66 ? "Transcribing content..." : 
               "Generating summary..."}
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
            Please wait while we process your video. This may take a minute...
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {videoData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
              <div className="lg:col-span-2">
                <div className="card h-full flex flex-col">
                  <div className="aspect-video w-full bg-surface-800 relative overflow-hidden">
                    {videoData.thumbnailUrl && (
                      <img 
                        src={videoData.thumbnailUrl} 
                        alt={videoData.title} 
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-900/80 to-transparent flex items-end p-4">
                      <div className="text-white">
                        <h3 className="font-semibold text-lg line-clamp-2">{videoData.title}</h3>
                        <p className="text-surface-200 text-sm">{videoData.channelName}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 flex-grow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="px-3 py-1 rounded-full bg-surface-100 dark:bg-surface-800 text-sm flex items-center gap-1">
                        <Clock size={14} />
                        {videoData.duration ? 
                          `${Math.floor(videoData.duration / 60)}:${String(videoData.duration % 60).padStart(2, '0')}` : 
                          "00:00"}
                      </div>
                      <div className="px-3 py-1 rounded-full bg-surface-100 dark:bg-surface-800 text-sm flex items-center gap-1">
                        <FileText size={14} />
                        Transcript
                      </div>
                    </div>
                    
                    <div className="text-sm text-surface-600 dark:text-surface-300">
                      <p>Video ID: {videoData.id}</p>
                      <p className="truncate">Source: {videoData.url}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-3">
                <div className="card h-full flex flex-col">
                  <div className="border-b border-surface-200 dark:border-surface-700 p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">
                        {summaryLength === "chapters" ? "Chapter-Based Summary" : "AI Summary"}
                      </h3>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleSummaryLengthChange("short")}
                          className={`p-1.5 rounded-md ${summaryLength === "short" 
                            ? "bg-primary/10 text-primary dark:bg-primary/20" 
                            : "hover:bg-surface-100 dark:hover:bg-surface-700"}`}
                          aria-label="Short summary"
                          title="Short summary"
                        >
                          <AlignLeft size={16} />
                        </button>
                        <button 
                          onClick={() => handleSummaryLengthChange("medium")}
                          className={`p-1.5 rounded-md ${summaryLength === "medium" 
                            ? "bg-primary/10 text-primary dark:bg-primary/20" 
                            : "hover:bg-surface-100 dark:hover:bg-surface-700"}`}
                          aria-label="Medium summary"
                          title="Medium summary"
                        >
                          <AlignLeft size={18} />
                        </button>
                        <button 
                          onClick={() => handleSummaryLengthChange("long")}
                          className={`p-1.5 rounded-md ${summaryLength === "long" 
                            ? "bg-primary/10 text-primary dark:bg-primary/20" 
                            : "hover:bg-surface-100 dark:hover:bg-surface-700"}`}
                          aria-label="Long summary"
                          title="Long summary"
                        >
                          <AlignJustify size={18} />
                        </button>
                        <button 
                          onClick={() => handleSummaryLengthChange("chapters")}
                          className={`p-1.5 rounded-md ${summaryLength === "chapters" 
                            ? "bg-primary/10 text-primary dark:bg-primary/20" 
                            : "hover:bg-surface-100 dark:hover:bg-surface-700"}`}
                          aria-label="Chapter-based summary"
                          title="Chapter-based summary"
                        >
                          <ListOrdered size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 flex-grow overflow-y-auto scrollbar-hide">
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      {summaryLength === "chapters" && Array.isArray(summary) ? (
                        <div className="space-y-2">
                          {summary.map((chapter, i) => (
                            <div key={i}>
                              <h3 className="chapter-heading">
                                <span className="chapter-timestamp">{chapter.timestamp}</span>
                                {chapter.title}
                              </h3>
                              <div className="chapter-content">
                                {chapter.content}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <>
                          {typeof summary === 'string' && summary.split('\n\n').map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="border-t border-surface-200 dark:border-surface-700 p-3 flex justify-end gap-2">
                    <button 
                      onClick={() => handleCopy(summaryLength === "chapters" ? getFormattedChapterSummary() : summary)}
                      className="btn btn-outline py-1.5 px-3 text-sm gap-1"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      {copied ? "Copied" : "Copy"}
                    </button>
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
            
            <div className="card p-4 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Full Transcript</h3>
                <button 
                  onClick={() => handleCopy(transcript)}
                  className="btn btn-outline py-1.5 px-3 text-sm gap-1"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              
              <div className="max-h-96 overflow-y-auto scrollbar-hide bg-surface-50 dark:bg-surface-800 rounded-lg p-4 text-sm font-mono whitespace-pre-line">
                {transcript}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainFeature;