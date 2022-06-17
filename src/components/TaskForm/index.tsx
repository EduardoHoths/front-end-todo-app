import React, { useEffect } from "react";
import "./style.scss";
import api from "../../services/api";

import { ITask } from "../../interfaces/Task";

interface TaskFormProps {
    taskList: Array<ITask>;
    setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
    btnTxt: string;
    task?: ITask | null;
    setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TaskForm = ({ taskList, setTaskList, btnTxt, task,  setShowModal}: TaskFormProps) => {
    const [id, setId] = React.useState<number>(0);
    const [title, setTitle] = React.useState<string>("");
    const [error, setError] = React.useState<string>("");
    const [success, setSuccess] = React.useState<string>("");

    useEffect(() => {
        if (taskList.length > 0) {
            setId(taskList[taskList.length - 1].TaskId + 1);
        } else {
            setId(1);
        }
    }, [taskList]);

    function addTaskHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const token = document.cookie.split("=")[1];

        if (task) {
            const newTaskList = [...taskList];

            newTaskList.forEach((item) => {
                if (item.TaskId === task.TaskId) {
                    item.task = title;

                    api.put(
                        'putTask',
                        {
                            taskId: item.TaskId,
                            task: item.task,
                        },
                        {
                            headers: {
                                token,
                            },
                        }
                    ).then((res) => {
                        if (!res.data.success) {
                            setError('Erro ao atualizar a tarefa');
                        } else {
                            setSuccess('Tarefa atualizada com sucesso');
                            setTimeout(()=> {
                                setShowModal!(false)
                                setSuccess('')
                            }, 2000)
                        }
                    });
                }
            });

            setTaskList!(newTaskList);
        } else if (title.length > 0) {
            const newTask: ITask = { TaskId: id, task: title, checked: false };
            setId(id + 1);

            setTaskList!([...taskList, newTask]);

            setTitle("");

            api.post(
                'newTask',
                {
                    taskId: id,
                    task: title,
                    checked: false,
                },
                {
                    headers: {
                        token,
                    },
                }
            ).then((res) => {
                if (!res.data.success) {
                    alert("Erro ao adicionar a tarefa");
                }
            });
        }
    }

    function handleChange({ target }: React.ChangeEvent<HTMLInputElement>) {
        setTitle(target.value);
    }

    useEffect(() => {
        if (task) {
            const taskToUpdate = taskList.filter((item) => item.TaskId === task.TaskId);
            setTitle(taskToUpdate[0].task);
        } else {
            setTitle("");
        }
    }, [task]);

    return (
        <form onSubmit={addTaskHandler}>
            <div>
                <input type="text" name="title" value={title} onChange={handleChange} />
                <label htmlFor="title" className={title && "label-active"}>
                    Tarefa
                </label>
            </div>
            {success && <p className="success">{success}</p>}
            {error && <p className="error">{error}</p>}
            <button>{btnTxt}</button>
        </form>
    );
};
