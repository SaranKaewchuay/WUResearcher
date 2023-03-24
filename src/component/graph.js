import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip} from "recharts";
import data from "./data";
import "../style/styles.css";
import { useLocation } from "react-router-dom";

function Graph() {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const data = queryParams.get("data");


  return (
    <BarChart width={300} height={165} data={data} className="m-0">
      <Bar dataKey="citations" fill="#0d6efd" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
    </BarChart>
  );
}

export default Graph;
