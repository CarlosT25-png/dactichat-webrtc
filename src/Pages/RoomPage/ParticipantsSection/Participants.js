import { useSelector } from "react-redux";

const SingleParticipant = (props) => {
  const { identity, lastItem, participant } = props;

  return (
    <>
      <p className="participants_paragraph">{identity}</p>
      {!lastItem && <span className="participants_separator_line"></span>}
    </>
  );
};

const Participants = () => {
  const participants = useSelector(state => state.room.participants);

  return (
    <div className="participants_container">
      {participants.map((participant, idx) => (
        <SingleParticipant
          key={idx}
          identity={participant.identity}
          lastItem={participants.length === idx + 1}
          participant={participant}
        />
      ))}
    </div>
  );
};

export default Participants;
