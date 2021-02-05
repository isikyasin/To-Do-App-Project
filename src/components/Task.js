import React, { Component } from "react";
import "./Tasks.css";
import PropTypes from "prop-types";
import ToDoConsumer from "../context";
import axios from "axios";
import { Link } from "react-router-dom";

class Task extends Component {
  state = {
    isVisible: false,
    isChecked: this.props.isChecked,
  };
  changeIsVisible = () => {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  };

  changeCheckBox = (dispatch) => {
    this.setState(
      {
        isChecked: !this.state.isChecked,
      },
      function afterStateChange() {
        this.useNewState(dispatch);
      }
    );
  };

  useNewState = async (dispatch) => {
    const { id, title, description } = this.props;
    const { isChecked } = this.state;
    const checkedTask = {
      title,
      description,
      isChecked,
    };
    const response = await axios.put(
      `http://localhost:3004/tasks/${id}`,
      checkedTask
    );
    dispatch({ type: "ORCHESTRATE_TASK", payload: response.data });
  };

  deleteTask = async (dispatch) => {
    const { id } = this.props;
    await axios.delete(`http://localhost:3004/tasks/${id}`);
    dispatch({ type: "DELETE_TASK", payload: id });
  };

  render() {
    const { id, title, description, isChecked } = this.props;
    const { isVisible } = this.state;
    return (
      <ToDoConsumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div
              className="tasks-container"
              style={isChecked ? { background: "green" } : null}
            >
              <div className="title-group">
                <span
                  className="title-text"
                  onClick={this.changeIsVisible}
                  style={
                    isChecked
                      ? { textDecoration: "line-through solid black 2px" }
                      : null
                  }
                >
                  {title}
                </span>
                <i
                  onClick={() => this.deleteTask(dispatch)}
                  className="fas fa-trash-alt icons"
                ></i>
                <Link to={`edit/${id}`}>
                  <i className="fas fa-edit icons"></i>
                </Link>

                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => this.changeCheckBox(dispatch)}
                />
              </div>
              {isVisible && (
                <div className="description-group">
                  {description === "" ? (
                    <p>No Description</p>
                  ) : (
                    <p className="description-text">{description}</p>
                  )}
                </div>
              )}
            </div>
          );
        }}
      </ToDoConsumer>
    );
  }
}
Task.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.any.isRequired,
  isChecked: PropTypes.bool.isRequired,
};

export default Task;
