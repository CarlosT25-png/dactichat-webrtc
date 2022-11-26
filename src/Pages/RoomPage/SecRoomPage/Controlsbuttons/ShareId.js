import { useSelector } from 'react-redux';
import { FiClipboard } from 'react-icons/fi';
import './Buttons.css';

const ShareId = () => {
  const roomId = useSelector(state => state.room.roomId);

  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(roomId);
  }

  return (
    <div className='share-id-button' onClick={handleCopyRoomId}>
      <span>Compartir Reunión</span>
      <FiClipboard className='share-id-button_svg' />
    </div>
  );
}

export default ShareId;