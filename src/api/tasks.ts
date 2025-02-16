import dayjs from "dayjs";
import { Task } from "../types/task";
import { getRadomFutureDate, getRandomPastDate, runRandom } from "../utils/utils";

// Demonstrating API data retrieval using mock data: From JSONPlaceholder(my preference) or MockAPI
const FAKEDATA_API_URL = "https://jsonplaceholder.typicode.com/todos";
// const DATE_FORMAT = "YYYY-MM-DD HH:mm";
const FAKEUPLOADENDPOINT_API_URL = "https://webhook.site/c7217343-7479-4621-b12a-7830fe7043c9"

export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(FAKEDATA_API_URL);
  if (!response.ok) throw new Error("Task fetching failed");

  const data = await response.json();
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.slice(0, 10).map((todo: any) => ({
    id: String(todo.id),
    text: todo.title,
    completedAt: runRandom(getRandomPastDate),
    dueDate: runRandom(getRadomFutureDate, 0.5),
    createdAt: dayjs().toDate(),
    updatedAt: dayjs().toDate(),
  })) 
}

export const updateTasks=()=>{}
export const deleteTasks=()=>{}