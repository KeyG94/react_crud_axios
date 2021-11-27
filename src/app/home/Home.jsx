import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PAGES, BASE_URL } from "../../utills/links";
import axios from "axios";
import { cardContainer } from "./Home.module.scss";

const api = axios.create({
  baseURL: BASE_URL,
});
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  console.log(loading, error);

  useEffect(() => {
    async function getPages() {
      try {
        const response = await api.get(`/${PAGES}`);

        if (response.statusText === "OK") {
          console.log(response);
          setData(response.data);
          setLoading(false);
        } else {
          setError("An error occured");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getPages();
  }, []);

  //if not ok TODO!

  //if all ok
  return (
    <>
      {data.map(({ id, title }) => (
        //link to specific page, when on page, render Render the title, date and excerpt properties.
        <Link to={`page/${id}`} key={id} className={cardContainer}>
          <h1>{title.rendered}</h1>
        </Link>
      ))}
    </>
  );
}
