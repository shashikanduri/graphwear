import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { LoadingSpinner } from "../components/LoadingSpinner";
import MainContainer from "../components/container/MainContainer";
import DisplayTablePagination from "../components/tables/DisplayTablePagination";
import { SensorDataInfo } from "../components/ui/SensorDataInfo";
import { formatDate, DATE_TIME_FORMAT_1, customDateFilter } from "../utility/Utility";
import { Box, FormControl, InputLabel, MenuItem, Select, OutlinedInput, Checkbox, ListItemText, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

const WaterSystemPage = () => {
  const { setModal } = useOutletContext();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [sensorData, setSensorData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "lactate_data"),
      (querySnapshot) => {
        const newData = [];

        querySnapshot.docChanges().forEach((change) => {
          const docData = { id: change.doc.id, ...change.doc.data() };
          if (change.type === "added") {
            newData.unshift(docData);
          }
        });

        setSensorData(prev => {
          const updated = [...newData, ...prev];
          const userSet = new Set(updated.map(d => d.user_name).filter(Boolean));
          setUserOptions(Array.from(userSet));
          return updated;
        });

        setIsError(false);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching real-time data:", error);
        setIsError(true);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let filtered = [...sensorData];

    if (selectedUsers.length > 0) {
      filtered = filtered.filter(d => selectedUsers.includes(d.user_name));
    }

    if (selectedDate) {
      const dateMillis = dayjs(selectedDate).valueOf();
      filtered = filtered.filter(d => {
        const ts = new Date(d.timestamp).getTime();
        return ts >= dateMillis;
      });
    }

    setFilteredData(filtered);
  }, [sensorData, selectedUsers, selectedDate]);

  const onRowClick = (data) => {
    setModal({ content: <SensorDataInfo data={data.original} />, size: "modalFull" });
  };

  const columns = [
    { accessorKey: "user_name", header: "User Name", size: 50 },
    { accessorKey: "sensor_id", header: "Sensor" },
    { accessorKey: "raw1", header: "Lactate(Raw 1)" },
    { accessorKey: "raw2", header: "Lactate(Raw 2)" },
    { accessorKey: "raw3", header: "Lactate(Raw 3)" },
    {
      accessorKey: "timestamp",
      header: "Timestamp",
      Cell: ({ cell }) => {
        const value = cell.getValue();
        return value
          ? formatDate(value, DATE_TIME_FORMAT_1)
          : <p className="px-.5 font-normal text-red-600 whitespace-nowrap">Missing</p>;
      },
      filterFn: customDateFilter,
    }
  ];

  return (
    <>
      <div className="py-8 flex flex-col space-y-2 md:items-baseline md:flex-row md:justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">All Sensor Data</h1>
      </div>

      <Box className="flex flex-wrap gap-4 mb-4">
        <FormControl sx={{ minWidth: 250 }}>
          <InputLabel>User Name</InputLabel>
          <Select
            multiple
            value={selectedUsers}
            onChange={(e) => setSelectedUsers(e.target.value)}
            input={<OutlinedInput label="User Name" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {userOptions.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={selectedUsers.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <DateTimePicker
          label="From Date"
          value={selectedDate}
          onChange={setSelectedDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>

      {isLoading ? (
        <MainContainer>
          <LoadingSpinner size="40px" className="h-[223px]" />
        </MainContainer>
      ) : isError ? (
        <MainContainer>
          <p className="text-red-500">Failed to load data.</p>
        </MainContainer>
      ) : (
        <DisplayTablePagination
          tableData={filteredData}
          columns={columns}
          maxHeight="420px"
          onRowClick={onRowClick}
        />
      )}
    </>
  );
};

export default WaterSystemPage;
