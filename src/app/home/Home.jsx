import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PAGES, BASE_URL } from "../../utills/links";
import axios from "axios";

const api = axios.create({
  baseURL: BASE_URL,
});

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getPages() {
      try {
        const response = await api.get(`/${PAGES}`);

        if (response.statusText === "OK") {
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

  console.log(data);

  //if all ok
  return (
    <>
      {data.map((item) => (
        //link to specific page, when on page, render Render the title, date and excerpt properties.
        <Link to={`page/${item.id}`} key={item.id}>
          <p>page{item.id}</p>
        </Link>
      ))}
    </>
  );
}
