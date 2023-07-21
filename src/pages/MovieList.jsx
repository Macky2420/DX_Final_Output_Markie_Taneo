import React from "react";
import Movies from "../components/Movies";
import Search from "../components/Search";

const MovieList = () => {

  return (
    <>
      {/* Search bar */}
      <Search/>
      {/* Movies List */}
      <Movies/>

    </>
  );
}

export default MovieList;