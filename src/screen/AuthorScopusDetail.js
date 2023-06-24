import React, { useState, useEffect, useContext } from "react";
import Graph from "../component/graph";
import SubTable from "../component/sub_table";
import Container from "@mui/material/Container";
import axios from "axios";
import "../style/styles.css";
import "../style/loader.css";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $, { post } from "jquery";
import "../style/styles.css";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import authors from "../json/Scopus_Author";

const host = "https://scrap-backend.vercel.app/";
//const host = "http://localhost:8080/";

const baseURL = host + "articles/articleId/";

export default function Home() {
  const [posts, setPosts] = React.useState();
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("id");

  React.useEffect(() => {
    console.log("authors = ", authors);
    console.log("name = ", name);
    const authorsData = authors.filter((item) => item.name.split(",")[0] === name);
    console.log(authorsData);
    setPosts(authorsData);
  }, []);

  return (
    <div style={{ marginTop: "110px" }}>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div className="loader">
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div>
          <Container maxWidth="xl" className="mb-0 mt-5">
            {posts.map((post) => (
              <p>{post.name}</p>
            ))}
          </Container>
        </div>
      )}
    </div>
  );
}
