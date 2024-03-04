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
    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children};
        </NoteContext.Provider>
    )
}

export default NoteState;