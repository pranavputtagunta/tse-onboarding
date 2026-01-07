import React, { useEffect, useState } from "react";
import { getAllTasks, type Task } from "src/api/tasks";
import { TaskItem } from "src/components";
import styles from "src/components/TaskList.module.css";

export type TaskListProps = {
  title: string;
  refreshToken?: number | string;
};

type TaskListErrors = {
  title?: boolean;
};

export function TaskList({ title, refreshToken }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [errors, setErrors] = useState<TaskListErrors>({});

  const [errorModalMessage, setErrorModalMessage] = useState<string | null>(null);

  useEffect(() => {
    // your code here
    setErrors({});
    getAllTasks()
      .then((result) => {
        if (result.success) {
          if (setTasks) setTasks(result.data);
        } else {
          setErrorModalMessage(result.error);
        }
      })
      .catch(setErrorModalMessage);
  }, [refreshToken]);

  return (
    <div className={styles.margin}>
      <span className={styles.title}>{title}</span>
      <div className={styles.taskList}>
        {tasks.length === 0 ? (
          <p>No tasks yet. Add one above to get started.</p>
        ) : (
          tasks.map((task) => <TaskItem key={task._id} task={task} />)
        )}
      </div>
    </div>
  );
}
