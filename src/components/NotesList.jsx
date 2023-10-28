import React from "react";
import NotesItem from "./NotesItem";

function NotesList({ notes, onDelete, onArchive }) {
  return (
    <div className='notes-list'>
      {notes.length === 0 ? (
        <div className='notes-list__empty-message'>Tidak ada catatan</div>
      ) : (
        notes.map((note) => <NotesItem key={note.id} id={note.id} onDelete={onDelete} onArchive={() => onArchive(note.id)} {...note} />)
      )}
    </div>
  );
}

export default NotesList;
