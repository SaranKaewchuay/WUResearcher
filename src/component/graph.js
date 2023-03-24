import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import data1 from "./data";
import "../style/styles.css";
import { useLocation } from "react-router-dom";

function Graph() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const data = queryParams.get("data");

  return (
    <ResponsiveContainer width="100%" height={165}>
      <BarChart data={data1} className="m-0">
        <Bar dataKey="citations" fill="#0d6efd" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default Graph;
