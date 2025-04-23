import { isNotEmptyOrNull } from "../../utility/Utility";
import { formatLabel } from "../../utility/Utility";
import MainContainer from "../container/MainContainer";
import { formatDate, DATE_TIME_FORMAT_1 } from "../../utility/Utility"

export const SensorDataInfo = ({ data }) => {
  const RenderData = (title, key, className = "") => {
    const isNotEmpty = isNotEmptyOrNull(data, key);
    
    if (key === "timestamp"){
      data[key] = formatDate(data[key], DATE_TIME_FORMAT_1);
    }

    return (
      <div className={`flex flex-col ${className}`}>
        <h3 className="font-bold">{formatLabel(title)}</h3>
        <p
          className={`px-.5 py-2 font-normal ${
            isNotEmpty ? "text-gray-500" : "text-red-600"
          } whitespace-nowrap`}
        >
          {isNotEmpty ? `${data?.[key]}` : "Missing"}
        </p>
      </div>
    );
  };

  return (
    <MainContainer header="Data Packet Information">
      <div className="grid xl:grid-cols-[repeat(4,1fr)] min-[1092px]:grid-cols-[repeat(3,1fr)] sm:grid-cols-[repeat(2,1fr)] gap-x-3 gap-y-0 ">
        {RenderData("User", "user_name")}
        {RenderData("Sensor", "sensor_id")}
        {RenderData("Timestamp", "timestamp")}

        <hr className="col-[1/-1] my-2" />

        {RenderData("Lactate (Raw 1)", "raw1")}
        {RenderData("Lactate (Raw 2)", "raw2")}
        {RenderData("Lactate (Raw 3)", "raw3")}

        <hr className="col-[1/-1] my-2" />

        {RenderData("Ohm 1", "ohm1")}
        {RenderData("Ohm 2", "ohm2")}
        {RenderData("Ohm 3", "ohm3")}

        <hr className="col-[1/-1] my-2" />

        {RenderData("Temperature", "temperature")}
        {RenderData("Connection Status", "connection_status_flag")}
        {RenderData("Charging Status", "charging_status_flag")}
        {RenderData("Touch Status", "touch_status_flag")}
        {RenderData("Insertion Status", "insertion_status_flag")}
        {RenderData("Flag 4", "flag4")}
        {RenderData("Flag 5", "flag5")}
        {RenderData("Flag 6", "flag6")}
        {RenderData("Gain 0", "gain0")}
        {RenderData("Gain 1", "gain1")}
        {RenderData("Gain 2", "gain2")}
        {RenderData("Offset 0", "offset0")}
        {RenderData("Offset 1", "offset1")}
        {RenderData("offset 2", "offset2")}
        {RenderData("Header 1", "header1")}
        {RenderData("Header 2", "header2")}

      </div>
    </MainContainer>
  );
};
