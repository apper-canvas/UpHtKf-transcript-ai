import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { usePlaylist } from '../../context/PlaylistContext';

const CreatePlaylistModal = () => {
  const { isModalOpen, setIsModalOpen, createPlaylist } = usePlaylist();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Playlist name is required');
      return;
    }

    createPlaylist(name.trim(), description.trim());
    handleClose();
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setName('');
    setDescription('');
    setError('');
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
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
              <h3 className="text-lg font-semibold">Create New Playlist</h3>
              <button 
                onClick={handleClose}
                className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-4">
                  <label htmlFor="playlistName" className="block text-sm font-medium mb-1">
                    Playlist Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="playlistName"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError('');
                    }}
                    placeholder="My Awesome Playlist"
                    className="input-field"
                    autoFocus
                  />
                  {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>
                <div>
                  <label htmlFor="playlistDescription" className="block text-sm font-medium mb-1">
                    Description (optional)
                  </label>
                  <textarea
                    id="playlistDescription"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="A collection of my favorite transcripts"
                    className="input-field h-24 resize-none"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  onClick={handleClose}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Create Playlist
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreatePlaylistModal;