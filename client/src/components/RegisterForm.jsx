import React from "react";

import { ToastContainer, toast } from "react-toastify";

import { useFormik } from "formik";
import { regiter } from "../controllers/registrations";

function RegisterForm() {
  // todo toaster function

  //   ! formik  handling comp tia

  const initialValues = {
    name: "",
    email: "",
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
    if (!values.email) {
      errors.email = "required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "invalid email adress";
    }
    if (!values.password) errors.password = "required";
    return errors;
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  // handle change

  return (
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
          <label htmlFor=""> name</label>
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
          <label htmlFor=""> email</label>
          <input
            autoComplete="off"
            onChange={formik.handleChange}
            value={formik.values.email}
            type="text"
            name="email"
            id="email"
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
      </form>
    </div>
  );
}

export default RegisterForm;
