import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getTask, type Task } from "src/api/tasks";
import { Button, Page, TaskForm, TaskList } from "src/components";
import { UserTag } from "src/components/UserTag";
import styles from "src/pages/TaskDetail.module.css";

export function TaskDetail() {
  const [task, setTask] = useState<Task>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
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
        <div>
          <h2 className={styles.taskTitle}>This task doesn't exist!</h2>
        </div>
      </Page>
    );
  }

  if (!isEditing) {
    return (
      <Page>
        <p>
          {/* `<Link>` renders an `<a>` element with a correct `href` attribute
            but uses the react-router library's client-side routing so the new page
            loads faster (see https://reactrouter.com/en/main/components/link) */}
          <Link to="/">Back to home</Link>
        </p>
        <title>Task Detail</title>
        <div className={styles.taskTitle}>
          <h2>{task?.title}</h2>
          <Button label="Edit Task" disabled={!task} onClick={() => setIsEditing(true)} />
        </div>
        <p>{task?.description ? task.description : "(No description)"}</p>
        <div className={styles.properties}>
          <p>
            <b>Assignee</b>
          </p>
          <p>
            {task?.assignee ? (
              <UserTag user={task.assignee} className={styles.userTag} />
            ) : (
              "Not assigned"
            )}
          </p>
        </div>
        <div className={styles.properties}>
          <p>
            <b>Status</b>
          </p>
          <p>{task?.isChecked ? "Done" : "Not done"}</p>
        </div>
        <div className={styles.properties}>
          <p>
            <b>Date Created</b>
          </p>
          <p>
            {Intl.DateTimeFormat("en-US", {
              timeStyle: "short",
              dateStyle: "full",
            }).format(task?.dateCreated)}
          </p>{" "}
          {/* Add datetime format */}
        </div>
      </Page>
    );
  } else {
    return (
      <Page>
        <TaskForm
          mode="edit"
          task={task}
          onSubmit={(updatedTask: Task) => {
            setTask(updatedTask);
            setIsEditing(false);
          }}
        />
      </Page>
    );
  }
}
