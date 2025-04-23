import Tabs from "@mui/material/Tabs";
import { useEffect, useState } from "react";
import { Box, Tab, styled } from "@mui/material";

const a11yProps = (index) => ({
  id: `tab-${index}`,
  "aria-controls": `tabpanel-${index}`,
  className: "text-lg hover:text-secondary",
});

const CustomTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    color: "#00585c",
    fontSize: 17,
    minWidth: 0,
    paddingBottom: 2,
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightBold,
    marginRight: theme.spacing(1),
    "&:hover": {
      color: "#21b1ab",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#21b1ab",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#21b1ab",
    },
  })
);

const CustomTabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1.5 }}>{children}</Box>}
    </div>
  );
};

const MUITabs = ({
  labels,
  dataToDisplay,
  storagekey = null,
  isPersist = false,
}) => {
  const [value, setValue] = useState(() => {
    if (isPersist && storagekey) {
      return JSON.parse(localStorage?.getItem(storagekey) ?? 0);
    }
    return 0;
  });

  useEffect(() => {
    // If persistence is disabled, clear any stored tab index for this storageKey
    if (!isPersist && storagekey) {
      localStorage.removeItem(storagekey);
    }
  }, [isPersist, storagekey]);

  const handleChange = (event, newValue) => {
    if (isPersist && storagekey) {
      localStorage.setItem(storagekey, newValue);
    }
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="tabs"
        TabIndicatorProps={{
          sx: {
            backgroundColor: "#21b1ab",
          },
        }}
      >
        {labels.map((individualData, index) => (
          <CustomTab
            label={individualData?.label}
            key={individualData?.label}
            {...a11yProps(index)}
          />
        ))}
      </Tabs>
      {dataToDisplay.map((individualData, index) => (
        <CustomTabPanel value={value} index={index}>
          {individualData?.value}
        </CustomTabPanel>
      ))}
    </>
  );
};
export default MUITabs;
