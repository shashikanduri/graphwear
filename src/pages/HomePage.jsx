import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase"; // Ensure this points to your Firestore setup
import { LoadingSpinner } from "../components/LoadingSpinner";
import MainContainer from "../components/container/MainContainer";
import DisplayTablePagination from "../components/tables/DisplayTablePagination";
import { SensorDataInfo } from "../components/ui/SensorDataInfo";

const WaterSystemPage = () => {
  const { setModal } = useOutletContext();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [sensorData, setSensorData] = useState([]);
  
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "lactate_data"),
      (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSensorData(data);
        setIsError(false);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching real-time data:", error);
        setIsError(true);
        setIsLoading(false);
      }
    );
  
    return () => unsubscribe(); // Clean up on unmount
  }, []);


  const onRowClick = (data) => {
    setModal({content: <SensorDataInfo data={data} />, size: "modalFull"})
  };

  const columns = [
    {
      accessorKey: "user_id",
      header: "User ID",
      size: 50,
    },
    {
      accessorKey: "sensor_id",
      header: "Sensor",
    },
    {
      accessorKey: "raw1",
      header: "Lactate(Raw 1)",
    },
    {
      accessorKey: "raw2",
      header: "Lactate(Raw 2)",
    },
    {
      accessorKey: "raw3",
      header: "Lactate(Raw 3)",
    },
    {
      accessorKey: "timestamp",
      header: "Timestamp",
    }
  ];

  return (
    <>
      <div className="py-8 flex flex-col space-y-2 md:items-baseline md:flex-row md:justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">
          All Sensor Data
        </h1>
      </div>

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
          tableData={sensorData}
          columns={columns}
          initialState={{ sorting: [{ id: "ps_code", desc: false }] }}
          maxHeight="420px"
          onRowClick={onRowClick}
        />
      )}
    </>
  );
};

export default WaterSystemPage;
