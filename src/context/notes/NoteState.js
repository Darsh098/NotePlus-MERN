import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000/"
    const notesIntial = [];
    const [notes, setNotes] = useState(notesIntial)

    // Get All Notes
    const getNotes = async () => {
        // API Call
        const url = `${host}api/notes/fetchnotes`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlMWQ1NGNmNDY0NzMwMGM2NDY3N2VhIn0sImlhdCI6MTcwOTUzMjcxMH0.hSOK9Wzn4-qsaeuCUI2d3_MnS8PS9ipr0U2zcI3dsPk'
            }
        });
        const json = await response.json();
        setNotes(json);
    }

    // Add A Note
    const addNote = async (title, description, tag) => {
        // API Call
        const url = `${host}api/notes/addnote`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlMWQ1NGNmNDY0NzMwMGM2NDY3N2VhIn0sImlhdCI6MTcwOTUzMjcxMH0.hSOK9Wzn4-qsaeuCUI2d3_MnS8PS9ipr0U2zcI3dsPk'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    }

    // Edit A Note
    const editNote = async (id, title, description, tag) => {
        // API Call
        const url = `${host}api/notes/updatenote/${id}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlMWQ1NGNmNDY0NzMwMGM2NDY3N2VhIn0sImlhdCI6MTcwOTUzMjcxMH0.hSOK9Wzn4-qsaeuCUI2d3_MnS8PS9ipr0U2zcI3dsPk'
            },
            body: JSON.stringify({ title, description, tag })
        });

        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            if (newNotes[index]._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    // Delete A Note
    const deleteNote = async (id) => {
        // API Call
        const url = `${host}api/notes/deletenote/${id}`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlMWQ1NGNmNDY0NzMwMGM2NDY3N2VhIn0sImlhdCI6MTcwOTUzMjcxMH0.hSOK9Wzn4-qsaeuCUI2d3_MnS8PS9ipr0U2zcI3dsPk'
            }
        });
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }


    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
            {props.children};
        </NoteContext.Provider>
    )
}

export default NoteState;