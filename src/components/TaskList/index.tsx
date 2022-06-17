import { Pencil } from "phosphor-react";
import { Trash } from "phosphor-react";

// Interface
import { ITask } from "../../interfaces/Task";

interface TaskListProps {
    taskList: ITask[];
    deleteTask: (id: number) => void;
    editTask: (task: ITask) => void;
    handleChecked:(task: ITask) => void;
}

//css
import "./style.scss";

export const TaskList = ({ taskList, deleteTask, editTask, handleChecked}: TaskListProps) => {

    return (
        <section className="taskList">
            {taskList.length > 0 ? (
                taskList.map((task) => {
                    return (
                        <section className="task" key={task.TaskId}>
                            <div className="details">
                                <input type="checkbox" checked={task.checked} onChange={() => handleChecked(task)}/>
                                <h4>{task.task}</h4>
                            </div>
                            <div className="actions">
                                <Pencil className="edit" onClick={() => editTask(task)}/>
                                <Trash className="delete" onClick={() => deleteTask(task.TaskId)} />
                            </div>
                        </section>
                    );
                })
            ) : (
                <p>Nenhuma tarefa cadastrada</p>
            )}
        </section>
    );
};
