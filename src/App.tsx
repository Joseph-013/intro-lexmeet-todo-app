import { CheckIcon, Cross1Icon, Pencil1Icon } from "@radix-ui/react-icons";
import "./App.css";
import logo from "./assets/lexmeet_logo.png";
import { sampleTasks, Task } from "./types/task";
import { colors } from "./constants/constants";
import { useState } from "react";
import BootstrapModal from "./components/BootstrapModal";

function App() {
  const [tasks, setTasks] = useState<Task[]>(structuredClone(sampleTasks));

  function setTasksDone(tasks: Task[]): Task[] {
    return tasks.map((task) => (task.completedAt ? task : { ...task, completedAt: new Date() }));
  }

  function setTasksUndone(tasks: Task[]): Task[] {
    return tasks.map((task) => ({ ...task, completedAt: undefined }));
  }

  function groupDeleteIncompleteTasks(tasks: Task[]) {
    const temp = [...tasks];
    const newTasks = temp.filter((task) => Boolean(task.completedAt));
    return newTasks;
  }

  function groupDeleteCompleteTasks(tasks: Task[]) {
    const temp = [...tasks];
    const newTasks = temp.filter((task) => Boolean(!task.completedAt));
    return newTasks;
  }

  console.log(tasks);

  return (
    <main className="main">
      <div className="title">
        <div id="modified-logo">
          <img src={logo} alt="LexMeet Inc." id="lexmeet_logo" />
          <h5 id="todo_logo">My TODO</h5>
        </div>
      </div>
      <div className="mt-5 container-fluid row list">
        <div className="col list-container">
          <TaskList
            title="pending"
            tasks={tasks
              .filter((task) => task.completedAt === undefined)
              .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())}
            colorTheme={colors.brand.orange}
            action1={{ name: "✓✓✓", action: () => setTasks((prev) => setTasksDone(prev)) }}
            action2={{ name: "Delete All", action: () => setTasks((prev) => groupDeleteIncompleteTasks(prev)) }}
          />
        </div>
        <div className="col list-container">
          <TaskList
            title="completed"
            tasks={tasks
              .filter((task) => task.completedAt !== undefined)
              .sort((a, b) => (a.completedAt?.getTime() ?? 0) - (b.completedAt?.getTime() ?? 0))}
            colorTheme={colors.brand.purple}
            action1={{ name: "Undone All", action: () => setTasks((prev) => setTasksUndone(prev)) }}
            action2={{ name: "Delete All", action: () => setTasks((prev) => groupDeleteCompleteTasks(prev)) }}
          />
        </div>
      </div>
    </main>
  );
}

type TaskListProps = {
  className?: string;
  colorTheme: string;
  title: string;
  tasks: Task[];
  action1?: {
    name: string;
    action: () => void;
  };
  action2?: {
    name: string;
    action: () => void;
  };
};

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
              className="tasklist-massactions-done"
              onMouseEnter={() => setMassHover(true)}
              onMouseLeave={() => setMassHover(false)}
              onClick={() => props.action1?.action()}
            >
              {props.action1.name}
            </button>
          )}
          {props.action2 && (
            <button
              className="tasklist-massactions-delete"
              onMouseEnter={() => setMassHover(true)}
              onMouseLeave={() => setMassHover(false)}
              onClick={() => props.action2?.action()}
            >
              {props.action2.name}
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
    const [datetime, setDatetime] = useState<string>(
      task.dueDate instanceof Date ? task.dueDate.toISOString().slice(0, 16) : ""
    );

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
            onChange={() => console.warn(`test${task.id}`)}
          />
          <label className="tasklist-list-item-checkbox-square" htmlFor={`checkbox${task.id}`} />
          {task.completedAt && <CheckIcon className={`tasklist-list-item-checkbox-checkicon`} height={45} width={45} />}
        </div>
        <div
          className={`tasklist-list-item-text ${task.completedAt && "strikethrough"} ${
            massHover && !task.completedAt ? "strikethrough" : null
          }`}
        >
          {task.text}
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
              // set new details
              setVisible(false);
              console.log("assert task saved");
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
                  value={datetime?.toString()}
                  onChange={(e) => setDatetime(e.target.value)}
                />
              </div>
            </div>
          </BootstrapModal>
          <button className={`tasklist-list-item-delete tasklist-list-item-controls ${hovered && "visible"}`}>
            <Cross1Icon height={20} width={20} />
          </button>
        </div>
      </li>
    );
  }
}

export default App;
