import dayjs from "dayjs";
import { NewTask, Task } from "../types/task";

// Demonstrating API data retrieval using mock data: From JSONPlaceholder(my preference) or MockAPI
const FAKEDATA_API_URL = "https://jsonplaceholder.typicode.com/todos";
const DATE_FORMAT = "YYYY-MM-DD HH:mm";
const FAKEUPLOADENDPOINT_API_URL = "https://webhook.site/c7217343-7479-4621-b12a-7830fe7043c9"

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch(FAKEDATA_API_URL); //GET
  // @ts-expect-error TODO: implement proper error
  if (!response.ok) throw new Error("Task fetching failed");

  const data = await response.json();
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.slice(0, 10).map((task: any) => ({
    id: String(task.id),
    text: task.title,
    completed: task.completed,
    dueDate: dayjs().add(Math.floor((Math.random() * 3)), "day").format(DATE_FORMAT),
    createdAt: dayjs().format(DATE_FORMAT),
    updatedAt: dayjs().format(DATE_FORMAT),
  })) 
}

// export const uploadTasks = async (): Promise<Task[]> => {
//   const task: NewTask[] = [
//     {
//       text: 'task1',
//       completedAt: new Date(),
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     }
//   ]

//   const response = await fetch(FAKEDATA_API_URL, {
//     method: "POST",
//     body: JSON.stringify(task)
//   }); //GET
// }