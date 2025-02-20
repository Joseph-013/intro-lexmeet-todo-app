import dayjs from "dayjs";
import { Task } from "../types/task";
import { createTasks, deleteTasks, updateTasks } from "../api/tasks";

export function formatToLocalISOString(date: Date) {
  const pad = (num: number) => num.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(
    date.getMinutes()
  )}`;
} // or use package?

export function runRandom<T>(fn: () => T, chance: number = 0.5): T | undefined {
  return Math.random() < chance ? fn() : undefined;
}

export function getRandomPastDate(maxDaysAgo: number = 7) {
  return dayjs()
    .subtract(Math.floor(Math.random() * maxDaysAgo), "day")
    .toDate();
}

export function getRadomFutureDate(maxWithinFutureDays: number = 7) {
  return dayjs()
    .add(Math.floor(Math.random() * maxWithinFutureDays), "day")
    .toDate();
}

export function useTask(tasks: Task[], setter: React.Dispatch<React.SetStateAction<Task[]>>) {
  /**
   * Sets all tasks as Completed by ssigning current Date to all completedAt properties.
   * @returns void
   */
  const setTasksDone = (): void => {
    const temp = tasks.map((task) =>
      task.completedAt ? task : { ...task, completedAt: new Date(), updatedAt: new Date() }
    );
    updateTasks(temp);
    setter(temp);
  };

  /**
   * Sets all tasks as Incomplete by removing the completedAt property of all tasks.
   * @returns void
   */
  const setTasksUndone = (): void => {
    const temp = tasks.map((task) => ({ ...task, completedAt: undefined, updatedAt: new Date() }));
    updateTasks(temp);
    setter(temp);
  };

  /**
   * Deletes all tasks without completedAt properties.
   * @returns void
   */
  const groupDeleteIncompleteTasks = (): void => {
    const temp = tasks.filter((task) => Boolean(task.completedAt));
    deleteTasks(temp);
    setter(temp);
  };

  /**
   * Deletes all tasks with completedAt properties.
   * @returns void
   */
  const groupDeleteCompleteTasks = (): void => {
    const temp = tasks.filter((task) => Boolean(!task.completedAt));
    deleteTasks(temp);
    setter(temp);
  };

  const switchTaskCompletedAt = (taskId: number) => {
    const temp = tasks.map((task) =>
      task.id === taskId
        ? { ...task, updatedAt: new Date(), completedAt: task.completedAt ? undefined : new Date() }
        : task
    );
    updateTasks(temp);
    setter(temp);
  };

  const modifyTaskProps = (taskId: number, text: string, dueDate: Date | null) => {
    if (text.length < 1) return;
    const temp = tasks.map((task) =>
      task.id === taskId ? { ...task, text: text, updatedAt: new Date(), dueDate: dueDate ? dueDate : undefined } : task
    );
    updateTasks(temp);
    setter(temp);
  };

  // const modifyTaskDueDate = (taskId: number, date: Date | undefined) => {
  //   const temp = tasks.map((task) => (task.id === taskId ? { ...task, updatedAt: new Date(), dueDate: date } : task));
  //   updateTasks(temp);
  //   setter(temp);
  // };

  // const modifyTaskText = (taskId: number, text: string) => {
  //   if (text.length === 0) return;
  //   const temp = tasks.map((task) => (task.id === taskId ? { ...task, updatedAt: new Date(), text: text } : task));
  //   console.log(temp);
  //   updateTasks(temp);
  //   setter(temp);
  // };

  const deleteTask = (taskId: number) => {
    const temp = tasks.filter((task) => task.id === taskId);
    deleteTasks(temp);
    setter((prev) => prev.filter((task) => task.id !== taskId));
  };

  const createTask = (newTask: { text: string; dueDate: Date | undefined }) => {
    if (newTask.text === "") return;
    const _newTask: Task = {
      ...newTask,
      id: getNextId(tasks),
      completedAt: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    createTasks([_newTask]);
    setter((prev) => [...prev, _newTask]);
  };

  return {
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
  };
}

export function getNextId(tasks: Task[]): number {
  let highestId = 0;
  tasks.forEach((task) => {
    if (task.id > highestId) highestId = task.id;
  });
  return ++highestId;
}

export function validateNoPastDate(ref: React.RefObject<HTMLInputElement | null>) {
  if (!ref.current) return;

  const input = ref.current;
  const now = new Date();
  const selectedDate = new Date(input.value);

  if (selectedDate < now) {
    input.setCustomValidity(`Date cannot be in the past.`);
  } else {
    input.setCustomValidity("");
  }

  input.reportValidity(); // Show validation popup
}
