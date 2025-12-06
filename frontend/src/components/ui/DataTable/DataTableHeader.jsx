export default function DataTableHeader({ columns }) {
  return (
    <thead>
      <tr>
        {columns.map((col) => (
          <th key={col.key}>{col.label}</th>
        ))}
      </tr>
    </thead>
  );
}
