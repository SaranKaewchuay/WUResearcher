import React, { useState, useEffect } from "react";
import axios from "axios";
import GoogleScholarCard from "../../component/googleScholarCard";
import ScopusCard from "../../component/scopusCard";
import { Container, Typography, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../style/styles.css";
import "../style/loader.css";

const host = "https://scrap-backend.vercel.app/";
// const host = "http://localhost:8080/";

const baseURL = host + "authors";

function Home() {
  const [posts, setPosts] = useState([]);
  const [postsLength, setPostsLength] = useState(0);
  const [img, setImg] = useState();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [selectedOption, setSelectedOption] = useState("scholar");

  const handleScroll = () => {
    const isBottom = window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1;

    if (isBottom) {
      console.log("isBottom")
      setPage((prevPage) => prevPage + 1);
      setIsLoadingAdd(true);
    }
  };

  useEffect(() => {
    const handleScrollEvent = () => handleScroll();

    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, [handleScroll]);


  const fetchData = async (url) => {
    setIsLoading(true);

    try {
      const response = await axios.get(`${url}?page=${page}`);
      const newPosts = response.data;

      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setPostsLength((prevPostsLength) => prevPostsLength + newPosts.length);
      setIsLoading(false);
      setIsLoadingAdd(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSearchData = async (url) => {
    setPosts([])
    setIsLoading(true);

    try {
      const response = await axios.get(`${url}`);
      const newPosts = response.data;
      setPosts(newPosts);
      setPostsLength(newPosts.length);
      setIsLoading(false);
      setIsLoadingAdd(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);

    if(!event.target.value){
      if(selectedOption === "scopus"){
        fetchData(`${baseURL}Scoupus/`);
      }else{
        fetchData(`${baseURL}`);
      }
      
    }
  };

  useEffect(() => {
    let url;
    let img;
    if (selectedOption === "scopus") {
      url =
        searchQuery === ""
          ? `${baseURL}Scoupus/`
          : `${baseURL}Scoupus/author/${searchQuery}`;
      img = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Scopus_logo.svg/2560px-Scopus_logo.svg.png";    
    } else {
      url = searchQuery === "" ? baseURL : `${baseURL}/author/${searchQuery}`;
      img = "https://upload.wikimedia.org/wikipedia/commons/2/28/Google_Scholar_logo.png?20190206225436";
    }
    console.log("searchQuery = ",searchQuery)
    if(searchQuery){
      fetchSearchData(url)
    }else{
      console.log("เข้า")
      setPosts([])
      setPage(1)
      setPostsLength(0);
      fetchData(url);
    }
  
    setImg(img);
  }, [searchQuery, selectedOption, page]);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    setSearchQuery("");
    setPostsLength(0);
    setPosts([])
    setPage(1)

    let url;
    let img;

    if (value === "scopus") {
      url = `${baseURL}Scoupus/`;
      img =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Scopus_logo.svg/2560px-Scopus_logo.svg.png";
    } else {
      url = `${baseURL}/author/`;
      img =
        "https://upload.wikimedia.org/wikipedia/commons/2/28/Google_Scholar_logo.png?20190206225436";
    }

    fetchData(url);
    setImg(img);
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
                  alt="source"
                  style={{ maxWidth: "85%", minWidth: "65%", height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row"></div>
        {postsLength === 0 && isLoading === false ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <p className="font color-blue not-found ubutu text-center">
              Not Found Researcher
            </p>
          </div>
        ) : (
          <>
            {isLoading && page == 1 ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "50vh",
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

        {isLoadingAdd && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "20vh",
            }}
          >
            <div className="loader">
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}

export default Home;
