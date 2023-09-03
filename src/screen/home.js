import React, { useState, useEffect } from "react";
import axios from "axios";
import GoogleScholarCard from "../component/googleScholarCard";
import JournalCard from "../component/scopusJournalCard";
import ScopusCard from "../component/scopusCard";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  Container,
  TextField,
  IconButton,
  Button,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../style/styles.css";
import "../style/loader.css";
import baseApi from "../baseApi/baseApi";

const host = baseApi;

function Home() {
  const [posts, setPosts] = useState([]);
  const [postsLength, setPostsLength] = useState("0");
  const [img, setImg] = useState();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [selectedOption, setSelectedOption] = useState("scholar");
  const [selectedSort, setSelecteSort] = useState("sort_name");
  const [selectedButton, setSelectedButton] = useState("author");
  const [click, setClick] = useState(false);
  const [checkSearch, setCheckSearch] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleScroll = () => {
    const isBottom =
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 1;                    
    if (isBottom && !searchQuery) {
      setPage((prevPage) => prevPage + 1);
      if (posts.length != postsLength) setIsLoadingAdd(true);
    }
  };

  useEffect(() => {
    const handleScrollEvent = () => handleScroll();

    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, [handleScroll]);

  const fetchTotal = async () => {
    try {
      let url;
      if (selectedOption === "scopus") {
        if (selectedButton === "author") {
          url = `${host}scopus/author/getTotal`;
        } else if (selectedButton === "journal") {
          url = `${host}scopus/journal/getTotal`;
        }
      } else {
        url = `${host}scholar/author/getTotal`;
      }

      const response = await axios.get(url);
      const newPosts = response.data.count;

      return newPosts;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const fetchData = async (url) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${url}&page=${page}`);
      console.log("page : ",page)
      const newPosts = response.data;
      const length = await fetchTotal();
      setPostsLength(length);
      setPosts((prevPosts) => (page === 1 ? newPosts : [...prevPosts, ...newPosts]));
      setIsLoading(false);
      setIsLoadingAdd(false);
    } catch (error) {
      setIsLoading(false);
      setIsLoadingAdd(false);
      console.error(error);
      throw error;
    }
  };
  

  const fetchSearchData = async (url) => {
    try {
      setPosts([]);
      setIsLoading(true);
      const response = await axios.get(url);
      const newPosts = response.data;

      setPosts(newPosts);
      setPostsLength(newPosts.length);
      setIsLoading(false);
      setIsLoadingAdd(false);
      setClick(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsLoadingAdd(false);
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    let url;

    if (!value) {
      setCheckSearch(false)
      setPostsLength("0");
      setPosts([]);
      setPage(1);
      url =
        selectedOption === "scopus" && selectedButton === "journal"
          ? `${host}scopus/journal`
          : `${host}scholar/author`;

      fetchData(url);
    }
  };

  const handleClickSearch = () => {
    setClick(true);
    if(searchQuery){
      setCheckSearch(true)
    }else{
      setCheckSearch(false)
    }
    
  };

  const handleButtonClick = (buttonType) => {
    setPostsLength("0");
    setSearchQuery("");
    setPosts([]);
    setPage(1);
    setSelectedButton(buttonType);
    setSelecteSort("sort_name");

    let url;
    if (buttonType === "author") {
      url = `${host}scopus/author?sortField=name&sortOrder=asc`;
    } else if (buttonType === "journal") {
      url = `${host}scopus/journal?sortField=journal-name&sortOrder=asc`;
    }
    fetchData(url);
  };

  useEffect(() => {
    let url;
    let img;
    let router;
    if (selectedOption === "scopus") {
      if (selectedButton === "author") {
        if (selectedSort === "sort_name") {
          router = `${host}scopus/author?sortField=name&sortOrder=asc`;
        } else if (selectedSort === "sort_num_article") {
          router = `${host}scopus/author?sortField=document-count&sortOrder=desc`;
        } else if (selectedSort === "sort_h_index") {
          router = `${host}scopus/author?sortField=h-index&sortOrder=desc`;
        }
        url =
          searchQuery === ""
            ? router
            : `${host}scopus/author/name/${searchQuery}`;
      } else {
        if (selectedSort === "sort_name") {
          router = `${host}scopus/journal?sortField=journal-name&sortOrder=asc`;
        }
        url =
          searchQuery === ""
            ? router
            : `${host}scopus/journal/name/${searchQuery}`;
      }
      img =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Scopus_logo.svg/2560px-Scopus_logo.svg.png";
    } else {
      if (selectedSort === "sort_name") {
        router = `${host}scholar/author?sortField=name&sortOrder=asc`;
      } else if (selectedSort === "sort_num_article") {
        router = `${host}scholar/author?sortField=document-count&sortOrder=desc`;
      } else if (selectedSort === "sort_h_index") {
        router = `${host}scholar/author?sortField=h-index&sortOrder=desc`;
      }
      url = searchQuery === "" ? router : `${host}scholar/author/name/${searchQuery}`;
      img =
        "https://upload.wikimedia.org/wikipedia/commons/2/28/Google_Scholar_logo.png?20190206225436";
    }

    if (click) {
      fetchSearchData(url);
    } else if (!searchQuery) {
      fetchData(url);
    }

    setImg(img);
  }, [selectedOption, selectedButton, page, click, selectedSort, searchQuery]);

  
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleClickSearch();
    }
  };


  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    setPostsLength("0");
    setSearchQuery("");
    setPosts([]);
    setPage(1);
    setSelecteSort("sort_name");

    let url;
    let img;

    if (value === "scopus") {
      setSelectedButton("author");
      url = `${host}scopus/author?sortField=name&sortOrder=asc`;
      img =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Scopus_logo.svg/2560px-Scopus_logo.svg.png";
    } else {
      setSelectedButton("");
      url = `${host}scholar/author?sortField=name&sortOrder=asc`;
      img =
        "https://upload.wikimedia.org/wikipedia/commons/2/28/Google_Scholar_logo.png?20190206225436";
    }

    fetchData(url);
    setImg(img);
  };

  const handleSelectSortChange = (event) => {
    const value = event.target.value;
    console.log("value  = ", value);
    setPostsLength("0");
    setSearchQuery("");
    setPosts([]);
    setPage(1);
    setSelecteSort(value);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ paddingTop: "3rem" }}
      style={{ marginTop: "65px" }}
    >
      <div
        className="shadow p-3 bg-white rounded mb-5"
        style={{ width: "100%", minHeight: "110px" }}
      >
        <div className="row">
          <div className="col-sm col-md col-lg col-xl">
            <div className="row">
              <div className="p-2 col">
                <img
                  src={img}
                  alt="source"
                  style={{
                    maxWidth: selectedOption === "scopus" ? "16%" : "30%",
                    minWidth: selectedOption === "scopus" ? "10%" : "20%",
                    height: "auto",
                  }}
                />
              </div>
            </div>

            <div className="d-flex justify-content-center align-items-center">
              <TextField
                className="mt-1"
                variant="outlined"
                label={
                  selectedButton === "journal"
                    ? "Enter journal name"
                    : "Enter researcher name"
                }
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
                      onClick={handleClickSearch}
                    >
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>

          <div className="col-sm col-md col-lg col-xl p-2 mt-2">
            <div className="form-group row ml-5 mt-2 ">
              <span className="color-blue ubuntu pb-2">Select Source</span>

              <Select
                value={selectedOption}
                onChange={handleSelectChange}
                style={{ maxWidth: "50%", height: "auto", fontSize: "15px" }}
              >
                <MenuItem value="scholar">Google Scholar</MenuItem>
                <MenuItem value="scopus">Scopus</MenuItem>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {selectedOption === "scopus" && (
        <Stack spacing={2} direction="row">
          <Button
            variant={selectedButton === "author" ? "contained" : "outlined"}
            onClick={() => handleButtonClick("author")}
          >
            Author
          </Button>
          <Button
            variant={selectedButton === "journal" ? "contained" : "outlined"}
            onClick={() => handleButtonClick("journal")}
          >
            Journal
          </Button>
        </Stack>
      )}
      <div
        className="shadow p-3 mb-5 bg-white rounded"
        style={{ width: "100%", minHeight: "365px" }}
      >
        <div className="row">
          <div className="mt-1 col">
            <h4 className="color-blue ubuntu">{postsLength} Results</h4>
          </div>
          {!checkSearch && (
            <div className="mt-1 col">
              <div className="d-flex justify-content-end">
                <span
                  className="color-blue ubuntu align-items-center pt-1 m-2"
                  style={{ fontSize: "18px" }}
                >
                  Sort By
                </span>
                {selectedButton !== "journal" ? (
                  <Select
                    value={selectedSort}
                    onChange={handleSelectSortChange}
                    style={{
                      maxWidth: "50%",
                      height: "auto",
                      fontSize: "16px",
                    }}
                  >
                    <MenuItem value="sort_name">Researcher Name (a-z)</MenuItem>
                    <MenuItem value="sort_num_article">
                      Researcher Articles (highest)
                    </MenuItem>
                    <MenuItem value="sort_h_index">H-Index (highest)</MenuItem>
                  </Select>
                ) : (
                  <Select
                    value={selectedSort}
                    onChange={handleSelectSortChange}
                    style={{
                      maxWidth: "50%",
                      height: "auto",
                      fontSize: "16px",
                    }}
                  >
                    <MenuItem value="sort_name">Researcher Name (a-z)</MenuItem>
                  </Select>
                )}
              </div>
            </div>
          )}
        </div>
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
            {isLoading && page === 1 ? (
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
                      selectedButton === "journal" ? (
                        <JournalCard key={post.id} post={post} />
                      ) : (
                        <ScopusCard key={post.id} post={post} />
                      )
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
