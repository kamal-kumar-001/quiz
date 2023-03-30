import { DragDropContext } from "react-beautiful-dnd";
import Canvas from "../../components/Canvas";
import ComponentList from "../../components/ComponentList";

export default function QuizTemplate() {
  return (
    <div className="bg-gray-100">
        <Canvas />
        {/* <ComponentList /> */}
      <DragDropContext>Components go here</DragDropContext>
    </div>
  );
}
