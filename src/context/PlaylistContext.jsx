import { createContext, useState, useContext, useEffect } from 'react';

const PlaylistContext = createContext();

export const usePlaylist = () => useContext(PlaylistContext);

export const PlaylistProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState(null);

  // Load playlists from localStorage on initial render
  useEffect(() => {
    const savedPlaylists = localStorage.getItem('playlists');
    if (savedPlaylists) {
      setPlaylists(JSON.parse(savedPlaylists));
    }
  }, []);

  // Save playlists to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('playlists', JSON.stringify(playlists));
  }, [playlists]);

  // Create a new playlist
  const createPlaylist = (name, description = '') => {
    const newPlaylist = {
      id: Date.now().toString(),
      name,
      description,
      createdAt: new Date().toISOString(),
      transcripts: []
    };
    
    setPlaylists(prev => [...prev, newPlaylist]);
    return newPlaylist;
  };

  // Delete a playlist
  const deletePlaylist = (playlistId) => {
    setPlaylists(prev => prev.filter(playlist => playlist.id !== playlistId));
  };

  // Update playlist details
  const updatePlaylist = (playlistId, updatedDetails) => {
    setPlaylists(prev => prev.map(playlist => 
      playlist.id === playlistId 
        ? { ...playlist, ...updatedDetails } 
        : playlist
    ));
  };

  // Add transcript to playlist
  const addToPlaylist = (playlistId, transcript) => {
    setPlaylists(prev => prev.map(playlist => {
      if (playlist.id === playlistId) {
        // Check if transcript already exists in the playlist
        const exists = playlist.transcripts.some(t => t.id === transcript.id);
        if (!exists) {
          return {
            ...playlist,
            transcripts: [...playlist.transcripts, transcript]
          };
        }
      }
      return playlist;
    }));
  };

  // Remove transcript from playlist
  const removeFromPlaylist = (playlistId, transcriptId) => {
    setPlaylists(prev => prev.map(playlist => {
      if (playlist.id === playlistId) {
        return {
          ...playlist,
          transcripts: playlist.transcripts.filter(t => t.id !== transcriptId)
        };
      }
      return playlist;
    }));
  };

  // Get a playlist by ID
  const getPlaylist = (playlistId) => {
    return playlists.find(playlist => playlist.id === playlistId);
  };

  // Open modal to add transcript to playlist
  const openAddToPlaylistModal = (transcript) => {
    setCurrentTranscript(transcript);
    setIsAddToPlaylistModalOpen(true);
  };

  const value = {
    playlists,
    createPlaylist,
    deletePlaylist,
    updatePlaylist,
    addToPlaylist,
    removeFromPlaylist,
    getPlaylist,
    isModalOpen,
    setIsModalOpen,
    isAddToPlaylistModalOpen,
    setIsAddToPlaylistModalOpen,
    currentTranscript,
    openAddToPlaylistModal
  };

  return (
    <PlaylistContext.Provider value={value}>
      {children}
    </PlaylistContext.Provider>
  );
};