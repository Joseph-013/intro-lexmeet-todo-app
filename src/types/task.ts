export type Task = {
  id: number;
  text: string;
  completedAt?: Date;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type TaskListProps = {
  className?: string;
  colorTheme: string;
  title: string;
  tasks: Task[];
  action1?: {
    display: React.ReactNode;
    action: () => void;
  };
  action2?: {
    display: React.ReactNode;
    action: () => void;
  };
};


export type NewTask = Omit<Task,"id">

export const sampleTasks: Task[] = [
  {
    id: 1,
    text: "Buy groceries",
    dueDate: new Date("2025-02-15 18:00"),
    createdAt: new Date("2025-02-10 09:00"),
    updatedAt: new Date("2025-02-12 10:30"),
  },
  {
    id: 2,
    text: "Complete project report",
    dueDate: new Date("2025-02-20 23:59"),
    createdAt: new Date("2025-02-08 14:00"),
    updatedAt: new Date("2025-02-10 16:45"),
  },
  {
    id: 3,
    text: "Call the bank",
    createdAt: new Date("2025-02-09 08:00"),
    updatedAt: new Date("2025-02-11 11:20"),
  },
  {
    id: 4,
    text: "Fix bug in app",
    completedAt: new Date("2025-02-11 15:30"),
    createdAt: new Date("2025-02-09 12:00"),
    updatedAt: new Date("2025-02-11 15:30"),
  },
  {
    id: 5,
    text: "Read new book",
    dueDate: new Date("2025-02-28 20:00"),
    createdAt: new Date("2025-02-05 18:00"),
    updatedAt: new Date("2025-02-07 22:00"),
  },
  {
    id: 6,
    text: "Go for a run",
    createdAt: new Date("2025-02-06 06:30"),
    updatedAt: new Date("2025-02-06 06:30"),
  },
  {
    id: 7,
    text: "Write a blog post",
    dueDate: new Date("2025-02-18 12:00"),
    createdAt: new Date("2025-02-10 15:00"),
    updatedAt: new Date("2025-02-12 17:00"),
  },
  {
    id: 8,
    text: "Attend team meeting",
    dueDate: new Date("2025-02-14 09:00"),
    createdAt: new Date("2025-02-12 11:00"),
    updatedAt: new Date("2025-02-13 08:45"),
  },
  {
    id: 9,
    text: "Plan weekend trip",
    createdAt: new Date("2025-02-07 10:00"),
    updatedAt: new Date("2025-02-08 13:30"),
  },
  {
    id: 10,
    text: "Water the plants",
    completedAt: new Date("2025-02-13 07:30"),
    createdAt: new Date("2025-02-12 07:00"),
    updatedAt: new Date("2025-02-13 07:30"),
  },
  {
    id: 11,
    text: "Prepare presentation",
    dueDate: new Date("2025-02-19 14:00"),
    createdAt: new Date("2025-02-10 10:00"),
    updatedAt: new Date("2025-02-16 11:20"),
  },
  {
    id: 12,
    text: "Fix broken chair",
    createdAt: new Date("2025-02-08 16:30"),
    updatedAt: new Date("2025-02-10 14:10"),
  },
  {
    id: 13,
    text: "Order new laptop charger",
    createdAt: new Date("2025-02-07 13:45"),
    updatedAt: new Date("2025-02-09 15:00"),
  },
  {
    id: 14,
    text: "Respond to emails",
    completedAt: new Date("2025-02-13 09:30"),
    createdAt: new Date("2025-02-12 08:00"),
    updatedAt: new Date("2025-02-13 09:30"),
  },
  {
    id: 15,
    text: "Schedule dentist appointment",
    dueDate: new Date("2025-02-25 10:00"),
    createdAt: new Date("2025-02-14 11:30"),
    updatedAt: new Date("2025-02-17 12:45"),
  },
  {
    id: 16,
    text: "Backup important files",
    createdAt: new Date("2025-02-09 14:00"),
    updatedAt: new Date("2025-02-12 15:20"),
  },
  {
    id: 17,
    text: "Cook dinner for family",
    completedAt: new Date("2025-02-10 19:00"),
    createdAt: new Date("2025-02-10 10:30"),
    updatedAt: new Date("2025-02-10 19:00"),
  },
  {
    id: 18,
    text: "Learn TypeScript",
    createdAt: new Date("2025-02-06 09:00"),
    updatedAt: new Date("2025-02-12 16:30"),
  },
  {
    id: 19,
    text: "Go grocery shopping",
    dueDate: new Date("2025-02-16 17:00"),
    createdAt: new Date("2025-02-14 14:00"),
    updatedAt: new Date("2025-02-15 15:45"),
  },
  {
    id: 20,
    text: "Visit a friend",
    dueDate: new Date("2025-02-21 20:00"),
    createdAt: new Date("2025-02-15 10:00"),
    updatedAt: new Date("2025-02-18 11:20"),
  },
];
