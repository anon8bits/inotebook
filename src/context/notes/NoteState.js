import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const url = 'http://localhost:5000';
  const initNotes = []
  const [notes, setNotes] = useState(initNotes)
  //Get all notes
  const getNotes = async () => {
    const response = await fetch(`${url}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhODJkNGU0M2FkNzkxZWI0Yjk4N2NhIn0sImlhdCI6MTY4ODk3NDMzOX0.Me3KYdxQJ5bNSvwT8UeLqCxM3aZSaIcqiJVbhCIfl8c"
      }
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }
  //Add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${url}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhODJkNGU0M2FkNzkxZWI0Yjk4N2NhIn0sImlhdCI6MTY4ODk3NDMzOX0.Me3KYdxQJ5bNSvwT8UeLqCxM3aZSaIcqiJVbhCIfl8c"
      },
      body: JSON.stringify({ title, description, tag })
    });
    console.log("Adding a new note");
    const note = {
      "_id": "64ef3c8c285f2705b5e31255772",
      "user": "64a82d4e43ad791eb4b987ca",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-08-30T12:56:44.530Z",
      "__v": 0
    }
    setNotes(notes.concat(note));
  }
  //Delete a note
  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }
  //Edit a note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${url}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhODJkNGU0M2FkNzkxZWI0Yjk4N2NhIn0sImlhdCI6MTY4ODk3NDMzOX0.Me3KYdxQJ5bNSvwT8UeLqCxM3aZSaIcqiJVbhCIfl8c"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }

    }
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;