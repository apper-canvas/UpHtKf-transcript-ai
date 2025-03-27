import { useState } from "react";
import { motion } from "framer-motion";
import MainFeature from "../components/MainFeature";

const Home = () => {
  const [recentTranscripts, setRecentTranscripts] = useState([]);

  // Function to add a new transcript to the recent list
  const addRecentTranscript = (transcript) => {
    setRecentTranscripts(prev => [transcript, ...prev.slice(0, 4)]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-4 py-8"
    >
      <section className="mb-12">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="text-gradient">Transform</span> YouTube Videos 
            <br className="hidden sm:block" /> into Text & Summaries
          </motion.h1>
          <motion.p 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg text-surface-600 dark:text-surface-300"
          >
            Instantly transcribe any YouTube video and generate intelligent summaries
            with our AI-powered tool.
          </motion.p>
        </div>

        <MainFeature onTranscriptGenerated={addRecentTranscript} />
      </section>

      {recentTranscripts.length > 0 && (
        <section className="mb-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="inline-block w-2 h-6 bg-primary rounded-full mr-3"></span>
              Recent Transcripts
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentTranscripts.map((transcript, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card p-4 hover:shadow-soft transition-shadow duration-300"
                >
                  <div className="flex gap-4">
                    <div className="w-24 h-16 rounded-lg overflow-hidden bg-surface-200 dark:bg-surface-700 flex-shrink-0">
                      {transcript.thumbnailUrl ? (
                        <img 
                          src={transcript.thumbnailUrl} 
                          alt={transcript.title} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-surface-400">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-lg truncate">{transcript.title}</h3>
                      <p className="text-surface-500 dark:text-surface-400 text-sm mb-2">
                        {transcript.channelName || "Unknown channel"}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                          {transcript.duration ? `${Math.floor(transcript.duration / 60)}:${String(transcript.duration % 60).padStart(2, '0')}` : "00:00"}
                        </span>
                        <span className="px-2 py-1 text-xs rounded-full bg-secondary/10 text-secondary dark:bg-secondary/20">
                          {transcript.language || "EN"}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="max-w-5xl mx-auto rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 p-8 md:p-12">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">How TranscriptAI Works</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Paste YouTube URL</h3>
                  <p className="text-surface-600 dark:text-surface-300">Simply paste any YouTube video link into the input field.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">AI Transcription</h3>
                  <p className="text-surface-600 dark:text-surface-300">Our AI automatically transcribes the video's audio with high accuracy.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Get Summary</h3>
                  <p className="text-surface-600 dark:text-surface-300">Receive an intelligent summary of the video content in various lengths or as structured chapters.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;