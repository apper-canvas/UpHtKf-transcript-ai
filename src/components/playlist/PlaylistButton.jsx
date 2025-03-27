import { FolderPlus } from 'lucide-react';
import { usePlaylist } from '../../context/PlaylistContext';

const PlaylistButton = ({ transcript }) => {
  const { openAddToPlaylistModal } = usePlaylist();

  const handleClick = () => {
    openAddToPlaylistModal(transcript);
  };

  return (
    <button
      onClick={handleClick}
      className="btn btn-outline py-1.5 px-3 text-sm gap-1"
      aria-label="Add to playlist"
      title="Add to playlist"
    >
      <FolderPlus size={14} />
      Playlist
    </button>
  );
};

export default PlaylistButton;