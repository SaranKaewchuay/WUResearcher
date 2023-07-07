import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  Line,
  ReferenceLine,
} from "recharts";
import { useLocation } from "react-router-dom";
import axios from "axios";

const host = "https://scrap-backend.vercel.app/";
// const host = "http://localhost:8080/";

const baseURL = host + "authorsScopus/";

function GraphScopus() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const [dataGraph, setDataGraph] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseURL + id);
        const { citations_graph, documents_graph } = response.data[0];

        const mappedCitations = citations_graph.map((item) => ({
          label: item.year,
          value: parseInt(item.citations),
          type: "citation",
        }));

        const mappedDocuments = documents_graph.map((item) => ({
          label: item.year,
          value: parseInt(item.documents),
          type: "document",
        }));

        const data = [...mappedCitations, ...mappedDocuments];

        const columns = {};
        data.forEach((item) => {
          const { label, value, type } = item;
          if (!columns[label]) {
            columns[label] = { label, [type]: value };
          } else {
            columns[label][type] = value;
          }
        });

        const sortedData = Object.values(columns).sort(
          (a, b) => a.label - b.label
        );
        setDataGraph(sortedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const CustomLabel = ({ text }) => (
    <text x={0} y={0} dy={-10} fill="#666" fontSize={12} textAnchor="end">
      {text}
    </text>
  );

  const MyChart = () => (
    <ResponsiveContainer width="95%" height={350}>
      <ComposedChart data={dataGraph}>
        <XAxis dataKey="label" className="text-center" />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey="document" barSize={60} fill="#0066CC" yAxisId="left" />
        <Line
          type="monotone"
          dataKey="citation"
          stroke="#000066"
          connectNulls={true}
          yAxisId="right"
        />
        <YAxis yAxisId="left" domain={[0, "dataMax"]} />
        <YAxis yAxisId="right" orientation="right" domain={[0, "dataMax"]} />
        <ReferenceLine
          y={100}
          stroke="red"
          strokeDasharray="3 3"
          yAxisId="left"
        />
        <ReferenceLine
          y={200}
          stroke="green"
          strokeDasharray="3 3"
          yAxisId="right"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );

  return (
    <div className="App">
      <span
        className="text-center ubuntu color-blue"
        style={{ fontWeight: "bolder", fontSize: "20px" }}
      >
        <p>Document &amp; Citation Trends</p>
      </span>
      <MyChart />
    </div>
  );
}

export default GraphScopus;
