import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

import { Hero } from "@components";
import Tasks from "@components/lists/tasks";

export default async function Home() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: todos } = await supabase.from("tasks").select();

  console.log("todos");
  console.log(todos);
  return (
    <div>
      <Hero />

      <Tasks initialTasks={todos || []} />
    </div>
  );
}
