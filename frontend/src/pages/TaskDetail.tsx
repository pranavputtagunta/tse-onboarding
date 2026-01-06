import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getTask, type Task } from "src/api/tasks";
import { Button, Page, TaskForm, TaskList } from "src/components";
import styles from "src/pages/TaskDetail.module.css";

export function TaskDetail() {
  const [task, setTask] = useState<Task>();
  const id = useParams().id;

  const [errorModalMessage, setErrorModalMessage] = useState<string | null>(null);

  useEffect(() => {
    // fetch task by id and setTask
    if (!id) return;

    getTask(id)
      .then((result) => {
        if (result.success) {
          setTask(result.data);
        } else {
          setErrorModalMessage(result.error);
        }
      })
      .catch(setErrorModalMessage);
  }, [id]);

  if (!id) {
    return (
      <Page>
        <p>
          {/* `<Link>` renders an `<a>` element with a correct `href` attribute
            but uses the react-router library's client-side routing so the new page
            loads faster (see https://reactrouter.com/en/main/components/link) */}
          <Link to="/">Back to home</Link>
        </p>
        <title>Task Detail</title>
        <span className={styles.title}>This task doesn't exist!</span>
      </Page>
    );
  }

  return (
    <Page>
      <p>
        {/* `<Link>` renders an `<a>` element with a correct `href` attribute
            but uses the react-router library's client-side routing so the new page
            loads faster (see https://reactrouter.com/en/main/components/link) */}
        <Link to="/">Back to home</Link>
      </p>
      <title>Task Detail</title>
      <div className={styles.titleRow}>
        <span className={styles.title}>{task?.title}</span>
        <Button kind="primary" data-testid="task-edit-button" label="Edit Task" disabled={!task} />
      </div>
      <div className={styles.contentWrapper}>
        <main className={styles.content}>
          {task?.description ? task.description : "(No description)"}
        </main>
      </div>
      <div className={styles.descriptorRow}>
        <span>Assignee</span>
        <span>{task?.assignee ? task.assignee._id : "Not assigned"}</span>
      </div>
      <div className={styles.descriptorRow}>
        <span>Status</span>
        <span>{task?.isChecked ? "Done" : "Not done"}</span>
      </div>
      <div className={styles.descriptorRow}>
        <span>Date Created</span>
        <span></span> {/* Add datetime format */}
      </div>
    </Page>
  );
}
