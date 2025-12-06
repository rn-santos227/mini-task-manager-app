import Spinner from "../Spinner";
import DataTableHeader from "./DataTableHeader";

export default function DataTableLoading({ columns }) {
  return (
    <table className="ui-table">
      <DataTableHeader columns={columns} />
      <tbody>
        <tr>
          <td colSpan={columns.length}>
            <div className="ui-table-loading">
              <Spinner size="sm" />
              <span>Loading…</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
