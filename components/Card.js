import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Card = ({ id, text }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div>{text}</div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
