import React, { Component } from "react";
import ToDoConsumer from "../context";
import "./AddTask.css";
import axios from "axios";

class AddTask extends Component {
  state = {
    title: "",
    description: "",
    error: false,
  };

  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  validateForm = () => {
    const { title } = this.state;
    if (title === "") {
      return false;
    }
    return true;
  };

  addTask = async (dispatch, e) => {
    e.preventDefault();

    const { title, description } = this.state;

    const newTask = {
      title,
      description,
      isChecked: false,
    };

    if (!this.validateForm()) {
      this.setState({
        error: true,
      });
      setTimeout(() => {
        this.setState({
          error: false,
        });
      }, 2000);
      return;
    }

    const response = await axios.post("http://localhost:3004/tasks", newTask);

    dispatch({ type: "ADD_TASK", payload: response.data });

    this.setState({
      title: "",
      description: "",
    });
  };

  render() {
    const { title, description, error } = this.state;
    return (
      <ToDoConsumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="form-container">
              <h3>Add New Task</h3>
              <hr />
              {error && <div className="">Title input can not be empty.</div>}
              <form
                onSubmit={(e) => this.addTask(dispatch,e)}
                className="form-body"
              >
                <div className="form-group">
                  <input
                    type="text"
                    name="title"
                    value={title}
                    id="title"
                    placeholder="New Task Title"
                    className="form-input"
                    onChange={this.changeInput}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="description"
                    value={description}
                    id="description"
                    placeholder="New Task Description"
                    className="form-input"
                    onChange={this.changeInput}
                  />
                </div>
                <button className="btn" type="submit">
                  Add Task
                </button>
              </form>
            </div>
          );
        }}
      </ToDoConsumer>
    );
  }
}

export default AddTask;
