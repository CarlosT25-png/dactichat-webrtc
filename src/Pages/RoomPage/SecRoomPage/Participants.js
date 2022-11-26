import { useSelector } from 'react-redux';
import { FiClipboard } from 'react-icons/fi';
import styles from './Participants.module.css';
import './Controlsbuttons/Buttons.css';

const Participants = () => {
  const participants = useSelector(state => state.room.participants);
  const roomId = useSelector(state => state.room.roomId); 

  const handleShareRoomId = () => {
    navigator.clipboard.writeText(roomId);
  }

  return (
    <div className={styles['participants-container']}>
      <div className={styles['title-container']}>
        <h3>Participantes</h3>
      </div>
      
      <div className={styles['btn-agregar-participantes']} onClick={handleShareRoomId}>Compartir Reunión <FiClipboard className='share-id-button_svg' /></div>
      <div>
        <ul>
          {participants.map((item, idx) => {
            return <li className={styles.participant} key={idx}>
              <div className={styles['participant__badge']}>
                {item.identity[0]}
              </div>
              <span className={styles['participant__name']}>{item.identity}</span>
            </li>
          })}
        </ul>
      </div>
    </div>
  );
}

export default Participants;