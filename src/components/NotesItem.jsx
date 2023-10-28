import React from "react";
import NotesItemContent from "./NotesItemContent";
import DeleteButton from "./DeleteButton";
import ArchiveButton from "./ArchiveButton";

function NotesItem({ title, createdAt, body, archived, onDelete, id, onArchive }) {
  return (
    <div className='note-item'>
      <NotesItemContent title={title} createdAt={createdAt} body={body} />
      <div className='note-item__action'>
        <DeleteButton id={id} onDelete={onDelete} />
        <ArchiveButton id={id} onArchive={onArchive} archived={archived} />
      </div>
    </div>
  );
}

export default NotesItem;
