import React from "react";
import { refreshtoken, username } from "../features/UsersSlice";
import { ToastContainer, toast } from "react-toastify";
import loginimage from "../images/login.svg";
import { useFormik } from "formik";
import { login } from "../controllers/registrations";
import { userdetails } from "../features/UsersSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Login() {
  // ! acces the authentication of protected routes

  // todo state for the user api

  // todo initialise the use dispatch
  const dispatch = useDispatch();

  // todo toaster function

  //   ! formik  handling comp tia

  const initialValues = {
    email: "",
    password: "",
  };
  const onSubmit = async (values) => {
    // formik.resetForm({ values: "" });
    console.log(formik.values);
    login(formik.values).then((info) => {
      console.log(info.data);
      // redirect function
      function redirect() {
        return (window.location.href = "/login/lessonsHome");
      }
      if (info.data.status === "ok" && info.data.token !== "") {
        toast.success("user loged in succesfullly");
        const token_holder = info.data.token;
        const user_holder = info.data.name;
        const refresh_token_holder = info.data.refresh_token;
        dispatch(userdetails(token_holder));
        dispatch(username(user_holder));
        dispatch(refreshtoken(refresh_token_holder));

        setTimeout(redirect, 600);
        {
          <Link to={"/login/lessonsHome"}></Link>;
        }
      }

      if (info.data.error) {
        toast.error(`${info.data.error}`);
      }
    });
  };
  const validate = (values) => {
    let errors = {};

    if (!values.email) errors.email = "required";

    if (!values.password) errors.password = "required";
    return errors;
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
  return (
    <div>
      <div className="general-container">
        <h1 className="loginheader">welcome back</h1>
        <div className="container">
          <div className="information">
            <div>
              <ToastContainer
                position={"top-center"}
                closeOnClick={false}
                pauseOnHover={false}
                pauseOnFocusLoss={false}
                draggable={false}
                autoClose={500}
              />

              <form action="" id="form" onSubmit={formik.handleSubmit}>
                <div className="eachinput">
                  <label htmlFor=""> email </label>
                  <input
                    autoComplete="off"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    type="text"
                    name="email"
                    id="name"
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div>
                      <small className="error">{formik.errors.email} </small>
                    </div>
                  )}
                </div>

                <div className="eachinput">
                  <label htmlFor=""> password </label>
                  <input
                    autoComplete="off"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    name="password"
                    id="password"
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div>
                      <small className="error">{formik.errors.password} </small>
                    </div>
                  )}
                </div>
                <div className="eachinput">
                  <button className="submit registersubmit" type="submit">
                    Register
                  </button>
                </div>
                <p className="goback">
                  dont have an account ?
                  <Link>
                    <span className="err">sign up</span>
                  </Link>
                  <Link to={"/adminlogin"}>
                    <p className="err">Admin</p>
                  </Link>
                </p>
              </form>
            </div>
          </div>
          <div className="illastrator">
            <img src={loginimage} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
