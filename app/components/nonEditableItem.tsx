export default function NonEditableItem({
  label,
  styles,
}: {
  label: string;
  styles?: string;
}) {
  return (
    <p className={`flex cursor-not-allowed items-center opacity-80 ${styles}`}>
      {label}
    </p>
  );
}
