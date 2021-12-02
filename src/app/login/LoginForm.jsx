import React from "react";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { BASE_URL, TOKEN_PATH } from "../../utills/links";
import AuthContext from "../../context/AuthContext";

const api = axios.create({
  baseURL: `${BASE_URL}${TOKEN_PATH}`,
});

const schema = yup.object().shape({
  username: yup.string().min(2).required("Please enter your username"),
  password: yup.string().min(8).max(32).required("Please enter your password"),
});

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();
  const [auth, setAuth] = useContext(AuthContext);

  const logout = () => {
    setAuth(null);
    navigate("/");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data) => {
    setSubmitting(true);
    setLoginError(null);
    console.log({ data });

    try {
      const response = await api.post("", data);
      console.log("response", response.data);
      setAuth(response.data);
      navigate("/admin");
    } catch (error) {
      console.log("error", error);
      setLoginError(error.toString());
      reset();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {!auth ? (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          {loginError && <span>{loginError}</span>}
          <fieldset disabled={submitting}>
            <input
              {...register("username")}
              placeholder="username"
              type="name"
              required
            />
            <p style={{ color: "red" }}>{errors.username?.message}</p>
            <input
              {...register("password")}
              placeholder="password"
              type="password"
              required
            />
            <p style={{ color: "red" }}>{errors.password?.message}</p>
            <button type="submit">
              {submitting ? "Logging in..." : "Log in"}
            </button>
          </fieldset>
        </form>
      ) : (
        <>
          <span onClick={logout} style={{ cursor: "pointer", marginRight: 5 }}>
            Logout
          </span>
          <span
            onClick={() => navigate("/admin")}
            style={{ cursor: "pointer" }}
          >
            Admin
          </span>
        </>
      )}
    </>
  );
}
