"use client";

import { createTask } from "@/mutations";
import { useActionState } from "react";

const initialState = { message: "" };

export function CreateTaskForm() {
  const [state, formAction, pending] = useActionState(createTask, initialState);

  return (
    <div>
      <h2>Create Task</h2>

      <form action={formAction}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />

        <p aria-live="polite">{state?.message}</p>

        <button disabled={pending}>Create Task</button>
      </form>
    </div>
  );
}
