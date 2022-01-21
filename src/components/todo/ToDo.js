import * as React from "react";
import "./todo.css"
import Cookies from 'js-cookie'

const cookiePath = "todo/"
const viewPath = cookiePath + "view"
const todosPath = cookiePath + "todos"
const completedPath = cookiePath + "completed"


class ToDo extends React.Component {

    constructor(props) {
        super(props);

        let todos;
        let completed;
        let view = Cookies.get(viewPath);
        const todosCookie = Cookies.get(todosPath);
        const completedCookie = Cookies.get(completedPath);

        if (todosCookie != null) {
            todos = JSON.parse(todosCookie);
        } else {
            todos = [];
        }

        if (completedCookie != null) {
            completed = JSON.parse(completedCookie);
        } else {
            completed = [];
        }

        console.log(todos)

        this.state = {
            view: view,
            todos: todos,
            completed: completed,
        };

    }

    setView(i) {
        this.setState({
            view: i,
        })

        Cookies.set(viewPath, i);
    }

    addTask(s) {
        const todos = this.state.todos.slice();
        if (s === "" || todos.includes(s)) {
            return;
        }

        todos.push(s);

        this.updateData(todos, this.state.completed)
    }

    removeTask(s) {
        const todos = this.state.todos.slice();
        let index = todos.indexOf(s);

        if (index > -1) {
            todos.splice(index, 1);
        }

        const completed = this.state.completed.slice();
        index = completed.indexOf(s);

        if (index > -1) {
            completed.splice(index, 1);
        }

        this.updateData(todos, completed)
    }

    changeCompleted(s, b) {
        const completed = this.state.completed.slice();

        if (b) {
            if (!completed.includes(s)) {
                completed.push(s);
            }
        } else {
            const index = completed.indexOf(s);

            if (index > -1) {
                completed.splice(index, 1);
            }
        }

        this.updateData(this.state.todos, completed)
    }

    updateData(todos, completed) {
        this.setState({
            todos: todos,
            completed: completed,
        })

        Cookies.set(todosPath, JSON.stringify(todos));
        Cookies.set(completedPath, JSON.stringify(completed));
    }

    renderViewButton(s, i) {
        return (
            <button
                type="button" className="btn toggle-btn"
                aria-pressed={this.state.view === i}
                onClick={event => {
                    this.setView(i)
                }}
            >
                <span className="visually-hidden">Show </span>
                <span>{s}</span>
                <span className="visually-hidden"> tasks</span>
            </button>
        )
    }

    renderAllTasks() {
        const view = this.state.view;
        const todos = this.state.todos.slice();
        const completed = this.state.completed;
        let todosToDisplay = [];

        if (view > 0) {
            todos.filter(value => {
                const enabled = completed.includes(value);
                if (view === 1 && !enabled) {
                    return true;
                } else if (view === 2 && enabled) {
                    return true;
                }
            }).forEach(value => {
                todosToDisplay.push(value)
            })
        } else {
            todosToDisplay = todos;
        }

        return (
            todosToDisplay.map(value => {
                return this.renderTask(value);
            })
        )
    }

    renderTask(s) {
        return (
            <li className="todo stack-small">
                <div className="c-cb">
                    <input id={"todo-" + (s)} type="checkbox" checked={this.state.completed.includes(s)} onChange={event => {
                        this.changeCompleted(s, event.target.checked)
                    }}/>
                    <label className="todo-label" htmlFor={"todo-" + (s)}>
                        {s}
                    </label>
                </div>
                <div className="btn-group">
                    <button type="button" className="btn">
                        Edit <span className="visually-hidden">{s}</span>
                    </button>
                    <button type="button" className="btn btn__danger" onClick={event => {
                        this.removeTask(s)
                    }}>
                        Delete <span className="visually-hidden">{s}</span>
                    </button>
                </div>
            </li>
        )
    }

    render() {

        return (
            <div className="todo">
                <h2 className="label-wrapper">
                    <label htmlFor="new-todo-input" className={"label__lg"}>
                        What needs to be done?
                    </label>
                </h2>
                <input
                    type={"text"}
                    id={"new-todo-input"}
                    className="input input__lg"
                    name={"text"}
                    autoComplete={"off"}
                />
                <button className={"btn btn__primary btn__lg"} onClick={event => {
                    const element = document.getElementById("new-todo-input");
                    const value = element.value;
                    element.value = "";
                    this.addTask(value);
                }}>Add</button>

                <div className={"filters btn-group stack-exception"}>
                    {this.renderViewButton("All", 0)}
                    {this.renderViewButton("Active", 1)}
                    {this.renderViewButton("Completed", 2)}
                </div>
                <h2 id="list-heading">
                    {this.state.todos.filter(value => !this.state.completed.includes(value)).length} tasks remaining
                </h2>
                <tbody>
                    <ul role="list" className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
                        {this.renderAllTasks()}
                    </ul>
                </tbody>
            </div>
        );
    }
}

export default function Test() {
    return React.createElement(ToDo)
}