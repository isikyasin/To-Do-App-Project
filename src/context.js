import React, { Component } from "react";
import axios from "axios";
const ToDoContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => action.payload !== task.id),
      };
    case "ADD_TASK":
      return {
        ...state,
        tasks: [action.payload, ...state.tasks ],
      };
    case "ORCHESTRATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    default:
      return state;
  }
};

export class ToDoProvider extends Component {
  state = {
    tasks: [],
    dispatch: (action) => {
      this.setState((state) => reducer(state, action));
    },
  };
  componentDidMount = async () => {
    const response = await axios.get("http://localhost:3004/tasks");
    this.setState({
      tasks: response.data,
    });
  };

  render() {
    return (
      <ToDoContext.Provider value={this.state}>
        {this.props.children};
      </ToDoContext.Provider>
    );
  }
}
const ToDoConsumer = ToDoContext.Consumer;

export default ToDoConsumer;
