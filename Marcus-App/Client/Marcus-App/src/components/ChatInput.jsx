import React from "react";
import { useState } from "react";

//`sendMessage` is a function that is passed down from the App.jsx component. It is used to send the message to the chat body component. The `loading` prop is used to show a loading gif when the message is being sent to the server.
const ChatInput = ({ sendMessage, loading }) => {
  const [value, setValue] = useState("");

  //When the user clicks on the send button or presses enter key the message is sent to the chat ChatBody component and the input is cleared out for the next message to be typed in. 
  const handleSubmit = () => {
    if (value === "") return;
    sendMessage({ sender: "user", message: value });
    setValue("");
  };


  return (
    <div
      className="w-full bg-white bg-opacity-10 max-h-40 rounded-lg px-4
    py-4 overflow-auto relative"
    >
      {loading ? (
        <img src="./loader.gif" className="w-8 m-auto" />
      ) : (
        <>
          <textarea
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
            className="absolute top-4
        right-3 hover:cursor-pointer ease-in duration-100 hover:scale-125
        "
          />
        </>
      )}
    </div>
  );
};

export default ChatInput;