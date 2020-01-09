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
          {touched.username && errors.username && (
            <p className="error">{errors.username}</p>
          )}
          <Field id="username" type="text" name="username" placeholder="username" />
          {touched.email && errors.email && (
            <p className="error">{errors.email}</p>
          )}
        </FormGroup>
        {/* <FormGroup>
          <Field id="Email" type="email" name="email" placeholder="email" />
          {touched.password && errors.password && (
            <p className="error">{errors.password}</p>
          )}
        </FormGroup> */}
        <FormGroup>
          <Field id="Password" type="password" name="password" placeholder="password" />
        </FormGroup>
        
        <br />
        <Button type="submit" className>Submit</Button>
      </Form>
      {users.map(users => (
        <Card key={users.id}>
          <CardBody className="userCard">
            <CardText>UserName: {users.data.username}</CardText>
            <CardText>Email: {users.data.email}</CardText>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};
const FormikUserForm = withFormik({
  mapPropsToValues: ({ username, email, password }) => {
    return {
      username: username || "",
    //   email: email || "",
      password: password || "",
    };
  },
  validationSchema: yup.object().shape({
    username: yup
      .string()
      .max(10, "Your userame is to long")
      .required("username is required"),
    // email: yup
    //   .string()
    //   .email("Enter a valid email address")
    //   .required("Valid Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    
  }),
  handleSubmit: (values, { resetForm, setStatus }) => {
    axios
      .post("https://dadjokesdb.herokuapp.com/user/register", values)
    
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