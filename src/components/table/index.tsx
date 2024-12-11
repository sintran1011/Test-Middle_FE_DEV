"use client";
import { ReactNode, useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { cn } from "@/utils";

interface IColumn {
  title?: string | ReactNode;
  key: string;
  render: (val: any, row: any, index: number) => ReactNode;
  headerAlign?: string;
  sorter?: (A: any, B: any) => void;
  width?: number | string;
  minWidth?: number;
}

interface IProps {
  columns: IColumn[];
  data: any;
  className?: string;
  width?: string;
  height?: string;
  pageIndex?: number;
  pageSize?: number;
}

const Table = (props: IProps) => {
  const {
    columns,
    data = [],
    className = "",
    width = "100%",
    pageIndex = 0,
    pageSize = 100,
  } = props;
  const [sorting, setSorting] = useState<SortingState>([]);
  const pagination = {
    pageIndex,
    pageSize,
  };

  const formatColumns: any = () => {
    return columns.map((col) => {
      return {
        accessorKey: col.key,
        header: (
          <p
            className={`text-${col?.headerAlign} text-grey-1 text-sm font-normal leading-[18px]`}
          >
            {col.title}
          </p>
        ),
        cell: (info: any, index: number) => {
          const value = info.getValue();
          const row = info.row.original;
          return col.render(value, row, index);
        },
        enableSorting: !!col.sorter,
        sortingFn: (rowA: any, rowB: any) =>
          col.sorter && col.sorter(rowA.original, rowB.original),
        size: col?.width,
        maxSize: col?.width,
        minSize: col?.minWidth,
        headerAlign: col?.headerAlign,
      };
    });
  };

  const table = useReactTable({
    columns: formatColumns(),
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination,
      sorting,
    },
    onSortingChange: setSorting,
  });

  const getSizeHeader = (id: string) => {
    const headerProps = table.getColumn(id)?.columnDef;
    return {
      maxWidth: headerProps?.maxSize,
      minWidth: headerProps?.minSize,
      width: headerProps?.size,
    };
  };

  const getAlignHeader = (align: string) => {
    switch (align) {
      case "right":
        return "justify-end";
      case "center":
        return "justify-center";
      default:
        return "justify-start";
    }
  };

  const renderEmptyData = () => {
    return (
      <div className="w-full rounded-[1.25rem] bg-white">
        <div className="bg-white-100 text-grey-1 flex flex-col items-center rounded-xl border-2 border-dashed border-gray-200 p-5">
          <div>There are currently no data.</div>
        </div>
      </div>
    );
  };

  const renderTableBody = () =>
    table.getRowModel().rows.map((row) => (
      <tr key={row.id}>
        {row.getVisibleCells().map((cell) => (
          <td
            className={cn("border-grey-2 truncate border-b px-4 py-1 sm:py-3")}
            key={cell.id}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    ));

  return data && data.length > 0 ? (
    <table
      style={{ height: "106px" }}
      width={width}
      className={cn(
        "w-[300%] table-fixed border-separate border-spacing-0 lg:w-[150%] xl:w-full",
        className,
      )}
    >
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const canSort = header.column.getCanSort();
              const width = getSizeHeader(header.id);
              const headerProps: any = table.getColumn(header.id)?.columnDef;
              const align = getAlignHeader(headerProps.headerAlign);
              return (
                <th
                  className={cn(
                    "bg-white-100 border-grey-2 border-b border-t px-4 py-2 first:rounded-l-md first:border-l last:rounded-r-md last:border-r",
                    header.column.getCanSort() && "cursor-pointer select-none",
                  )}
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  title={
                    canSort
                      ? header.column.getNextSortingOrder() === "asc"
                        ? "Click to sort ascending"
                        : header.column.getNextSortingOrder() === "desc"
                          ? "Click to sort descending"
                          : "Click to clear sort"
                      : undefined
                  }
                  style={{ ...width }}
                >
                  <div className={cn("center gap-2", align)}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </div>
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>{renderTableBody()}</tbody>
    </table>
  ) : (
    renderEmptyData()
  );
};

export default Table;
