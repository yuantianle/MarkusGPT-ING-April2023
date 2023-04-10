import React, { useState } from 'react';

const AddBubbleSubwindow = ({ addCustomPromptBubble }) => {
  const [customPrompt, setCustomPrompt] = useState('');

  const handleAddCustomPrompt = () => {
    if (customPrompt === '') return;
    addCustomPromptBubble(customPrompt);
    setCustomPrompt('');
  };

  return (
    <div className="bg-black bg-opacity-90 p-4 rounded-lg">
      <label htmlFor="customPrompt" className="block mb-1">
        Custom Prompt:
      </label>
      <input
        id="customPrompt"
        type="text"
        className="border border-gray-400 rounded p-1 text-black"
        value={customPrompt}
        onChange={(e) => setCustomPrompt(e.target.value)}
      />
      <button className="bg-blue-500 text-white rounded px-2 ml-2 hover:bg-blue-600 transition duration-150" onClick={handleAddCustomPrompt}>
        Add
      </button>
    </div>
  );
};

export default AddBubbleSubwindow;