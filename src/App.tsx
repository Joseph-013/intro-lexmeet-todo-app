import { CheckIcon } from "@radix-ui/react-icons";
import "./App.css";
import logo from "./assets/lexmeet_logo.png";
import { sampleTasks, Task } from "./types/task";
import { colors } from "./constants/constants";

function App() {
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
            tasks={sampleTasks
              .filter((task) => task.completedAt === undefined)
              .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())}
            colorTheme={colors.brand.orange}
          />
        </div>
        <div className="col list-container">
          <TaskList
            title="completed"
            tasks={sampleTasks
              .filter((task) => task.completedAt !== undefined)
              .sort((a, b) => (a.completedAt?.getTime() ?? 0) - (b.completedAt?.getTime() ?? 0))}
            colorTheme={colors.brand.purple}
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
};

function TaskList(props: TaskListProps) {
  return (
    <div className={`tasklist ${props.className}`}>
      <div
        className="tasklist-title"
        style={{ borderColor: `rgb(${props.colorTheme})`, backgroundColor: `rgba(${props.colorTheme}, 0.20)` }}
      >
        {props.title}
      </div>

      <ul className="tasklist-list">
        {props.tasks.map((task: Task) => (
          <li key={task.id} className={`tasklist-list-item`}>
            <button className="tasklist-list-item-checkbutton">
              <div>square</div>
              <div>check</div>
            </button>
            <div className={`tasklist-list-item-text ${task.completedAt && "strikethrough"}`}>{task.text}</div>
            <button>edit</button>
            <button>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
