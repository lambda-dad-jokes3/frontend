import React from "react";
import { Form, Field, withFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Button, FormGroup } from "reactstrap";
import { useState, useEffect } from "react";
import { Card, CardText, CardBody } from "reactstrap";

const UserForm = ({ errors, touched, values, status }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);
  return (
    <div className="user-form">
      <Form>
        <FormGroup>
          {touched.name && errors.name && (
            <p className="error">{errors.name}</p>
          )}
          <Field id="Name" type="text" name="name" placeholder="name" />
          {touched.email && errors.email && (
            <p className="error">{errors.email}</p>
          )}
        </FormGroup>
        <FormGroup>
          <Field id="Email" type="email" name="email" placeholder="email" />
          {touched.password && errors.password && (
            <p className="error">{errors.password}</p>
          )}
        </FormGroup>
        <FormGroup>
          <Field id="Password" type="password" name="password" placeholder="password" />
        </FormGroup>
        
        <br />
        <Button type="submit" className>Submit</Button>
      </Form>
      {users.map(users => (
        <Card key={users.id}>
          <CardBody className="userCard">
            <CardText>Name: {users.data.name}</CardText>
            <CardText>Email: {users.data.email}</CardText>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};
const FormikUserForm = withFormik({
  mapPropsToValues: ({ name, email, password }) => {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
    };
  },
  validationSchema: yup.object().shape({
    name: yup
      .string()
      .max(10, "Your Name is to long")
      .required("Name is required"),
    email: yup
      .string()
      .email("Enter a valid email address")
      .required("Valid Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    
  }),
  handleSubmit: (values, { resetForm, setStatus }) => {
    axios
      .post("https://reqres.in/api/users", values)
      .then(response => {
        console.log(response);
        setStatus(response);
        resetForm();
      })
      .catch(error => {
        console.log(error);
      });
  }
})(UserForm);

export default FormikUserForm;