const RoomLabel = ({ roomId }) => {

  const setClipboardHandler = () => {
    navigator.clipboard.writeText(roomId);
  }

  return (
    <div className="room_label">
      <p className="room_label_paragraph" onClick={setClipboardHandler}>ID: {roomId}</p>
    </div>
  );
};

export default RoomLabel;
