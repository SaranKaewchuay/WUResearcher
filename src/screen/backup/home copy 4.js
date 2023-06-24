import React, { useState, useEffect } from "react";
import axios from "axios";
import GoogleScholarCard from "../component/googleScholarCard";
import ScopusCard from "../component/scopusCard";
import { Container, Typography, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../style/styles.css";
import "../style/loader.css";
import authors from "../json/Scopus_Author";

const host = "https://scrap-backend.vercel.app/";
// const host = "http://localhost:8080/";

const baseURL = host + "authors";

function Home() {
  const [posts, setPosts] = useState([]);
  const [postsLength, setPostsLength] = useState(0);
  const [img, setImg] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Default select");

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const fetchData = (url) => {
    setIsLoading(true);
    axios
      .get(url)
      .then((response) => {
        setPosts(response.data);
        setPostsLength(response.data.length);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const url =
      searchQuery === "" ? baseURL : `${baseURL}/author/${searchQuery}`;
    fetchData(url);
    const img =
      searchQuery === ""
        ? "https://upload.wikimedia.org/wikipedia/commons/2/28/Google_Scholar_logo.png?20190206225436"
        : "https://www.ijeat.org/wp-content/uploads/2019/06/scopus.png";
    setImg(img);
  }, [searchQuery]);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);

    if (event.target.value === "scopus") {
      setIsLoading(true);
      setPosts(authors);
      setPostsLength(authors.length);
      const img = "https://www.ijeat.org/wp-content/uploads/2019/06/scopus.png";
      setImg(img);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } else {
      const url =
        searchQuery === "" ? baseURL : `${baseURL}/author/${searchQuery}`;
      fetchData(url);
      const img =
        "https://upload.wikimedia.org/wikipedia/commons/2/28/Google_Scholar_logo.png?20190206225436";
      setImg(img);
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ paddingTop: "3rem" }}
      style={{ marginTop: "65px" }}
    >
      <div
        className="shadow p-3 mb-5 bg-white rounded"
        style={{ width: "100%", minHeight: "365px" }}
      >
        <div className="row">
          <div className="col">
            <Typography variant="h4" sx={{ mb: 2 }} className="color-blue pb-3">
              Search Researcher
            </Typography>
            <TextField
              variant="outlined"
              label="Enter researcher name"
              fullWidth
              sx={{ width: "400px" }} // Set the desired width here
              value={searchQuery}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <IconButton
                    type="submit"
                    sx={{ p: "10px" }}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </div>

          <div className="col p-2 mt-2">
            <div className="form-group row ml-5">
              <span className="color-blue ubutu">Select Source</span>
              <select
                className="form-control"
                style={{ width: "250px" }}
                value={selectedOption}
                onChange={handleSelectChange}
              >
                <option value="scholar">Google Scholar</option>
                <option value="scopus">Scopus</option>
              </select>
            </div>
            <div className=" p-2 mt-4">
              <h4 className="color-blue ubutu" style={{ fontWeight: "bolder" }}>
                {postsLength} Researchers
              </h4>
          </div>
          </div>
        </div>

        <div className="row">
          {/* <div className="col p-2 mt-4">
            <div>
              <h4 className="color-blue ubutu" style={{ fontWeight: "bolder" }}>
                {postsLength} Researchers
              </h4>
            </div>
          </div> */}
          {/* <div className="col p-2 mt-2">
            <div className="form-group row ml-5">
              <span className="color-blue ubutu">Select Source</span>
              <select
                className="form-control"
                style={{ width: "250px" }}
                value={selectedOption}
                onChange={handleSelectChange}
              >
                <option value="scholar">Google Scholar</option>
                <option value="scopus">Scopus</option>
              </select>
            </div>
          </div> */}
        </div>
        {postsLength === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <p className="font color-blue not-found ubutu">
              Not Found Researcher
            </p>
          </div>
        ) : (
          <>
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
                <div className="row">
                  {posts.map((post) =>
                    selectedOption === "scopus" ? (
                      <ScopusCard key={post.id} post={post} />
                    ) : (
                      <GoogleScholarCard key={post.id} post={post} />
                    )
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Container>
  );
}

export default Home;
