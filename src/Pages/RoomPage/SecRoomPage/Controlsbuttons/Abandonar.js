import './Buttons.css';

const Abandonar = () => {

  const onLeaveRoom = () => {
    const siteUrl = window.location.origin;
    window.location.href = siteUrl;
  }

  return (
    <div className="btn-abandonar" onClick={onLeaveRoom}>
      <span>Abandonar</span>
    </div>
  );
}

export default Abandonar;