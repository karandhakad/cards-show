import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { userContext } from "..";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";

function Cards() {
  const apidata = useContext(userContext);

  const [cardData, setCardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // for Loading
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);

  // for set Api data into array
  useEffect(() => {
    apidata.liveData().then((result) => {
      setCardData(result);
    });
  }, []);

  // for Hide Card
  const hideCard = (id) => {
    const newCardData = cardData.filter((value, index) => {
      return value.id != id;
    });

    setCardData(newCardData);
  };

  //for Page Change
  const handlePageChange = (event, value) => {
    {
      let updatedCardData = cardData.filter((val, index) => {
        return val.id > value * 6;
      });
      setCardData(updatedCardData);
    }
  };

  return (
    <>
      <div className="container">
        <div className="box">
          {isLoading ? (
            <div className="loading">
              <CircularProgress color="inherit" />{" "}
              <p style={{ marginLeft: "15px" }}>Loading...</p>{" "}
            </div>
          ) : (
            cardData.slice(0, 6).map((value, index) => {
              return (
                <div className="card" key={value.id}>
                  <div
                    onClick={() => hideCard(value.id)}
                    className="crossIconBox"
                  >
                    <p className="crossIcon">&#10006;</p>
                  </div>
                  <h1 className="title">{value.title}</h1>
                  <p className="body">{value.body}</p>
                  <h5 className="time">Mon,21 Dec 2020 14:57 GMT</h5>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1njKiP29Q6OaRBMO69RJq_4jmktZF9Gkcpg&s"
                    alt=""
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
      {isLoading ? null : (
        <div className="navigation">
          <Pagination count={10} color="primary" onChange={handlePageChange} />
        </div>
      )}
    </>
  );
}

export default Cards;
