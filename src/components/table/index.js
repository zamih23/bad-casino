import { DataGrid } from "@material-ui/data-grid";
import * as React from "react";
import { useSelector } from "react-redux";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 200,
    type: "string",
    align: "center",
    headerAlign: "center",
  },
  {
    field: "slots",
    headerName: "Slots",
    width: 200,
    type: "Array",
    sortable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "time",
    headerName: "Time",
    width: 150,
    type: "string",
    align: "center",
    headerAlign: "center",
  },
];

export const EnhancedTable = () => {
  const history = useSelector((state) => state.history);
  return (
    <div className="tableContainer">
      {console.log(history)}
      <DataGrid rows={history} columns={columns} pageSize={5} />
    </div>
  );
};
