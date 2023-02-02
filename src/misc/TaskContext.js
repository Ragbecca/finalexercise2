import React, { Component, useContext } from 'react';
import AuthContext from './AuthContext';
import * as apiCalls from '../api/apiCalls';

const TaskContext = React.createContext();

class TaskProvider extends Component {

    static contextType = AuthContext;

    state = {
        tasks: null,
        refreshCall: false,
        initialCall: false
    }

    setTasks = async (username) => {
        await new Promise(resolve => setTimeout(resolve, 100));
        const tasksGotten = await apiCalls.getTasksUser(this.context.getUser(), username);
        const tasksData = tasksGotten.data;
        this.setState({ tasks: tasksData, refreshCall: true, initialCall: true });
    }

    getTasks = () => {
        this.setState({ refreshCall: false });
        return this.state.tasks;
    }

    render() {
        const { children } = this.props;
        const { tasks, refreshCall, initialCall } = this.state;
        const { setTasks, getTasks } = this;

        return (
            <TaskContext.Provider value={{ tasks, refreshCall, initialCall, setTasks, getTasks }}>
                {children}
            </TaskContext.Provider>
        )
    }
}

export default TaskContext;

export function useTasksContext() {
    return useContext(TaskContext);
}

export { TaskProvider }