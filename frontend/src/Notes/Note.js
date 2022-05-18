import React from 'react';

const Note = ({ note, toggleImportance, onClickDelete }) => {

  const label = note.important
    ? 'Set NOT Important' : 'Set Important';

  let isBold = !note.important ? { fontWeight: '100' } : { fontWeight: '600' };

  return (
    <li>
      <label style={isBold}>{note.content}</label>
      <span>   --   </span>
      <button onClick={toggleImportance}>{label}</button>
      <button onClick={onClickDelete} style={{
        margin: '2px',
        color: 'white',
        fontWeight: '600',
        borderRadius: '3px',
        backgroundColor: 'orangered',
      }}>Delete</button>
    </li>
  );
};

export default Note;