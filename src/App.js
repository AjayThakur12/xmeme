import React from "react";
import "./App.css";
import UserList from "./components/MainTitle.js";
import MemeForm from "./components/MemeForm.js";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <UserList />
        <MemeForm />
      </React.Fragment>
    );
  }
}
export default App;