import { useSelector } from 'react-redux';

const Message = ( { author, content, sameAuthor, messageCreatedByMe } ) => {
  const alignClass = messageCreatedByMe ? 'message_align_right' : 'message_align_left';
  const authorText = messageCreatedByMe ? 'Tú' : author;
  const contentAdditionalStyle = messageCreatedByMe ? 'message_right_styles' : 'message_left_styles';

  return ( 
    <div className={`message_container ${alignClass}`}>
      {!sameAuthor && <p className='message_title'>{authorText}</p>}
      <p className={`message_content ${contentAdditionalStyle}`}>{content}</p>
    </div>
  )
}

const Messages = () => {
  const messages = (useSelector(state => state.message.message));

  return (
    <div className='message_container'>
      {messages.map((message, idx) => {
        const sameAuthor = idx > 0 && message.identity === messages[idx -1].identity;

        return (
          <Message key={`${message.content}${idx}`} 
            author={message.identity}
            content={message.content}
            sameAuthor={sameAuthor}
            messageCreatedByMe={
              message.messageCreatedByMe
            }
          />
        )
      })}
    </div>
  );
}

export default Messages;