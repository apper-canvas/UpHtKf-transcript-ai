import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Check, FolderPlus } from 'lucide-react';
import { usePlaylist } from '../../context/PlaylistContext';

const AddToPlaylistModal = () => {
  const { 
    playlists, 
    isAddToPlaylistModalOpen, 
    setIsAddToPlaylistModalOpen, 
    currentTranscript,
    addToPlaylist,
    setIsModalOpen
  } = usePlaylist();
  
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleTogglePlaylist = (playlistId) => {
    setSelectedPlaylists(prev => {
      if (prev.includes(playlistId)) {
        return prev.filter(id => id !== playlistId);
      } else {
        return [...prev, playlistId];
      }
    });
  };

  const handleSave = () => {
    if (selectedPlaylists.length > 0 && currentTranscript) {
      selectedPlaylists.forEach(playlistId => {
        addToPlaylist(playlistId, currentTranscript);
      });
      
      setSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 1500);
    } else {
      handleClose();
    }
  };

  const handleCreateNew = () => {
    setIsAddToPlaylistModalOpen(false);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsAddToPlaylistModalOpen(false);
    setSelectedPlaylists([]);
    setSuccess(false);
  };

  return (
    <AnimatePresence>
      {isAddToPlaylistModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-overlay"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="modal-container"
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-header flex justify-between items-center">
              <h3 className="text-lg font-semibold">Add to Playlist</h3>
              <button 
                onClick={handleClose}
                className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              {success ? (
                <div className="py-8 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-300">
                      <Check size={24} />
                    </div>
                  </div>
                  <p className="font-medium text-lg mb-1">Added Successfully!</p>
                  <p className="text-surface-500 dark:text-surface-400">
                    The transcript has been added to your {selectedPlaylists.length > 1 ? 'playlists' : 'playlist'}.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <button 
                      onClick={handleCreateNew}
                      className="w-full py-3 px-4 border border-dashed border-surface-300 dark:border-surface-600 rounded-lg flex items-center justify-center gap-2 hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
                    >
                      <FolderPlus size={18} />
                      <span>Create New Playlist</span>
                    </button>
                  </div>

                  {playlists.length > 0 ? (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-surface-500 dark:text-surface-400 mb-2">
                        Select playlists to add this transcript to:
                      </p>
                      
                      {playlists.map(playlist => (
                        <button
                          key={playlist.id}
                          onClick={() => handleTogglePlaylist(playlist.id)}
                          className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors ${
                            selectedPlaylists.includes(playlist.id)
                              ? 'bg-primary/10 dark:bg-primary/20'
                              : 'hover:bg-surface-100 dark:hover:bg-surface-700'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            selectedPlaylists.includes(playlist.id)
                              ? 'bg-primary text-white'
                              : 'border border-surface-300 dark:border-surface-600'
                          }`}>
                            {selectedPlaylists.includes(playlist.id) && <Check size={14} />}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{playlist.name}</p>
                            <p className="text-xs text-surface-500 dark:text-surface-400">
                              {playlist.transcripts.length} transcript{playlist.transcripts.length !== 1 ? 's' : ''}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-surface-500 dark:text-surface-400">
                      <p>You don't have any playlists yet.</p>
                      <p>Create one to get started!</p>
                    </div>
                  )}
                </>
              )}
            </div>

            {!success && (
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={handleClose}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="btn btn-primary"
                  disabled={selectedPlaylists.length === 0}
                >
                  Add to Playlist{selectedPlaylists.length > 1 ? 's' : ''}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddToPlaylistModal;