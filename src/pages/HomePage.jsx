import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { LoadingSpinner } from "../components/LoadingSpinner";
import MainContainer from "../components/container/MainContainer";
import { Box, FormControl, InputLabel, MenuItem, Select, OutlinedInput, Checkbox, ListItemText } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import dayjs from "dayjs";
import { useOutletContext } from "react-router-dom";
import { downloadCSV } from "../utility/Utility";
import { FaDownload } from "react-icons/fa6";

const WaterSystemPage = () => {
  // get users from outlet context higher in the component tree
  const { users } = useOutletContext()

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [sensorData, setSensorData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [sensorOptions, setSensorOptions] = useState(['Sensor 1', 'Sensor 2']);
  const [selectedSensors, setSelectedSensors] = useState([])
  
  // useEffect
  useEffect(() => {

    if (!selectedUsers) return;
    let unsubscribeSensorData;

    if (selectedUsers.length > 0) {
      // Default to the first two sensors
      if (selectedSensors.length === 0) setSelectedSensors(sensorOptions);

      setIsLoading(true);
  
      const q = query(
        collection(db, "lactate_data"),
        where("user_name", "in", selectedUsers.slice(0, 10))
      );
    
      unsubscribeSensorData = onSnapshot(
        q,
        (querySnapshot) => {
          let data = [];
    
          querySnapshot.forEach((doc) => {
            const rawData = doc.data();
    
            if (typeof rawData.timestamp === "number") {
              rawData.timestamp = new Date(rawData.timestamp * 1000).toISOString();
            }
            data.push(rawData);
          });
    
          data = data.filter((d) => selectedSensors.includes(d.sensor_id));
          data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
          setSensorData(data);
          setIsError(false);
          setIsLoading(false);
        },
        (error) => {
          console.error("Error fetching filtered data:", error);
          setIsError(true);
          setIsLoading(false);
        }
      );
    }

    setIsLoading(false);
    return () => {
      if (unsubscribeSensorData) unsubscribeSensorData();
    };
  }, [selectedUsers, selectedSensors]);

  // get lactate series
  const getSensorSeries = (sensorId, lactateKey) => {
    return sensorData
      .filter((d) => d.sensor_id === sensorId)
      .map((d) => d[lactateKey]);
  };

  // timsetamps for x axis
  const getSensorTimestampsAsDates = (sensorId) => {
    return sensorData
      .filter((d) => d.sensor_id === sensorId)
      .map((d) => new Date(d.timestamp));
  };
  
  // 3 charts for each sensor
  const renderChartsForSensor = (sensorId) => {

    // get the last measurement
    const latestData = sensorData
      .filter((d) => d.sensor_id === sensorId)
      .at(-1); // Latest reading for this sensor

    const chartData = sensorData.filter((d) => d.sensor_id === sensorId);
  
    return (
      <React.Fragment key={sensorId}>
        <div className="mt-10 mb-4">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold text-Black-400 pb-4">{sensorId}</h2>
            <FaDownload 
              className="cursor-pointer"
              onClick={() => downloadCSV(sensorId, chartData)}
            />
          </div>
          {latestData && (
            <div className="grid grid-cols-3 gap-4 text-gray-700 pb-2 border-b">
              <p>Temperature:<b className="pl-2">{latestData.temperature}</b></p>
              <p>Connection Status:<b className="pl-2">{`${latestData.connection_status_flag}`}</b></p>
              <p>Wear Status:<b className="pl-2">{`${latestData.wearing_status_flag}`}</b></p>
            </div>
        )}
        </div>
  
        {/* Channel 1 */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[800px]">
            <LineChart
              margin={{ left: 0, top: 20, right: 20, bottom: 30 }}
              height={300}
              series={[{ data: getSensorSeries(sensorId, "ohm1"), label: "Lactate", showMark: false }]}
              xAxis={[
                {
                  scaleType: "time",
                  data: getSensorTimestampsAsDates(sensorId),
                },
              ]}
              tooltip={{
                valueFormatter: (value, context) =>
                  `Time: ${dayjs(context.dataIndex !== undefined ? getSensorTimestampsAsDates(sensorId)[context.dataIndex] : "").format("YYYY-MM-DD HH:mm:ss")}`,
              }}   
            />
          </div>
        </div>
        <h3 className="text-lg text-black mt-8 pb-4 text-center"><b>Lactate (Channel 1)</b> : <b className="pb-4 text-green-600">{latestData?.ohm1 ?? ""}</b></h3>
  
        <hr className="border-t border-gray-300 my-8 w-full" />
  
        {/* Channel 2 */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[800px]">
            <LineChart
              margin={{ left: 0, top: 20, right: 20, bottom: 30 }}
              height={300}
              series={[{ data: getSensorSeries(sensorId, "ohm3"), label: "Lactate", showMark: false }]}
              xAxis={[
                {
                  scaleType: "time",
                  data: getSensorTimestampsAsDates(sensorId),
                },
              ]}
              tooltip={{
                valueFormatter: (value, context) =>
                  `Time: ${dayjs(context.dataIndex !== undefined ? getSensorTimestampsAsDates(sensorId)[context.dataIndex] : "").format("YYYY-MM-DD HH:mm:ss")}`,
              }}   
            />
          </div>
        </div>
        <h3 className="text-lg text-black mt-8 pb-4 text-center"><b>Lactate (Channel 2)</b> : <b className="pb-4 text-green-600">{latestData?.ohm1 ?? ""}</b></h3>
  
        <hr className="border-t border-gray-300 my-8 w-full" />
  
        {/* Channel 3 */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[800px]">
            <LineChart
              margin={{ left: 0, top: 20, right: 20, bottom: 30 }}
              height={300}
              series={[{ data: getSensorSeries(sensorId, "ohm3"), label: "Lactate", showMark: false }]}
              xAxis={[
                {
                  scaleType: "time",
                  data: getSensorTimestampsAsDates(sensorId),
                },
              ]}
              tooltip={{
                valueFormatter: (value, context) =>
                  `Time: ${dayjs(context.dataIndex !== undefined ? getSensorTimestampsAsDates(sensorId)[context.dataIndex] : "").format("YYYY-MM-DD HH:mm:ss")}`,
              }}        
            />
          </div>
        </div>
        <h3 className="text-lg text-black mt-8 pb-4 text-center"><b>Lactate (Channel 3)</b> : <b className="pb-4 text-green-600">{latestData?.ohm1 ?? ""}</b></h3>

      </React.Fragment>
    );
  };
  
  

  return (
    <>
      <div className="py-8 flex flex-col space-y-2 md:items-baseline md:flex-row md:justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">Sensor Data Charts</h1>
      </div>
      <Box className="w-full flex items-center justify-between mb-4 flex-wrap gap-4">
        <div className="flex gap-4 flex-wrap">
          {/* User Name Filter */}
          <FormControl sx={{ minWidth: 250 }}>
            <InputLabel>User Name</InputLabel>
            <Select
              value={selectedUsers}
              onChange={(e) => setSelectedUsers([e.target.value])}
              input={<OutlinedInput label="User Name" />}
              renderValue={(selected) => selected.join(', ')}
            >
              {users.map((name) => (
                <MenuItem key={name} value={name}>
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Sensor ID Filter */}
          {
            selectedUsers.length > 0 &&
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
          }
        </div>

        <button
          onClick={() => {
            downloadCSV("combined_sensor_data", sensorData);
          }}
          className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Download User Data
        </button>
      </Box>



      {isLoading ? (
        <MainContainer>
          <LoadingSpinner size="40px" className="h-[223px]" />
        </MainContainer>
      ) : isError ? (
        <MainContainer>
          <p className="text-red-500">Failed to load data.</p>
        </MainContainer>
      ) : selectedUsers.length === 0 || selectedSensors.length === 0? (
        <MainContainer>
          <p className="text-black text-lg pb-10">👋 Select a user to view sensor data.</p>
        </MainContainer>
      ) : (
        <MainContainer>
          {selectedSensors.map(renderChartsForSensor)}
        </MainContainer>
      )}
    </>
  );
};

export default WaterSystemPage;
