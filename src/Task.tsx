import React from "react";
import { ChangeEvent, useState } from "react";
interface TaskProp {
  id: number;
  taskName: string;
  complete: boolean;
}

const Task: React.FC = () => {
  const [todolists, settodolist] = useState<TaskProp[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [editingTodo, setEditingTodo] = useState<number | null>(null);
  const [editingTask, setEditingTask] = useState<string>("");
  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
    // console.log(newTask);
  };
  const handleOnclick = () => {
    if (newTask.trim() !== "") {
      const tasks: TaskProp = {
        id: todolists.length === 0 ? 1 : todolists[todolists.length - 1].id + 1,
        taskName: newTask,
        complete: false,
      };
      const newTodoList = [...todolists, tasks];
      console.log(newTodoList);
      settodolist(newTodoList);
    }
    setNewTask("");
  };
  const deleteTask = (id: number) => {
    settodolist(todolists.filter((task) => task.id !== id));
    console.log(todolists);
  };
  const handleComplete = (id: number) => {
    settodolist(
      todolists.map((task) =>
        task.id === id ? { ...task, complete: true } : task
      )
    );
  };
  const handleEditing = (id: number, task: string) => {
    setEditingTodo(id);
    setEditingTask(task);
    console.log(editingTask);
  };
  const handleSubmit = (id: number) => {
    settodolist(
      todolists.map((task) =>
        task.id === id ? { ...task, taskName: editingTask } : task
      )
    );
    setEditingTodo(null);
    setEditingTask("");
  };
  return (
    <>
      <div className="flex justify-center mt-10 gap-2">
        <input
          type="text"
          className="border rounded-lg shadow-lg outline-none p-2"
          onChange={handleOnchange}
          value={newTask}
        />
        <button
          className="bg-blue-400 p-2 rounded-xl shadow-lg"
          onClick={handleOnclick}>
          add Task
        </button>
      </div>
      <div className="mt-4 flex flex-col justify-center items-center">
        {todolists.map((task, index) => (
          <div
            className={`${
              task.complete ? "bg-green-300" : "bg-slate-500"
            } flex  w-[500px] justify-between p-2 m-2 `}
            key={index}>
            {editingTodo === task.id ? (
              <input
                type="text"
                onChange={(e) => setEditingTask(e.target.value)}
                value={editingTask}
                className="border rounded-lg shadow-lg outline-none p-2"
              />
            ) : (
              <div key={index} className="text-pink-400">
                {task.taskName}
              </div>
            )}

            <div>
              <button
                onClick={() => deleteTask(task.id)}
                className="border bg-red-500 px-3 py-1 rounded-lg mr-3">
                X
              </button>
              <button
                className="bg-yellow-500 rounded-lg px-2 py-1 shadow-lg border"
                onClick={() => handleComplete(task.id)}>
                Complete
              </button>
              <button
                className="border border-black bg-white rounded-md px-2 py-1 ml-3"
                onClick={() => handleEditing(task.id, task.taskName)}>
                Edit
              </button>
              <button
                className="border border-black bg-white rounded-md px-2 py-1 ml-3"
                onClick={() => handleSubmit(task.id)}>
                Save
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Task;
