import { CreateJournal } from "@components/forms";
import { JournalList } from "@components/lists";

export default async function Dashboard() {
  return (
    <div className="container mx-auto px-4">
      <h1>Welcome to the dashboard</h1>
      <JournalList />
      <CreateJournal />
    </div>
  );
}
