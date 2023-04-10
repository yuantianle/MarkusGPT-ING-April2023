import React, { useState } from 'react';
import { ItemTypes } from "./Constants/ItemTypes";
import { useDrop } from "react-dnd";

//`sendMessage` is a function that is passed down from the App.jsx component. It is used to send the message to the chat body component. The `loading` prop is used to show a loading gif when the message is being sent to the server.
const ChatInput = ({ inputValue, setInputValue, sendMessage, loading }) => {
  // Add a new state for the input value
  const [value, setValue] = useState("");


  //When the user clicks on the send button or presses enter key the message is sent to the chat ChatBody component and the input is cleared out for the next message to be typed in. 
  const handleSubmit = () => {
    if (value === "") return;
    sendMessage({ sender: "user", message: value });
    setValue("");
  };

  //When the user drags and drops a prompt bubble into the input field, the prompt bubble is inserted into the input field.
  const handleDrop = (e) => {
    e.preventDefault();
    const insertedText = e.dataTransfer.getData('text/plain');
    const start = e.target.selectionStart;
    const end = e.target.selectionEnd;
    setValue(value.slice(0, start) + insertedText + value.slice(end));
  };

  //This is the code for the drag and drop effect.
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.PROMPT_BUBBLE,
    drop: (item) => setValue((prev) => prev + item.promptText),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
    ref={drop}
    className="w-full bg-white bg-opacity-10 max-h-40 rounded-lg px-4 py-4 overflow-auto relative"
    style={{ borderColor: isOver ? "red" : "transparent", borderWidth: 2 }}
  >  
    <div className="w-full bg-white bg-opacity-10 max-h-40 rounded-lg px-4 py-4 overflow-auto relative">
      {loading ? (
        <img src="./loader.gif" className="w-8 m-auto" />
      ) : (
        <>
          <textarea
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onKeyDown={(e) => {
              e.keyCode === 13 && e.shiftKey === false && handleSubmit();
            }}
            rows={1}
            className="border-0 bg-transparent outline-none w-11/12"
            value={value}
            type="text"
            onChange={(e) => setValue(e.target.value)}
          />
          <img
            onClick={handleSubmit}
            src="./send.png"
            width={20}
            alt="send-button"
            className="absolute top-4 right-3 hover:cursor-pointer ease-in duration-100 hover:scale-125"
            />
          </>
        )}
    </div>
  </div>
    );    
  
};

export default ChatInput;