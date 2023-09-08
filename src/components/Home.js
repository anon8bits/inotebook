import React from 'react';
import Notes from './Notes';

export default function Home() {
  const centeredDivStyle = {
    textAlign: 'center'
  };

  return (
    <div style={centeredDivStyle}>
      <h1>Welcome to iNoteBook</h1>
      <h3>Your notes on the cloud</h3>
      <Notes />
    </div>
  );
}
