import { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import Loader from "react-loader-spinner";
import { BASE_URL, PAGES } from "../../utills/links";
import { useNavigate } from "react-router";
import { cardContainer } from "../home/Home.module.scss";
import { adminCard, container } from "./Admin.module.scss";
import { Link } from "react-router-dom";

const api = axios.create({
  baseURL: BASE_URL,
});

export default function Admin() {
  const [auth] = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getPages = async () => {
      try {
        const response = await api.get(`${PAGES}`);

        if (response.statusText === "OK") {
          // console.log(response);
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
    };
    getPages();
  }, []);

  //if user is not logged in
  const redirectUser = () => {
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  //While loading is true
  //imported react spinner from: https://www.npmjs.com/package/react-loader-spinner
  if (loading) {
    //loading component
    return (
      <div className={container}>
        <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

  //if not ok TODO!
  if (error) {
    //error component
    return <div>An error occured: {error}</div>;
  }

  //if all ok, check auth
  return (
    <>
      {!auth ? (
        redirectUser()
      ) : (
        <div>
          <span style={{ marginRight: 5, textDecoration: "underline" }}>
            Admin
          </span>
          <span
            onClick={() => {
              navigate("/");
            }}
            style={{ cursor: "pointer" }}
          >
            Home
          </span>
          {data.map(({ id, title }) => (
            //link to specific page edit, when on page, render Render the title, date and excerpt properties.
            <div key={id} className={cardContainer}>
              <Link to={`page/edit/${id}`} key={id}>
                <div className={adminCard}>
                  <h2>{title.rendered}</h2>
                  <span>Edit</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
