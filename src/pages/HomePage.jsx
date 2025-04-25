import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { LoadingSpinner } from "../components/LoadingSpinner";
import MainContainer from "../components/container/MainContainer";
import { Box, FormControl, InputLabel, MenuItem, Select, OutlinedInput, Checkbox, ListItemText } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import dayjs from "dayjs";

const WaterSystemPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [sensorData, setSensorData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [sensorOptions, setSensorOptions] = useState([]);
  const [selectedSensors, setSelectedSensors] = useState([]);
  

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "lactate_data"),
      (querySnapshot) => {
        const newData = [];

        querySnapshot.docChanges().forEach((change) => {
          const rawData = change.doc.data();

          if (rawData.timestamp && typeof rawData.timestamp === "number") {
            const date = new Date(rawData.timestamp * 1000);
            rawData.timestamp = date.toISOString();
          }

          const docData = { id: change.doc.id, ...rawData };

          if (change.type === "added") {
            newData.unshift(docData);
          }
        });

        setSensorData((prev) => {
          const updated = [...newData, ...prev];
          const userSet = new Set(updated.map((d) => d.user_name).filter(Boolean));
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
    if (selectedUsers.length === 0) {
      setFilteredData([]);
      setSensorOptions([]);
      return;
    }
  
    let filtered = sensorData.filter((d) => selectedUsers.includes(d.user_name));
    filtered.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    setFilteredData(filtered);
  
    const sensorSet = new Set(filtered.map((d) => d.sensor_id).filter(Boolean));
    setSensorOptions(Array.from(sensorSet));
  }, [sensorData, selectedUsers]);
  

  const getSensorSeries = (sensorId, rawKey) => {
    return filteredData
      .filter((d) => d.sensor_id === sensorId)
      .map((d) => d[rawKey]);
  };

  const getSensorTimestamps = (sensorId) => {
    return filteredData
      .filter((d) => d.sensor_id === sensorId)
      .map((d) => dayjs(d.timestamp).format("mm:ss"));
  };

  const getSensorIds = () => {
    return selectedSensors.length > 0
      ? selectedSensors
      : sensorOptions; // Show all sensors by default
  };
  

  const renderChartsForSensor = (sensorId) => (
    <React.Fragment key={sensorId}>
      <div className="mt-10 mb-4">
        <h2 className="text-2xl font-semibold text-blue-400">{sensorId}</h2>
      </div>
  
      {/* Channel 1 */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[800px]">
          <LineChart
            height={300}
            series={[{ data: getSensorSeries(sensorId, "raw1"), label: "Lactate" }]}
            xAxis={[{ scaleType: "point", data: getSensorTimestamps(sensorId) }]}
          />
        </div>
      </div>
      <h3 className="text-lg text-black mt-8 pb-4 text-center">Channel 1</h3>

      <hr className="border-t border-gray-300 my-8 w-full" />
  
      <div className="w-full overflow-x-auto">
        <div className="min-w-[800px]">
          <LineChart
            height={300}
            series={[{ data: getSensorSeries(sensorId, "raw2"), label: "Lactate" }]}
            xAxis={[{ scaleType: "point", data: getSensorTimestamps(sensorId) }]}
          />
        </div>
      </div>
      <h3 className="text-lg text-black mt-8 pb-4 text-center">Channel 2</h3>
  
      <hr className="border-t border-gray-300 my-8 w-full" />
  
      <div className="w-full overflow-x-auto">
        <div className="min-w-[800px]">
          <LineChart
            height={300}
            series={[{ data: getSensorSeries(sensorId, "raw3"), label: "Lactate" }]}
            xAxis={[{ scaleType: "point", data: getSensorTimestamps(sensorId) }]}
          />
        </div>
      </div>
      <h3 className="text-lg text-black mt-8 pb-4 text-center">Channel 3</h3>
    </React.Fragment>
  );
  
  

  return (
    <>
      <div className="py-8 flex flex-col space-y-2 md:items-baseline md:flex-row md:justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">Sensor Data Charts</h1>
      </div>
      <Box className="flex flex-wrap gap-4 mb-4">
        {/* User Name Filter */}
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
                <Checkbox checked={selectedUsers.includes(name)} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Sensor ID Filter */}
        <FormControl sx={{ minWidth: 250 }}>
          <InputLabel>Sensor ID</InputLabel>
          <Select
            multiple
            value={selectedSensors}
            onChange={(e) => setSelectedSensors(e.target.value)}
            input={<OutlinedInput label="Sensor ID" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {sensorOptions.map((sensor) => (
              <MenuItem key={sensor} value={sensor}>
                <Checkbox checked={selectedSensors.includes(sensor)} />
                <ListItemText primary={sensor} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>


      {isLoading ? (
        <MainContainer>
          <LoadingSpinner size="40px" className="h-[223px]" />
        </MainContainer>
      ) : isError ? (
        <MainContainer>
          <p className="text-red-500">Failed to load data.</p>
        </MainContainer>
      ) : selectedUsers.length === 0 ? (
        <MainContainer>
          <p className="text-black text-lg pb-10">👋 Select a user to view sensor data.</p>
        </MainContainer>
      ) : (
        <MainContainer>
          {getSensorIds().map(renderChartsForSensor)}
        </MainContainer>
      )}
    </>
  );
};

export default WaterSystemPage;
