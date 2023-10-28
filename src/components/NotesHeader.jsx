import React from "react";

function Header({ notes, searchNotes, setInputSearchValue, setActiveNotesUpperKeyword }) {
  const onSearchNotes = (event) => {
    const inputValue = event.target.value.toUpperCase();
    setInputSearchValue(inputValue);

    const activeNotesUpperKeyword = notes.filter((note) => note.title.toUpperCase().includes(inputValue));
    setActiveNotesUpperKeyword(activeNotesUpperKeyword);
  };

  return (
    <div className='note-app__header'>
      <h1>Notes</h1>
      <form>
        <input className='input-notes__search' id='search' type='search' placeholder='Search...' value={searchNotes} onChange={onSearchNotes} />
      </form>
    </div>
  );
}

export default Header;
