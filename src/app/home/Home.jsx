import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PAGES, BASE_URL } from "../../utills/links";
import axios from "axios";
import { cardContainer } from "./Home.module.scss";
import Loader from "react-loader-spinner";
import LoginForm from "../login/LoginForm";

const api = axios.create({
  baseURL: BASE_URL,
});
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  //   console.log(loading, error);

  useEffect(() => {
    async function getPages() {
      try {
        const response = await api.get(`${PAGES}`);

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

  //While loading is true
  //imported react spinner from: https://www.npmjs.com/package/react-loader-spinner
  if (loading) {
    return <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />;
  }
  //if not ok TODO!
  if (error) {
    return <div>An error occured: {error}</div>;
  }

  //if all ok

  return (
    <>
      <div>
        <LoginForm />
      </div>
      <div>
        {data.map(({ id, title }) => (
          //link to specific page, when on page, render Render the title, date and excerpt properties.
          <div key={id} className={cardContainer}>
            <Link to={`page/${id}`} key={id}>
              <h1>{title.rendered}</h1>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
