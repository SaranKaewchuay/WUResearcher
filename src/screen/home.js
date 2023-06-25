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

    let img;

    if (selectedOption === "scopus") {
      img =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Scopus_logo.svg/2560px-Scopus_logo.svg.png";
    } else {
      img =
        "https://upload.wikimedia.org/wikipedia/commons/2/28/Google_Scholar_logo.png?20190206225436";
    }

    setImg(img);
  }, [searchQuery]);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);

    if (event.target.value === "scopus") {
      setIsLoading(true);
      setPosts(authors);
      setPostsLength(authors.length);
      const img =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Scopus_logo.svg/2560px-Scopus_logo.svg.png";
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
          <div className="col-sm col-md col-lg col-xl">
            <Typography variant="h4" className="color-blue pb-3">
              Search Researcher
            </Typography>
            <TextField
              variant="outlined"
              label="Enter researcher name"
              fullWidth
              sx={{ maxWidth: "85%", height: "auto" }}
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

          <div className="col-sm col-md col-lg col-xl p-2 mt-2">
            <div className="form-group row ml-5">
              <span className="color-blue ubuntu pb-2">Select Source</span>
              <select
                className="form-select"
                style={{ maxWidth: "50%", height: "auto" }}
                value={selectedOption}
                onChange={handleSelectChange}
              >
                <option value="scholar">Google Scholar</option>
                <option value="scopus">Scopus</option>
              </select>
            </div>
            <div className="row">
              <div className="p-2 mt-1 col">
                <h5 className="color-blue ubuntu">{postsLength} Researchers</h5>
              </div>
              <div className="p-2 col">
                <img
                  src={img}
                  style={{ maxWidth: "85%", minWidth: "65%", height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row"></div>
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
