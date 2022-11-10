import React from "react";

const Input = ({ placeholder, value, changeHandler }) => {
  return (
    <input
      value={value}
      onChange={changeHandler}
      placeholder={placeholder}
      className="join_room_input"
    />
  );
};

const JoinRoomInputs = (props) => {
  const { roomIdValue, setRoomIdValue, nameValue, setNameValue, isRoomHost } =
    props;

  const handleRoomIdValueChange = (ev) => {
    setRoomIdValue(ev.target.value);
  };

  const handleNameValueChange = (ev) => {
    setNameValue(ev.target.value);
  };

  return (
    <div className="join_room_inputs_container">
      {!isRoomHost && (
        <Input
          value={roomIdValue}
          placeholder="Ingresa el ID de la reunión"
          changeHandler={handleRoomIdValueChange}
        />
      )}
      <Input
        value={nameValue}
        placeholder="Ingresa tu Nombre"
        changeHandler={handleNameValueChange}
      />
    </div>
  );
};

export default JoinRoomInputs;
