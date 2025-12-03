import "./index.css";
import Spinner from "../Spinner";

export default function DataTable({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = "No data available.",
  className = "",
}) {
  return (
    <div className={`ui-table-container ${className}`}>
      <table className="ui-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {loading && (
            <tr>
              <td colSpan={columns.length}>
                <div className="ui-table-loading">
                  <Spinner size="sm" />
                  <span>Loading…</span>
                </div>
              </td>
            </tr>
          )}

          {!loading && data.length === 0 && (
            <tr>
              <td colSpan={columns.length}>
                <div className="ui-table-empty">{emptyMessage}</div>
              </td>
            </tr>
          )}

          {!loading &&
            data.map((row, index) => (
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
    </div>
  );
}
