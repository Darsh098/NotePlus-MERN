import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const notesIntial = [
        {
            "_id": "65e576373dba92624eea2793",
            "user": "65e1d54cf4647300c64677ea",
            "title": "My Title",
            "description": "My Description",
            "tag": "Personal",
            "Date": "2024-03-04T07:20:23.725Z",
            "__v": 0
        },
        {
            "_id": "65e5b9bfa10d4f400d20a7b2",
            "user": "65e1d54cf4647300c64677ea",
            "title": "New  3 Title",
            "description": "New 3 Description",
            "tag": "Personal",
            "Date": "2024-03-04T12:08:31.979Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(notesIntial)

    // Add A Note
    const addNote = (title, description, tag) => {
        const note = {
            "_id": "65e5b9dbfa10d4f400d20a7b2",
            "user": "65e1d54cf4647300c64677ea",
            "title": title,
            "description": description,
            "tag": tag,
            "Date": "2024-03-04T12:08:31.979Z",
            "__v": 0
        };
        setNotes(notes.concat(note));
    }

    // Edit A Note
    const editNote = (id, title, description, tag) => {

    }

    // Delete A Note
    const deleteNote = (id) => {
        console.log("Deleting The Node With Id: " + id);
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }


    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote }}>
            {props.children};
        </NoteContext.Provider>
    )
}

export default NoteState;