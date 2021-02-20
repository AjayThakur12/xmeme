import React from "react";
import "./MemeForm.css";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form } from "formik";
import * as yup from "yup";

// Notification imports
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";

let SignupSchema = yup.object().shape({
  firstName: yup.string().required("This field is required."),
  caption: yup.string().required("This field is required."),
  url: yup.string().url().required("This field is required."),
});

//Form component
class MemeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      url: "",
      caption:"",
      posts: {},
    };
    this.handleChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    var url = "https://serene-waters-02409.herokuapp.com/memes";
    axios.get(url)
      .then(res => {
        const users = res.data;
        this.setState({
          posts: users,
        });
        console.log(users);
      })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
    console.log("Change detected. State updated" + name + " = " + value);
  }

  handleSubmit(event) {
    event.preventDefault();
    var url = "https://serene-waters-02409.herokuapp.com/memes";
    let currentComponent = this;
    axios
      .post(url, {
        name: "adasdasd",
        url: "https://urlme.me/success/typed_a_url/made_a_meme.jpg",
        caption: "bobs"
      })
      .then(function (response) {
        store.addNotification({
          title: "Information",
          message: "Data Saved",
          type: "success",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 3000,
            showIcon: true,
          },
          width: 500,
        });

        axios.get(url)
          .then(res => {
            const users = res.data;
            console.log(users);
            currentComponent.setState({
              posts: users,
            });
          })
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.status);
        if (error.status == 422) {

          store.addNotification({
            title: "Incorrect Information",
            message: "Please Enter valid Input",
            type: "danger",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 3000,
              showIcon: true,
            },
            width: 500,
          });
        } else {
          store.addNotification({
            title: "Network Error",
            message: "Data Base Not Up And Running",
            type: "danger",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 3000,
              showIcon: true,
            },
            width: 500,
          });
        }

      });

    this.state.name = "";
    this.state.url = "";
  }
  render() {
    return (
      <div>
        <ReactNotification />
        <div style={{ margin: 50 }} >
          <Formik
            initialValues={{
              firstName: "",
              caption: "",
              url: ""
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, {
              setSubmitting,
              resetForm
            }) => {
              console.log(values);
              var url = "https://serene-waters-02409.herokuapp.com/memes";
              let currentComponent = this;
              axios
                .post(url, {
                  name: values.firstName,
                  url: values.url,
                  caption: values.caption,
                })
                .then(function (response) {
                  store.addNotification({
                    title: "Information",
                    message: "Data Saved",
                    type: "success",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                      duration: 3000,
                      showIcon: true,
                    },
                    width: 500,
                  });

                  axios.get(url)
                    .then(res => {
                      const users = res.data;
                      console.log(users);
                      currentComponent.setState({
                        posts: users,
                      });
                    })
                  resetForm();
                  console.log(response);
                })
                .catch(function (error) {
                  console.log(error.status);
                  if (error.status == 422) {

                    store.addNotification({
                      title: "Incorrect Information",
                      message: "Please Enter valid Input",
                      type: "danger",
                      container: "top-right",
                      animationIn: ["animated", "fadeIn"],
                      animationOut: ["animated", "fadeOut"],
                      dismiss: {
                        duration: 3000,
                        showIcon: true,
                      },
                      width: 500,
                    });
                  } else {
                    store.addNotification({
                      title: "Network Error",
                      message: "Data Base Not Up And Running",
                      type: "danger",
                      container: "top-right",
                      animationIn: ["animated", "fadeIn"],
                      animationOut: ["animated", "fadeOut"],
                      dismiss: {
                        duration: 3000,
                        showIcon: true,
                      },
                      width: 500,
                    });
                  }

                });
              currentComponent.state.name = "";
              currentComponent.state.url = "";
              currentComponent.state.caption = "";
            }}
          >
            {({ errors, handleChange, touched }) => (
              <Form className="form" style={{
                marginTop: 8
              }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      error={errors.firstName && touched.firstName}
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      fullWidth
                      onChange={handleChange}
                      id="firstName"
                      label="Meme Owner"
                      autoFocus
                      color="#0000"
                      helperText={
                        errors.firstName && touched.firstName
                          ? errors.firstName
                          : null
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      error={errors.caption && touched.caption}
                      variant="outlined"
                      fullWidth
                      onChange={handleChange}
                      id="caption"
                      label="Caption"
                      name="caption"
                      autoComplete="lname"
                      helperText={
                        errors.caption && touched.caption
                          ? errors.caption
                          : null
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={errors.url && touched.url}
                      variant="outlined"
                      fullWidth
                      onChange={handleChange}
                      id="url"
                      label="Enter Url For Meme"
                      name="url"
                      autoComplete="url"
                      helperText={
                        errors.url && touched.url ? errors.url : null
                      }
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  width='50%'
                  variant="contained"
                  color="primary"
                  justifyContent='center'
                  alignItems='center'
                  className="button" style={{
                    margin: 10,
                    display: 'flex',
                    justifyContent: 'flex-end'
                  }}
                >
                  Submit
              </Button>
              </Form>
            )}
          </Formik>
        </div>

        <Grid style={{ paddingTop: 10 }}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={10}>
              {Object.keys(this.state.posts).map((key) => (
                <Card key={this.state.posts[key]._id} index={key} details={this.state.posts[key]} />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

class Card extends React.Component {
  render() {
    return (
      <div className="card">
        <img src={this.props.details.url} />
        <div className="card-body">
          <h2>Caption: {this.props.details.caption}</h2>
          <h5>Name: {this.props.details.name}</h5>
        </div>
      </div>
    )
  }
}

export default MemeForm;
