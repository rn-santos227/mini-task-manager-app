import DataTableHeader from "./DataTableHeader";

export default function DataTableEmpty({ columns, emptyMessage }) {
  return (
    <table className="ui-table">
      <DataTableHeader columns={columns} />
      <tbody>
        <tr>
          <td colSpan={columns.length}>
            <div className="ui-table-empty">{emptyMessage}</div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
