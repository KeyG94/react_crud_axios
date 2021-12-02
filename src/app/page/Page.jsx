//detailed page
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PAGES, BASE_URL } from "../../utills/links";
import axios from "axios";
import dateFormatter from "../../utills/dateFormatter";
import Loader from "react-loader-spinner";
import createMarkup from "../../utills/createMarkup";
import { container } from "./Page.module.scss";

const api = axios.create({
  baseURL: `${BASE_URL}${PAGES}`,
});

export default function Page() {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  if (!id) navigate("/");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await api.get(`/${id}`);

        if (response.statusText === "OK") {
          setPage(response.data);
        } else {
          setError("An error occured");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  //when loading
  //imported react spinner from: https://www.npmjs.com/package/react-loader-spinner
  if (loading) {
    return (
      <div className={container}>
        <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

  // on error, return error
  if (error) {
    return <div>An error occured: {error}</div>;
  }

  const title = page.title.rendered;
  const date = page.date;
  const excerpt = page.excerpt.rendered;

  return (
    <>
      <span
        onClick={() => navigate("/")}
        style={{ cursor: "pointer", fontWeight: "bold" }}
      >
        {"<< Back"}
      </span>
      <h1>{title}</h1>
      <span>Published: {dateFormatter(date)}</span>
      <div dangerouslySetInnerHTML={createMarkup(excerpt)}></div>
    </>
  );
}
