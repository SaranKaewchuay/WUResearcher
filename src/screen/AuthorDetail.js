import * as React from "react";
import Table from "../component/tableArticle";
import Graph from "../component/graph";
import SubTable from "../component/sub_table";
import Container from "@mui/material/Container";
import axios from "axios";
import "../style/styles.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const baseURL = "http://localhost:8080/authors/";

export default function AuthorDetail() {
  const [posts, setPosts] = React.useState([]);

  console.log(posts);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  console.log("author_id = ", id);
  React.useEffect(() => {
    axios
      .get(baseURL + id)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getData = () => {
    getData();
    console.log("posts = ", posts);
  };

  return (
    <div>
      <Container maxWidth="lg" className="mb-0 mt-5">
        <div
          class="shadow p-3 mb-5 bg-white rounded"
          style={{ width: "100%", height: "365px" }}
        >
          <div class="row">
            <div class="col-4 d-flex align-items-center justify-content-center">
              <div
                class="shadow-sm p-3 mb-5 bg-white rounded"
                style={{ width: "300px", height: "330px" }}
              >
                <img
                  src={posts.image}
                  class="img-thumbnail"
                  style={{
                    width: "270px",
                    height: "300px",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
            <div class="col-4  mt-5 p-0">
              <h5 class="some-text blue">{posts.author_name}</h5>
              <br />
              <h6 class="some-text gray ">{posts.department}</h6>
              <div
                class="border border-primary rounded-pill p-2  mt-4"
                style={{ width: "200px" }}
              >
                <div class="text-center">
                  <span class="blue" st>
                    <b>Research Articles: </b>
                  </span>
                  <span class="blue">6</span>
                </div>
              </div>
              {/* {posts.subjectArea.map((area) => (
              
                  <div>
                    <span class="">{area.toUpperCase() +", "}</span>
                  </div>
             
              ))} */}

              <div
                class="border border-primary rounded-pill p-2 mt-2"
                style={{ width: "150px" }}
              >
                <div class="text-center">
                  <span class="blue" st>
                    <b>h-index: </b>
                  </span>
                  {/* <span class="blue">{posts.citation_by.table[1].h_index.all}</span> */}
                </div>
              </div>
            </div>

            <div class="col-4 pr-5 m-0">
              <div class="row-2 pr-5">
                <SubTable />
              </div>
              <div class="row">
                {/* {posts.map((post) => (
                  <div>
                    {post.citation_by.map((cite) => (
                      <Graph key={cite.id} data={cite.graph} />
                    ))}
                  </div>
                ))} */}
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Table id={id} />
    </div>
  );
}
