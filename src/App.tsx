import { CheckIcon, Cross1Icon, Cross2Icon, Pencil1Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import "./App.css";
import logo from "./assets/lexmeet_logo.png";
import { sampleTasks, Task, TaskListProps } from "./types/task";
import { colors } from "./constants/constants";
import { useState } from "react";
import BootstrapModal from "./components/BootstrapModal";
import { formatToLocalISOString } from "./utils/utils";

function App() {
  const [tasks, setTasks] = useState<Task[]>(structuredClone(sampleTasks));
  const [newTask, setNewTask] = useState<{ text: string; dueDate: Date | undefined }>({
    text: "",
    dueDate: undefined,
  });

  function setTasksDone(tasks: Task[]): Task[] {
    return tasks.map((task) => (task.completedAt ? task : { ...task, completedAt: new Date(), updatedAt: new Date() }));
  }

  function setTasksUndone(tasks: Task[]): Task[] {
    return tasks.map((task) => ({ ...task, completedAt: undefined, updatedAt: new Date() }));
  }

  function groupDeleteIncompleteTasks(tasks: Task[]): Task[] {
    const temp = [...tasks];
    const newTasks = temp.filter((task) => Boolean(task.completedAt));
    return newTasks;
  }

  function groupDeleteCompleteTasks(tasks: Task[]): Task[] {
    const temp = [...tasks];
    const newTasks = temp.filter((task) => Boolean(!task.completedAt));
    return newTasks;
  }

  function switchTaskCompletedAt(taskId: number) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, updatedAt: new Date(), completedAt: task.completedAt ? undefined : new Date() }
          : task
      )
    );
  }

  function modifyTaskDueDate(taskId: number, date: Date | undefined) {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, updatedAt: new Date(), dueDate: date } : task))
    );
  }

  function modifyTaskText(taskId: number, text: string) {
    if (!text) return;
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, updatedAt: new Date(), text: text } : task))
    );
  }

  function deleteTask(taskId: number) {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  }

  function createTask() {
    if (newTask.text === "") return;
    const _newTask: Task = {
      ...newTask,
      id: getNextId(),
      completedAt: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log(_newTask);
    console.log(tasks);
    setTasks((prev) => [...prev, _newTask]);
  }

  function getNextId(): number {
    let highestId = 0;
    tasks.forEach((task) => {
      if (task.id > highestId) highestId = task.id;
    });
    return ++highestId;
  }

  return (
    <main className="main">
      <header id="app-header">
        <div className="title">
          <div id="modified-logo">
            <img src={logo} alt="LexMeet Inc." id="lexmeet_logo" />
            <h5 id="todo_logo">My TODO</h5>
          </div>
        </div>
        <div id="header-newtask-input-container">
          <div className="input-group">
            <span className="input-group-text">New Task:</span>
            <input
              type="text"
              className="form-control"
              placeholder="Task Name"
              value={newTask.text}
              onChange={(e) => setNewTask((prev) => ({ ...prev, text: e.target.value }))}
            />
            <input
              type="datetime-local"
              className="form-control"
              value={newTask.dueDate ? formatToLocalISOString(newTask.dueDate) : ""}
              onChange={(e) => {
                setNewTask((prev) => ({ ...prev, dueDate: new Date(e.target.value) }));
              }}
            />
            <button
              className="btn outline-light hover-outline"
              onClick={() => setNewTask({ text: "", dueDate: undefined })}
            >
              Clear
            </button>
          </div>
          <button className="btn outline-light hover-outline center" onClick={() => createTask()}>
            <PlusIcon height={20} width={20} />
          </button>
        </div>
      </header>
      <div className="mt-5 container-fluid row list">
        <div className="col list-container">
          <TaskList
            title="pending"
            tasks={tasks
              .filter((task) => task.completedAt === undefined)
              .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())}
            colorTheme={colors.brand.orange}
            action1={{
              display: <CheckIcon height={30} width={30} />,
              action: () => setTasks((prev) => setTasksDone(prev)),
            }}
            action2={{
              display: <TrashIcon height={27} width={27} />,
              action: () => setTasks((prev) => groupDeleteIncompleteTasks(prev)),
            }}
          />
        </div>
        <div className="col list-container">
          <TaskList
            title="completed"
            tasks={tasks
              .filter((task) => task.completedAt !== undefined)
              .sort((a, b) => (a.completedAt?.getTime() ?? 0) - (b.completedAt?.getTime() ?? 0))}
            colorTheme={colors.brand.purple}
            action1={{
              display: <Cross2Icon height={28} width={28} />,
              action: () => setTasks((prev) => setTasksUndone(prev)),
            }}
            action2={{
              display: <TrashIcon height={27} width={27} />,
              action: () => setTasks((prev) => groupDeleteCompleteTasks(prev)),
            }}
          />
        </div>
      </div>
    </main>
  );

  function TaskList(props: TaskListProps) {
    const [massHover, setMassHover] = useState<boolean>(false);
    const [listHovered, setListHovered] = useState<boolean>(false);

    return (
      <div
        className={`tasklist ${props.className}`}
        onMouseEnter={() => setListHovered(true)}
        onMouseLeave={() => setListHovered(false)}
      >
        <div
          className="tasklist-title"
          style={{
            borderColor: `${listHovered ? `rgb(${props.colorTheme})` : "transparent"}`,
            backgroundColor: `rgba(${props.colorTheme}, 0.20)`,
          }}
        >
          <span>{props.title}</span>
          <div className="tasklist-massactions">
            {props.action1 && (
              <button
                className="tasklist-massactions-done hover-outline"
                onMouseEnter={() => setMassHover(true)}
                onMouseLeave={() => setMassHover(false)}
                onClick={() => props.action1?.action()}
              >
                {props.action1.display}
              </button>
            )}
            {props.action2 && (
              <button
                className="tasklist-massactions-delete hover-outline"
                onMouseEnter={() => setMassHover(true)}
                onMouseLeave={() => setMassHover(false)}
                onClick={() => props.action2?.action()}
              >
                {props.action2.display}
              </button>
            )}
          </div>
        </div>

        <ul className="tasklist-list">
          {props.tasks.map((task: Task) => (
            <TaskListItem key={task.id} task={task} />
          ))}
        </ul>
      </div>
    );

    function TaskListItem({ task }: { task: Task }) {
      const [hovered, setHovered] = useState<boolean>(false);
      const [taskString, setTaskString] = useState<string>(task.text);
      const [datetime, setDatetime] = useState<Date | null>(task.dueDate instanceof Date ? task.dueDate : null);

      return (
        <li
          className={`tasklist-list-item ${massHover && "tasklist-list-item-masshover"}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="tasklist-list-item-checkbox">
            <input
              type="checkbox"
              hidden
              checked={task.completedAt ? true : false}
              id={`checkbox${task.id}`}
              onChange={() => switchTaskCompletedAt(task.id)}
            />
            <label className="tasklist-list-item-checkbox-square" htmlFor={`checkbox${task.id}`} />
            {task.completedAt && (
              <CheckIcon className={`tasklist-list-item-checkbox-checkicon`} height={45} width={45} />
            )}
          </div>
          <div
            className={`tasklist-list-item-text ${task.completedAt && "strikethrough"} ${
              massHover && !task.completedAt ? "strikethrough" : null
            }`}
          >
            {task.text}

            {task.dueDate && (
              <>
                <br />
                <span className="tasklist-list-item-text-duedate">{task.dueDate.toLocaleString()}</span>
              </>
            )}
          </div>
          <div className="tasklist-list-item-controls-container">
            <BootstrapModal
              button={{
                className: `tasklist-list-item-edit tasklist-list-item-controls ${hovered && "visible"}`,
                children: <Pencil1Icon height={20} width={20} />,
              }}
              title="Edit Task"
              posActionName="Save"
              posAction={(setVisible) => {
                modifyTaskText(task.id, taskString);
                modifyTaskDueDate(task.id, datetime ? datetime : undefined);
                setVisible(false);
              }}
            >
              <div className="task-control-container">
                <div className="input-group">
                  <span className="input-group-text">Title:</span>
                  <input
                    type="text"
                    className="form-control"
                    value={taskString}
                    onChange={(e) => setTaskString(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <span className="input-group-text">Due Date:</span>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={datetime ? formatToLocalISOString(datetime) : ""}
                    onChange={(e) => {
                      setDatetime(new Date(e.target.value));
                      console.log(e.target.value);
                    }}
                  />
                </div>
              </div>
            </BootstrapModal>
            <button
              className={`tasklist-list-item-delete tasklist-list-item-controls ${hovered && "visible"}`}
              onClick={() => deleteTask(task.id)}
            >
              <Cross1Icon height={20} width={20} />
            </button>
          </div>
        </li>
      );
    }
  }
}

export default App;
