import ChatBody from "./components/ChatBody";
import ChatInput from "./components/ChatInput";
import BubblesContainer from './components/BubblesContainer';
import { useState } from "react";
import { useMutation } from "react-query";
import { fetchResponse } from "./Api";
import { DndProvider } from "react-dnd";   // for dragging effects
import { HTML5Backend } from "react-dnd-html5-backend";   // for dragging effects

function App() {

  //Error message
  const [errorMessage, setErrorMessage] = useState(''); 

//Here are three functions. 
  //1. The first one is used to fetch the response from the server. 
    //`chat` is the state of the chat and 
    //`setChat` is the function that is used to set the state of the chat. 
    //`useState` is a hook that is used to set the state of the chat. The initial value of the chat is an empty array.
  const [chat, setChat] = useState([]);
  
  //2. The second one is used to set the state of the chat and then send the message to the server.
  const mutation = useMutation({
    // `mutationFn` is a function that returns a promise that resolves to the data that will be passed to `onSuccess`.
    mutationFn: () => {
      return fetchResponse(chat);
    },
    onSuccess: (data) =>
      setChat((prev) => [
        ...prev,
        { sender: "ai", message: data.message.replace(/^\n\n/, "") },
      ]),
  });
  
  //3. The third one is used to send the message to the server and then set the state of the chat.
  const sendMessage = async (message) => {
    await Promise.resolve(setChat((prev) => [...prev, message]));
    mutation.mutate();
  };

  const insertPrompt = (promptText) => {
    setChat((prev) => [...prev, { sender: "user", message: promptText }]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-[#1A232E] h-screen py-6 relative sm:px-16 px-12 text-white overflow-hidden flex flex-col justify-between  align-middle">
        {/* gradients */}
        <div className="gradient-01 z-0 absolute"></div>
        <div className="gradient-02 z-0 absolute"></div>

        {/* header */}
        <div className="uppercase font-bold  text-2xl text-center mb-3">
          Marcus GPT
        </div>

        {/* body */}
        <div className="h-[90%] overflow-auto w-full max-w-4xl min-w-[20rem] py-8 px-4 self-center scrollbar-thumb-slate-400 scrollbar-thin scrollbar-track-gray-tranparent scrollbar-thumb-rounded-md">
          <ChatBody chat={chat} />
        </div>

        {/* prompts */}
        <BubblesContainer insertPrompt={insertPrompt} />

        {/* input */
         /*Here we pass the `sendMessage` function and the `loading` prop to the ChatInput component.*/}
        <div className="w-full max-w-4xl min-w-[20rem] self-center">
          <ChatInput sendMessage={sendMessage} loading={mutation.isLoading} />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;