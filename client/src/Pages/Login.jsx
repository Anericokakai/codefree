import React from "react";

import { ToastContainer, toast } from "react-toastify";
import loginimage from'../images/login.svg'
import { useFormik } from "formik";
import { regiter } from "../controllers/registrations";
function Login() {
  // todo toaster function

  //   ! formik  handling comp tia

  const initialValues = {
    name: "",
   
    password: "",
  };
  const onSubmit = async (values) => {
    regiter(formik.values)
      .then((data) => {
        const status = data.data.status;
        if (status === "ok") {
          toast.success("user added succsefully");
        }
      })
      .then(() => {
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("failed to add the user");
      });
    formik.resetForm({ values: "" });
  };
  const validate = (values) => {
    let errors = {};

    if (!values.name) errors.name = "required";
   
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
                  <label htmlFor=""> name </label>
                  <input
                    autoComplete="off"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    type="text"
                    name="name"
                    id="name"
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div>
                      <small className="error">{formik.errors.name} </small>
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
