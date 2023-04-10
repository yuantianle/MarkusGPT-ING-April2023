import React, { useState } from 'react';
import PromptBubble from './PromptBubble';
import AddBubbleSubwindow from './AddBubbleSubwindow';

const BubblesContainer = ({ insertPrompt }) => {
  const [promptBubbles] = useState(['Hello', 'How are you?', 'Goodbye']);
  const [customPromptBubbles, setCustomPromptBubbles] = useState([]);
  const [showSubwindow, setShowSubwindow] = useState(false);

  const addCustomPromptBubble = (customPrompt) => {
    setCustomPromptBubbles((prev) => [...prev, customPrompt]);
  };

  const removeCustomPromptBubble = (indexToRemove) => {
    setCustomPromptBubbles((prev) =>
      prev.filter((_item, index) => index !== indexToRemove)
    );
  };

  const toggleSubwindow = () => {
    setShowSubwindow(!showSubwindow);
  };

  return (
    <div className="mb-2">
      {promptBubbles.concat(customPromptBubbles).map((promptText, index) => (
        <PromptBubble
          key={index}
          promptText={promptText}
          insertPrompt={insertPrompt}
          removable={index >= promptBubbles.length}
          onRemove={() => removeCustomPromptBubble(index - promptBubbles.length)}
        />
      ))}
      <button className="bg-green-500 text-white rounded px-2 ml-2 hover:bg-green-600 transition duration-150" onClick={toggleSubwindow}>
        Add Bubble
      </button>
      {showSubwindow && (
        <div className="absolute bg-gray-100 p-4 rounded-md top-1/2 left-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2">
          <AddBubbleSubwindow addCustomPromptBubble={addCustomPromptBubble} />
          <button className="bg-red-500 text-white rounded px-2 mt-2 hover:bg-red-600 transition duration-150" onClick={toggleSubwindow}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default BubblesContainer;