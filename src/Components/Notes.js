import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = (props) => {
    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context;

    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ _id: "", title: "", description: "", tag: "" })

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote(currentNote);
    }

    const handleClick = (e) => {
        editNote(note._id, note.title, note.description, note.tag);
        refClose.current.click();
        props.showAlert("Note Updated!", "success");
    }

    const onChange = (e) => {
        const fieldName = e.target.name;  // Get the name attribute of the input
        const fieldValue = e.target.value; // Get the current value in the input

        // Update the 'note' state with the new input value for the specific field
        setNote((prevNote) => {
            const updatedNote = { ...prevNote }; // Create a copy of the current 'note'

            // Update the specific field in the 'note' copy
            if (fieldName === "editTitle") {
                updatedNote.title = fieldValue;
            } else if (fieldName === "editDescription") {
                updatedNote.description = fieldValue;
            } else if (fieldName === "editTag") {
                updatedNote.tag = fieldValue;
            }

            return updatedNote; // Return the updated 'note' copy
        });
    };



    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="editTitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="editTitle" name="editTitle" value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={3} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="editDescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="editDescription" name="editDescription" value={note.description} onChange={onChange} minLength={3} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="editTag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="editTag" name="editTag" value={note.tag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h2>Your Notes</h2>
                <div className="container">
                    {notes.length === 0 && "Nothing To Display..."}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes