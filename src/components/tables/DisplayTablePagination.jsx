import { Box, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { CSVLink } from "react-csv";

import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useRef } from "react";
import Button from "../ui/Button";
import { fontSize } from "./tableStyles";

const DisplayTablePagination = ({
  tableData,
  columns,
  keyName = "id",
  handleBottomButton = () => {},
  showBottomButton = false,
  showFullScreenOption = true,
  initialState = {},
  newButtonName = "Save",
  paginationProps = {
    rowsPerPageOptions: [5],
    showRowsPerPage: false,
  },
  onRowClick = null,
  enablePagination = true,
  enableColumnOrdering = false,
  enableHiding = false,
  enableColumnResizing = false,
  maxHeight = "auto",
  isBottomButtonDisable = false,
  renderPanel = null,
  topButton = {
    showTopButton: false,
    handleTopButton: () => {},
    value: 0,
  },
}) => {
  const rowVirtualizerInstanceRef = useRef(null);

  const materialReactTableThemeLight = createTheme({
    components: {
      MuiIconButton: {
        styleOverrides: {
          root: {
            "& .MuiSvgIcon-root": {
              color: "#707070 !important",
            },
          },
        },
      },
      MuiTableSortLabel: {
        styleOverrides: {
          root: {
            "& .MuiSvgIcon-root": {
              color: "#707070 !important",
            },
            "&:hover .MuiSvgIcon-root": {
              color: "#ffffff !important",
            },
            "&.Mui-active .MuiSvgIcon-root": {
              color: "#707070 !important",
            },
          },
        },
      },
    },
  });

  const table = useMaterialReactTable({
    columns: columns,
    data: tableData,

    getRowId: (row) => row[keyName],

    initialState: {
      density: "compact",
      ...initialState,
    },

    enableColumnActions: true,
    enableDensityToggle: false,
    enableFilters: true,
    enableHiding: enableHiding,

    //sticky header and footer feature allows you to keep the header and footer of the table visible while scrolling through the table
    enableStickyHeader: true,
    enableStickyFooter: true,

    enablePagination: enablePagination,
    enableFullScreenToggle: showFullScreenOption,
    enableTopToolbar: true,
    enableBottomToolbar: true,
    enableColumnOrdering: enableColumnOrdering,
    enableColumnResizing: enableColumnResizing,
    maxHeight: maxHeight,

    ...(enablePagination
      ? { paginationDisplayMode: "pages" }
      : {
          enableRowVirtualization: true,
          rowVirtualizerInstanceRef,
          rowVirtualizerOptions: { overscan: 5 },
        }),

    //css for header
    muiTableHeadCellProps: {
      sx: {
        fontWeight: "bolder",
        fontSize: fontSize,
        ".MuiDivider-root": {
          borderWidth: "1px",
          opacity: "0.5",
        },
      },
    },

    //css for the table container
    muiTablePaperProps: {
      elevation: 0,
      sx: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "5px",
      },
    },

    //css for the table data container
    muiTableContainerProps: {
      sx: { height: "auto", maxHeight: maxHeight },
    },

    //css for the table data
    muiTableBodyProps: {
      sx: () => ({
        fontSize: fontSize,
      }),
    },

    //css for table bottom bar
    muiBottomToolbarProps: {
      sx: {
        ...(!showBottomButton && { justifyContent: "end" }), //when no add button available, align toolbar options on the right
      },
    },

    //css for table top bar
    muiTopToolbarProps: {
      sx: {
        ...(!topButton.showTopButton && { justifyContent: "end" }), //when no add button available, align toolbar options on the right
      },
    },

    renderBottomToolbarCustomActions: () => {
      return (
        showBottomButton && (
          <Button
            isPrimaryButton={true}
            onClick={handleBottomButton}
            disabled={isBottomButtonDisable}
          >
            {newButtonName}
          </Button>
        )
      );
    },

    renderTopToolbarCustomActions: ({ table }) => {
      const filteredData = table.getFilteredRowModel().rows.map(row => row.original);
    
      return (
        <div className="flex items-center gap-4">
          {topButton.showTopButton && (
            <div
              className="flex flex-row items-center justify-center gap-2 h-[39.94px] cursor-pointer"
              onClick={topButton.handleTopButton}
            >
              <input
                type="checkbox"
                className="cursor-pointer"
                checked={topButton.value}
                readOnly
              />
              <span className="text-sm text-primary">(Select All)</span>
            </div>
          )}
          
          <CSVLink
            data={filteredData}
            filename="filtered_table_data.csv"
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1.5 rounded"
          >
            Download CSV
          </CSVLink>
        </div>
      );
    },
    

    //row action
    ...(onRowClick && {
      muiTableBodyRowProps: ({ row }) => ({
        onClick: (event) => onRowClick(row),
        sx: {
          cursor: "pointer",
        },
      }),
    }),

    //pagination props
    muiPaginationProps: {
      rowsPerPageOptions: paginationProps?.rowsPerPageOptions ?? [5],
      showFirstButton: false,
      showLastButton: false,
      showRowsPerPage: paginationProps?.showRowsPerPage ?? false,
      siblingCount: 0,
      size: "small",
    },

    ...(renderPanel && {
      renderDetailPanel: ({ row }) => (
        <Box
          sx={{
            width: "100%",
          }}
        >
          {renderPanel(row)}
        </Box>
      ),
    }),
  });
  return (
    <ThemeProvider theme={materialReactTableThemeLight}>
      <MaterialReactTable table={table} />
    </ThemeProvider>
  );
};

export default DisplayTablePagination;
