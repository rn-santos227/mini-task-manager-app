import "./index.css";

import DataTableEmpty from "./DataTableEmpty";
import DataTableContent from "./DataTableContent";
import DataTableLoading from "./DataTableLoading";

function DataTableContainer({ children, className }) {
  return <div className={`ui-table-container ${className}`}>{children}</div>;
}

export default function DataTable({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = "No data available.",
  className = "",
}) {
  if (loading) {
    return (
      <DataTableContainer className={className}>
        <DataTableLoading columns={columns} />
      </DataTableContainer>
    );
  }

  if (data.length === 0) {
    return (
      <DataTableContainer className={className}>
        <DataTableEmpty columns={columns} emptyMessage={emptyMessage} />
      </DataTableContainer>
    );
  }

  return (
    <DataTableContainer className={className}>
      <DataTableContent columns={columns} data={data} />
    </DataTableContainer>
  );
}
