//detailed page
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PAGES, BASE_URL } from "../../utills/links";
import axios from "axios";
import dateFormatter from "../../utills/dateFormatter";

const api = axios.create({
  baseURL: `${BASE_URL}/${PAGES}`,
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
  if (loading) {
    return (
      // <ReactLoading
      //   type="spokes"
      //   color="#aaee22"
      //   width={150}
      //   className={loader}
      // />
      <p>...Loading</p>
    );
  }

  // on error, return error
  if (error) {
    return <div>An error occured: {error}</div>;
  }

  const title = page.title.rendered;
  const date = page.date;
  const excerpt = page.excerpt.rendered;

  //get formatted date
  const formattedDate = dateFormatter(date);

  return (
    <>
      <h1>{title}</h1>
      <span>Published: {formattedDate}</span>
      <p>{excerpt}</p>
    </>
  );
}
