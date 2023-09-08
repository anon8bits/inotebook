import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const url = '0.0.0.0:5000';
  const initNotes = [
    {
      "_id": "64ac12fc0238e4551d2028f2",
      "user": "64a82d4e43ad791eb4b987ca",
      "title": "My title",
      "description": "Wake up early",
      "tag": "Personal",
      "date": "2023-07-10T08:17:54.039Z",
      "__v": 0
    },
    {
      "_id": "64ef3c8c285f4270be3125577",
      "user": "64a82d4e43ad791eb4b987ca",
      "title": "My title",
      "description": "Pack lunch",
      "tag": "Personal",
      "date": "2023-08-30T12:56:44.530Z",
      "__v": 0
    }
    ,
    {
      "_id": "64ef3c8c2852f2470be3125577",
      "user": "64a82d4e43ad791eb4b987ca",
      "title": "My title",
      "description": "Pack lunch",
      "tag": "Personal",
      "date": "2023-08-30T12:56:44.530Z",
      "__v": 0
    },
    {
      "_id": "64ef3c8c285f2701be31245577",
      "user": "64a82d4e43ad791eb4b987ca",
      "title": "My title",
      "description": "Wake up early",
      "tag": "Personal",
      "date": "2023-08-30T12:56:44.530Z",
      "__v": 0
    },
    {
      "_id": "64ef3c8c285f2705b1e3125577",
      "user": "64a82d4e43ad791eb4b987ca",
      "title": "My title",
      "description": "Pack lunch",
      "tag": "Personal",
      "date": "2023-08-30T12:56:44.530Z",
      "__v": 0
    }
  ]
  const [notes, setNotes] = useState(initNotes)
  //Add a note
  const addNote = async(title, description, tag) => {
    const response = await fetch(`${url}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":"64ac12fc0238e4551d2028f2"
      },
      body: JSON.stringify({title, description, tag})
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
        "auth-token":"64ac12fc0238e4551d2028f2"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json =  response.json();
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
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;