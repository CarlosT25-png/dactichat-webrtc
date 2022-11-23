import { useState } from "react";
import { sendMessageUsingDataChannel } from "../../../util/webRTCHandler";
import SendMessageButton from '../../../images/sendMessageButton.svg';

const NewMessage = () => {
  const [message, setMessage] = useState("");

  const handleTextChange = ev => {
    setMessage(ev.target.value);
  }

  const handleKeyPressed = ev => {
    if (ev.key === 'Enter') {
      ev.preventDefault();

      //send message to other user
      sendMessage();
    }
  }

  const sendMessage = () => {
    if(message.length > 0){
      //Excecute func to sent a message;
      sendMessageUsingDataChannel(message);

      setMessage('');
    }
  }

  return (
    <div className="new_message_container">
      <input
        className="new_message_input"
        value={message}
        onChange={handleTextChange}
        placeholder="Escribe un mensaje"
        type="text"
        onKeyDown={handleKeyPressed}
      />
      <img className="new_message_button" src={SendMessageButton} onClick={sendMessage} />
    </div>
  );
};

export default NewMessage;
