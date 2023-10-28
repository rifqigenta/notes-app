import React from "react";
// import { createRoot } from "react-dom/client";
import Header from "./NotesHeader";
import { getInitialData } from "../utils/data";
import NoteInput from "./NotesInput";
import NotesList from "./NotesList";

class NotesApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getInitialData(),
      archivedNotes: [],
      searchNotes: "",
      activeNotesUpperKeyword: [],
    };
    this.onAddNotesHandler = this.onAddNotesHandler.bind(this);
    this.onDeleteNotesHandler = this.onDeleteNotesHandler.bind(this);
    this.onArchiveNotesHandler = this.onArchiveNotesHandler.bind(this);
    this.onActivateNotesHandler = this.onActivateNotesHandler.bind(this);
    this.setInputSearchValue = this.setInputSearchValue.bind(this);
    this.setActiveNotesUpperKeyword = this.setActiveNotesUpperKeyword.bind(this);
  }
  onAddNotesHandler({ title, body }) {
    const date = new Date();
    this.setState((prevState) => {
      return {
        notes: [
          ...prevState.notes,
          {
            id: +new Date(),
            title,
            body,
            createdAt: date.toISOString(),
            archived: false,
          },
        ],
      };
    });
  }

  onDeleteNotesHandler(id) {
    const { notes, archivedNotes } = this.state;
    const notesState = notes.filter((note) => note.id !== id);
    const archivedNotesState = archivedNotes.filter((note) => note.id !== id);

    this.setState({
      notes: notesState,
      archivedNotes: archivedNotesState,
    });
  }

  onArchiveNotesHandler(id) {
    const { notes, archivedNotes } = this.state;
    const notesState = this.state.notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          archived: !note.archived,
        };
      }
      return note;
    });

    const archivedNote = notesState.find((note) => note.id === id);

    if (archivedNote) {
      this.setState({
        notes: notesState.filter((note) => note.id !== id),
        archivedNotes: [...archivedNotes, archivedNote],
      });
    }
  }

  onActivateNotesHandler(id) {
    const { notes, archivedNotes } = this.state;
    const archivedNotesState = this.state.archivedNotes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          archived: false,
        };
      }
      return note;
    });

    const notesState = archivedNotesState.find((note) => note.id === id);

    if (notesState) {
      this.setState({
        archivedNotes: archivedNotesState.filter((note) => note.id !== id),
        notes: [...notes, notesState],
      });
    }
  }

  searchArchivedNotes = (inputValue) => {
    const { archivedNotes } = this.state;
    const filteredArchivedNotes = archivedNotes.filter((note) => note.title.toUpperCase().includes(inputValue.toUpperCase()));
    return filteredArchivedNotes;
  };

  setInputSearchValue(inputKeyword) {
    this.setState({ searchNotes: inputKeyword });
  }

  setActiveNotesUpperKeyword(activeNotesUpperKeyword) {
    this.setState({ activeNotesUpperKeyword });
  }

  render() {
    return (
      <>
        <Header searchNotes={this.state.searchNotes} setInputSearchValue={this.setInputSearchValue} notes={this.state.notes} setActiveNotesUpperKeyword={this.setActiveNotesUpperKeyword} />
        <div className='note-app__body'>
          {/* <h2>Buat Catatan</h2> */}
          <NoteInput notes={this.onAddNotesHandler} />
          <h2>Catatan Aktif</h2>
          <NotesList
            notes={this.state.activeNotesUpperKeyword.length > 0 ? this.state.activeNotesUpperKeyword : this.state.notes}
            onDelete={this.onDeleteNotesHandler}
            onArchive={this.onArchiveNotesHandler}
          />
          <h2>Arsip</h2>
          <NotesList
            notes={this.state.archivedNotes.length > 0 ? this.searchArchivedNotes(this.state.searchNotes) : this.state.archivedNotes}
            onDelete={this.onDeleteNotesHandler}
            onArchive={this.onActivateNotesHandler}
          />
        </div>
      </>
    );
  }
}

export default NotesApp;
