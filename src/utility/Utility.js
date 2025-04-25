import { createTheme } from "@mui/material";

export const DATE_TIME_FORMAT_1 = "MM/dd/yyyy HH:mm:ss";
export const DATE_FORMAT_1 = "yyyy-MM-dd";
export const DATE_FORMAT_2 = "MM/dd/yyyy";

export const formatLabel = (label) => {
  const match = label.match(/(.*) \((.*)\)/);
  if (match) {
    return (
      <div className="flex items-center gap-[5px]">
        <h3 className="font-bold">{match[1]}</h3>
        <span>({match[2]})</span>
      </div>
    );
  }
  return <h3 className="font-bold">{label}</h3>;
};


export const materialReactTableThemeDark = createTheme({
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          "& .MuiSvgIcon-root": {
            color: "#ffffff !important",
          },
          "&:hover .MuiSvgIcon-root": {
            color: "#ffffff !important",
          },
          "&.Mui-active .MuiSvgIcon-root": {
            color: "#ffffff !important",
          },
        },
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          "& .MuiSvgIcon-root": {
            color: "#ffffff !important",
          },
          "&:hover .MuiSvgIcon-root": {
            color: "#ffffff !important",
          },
          "&.Mui-active .MuiSvgIcon-root": {
            color: "#ffffff !important",
          },
        },
      },
    },
  },
});

export const materialReactTableThemeLight = createTheme({
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

// to check empty and "" string
export const isNotEmptyOrNull = (obj, key) => {
  // Check if obj is a string
  if (typeof obj === "string") {
    return obj.trim().length > 0 && obj !== "null";
  }

  // Check if obj is an object and not null
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  // Check if the key exists in the object
  if (!(key in obj)) {
    return false;
  }

  const value = obj[key];

  // Check if the value is not null and not undefined
  if (value === null || value === undefined) {
    return false;
  }

  // Check if the value is a non-empty string
  if (typeof value === "string") {
    return value.trim().length > 0;
  }

  // For other types, consider them as not empty
  return true;
};

export const customDateFilter = (row, columnId, filterValue) => {
  const cellValue = row.getValue(columnId);
  return cellValue?.includes(filterValue) ?? false;
};

export const formatDate = (inputDateString, type) => {
  if (!inputDateString) return "";
  const dateObject = new Date(inputDateString);

  // Adjust for time zone offset
  const userTimezoneOffset = dateObject.getTimezoneOffset() * 60000;
  const localDateObject = new Date(dateObject.getTime() + userTimezoneOffset);

  if (type === DATE_TIME_FORMAT_1)
    return `${(localDateObject.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${localDateObject
      .getDate()
      .toString()
      .padStart(2, "0")}/${localDateObject.getFullYear()} ${localDateObject
      .getHours()
      .toString()
      .padStart(2, "0")}:${localDateObject
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${localDateObject
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
  else if (type === DATE_FORMAT_1)
    return `${localDateObject.getFullYear()}-${(localDateObject.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${localDateObject
      .getDate()
      .toString()
      .padStart(2, "0")}`;
  else if (type === DATE_FORMAT_2)
    return localDateObject.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
};

export const downloadCSV = (sensorId, data, startTime = null, endTime = null) => {
  if (!data.length) return;

  const start = startTime ? new Date(startTime).getTime() : null;
  const end = endTime ? new Date(endTime).getTime() : null;

  // Filter by timestamp if range provided
  const filteredData = data.filter(row => {
    const ts = new Date(row.timestamp).getTime();
    return (!start || ts >= start) && (!end || ts <= end);
  });

  if (!filteredData.length) return;

  const headers = Object.keys(filteredData[0]);
  const rows = filteredData.map(row =>
    headers.map(h => JSON.stringify(row[h] ?? ""))
  );

  const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", `${sensorId}_data.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
