import { CheckIcon, Cross1Icon, Cross2Icon, Pencil1Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import "./App.css";
import logo from "./assets/lexmeet_logo.png";
import { Task, TaskListProps } from "./types/task";
import { colors } from "./constants/constants";
import { useEffect, useRef, useState } from "react";
import BootstrapModal from "./components/BootstrapModal";
import { formatToLocalISOString, useTask, validateNoPastDate } from "./utils/utils";
import { getTasks } from "./api/tasks";
import dayjs from "dayjs";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const dateInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (err) {
        console.warn("Fetching dummy tasks failed:", err);
      }
    };

    loadTasks();
  }, []);

  const [newTask, setNewTask] = useState<{ text: string; dueDate: Date | undefined }>({
    text: "",
    dueDate: undefined,
  });

  const {
    setTasksDone,
    setTasksUndone,
    groupDeleteIncompleteTasks,
    groupDeleteCompleteTasks,
    switchTaskCompletedAt,
    modifyTaskProps,
    // modifyTaskDueDate,
    // modifyTaskText,
    deleteTask,
    createTask,
  } = useTask(tasks, setTasks);

  return (
    <>
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
                min={new Date().toISOString().slice(0, 16)}
                ref={dateInputRef}
                onBlur={() => validateNoPastDate(dateInputRef)}
              />
              <button className="btn border-light" onClick={() => setNewTask({ text: "", dueDate: undefined })}>
                Clear
              </button>
            </div>
            <button className="btn border-light center" onClick={() => createTask(newTask)}>
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
                action: () => setTasksDone(),
              }}
              action2={{
                display: <TrashIcon height={27} width={27} />,
                action: () => groupDeleteIncompleteTasks(),
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
                action: () => setTasksUndone(),
              }}
              action2={{
                display: <TrashIcon height={27} width={27} />,
                action: () => groupDeleteCompleteTasks(),
              }}
            />
          </div>
        </div>
      </main>
      <main className="main-alt">Window too small.</main>
    </>
  );

  function TaskList(props: TaskListProps) {
    const [massHover, setMassHover] = useState<boolean>(false);
    const [listHovered, setListHovered] = useState<boolean>(false);

    return (
      <div
        className={`tasklist ${props.className}`}
        onMouseOver={() => setListHovered(true)}
        onMouseOut={() => setListHovered(false)}
      >
        <div
          className="tasklist-title"
          style={{
            borderColor: `${listHovered ? `rgb(${props.colorTheme})` : "transparent"}`,
            backgroundColor: `rgba(${props.colorTheme}, 0.95)`,
          }}
        >
          <span>{props.title}</span>
          <div className="tasklist-massactions">
            {props.action1 && (
              <BootstrapModal
                trigger={{
                  className: "tasklist-massactions-done hover-outline",
                  children: props.action1.display,
                  triggerProps: {
                    onMouseOver: () => setMassHover(true),
                    onMouseOut: () => setMassHover(false),
                  },
                }}
                posActionName="Confirm"
                posAction={() => props.action1?.action()}
              >
                Confirm action.
              </BootstrapModal>
            )}
            {props.action2 && (
              <BootstrapModal
                trigger={{
                  className: "tasklist-massactions-done hover-outline",
                  children: props.action2.display,
                  triggerProps: {
                    onMouseOver: () => setMassHover(true),
                    onMouseOut: () => setMassHover(false),
                  },
                }}
                posActionName="Confirm"
                posAction={() => props.action2?.action()}
              >
                Confirm delete all tasks.
              </BootstrapModal>
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
      const dateInputRef = useRef<HTMLInputElement | null>(null);
      const currentDate = new Date();
      const isPastDue = datetime && datetime < currentDate;

      return (
        <li
          className={`tasklist-list-item ${massHover ? "tasklist-list-item-masshover" : ""}`}
          onMouseOver={() => setHovered(true)}
          onMouseOut={() => setHovered(false)}
          style={{
            backgroundColor: isPastDue && !task.completedAt ? "#ffcccc" : "transparent",
          }}
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
              <CheckIcon className={`tasklist-list-item-checkbox-checkicon`} height={25} width={25} />
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
                <span className="tasklist-list-item-text-duedate">
                  {dayjs(task.dueDate).format("MMM DD, YYYY h:mm A")}
                </span>
              </>
            )}
          </div>
          <div className="tasklist-list-item-controls-container" style={{ display: hovered ? "flex" : "none" }}>
            <BootstrapModal
              trigger={{
                className: `tasklist-list-item-edit tasklist-list-item-controls ${hovered && "visible"}`,
                children: <Pencil1Icon height={20} width={20} />,
                onClick: () => {
                  setHovered(false);
                },
              }}
              title="Edit Task"
              posActionName="Save"
              posAction={(setVisible) => {
                if (taskString.length < 1) return;
                modifyTaskProps(task.id, taskString, datetime);
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
                    }}
                    onBlur={() => validateNoPastDate(dateInputRef)}
                    ref={dateInputRef}
                    min={new Date().toISOString().slice(0, 16)}
                  />
                  <button className="btn btn-secondary" onClick={() => setDatetime(null)}>
                    Clear
                  </button>
                </div>
              </div>
            </BootstrapModal>
            <BootstrapModal
              trigger={{
                className: `tasklist-list-item-delete tasklist-list-item-controls ${hovered ? "visible" : ""}`,
                children: <Cross1Icon height={20} width={20} />,
                onClick: () => {
                  setHovered(false);
                },
              }}
              negActionName="Delete"
              negAction={() => deleteTask(task.id)}
            >
              Are you sure you want to delete this task?
            </BootstrapModal>
          </div>
        </li>
      );
    }
  }
}

export default App;
