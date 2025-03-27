import { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderPlus, Trash2 } from 'lucide-react';
import { usePlaylist } from '../context/PlaylistContext';
import PlaylistCard from '../components/playlist/PlaylistCard';
import CreatePlaylistModal from '../components/playlist/CreatePlaylistModal';

const Playlists = () => {
  const { playlists, setIsModalOpen, deletePlaylist } = usePlaylist();
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleCreateNew = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = (playlistId) => {
    deletePlaylist(playlistId);
    setConfirmDelete(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-4 py-8"
    >
      <CreatePlaylistModal />

      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">My Playlists</h1>
          <button
            onClick={handleCreateNew}
            className="btn btn-primary gap-2"
          >
            <FolderPlus size={18} />
            Create Playlist
          </button>
        </div>

        {playlists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlists.map((playlist, index) => (
              <div key={playlist.id} className="relative group">
                <PlaylistCard playlist={playlist} index={index} />
                <button
                  onClick={() => setConfirmDelete(playlist.id)}
                  className="absolute top-2 right-2 p-2 rounded-full bg-white dark:bg-surface-700 shadow opacity-0 group-hover:opacity-100 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all duration-200"
                  aria-label="Delete playlist"
                >
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-surface-50 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700">
            <div className="mb-4">
              <div className="w-16 h-16 rounded-full bg-surface-200 dark:bg-surface-700 mx-auto flex items-center justify-center">
                <FolderPlus size={32} className="text-surface-500 dark:text-surface-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">No Playlists Yet</h3>
            <p className="text-surface-500 dark:text-surface-400 mb-6 max-w-md mx-auto">
              Create your first playlist to organize your transcripts and easily access them later.
            </p>
            <button
              onClick={handleCreateNew}
              className="btn btn-primary"
            >
              Create Your First Playlist
            </button>
          </div>
        )}
      </section>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="modal-overlay" onClick={() => setConfirmDelete(null)}>
          <div className="modal-container max-w-sm" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-semibold">Delete Playlist</h3>
            </div>
            <div className="modal-body">
              <p className="mb-2">
                Are you sure you want to delete this playlist? This action cannot be undone.
              </p>
              <p className="text-sm text-surface-500 dark:text-surface-400">
                Note: This will only delete the playlist, not the transcripts within it.
              </p>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => setConfirmDelete(null)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmDelete(confirmDelete)}
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

export default Playlists;