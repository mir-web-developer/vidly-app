import React from "react";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { faSortUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//columns: array
//sortColumn: obj
//onSort: function
export const TableHeader = (props) => {
  const raiseSort = (path) => {
    const sortColumn = { ...props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    props.onSort(sortColumn);
  };

  const renderSortIcon = (column: any) => {
    const { sortColumn } = props;

    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") {
      return <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faSortUp} />;
    } else {
      return <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faSortDown} />;
    }
  };

  return (
    <>
      <thead>
        <tr>
          {props.columns.map((column: any) => (
            <th
            className="clickable"
              key={column.path || column.key}
              onClick={() => raiseSort(column.path)}
            >
              {column.label}
              {renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
};
