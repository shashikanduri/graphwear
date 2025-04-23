import { createTheme } from "@mui/material";


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
