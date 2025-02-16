export type Task = {
  id: number;
  text: string;
  completedAt?: Date;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

type TaskListActionType = {
  display: React.ReactNode;
  action: () => void;
}

export type TaskListProps = {
  className?: string;
  colorTheme: string;
  title: string;
  tasks: Task[];
  action1?: TaskListActionType;
  action2?: TaskListActionType;
};


export type NewTask = Omit<Task,"id">

export const sampleTasks: Task[] = [
  {
    id: 1,
    text: "Buy groceries",
    dueDate: new Date("2025-02-14 01:00:00"),
    createdAt: new Date("2025-02-10 09:00:00"),
    updatedAt: new Date("2025-02-12 10:30:00"),
  },
  {
    id: 2,
    text: "Complete project report",
    dueDate: new Date("2025-02-20 23:59:00"),
    createdAt: new Date("2025-02-08 14:00:00"),
    updatedAt: new Date("2025-02-10 16:45:00"),
  },
  {
    id: 3,
    text: "Call the bank",
    createdAt: new Date("2025-02-09 08:00:00"),
    updatedAt: new Date("2025-02-11 11:20:00"),
  },
  {
    id: 4,
    text: "Fix bug in app",
    completedAt: new Date("2025-02-11 15:30:00"),
    createdAt: new Date("2025-02-09 12:00:00"),
    updatedAt: new Date("2025-02-11 15:30:00"),
  },
  {
    id: 5,
    text: "Read new book",
    dueDate: new Date("2025-02-28 20:00:00"),
    createdAt: new Date("2025-02-05 18:00:00"),
    updatedAt: new Date("2025-02-07 22:00:00"),
  },
  {
    id: 6,
    text: "Go for a run",
    createdAt: new Date("2025-02-06 06:30:00"),
    updatedAt: new Date("2025-02-06 06:30:00"),
  },
  {
    id: 7,
    text: "Write a blog post",
    dueDate: new Date("2025-02-18 12:00:00"),
    createdAt: new Date("2025-02-10 15:00:00"),
    updatedAt: new Date("2025-02-12 17:00:00"),
  },
  {
    id: 8,
    text: "Attend team meeting",
    dueDate: new Date("2025-02-14 09:00:00"),
    createdAt: new Date("2025-02-12 11:00:00"),
    updatedAt: new Date("2025-02-13 08:45:00"),
  },
  {
    id: 9,
    text: "Plan weekend trip",
    createdAt: new Date("2025-02-07 10:00:00"),
    updatedAt: new Date("2025-02-08 13:30:00"),
  },
  {
    id: 10,
    text: "Water the plants",
    completedAt: new Date("2025-02-13 07:30:00"),
    createdAt: new Date("2025-02-12 07:00:00"),
    updatedAt: new Date("2025-02-13 07:30:00"),
  },
  {
    id: 11,
    text: "Prepare presentation",
    dueDate: new Date("2025-02-19 14:00:00"),
    createdAt: new Date("2025-02-10 10:00:00"),
    updatedAt: new Date("2025-02-16 11:20:00"),
  },
  {
    id: 12,
    text: "Fix broken chair",
    createdAt: new Date("2025-02-08 16:30:00"),
    updatedAt: new Date("2025-02-10 14:10:00"),
  },
  {
    id: 13,
    text: "Order new laptop charger",
    createdAt: new Date("2025-02-07 13:45:00"),
    updatedAt: new Date("2025-02-09 15:00:00"),
  },
  {
    id: 14,
    text: "Respond to emails",
    completedAt: new Date("2025-02-13 09:30:00"),
    createdAt: new Date("2025-02-12 08:00:00"),
    updatedAt: new Date("2025-02-13 09:30:00"),
  },
  {
    id: 15,
    text: "Schedule dentist appointment",
    dueDate: new Date("2025-02-25 10:00:00"),
    createdAt: new Date("2025-02-14 11:30:00"),
    updatedAt: new Date("2025-02-17 12:45:00"),
  },
  {
    id: 16,
    text: "Backup important files",
    createdAt: new Date("2025-02-09 14:00:00"),
    updatedAt: new Date("2025-02-12 15:20:00"),
  },
  {
    id: 17,
    text: "Cook dinner for family",
    completedAt: new Date("2025-02-10 19:00:00"),
    createdAt: new Date("2025-02-10 10:30:00"),
    updatedAt: new Date("2025-02-10 19:00:00"),
  },
  {
    id: 18,
    text: "Learn TypeScript",
    createdAt: new Date("2025-02-06 09:00:00"),
    updatedAt: new Date("2025-02-12 16:30:00"),
  },
  {
    id: 19,
    text: "Go grocery shopping",
    dueDate: new Date("2025-02-16 17:00:00"),
    createdAt: new Date("2025-02-14 14:00:00"),
    updatedAt: new Date("2025-02-15 15:45:00"),
  },
  {
    id: 20,
    text: "Visit a friend",
    dueDate: new Date("2025-02-10 20:00:00"),
    createdAt: new Date("2025-02-13 10:00:00"),
    updatedAt: new Date("2025-02-18 11:20:00"),
  },
];
