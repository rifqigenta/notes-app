import React, { useState } from "react";

class NoteInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      charLimit: "",
      charLimitExceeded: "",
    };
    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    // const [limitChar, setLimitChar] = useState("");
    // const [exceededLimitChar, setExceededLimitChar] = useState("");
    // const handleChange = () => {
    //   if (event.target.value.length > 50) {
    //     setLimitChar(event.target.value);
    //     setExceededLimitChar("Batas Jumlah Input Karakter Tercapai !");
    //   } else {
    //     setLimitChar(event.target.value);
    //     setExceededLimitChar(null);
    //   }
    // };
    // this.setState(() => {
    //   return {
    //     title: event.target.value,
    //   };
    // });
    const value = event.target.value;
    if (value.length >= 50) {
      this.setState({
        // title: value,
        charLimit: value,
        charLimitExceeded: "Batas Jumlah Input Karakter Tercapai !",
      });
    } else {
      this.setState({
        title: value,
        charLimit: value,
        charLimitExceeded: null,
      });
    }
  }
  onBodyChangeEventHandler(event) {
    this.setState(() => {
      return {
        body: event.target.value,
      };
    });
  }
  onSubmitEventHandler(event) {
    event.preventDefault();
    if (!this.props.searchNotes) {
      this.props.notes(this.state);
      this.setState({
        title: "",
        body: "",
        charLimit: "",
        charLimitExceeded: "",
      });
    }
  }

  render() {
    return (
      <div className='note-input__body'>
        <form className='note-input' onSubmit={this.onSubmitEventHandler}>
          <h2 className='note-input__title'>Buat Catatan</h2>
          <p htmlFor='title' className='note-input__title__char-limit'>
            Sisa Karakter:{50 - this.state.charLimit.length}
          </p>
          <input type='text' id='title' placeholder='Ini adalah judul ...' value={this.state.title} onChange={this.onTitleChangeEventHandler} />
          {this.state.charLimitExceeded && <p className='note-input__char-limit-exceeded'>{this.state.charLimitExceeded}</p>}
          <textarea type='text' id='textarea-body' placeholder='Tuliskan catatanmu di sini ...' value={this.state.body} onChange={this.onBodyChangeEventHandler} />
          <button type='submit'>Buat</button>
        </form>
      </div>
    );
  }
}

export default NoteInput;
