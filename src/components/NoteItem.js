import React, {useContext} from 'react';
import noteContext from '../context/notes/noteContext';

const cardBodyStyle = {
    textAlign: 'left',
};

const NoteItem = (props) => {
    const { note } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;
    return (
        <div className='col-md-3'>
            <div className='card mx-3 my-3'>
                <div className='card-body' style={cardBodyStyle}>
                    <div className='row align-items-center'>
                        <div className='col-8'>
                            <h5 className='card-title'>{note.title}</h5>
                        </div>
                        <div className='col-4 text-left'>
                            <i className='fa-solid fa-trash mx-2' onClick={()=>{deleteNote(note._id)}}></i>
                            <i className="fa-solid fa-pen-to-square mx-2"></i>
                        </div>
                    </div>
                    <p className='card-text'>{note.description}</p>
                </div>
            </div>
        </div>
    );
};

export default NoteItem;
