
import DataTableHeader from "./DataTableHeader";

export default function DataTableContent({ columns, data }) {
  return (
    <table className="ui-table">
      <DataTableHeader columns={columns} />
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((col) => (
              <td key={col.key}>
                {col.render ? col.render(row[col.key], row) : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
