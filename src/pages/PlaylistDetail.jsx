import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  Edit2, 
  Trash2, 
  FolderHeart, 
  Save, 
  X,
  Youtube,
  Clock
} from 'lucide-react';
import { usePlaylist } from '../context/PlaylistContext';
import AddToPlaylistModal from '../components/playlist/AddToPlaylistModal';

const PlaylistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPlaylist, updatePlaylist, removeFromPlaylist, deletePlaylist } = usePlaylist();
  
  const playlist = getPlaylist(id);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  // If playlist doesn't exist, redirect to playlists page
  if (!playlist) {
    navigate('/playlists');
    return null;
  }

  // Start editing the playlist
  const handleEdit = () => {
    setEditName(playlist.name);
    setEditDescription(playlist.description || '');
    setIsEditing(true);
  };

  // Save edited playlist
  const handleSave = () => {
    if (editName.trim()) {
      updatePlaylist(id, {
        name: editName.trim(),
        description: editDescription.trim()
      });
      setIsEditing(false);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEditing(false);
  };

  // Remove transcript from playlist
  const handleRemoveTranscript = (transcriptId) => {
    removeFromPlaylist(id, transcriptId);
  };

  // Delete the entire playlist
  const handleDeletePlaylist = () => {
    deletePlaylist(id);
    navigate('/playlists');
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-4 py-8"
    >
      <AddToPlaylistModal />
      
      <div className="mb-8">
        <Link to="/playlists" className="flex items-center text-primary hover:underline mb-6">
          <ChevronLeft size={18} />
          <span>Back to Playlists</span>
        </Link>

        <div className="flex items-center justify-between mb-4">
          {isEditing ? (
            <div className="w-full">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="input-field text-2xl font-bold mb-2"
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Add a description (optional)"
                className="input-field resize-none"
                rows={2}
              />
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
                  <FolderHeart size={24} />
                </div>
                <h1 className="text-3xl font-bold">{playlist.name}</h1>
              </div>
              {playlist.description && (
                <p className="text-surface-600 dark:text-surface-300 mt-2 ml-[52px]">
                  {playlist.description}
                </p>
              )}
            </div>
          )}
          
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="btn btn-outline gap-1 py-1.5"
                >
                  <X size={16} />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="btn btn-primary gap-1 py-1.5"
                  disabled={!editName.trim()}
                >
                  <Save size={16} />
                  Save
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleEdit}
                  className="btn btn-outline gap-1 py-1.5"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="btn bg-red-500 hover:bg-red-600 text-white focus:ring-red-500 gap-1 py-1.5"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 items-center text-sm text-surface-500 dark:text-surface-400">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>Created {formatDate(playlist.createdAt)}</span>
          </div>
          <div className="playlist-badge">
            {playlist.transcripts.length} transcript{playlist.transcripts.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="border-b border-surface-200 dark:border-surface-700 pb-2 mb-4">
          <h2 className="text-xl font-semibold">Transcripts in this Playlist</h2>
        </div>
        
        {playlist.transcripts.length > 0 ? (
          <div className="card divide-y divide-surface-200 dark:divide-surface-700">
            {playlist.transcripts.map((transcript, index) => (
              <motion.div
                key={transcript.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="transcript-item"
              >
                <div className="flex gap-4">
                  <div className="w-20 h-14 rounded-lg overflow-hidden bg-surface-200 dark:bg-surface-700 flex-shrink-0">
                    {transcript.thumbnailUrl ? (
                      <img 
                        src={transcript.thumbnailUrl} 
                        alt={transcript.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-surface-400">
                        <Youtube size={24} />
                      </div>
                    )}
                  </div>
                  <div className="flex-grow min-w-0">
                    <h3 className="font-medium truncate">{transcript.title}</h3>
                    <p className="text-surface-500 dark:text-surface-400 text-sm mb-2">
                      {transcript.channelName || "Unknown channel"}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                        {transcript.duration ? `${Math.floor(transcript.duration / 60)}:${String(transcript.duration % 60).padStart(2, '0')}` : "00:00"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => handleRemoveTranscript(transcript.id)}
                      className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500"
                      aria-label="Remove from playlist"
                      title="Remove from playlist"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-surface-50 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700">
            <div className="mb-4">
              <div className="w-16 h-16 rounded-full bg-surface-200 dark:bg-surface-700 mx-auto flex items-center justify-center">
                <Youtube size={32} className="text-surface-500 dark:text-surface-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">No Transcripts Yet</h3>
            <p className="text-surface-500 dark:text-surface-400 mb-6 max-w-md mx-auto">
              This playlist is empty. Add transcripts to it when processing YouTube videos.
            </p>
            <Link to="/" className="btn btn-primary">
              Process a Video
            </Link>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="modal-overlay" onClick={() => setConfirmDelete(false)}>
          <div className="modal-container max-w-sm" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-semibold">Delete Playlist</h3>
            </div>
            <div className="modal-body">
              <p className="mb-2">
                Are you sure you want to delete "{playlist.name}"? This action cannot be undone.
              </p>
              <p className="text-sm text-surface-500 dark:text-surface-400">
                Note: This will only delete the playlist, not the transcripts within it.
              </p>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => setConfirmDelete(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePlaylist}
                className="btn bg-red-500 hover:bg-red-600 text-white focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PlaylistDetail;