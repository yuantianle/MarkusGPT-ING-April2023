import { useDrag } from "react-dnd";
import { ItemTypes } from "./Constants/itemTypes";

const DraggablePromptBubble = ({ promptText }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.PROMPT_BUBBLE,
    item: { promptText },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="bg-blue-500 text-white rounded px-2 py-1 mr-2 mb-2 inline-block cursor-pointer hover:bg-blue-600 transition duration-150"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {promptText}
    </div>
  );
};

export default DraggablePromptBubble;