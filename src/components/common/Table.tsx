import React from 'react'

import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";

export const Table = ({columns, sortColumn ,onSort, data}: any) => {
return <>
  <table className="table">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody data={data} columns={columns} />
      </table>
</>
}