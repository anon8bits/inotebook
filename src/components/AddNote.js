import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: '', description: '', tag: 'default' });

    const handleClick = (e) => {
        // Remove the preventDefault() to allow form submission
        // e.preventDefault();
        if (!note.title.trim() && !note.description.trim()) {
            alert('Please fill in both the title and description.');
            return;
        }
        addNote(note.title, note.description, note.tag);
        setNote({ title: '', description: '', tag: 'default' });
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <div className="container">
            <div className="row justify-content-center my-5">
                <div className="col-md-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={note.title}
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <textarea
                            className="form-control"
                            name="description"
                            id="description"
                            value={note.description}
                            onChange={onChange}
                            rows="3"
                        ></textarea>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={handleClick}>
                        Add Note
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddNote;
