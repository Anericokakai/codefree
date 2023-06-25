import React from "react";

import { ToastContainer, toast } from "react-toastify";
import ReusablePrealodaer from "../../components/ReusablePrealodaer";
import { useFormik } from "formik";
import { addAdmin } from "../../controllers/registrations";
import { useState } from "react";

function AddAdmin() {
  //! handle spinner
  const [spinner,setspinner]=useState()

  //   ! formik  handling comp tia

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };
  const onSubmit = async (values) => {
    console.log(values)
    setspinner(true)
      addAdmin(values).then((data) => {
        setspinner(false)
        const status = data.data.status;
        if (status === "ok") {
          toast.success("Admin added succsefully");
        }
      })
      .then(() => {
        setTimeout(() => {
          window.location.href = "/adminlogin";
        }, 1000); 
      })
      .catch((err) => {
        console.log(err);
        toast.error("failed to add Admin");
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
    <div className="admin_container absolutebtncont">
      <ToastContainer
        position={"top-center"}
        closeOnClick={false}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        draggable={false}
        autoClose={500}
      />
      <button onClick={()=>window.history.back()} className="btn green absolutebtn"> Go Back</button>

<h1 className="admin_heading"> add admin</h1>
      <form className="form" action=""  onSubmit={formik.handleSubmit}>
        {spinner && <ReusablePrealodaer></ReusablePrealodaer>}
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

export default AddAdmin;
