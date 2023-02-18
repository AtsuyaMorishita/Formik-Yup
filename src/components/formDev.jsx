import { Formik, ErrorMessage, Field, Form, useField, FastField } from "formik";
import React, { useContext, useRef } from "react";
import * as Yup from "yup";
import "./formDev.css";
import emailjs from "@emailjs/browser";
import { useFormContext } from "../context/FormikContext";

const FormDev = () => {
  //設定したものを取得する
  const [formData, setFormData] = useFormContext();

  const handleSubmit = (values) => {
    //emailjsでEメールを送信する処理
    try {
      emailjs
        .send(
          process.env.REACT_APP_SERVICE_ID,
          process.env.REACT_APP_TEMPLATE_ID,
          values,
          process.env.REACT_APP_PUBLIC_KEY
        )
        .then(async (result) => {
          await setFormData(
            "ここにはグローバルで使えるフォームデータが格納される想定です。"
          );
          await console.log("contextに保存されたformデータ", formData);
          await console.log("送信完了時のメッセージ", result.text);
        });
    } catch (err) {
      console.log("送信失敗時のメッセージ", err);
    } finally {
      console.log("contextに保存されたformデータ", formData);
    }
  };

  const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className="form-section">
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    );
  };

  const MyCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: "checkbox" });
    return (
      <div className="form-section">
        <label className="checkbox-input">
          <input type="checkbox" {...field} {...props} />
          {children}
        </label>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    );
  };

  const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className="form-section">
        <label htmlFor={props.id || props.name}>{label}</label>
        <select {...field} {...props}></select>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    );
  };

  return (
    <>
      <h1>React×Formik×Yup×Emailjs</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          acceptedTerms: false,
          jobType: "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, "Must be 15 characters or les")
            .required("Required"),
          lastName: Yup.string()
            .max(20, "Must be 20 characters or les")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          acceptedTerms: Yup.boolean()
            .required("Required")
            .oneOf([true], "You must accept the terms and conditions."),
          jobType: Yup.string()
            .oneOf(
              ["designer", "development", "product", "other"],
              "Invalid Job Type"
            )
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
        }}
      >
        <Form className="aaa">
          <MyTextInput
            label="First Name"
            name="firstName"
            type="text"
            placeholder="Jane"
          />

          <MyTextInput
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Doe"
          />

          <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="jane@formik.com"
          />

          <MySelect label="Job Type" name="jobType">
            <option value="">Select a job type</option>
            <option value="designer">Designer</option>
            <option value="development">Developer</option>
            <option value="product">Product Manager</option>
            <option value="other">Other</option>
          </MySelect>

          <MyCheckbox name="acceptedTerms">
            I accept the terms and conditions
          </MyCheckbox>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

export default FormDev;
