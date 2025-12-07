"use client";

import { useState } from "react";
import { createJournal } from "@/lib/client/databases";

export function CreateJournal() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      alert("Please fill in the title");
      return;
    }

    try {
      await createJournal({
        title,
        content: "Content",
        createdAt: Date.now(),
        updatedAt: Date.now(),
        deleted: false,
      });
      setTitle("");
      alert("Journal created!");
    } catch (err) {
      console.error("Error creating journal:", err);
      alert("Failed to create journal");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button className="cursor-pointer bg-green-400 p-3" type="submit">
        Create Journal
      </button>
    </form>
  );
}
