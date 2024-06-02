import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]); // where to store the returned data
  const [error, setError] = useState(null); // where to store the coming errors
  const [submittedValue, setSubmittedValue] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const input = event.target.elements.inputField; // Access the input field directly from the event
    setSubmittedValue(input.value); // Store the input value in submittedValue
    console.log(submittedValue);
  };
  useEffect(() => {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/posts${
          submittedValue ? `?userId=${submittedValue}` : ""
        }`
      )
      .then((response) => {
        setData(response.data);
        console.log(data);
      })
      .catch((error) => {
        console.error("There was an error fetching the posts!", error);
      });
  }, [submittedValue]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="inputField" placeholder="Enter something" />
        <button type="submit">Submit</button>
      </form>

      {data.map((v) => (
        <>
          <h3>id={v.id}</h3>
          <h3>userId={v.userId}</h3>
          <h3>title={v.title}</h3>
          <p>{v.body}</p>
        </>
      ))}
    </div>
  );
};
export default App;
