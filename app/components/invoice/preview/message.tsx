export default function PreviewMessage({ message }: { message: string }) {
  return (
    <ul className="m-0 flex w-64 gap-2 p-0">
      <p className={`h-full w-full py-1 text-sm`}>{message}</p>
    </ul>
  );
}
