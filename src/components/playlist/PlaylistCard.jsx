import { FolderHeart, Clock, File } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PlaylistCard = ({ playlist, index }) => {
  // Format date to make it more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Get random pastel color for playlist icon
  const getColorClass = (id) => {
    const colors = [
      'bg-blue-100 text-blue-500 dark:bg-blue-900 dark:text-blue-300',
      'bg-green-100 text-green-500 dark:bg-green-900 dark:text-green-300',
      'bg-yellow-100 text-yellow-500 dark:bg-yellow-900 dark:text-yellow-300',
      'bg-purple-100 text-purple-500 dark:bg-purple-900 dark:text-purple-300',
      'bg-pink-100 text-pink-500 dark:bg-pink-900 dark:text-pink-300',
      'bg-red-100 text-red-500 dark:bg-red-900 dark:text-red-300',
      'bg-indigo-100 text-indigo-500 dark:bg-indigo-900 dark:text-indigo-300',
    ];
    
    const colorIndex = parseInt(id.substring(id.length - 2), 16) % colors.length;
    return colors[colorIndex];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link to={`/playlists/${playlist.id}`} className="block playlist-card">
        <div className="p-5">
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClass(playlist.id)}`}>
              <FolderHeart size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg truncate">{playlist.name}</h3>
              {playlist.description && (
                <p className="text-surface-600 dark:text-surface-300 text-sm line-clamp-2 mb-2">
                  {playlist.description}
                </p>
              )}
              <div className="flex items-center flex-wrap gap-3 mt-2 text-surface-500 dark:text-surface-400 text-xs">
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  <span>Created {formatDate(playlist.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <File size={12} />
                  <span>{playlist.transcripts.length} transcript{playlist.transcripts.length !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PlaylistCard;