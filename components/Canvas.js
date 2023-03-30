import React,{useState} from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Card from './Card';

const Canvas = () => {
  const [cards, setCards] = useState([]);

  const handleDragEnd = (result) => {
    // update state based on where the draggable component was dropped
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="canvas">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {cards.map((card, index) => (
              <Card key={card.id} id={card.id} text={card.text} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Canvas;
