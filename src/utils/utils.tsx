import dayjs from "dayjs";
import { Task } from "../types/task";

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
    setter((prev) =>
      prev.map((task) => (task.completedAt ? task : { ...task, completedAt: new Date(), updatedAt: new Date() }))
    );
  };

  /**
   * Sets all tasks as Incomplete by removing the completedAt property of all tasks.
   * @returns void
   */
  const setTasksUndone = (): void => {
    setter((prev) => prev.map((task) => ({ ...task, completedAt: undefined, updatedAt: new Date() })));
  };

  /**
   * Deletes all tasks without completedAt properties.
   * @returns void
   */
  const groupDeleteIncompleteTasks = (): void => {
    const temp = [...tasks];
    setter(temp.filter((task) => Boolean(task.completedAt)));
  };

  /**
   * Deletes all tasks with completedAt properties.
   * @returns void
   */
  const groupDeleteCompleteTasks = (): void => {
    const temp = [...tasks];
    // const newTasks = temp.filter((task) => Boolean(!task.completedAt));
    // return newTasks;
    setter(temp.filter((task) => Boolean(!task.completedAt)));
  };

  const switchTaskCompletedAt = (taskId: number) => {
    setter((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, updatedAt: new Date(), completedAt: task.completedAt ? undefined : new Date() }
          : task
      )
    );
  };

  const modifyTaskDueDate = (taskId: number, date: Date | undefined) => {
    setter((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, updatedAt: new Date(), dueDate: date } : task))
    );
  };

  const modifyTaskText = (taskId: number, text: string) => {
    if (!text) return;
    setter((prev) => prev.map((task) => (task.id === taskId ? { ...task, updatedAt: new Date(), text: text } : task)));
  };

  const deleteTask = (taskId: number) => {
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

    console.log(_newTask);
    console.log(tasks);
    setter((prev) => [...prev, _newTask]);
  };

  return {
    setTasksDone,
    setTasksUndone,
    groupDeleteIncompleteTasks,
    groupDeleteCompleteTasks,
    switchTaskCompletedAt,
    modifyTaskDueDate,
    modifyTaskText,
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
