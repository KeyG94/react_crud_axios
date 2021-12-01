import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import useAxios from "../..//hooks/useAxios";
import axios from "axios";
import { BASE_URL, PAGES } from "../../utills/links";
import { useParams } from "react-router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import StatusDropdown from "./StatusDropDown";
import Loader from "react-loader-spinner";

const api = axios.create({
  baseURL: `${BASE_URL}${PAGES}`,
});

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
});

export default function EditPost() {
  const [page, setPage] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const { id } = useParams();

  const navigate = useNavigate();
  const http = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //get object
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await api.get(`/${id}`);
        console.log(response);
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

  //on submit function
  async function onSubmit(data) {
    setSubmitting(true);
    setServerError(null);

    console.log(data);

    try {
      const response = await http.post(`/wp/v2/pages/${id}`, data);
      console.log("response", response.data);
      navigate("/admin");
    } catch (error) {
      console.log("error", error);
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  //when loading
  //imported react spinner from: https://www.npmjs.com/package/react-loader-spinner
  if (loading) {
    return <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />;
  }

  // on error, return error
  if (error) {
    return <div>An error occured: {error}</div>;
  }

  //refactor for better readability
  const title = page.title.rendered;
  const status = page.status;

  //   The form should allow editing of the title property and the status property from a dropdown.
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <div>
          <label>Title: </label>
          {errors.title && <span>{errors.title.message}</span>}
          <input
            name="title"
            type="text"
            {...register("title")}
            value={title}
          />
          {errors.status && <span>{errors.status.message}</span>}
        </div>
        <div>
          <label>Status: </label>
          <StatusDropdown register={register} status={status} />
        </div>
        <button>{submitting ? "submitting..." : "update"}</button>
      </fieldset>
    </form>
  );
}
