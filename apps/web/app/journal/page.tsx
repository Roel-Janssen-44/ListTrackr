import JournalClient from "@components/journal/journals";

export default function JournalPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10">
      <div>
        <h1 className="mb-8 text-2xl font-bold">Journal page</h1>
        <JournalClient />
      </div>
    </div>
  );
}
