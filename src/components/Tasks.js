import React, { Component } from "react";
import ToDoConsumer from "../context";
import Task from "./Task";

class Tasks extends Component {
  render() {
    return (
      <ToDoConsumer>
        {(value) => {
          const { tasks } = value;
          return (
            <div>
              {tasks.map((task) => {
                return (
                  <Task
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    isChecked={task.isChecked}
                  />
                );
              })}
            </div>
          );
        }}
      </ToDoConsumer>
    );
  }
}

export default Tasks;
