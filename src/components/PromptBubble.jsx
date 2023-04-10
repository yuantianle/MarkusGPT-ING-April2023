import React from "react";
import DraggablePromptBubble from "./DraggablePromptBubble";

const PromptBubble = ({ promptText, insertPrompt, removable, onRemove }) => {
  const handleDoubleClick = () => {
    insertPrompt(promptText);
  };

  return (
    <div
      className="inline-block"
      onDoubleClick={handleDoubleClick}
    >
      <DraggablePromptBubble promptText={promptText} />
      {removable && (
        <span
          className="text-red-500 ml-2 cursor-pointer hover:text-red-700 transition duration-150"
          onClick={onRemove}
        >
          ×
        </span>
      )}
    </div>
  );
};

export default PromptBubble;