import axios from "axios";

export const liveData = async () => {
  try {
    let result = await axios.get("https://jsonplaceholder.typicode.com/posts");

    return result.data;
  } catch (err) {
    return console.log("Api Error ", err);
  }
};
