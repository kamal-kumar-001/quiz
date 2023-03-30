import { Draggable } from "react-beautiful-dnd";

export default function ComponentList() {
  const components = [
    { id: "card", name: "Card" },
    { id: "button", name: "Button" },
    { id: "input", name: "Input" },
    // Add more components here
  ];

  return (
    <div className="bg-gray-200 w-1/4 p-4">
      <h2 className="text-xl font-bold mb-4">Components</h2>
      {components.map((component, index) => (
        <Draggable key={component.id} draggableId={component.id} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="bg-white p-4 rounded-md shadow mb-4"
            >
              {component.name}
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
}
