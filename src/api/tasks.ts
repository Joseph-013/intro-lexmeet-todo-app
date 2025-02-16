import dayjs from "dayjs";
import { Task } from "../types/task";
import { getRadomFutureDate, getRandomPastDate, runRandom } from "../utils/utils";
import axios from "axios";

// Demonstrating API data retrieval using mock data: From JSONPlaceholder(my preference) or MockAPI
const FAKEDATA_API_URL = "https://jsonplaceholder.typicode.com/todos";
// const DATE_FORMAT = "YYYY-MM-DD HH:mm";
const FAKEUPLOADENDPOINT_API_URL = "https://webhook.site/c7217343-7479-4621-b12a-7830fe7043c9"

export const getTasks = async (): Promise<Task[]> => {
  try {
    const { data } = await axios.get(FAKEDATA_API_URL);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.slice(0, 10).map((todo: any) => ({
      id: String(todo.id),
      text: todo.title,
      completedAt: runRandom(getRandomPastDate),
      dueDate: runRandom(getRadomFutureDate, 0.5),
      createdAt: dayjs().toDate(),
      updatedAt: dayjs().toDate(),
    }));
  } catch (error) {
    console.warn("Task fetching failed:", error);
    return [];
  }
}

export const createTasks = async (tasks: Task[]): Promise<boolean | Error> => {
  if (!tasks || tasks.length === 0) {
    return new Error("No tasks provided for creation");
  }

  try {
    const response = await axios.post(FAKEUPLOADENDPOINT_API_URL, tasks);

    console.log("Success:", response.data);
    return true;
  } catch (error) {
    console.error("Error creating tasks:", error);

    // Return the error object so it can be handled by the caller
    if (axios.isAxiosError(error)) {
      return error;
    }

    return new Error("An unknown error occurred");
  }
};

export const updateTasks = async (tasks: Task[]): Promise<boolean | Error> => {
  if (!tasks || tasks.length === 0) {
    return new Error("No tasks provided for updating");
  }

  try {
    const response = await axios.put(FAKEUPLOADENDPOINT_API_URL, tasks);

    console.log("Success:", response.data);
    return true;
  } catch (error) {
    console.error("Error updating tasks:", error);

    if (axios.isAxiosError(error)) {
      return error;
    }

    return new Error("An unknown error occurred");
  }
};


export const deleteTasks = async (tasks: Task[]): Promise<boolean | Error> => {
  if (!tasks || tasks.length === 0) {
    return new Error("No tasks provided for deletion");
  }

  try {
    const response = await axios.delete(FAKEUPLOADENDPOINT_API_URL, {data:tasks});

    console.log("Success:", response.data);
    return true;
  } catch (error) {
    console.error("Error deleting tasks:", error);

    if (axios.isAxiosError(error)) {
      return error;
    }

    return new Error("An unknown error occurred");
  }
};
