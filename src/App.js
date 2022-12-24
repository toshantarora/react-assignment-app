import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts`
      );
      if (response) {
        setData(response?.data);
        // console.log(response);
      }
    } catch (err) {
      console.log.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, [filteredData]);

  const handleOnChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleClick = async () => {
    if (searchText !== "") {
      const filtered = data.filter((item) => {
        return Object.values(item.title)
          .join("")
          .toLowerCase()
          .includes(searchText.toLowerCase());
      });
      setData(filtered);
    }
  };
  console.log("data", data);
  return (
    <div style={{ backgroundColor: "lightblue" }} className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          gap: "10px",
          padding: "40px",
        }}
      >
        <div>
          <input
            name="searchText"
            value={searchText}
            onChange={(e) => handleOnChange(e)}
            style={{ padding: "15px", borderRadius: "50px", border: "none" }}
            type="text"
            placeholder="search"
          />
        </div>
        <div>
          <button
            onClick={handleClick}
            style={{ padding: "15px", borderRadius: "10px", border: "none" }}
            type="button"
          >
            Search
          </button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",

          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          height: "100vh",
          overFlow: "hidden",
        }}
      >
        <div
          style={{
            overFlow: "hidden",
            // backgroundColor: "red",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            justifyContent: "row",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {data
            ? data.map((item, idx) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    justifyContent: "row",
                  }}
                >
                  <div
                    style={{
                      width: "300px",
                      height: "300px",
                      backgroundColor: "white",
                    }}
                    key={idx}
                  >
                    <p> Title: {item.title}</p>
                    <p>Body: {item.body}</p>
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
}

export default App;
