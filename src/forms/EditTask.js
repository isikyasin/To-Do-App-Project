import React, { Component } from "react";
import ToDoConsumer from "../context";
import "./AddTask.css";
import axios from "axios";

class EditTask extends Component {
  state = {
    title: "",
    description: "",
    isChecked: false,
    error: false,
  };

  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount = async () => {
    const { id } = this.props.match.params;

    const response = await axios.get(`http://localhost:3004/tasks/${id}`);

    const { title, description, isChecked } = response.data;

    this.setState({
      title,
      description,
      isChecked,
    });
  };

  validateForm = () => {
    const { title } = this.state;
    if (title === "") {
      return false;
    }
    return true;
  };

  editTask = async (dispatch, e) => {
    e.preventDefault();

    const { title, description, isChecked } = this.state;
    const { id } = this.props.match.params;

    const editedTask = {
      title,
      description,
      isChecked,
    };

    if (!this.validateForm()) {
      this.setState({
        error: true,
      });
      return;
    }

    const response = await axios.put(
      `http://localhost:3004/tasks/${id}`,
      editedTask
    );

    dispatch({ type: "ORCHESTRATE_TASK", payload: response.data });

    this.props.history.push("/");
  };

  render() {
    const { title, description, error } = this.state;
    return (
      <ToDoConsumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="form-container">
              <h3>Edit Task</h3>
              <hr />
              {error && <div className="">Title input can not be empty.</div>}
              <form
                onSubmit={this.editTask.bind(this, dispatch)}
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
                  Edit Task
                </button>
              </form>
            </div>
          );
        }}
      </ToDoConsumer>
    );
  }
}

export default EditTask;
