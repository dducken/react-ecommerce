import React, { useState } from "react";
import "./search.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";

function SearchInput({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [userEmail, setEmail] = useState([]);


  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.email.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
    setEmail("");
  };

  const handleUsername = (email) => {
    setEmail(email);
    setFilteredData([]);
    setWordEntered("");
  }

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={userEmail ? userEmail : wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0  && userEmail ===''? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResultUser">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              // <a className="dataItem" href={value.link}>
              //   <p>{value.title} </p>
              // </a> <Link to={`/product/${value._id}`} className="dataItem">
                <p className="dataItem" onClick={() => handleUsername(value.email)}>{value.email} </p>
              
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchInput;