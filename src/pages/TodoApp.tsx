import React, { useEffect } from "react";
import { Header } from "../components/Header";
import { Head } from "../components/Helper/Head";
import { Modal } from "../components/Modal";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";
import { ITask } from "../interfaces/Task";
import api from "../services/api";

import "../styles/App.scss";

export const TodoApp = () => {
    const [taskList, setTaskList] = React.useState<ITask[]>([]);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [taskToUpdate, setTaskToUpdate] = React.useState<ITask | null>(null);
    useEffect(() => {
        const token = document.cookie.split("=")[1];
        api.get('allTasks', {
            headers: {
                token,
            },
        }).then((res) => {
            if (res.data.data === 0) {
                setTaskList([]);
            } else {
                setTaskList(res.data);
            }
        });
    }, []);
    function deleteTask(id: number) {
        setTaskList(taskList.filter((task) => task.TaskId !== id));
        const token = document.cookie.split("=")[1];

        api.delete('deleteTask', {
            headers: {
                taskId: id,
                token: token,
            },
        }).then((res) => {
            if (!res.data.success) {
                alert("Erro ao deletar a tarefa");
            }
        });
    }

    function editTask(task: ITask): void {
        setShowModal(true);
        setTaskToUpdate(task);
    }

    function handleChecked(task: ITask): void {
        const newTaskList = [...taskList];
        newTaskList.forEach((item) => {
            if (item.TaskId === task.TaskId) {
                item.checked = !item.checked;

                api.put(
                    'handleChecked',
                    {
                        taskId: item.TaskId,
                        checked: item.checked,
                    },
                    {
                        headers: {
                            token: document.cookie.split("=")[1],
                        }
                    }
                ).then(res => {
                    if (!res.data.success) {
                        alert("Erro ao modificar a tarefa");
                    }
                })

            }
        });
        setTaskList(newTaskList);
    }

    return (
        <>
            <Head description="Gerencie suas tarefas de uma forma prática" title="Tarefas"/>
            <Header />
            <main>
                <Modal
                    children={
                        <TaskForm
                            setTaskList={setTaskList}
                            taskList={taskList}
                            task={taskToUpdate}
                            btnTxt="Alterar tarefa"
                            setShowModal={setShowModal}
                        />
                    }
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
                <div>
                    <h2>O que você vai fazer?</h2>
                    <TaskForm taskList={taskList} setTaskList={setTaskList} btnTxt="Criar tarefa" />
                </div>
                <div>
                    <h2>Suas tarefas</h2>
                    <TaskList
                        taskList={taskList}
                        deleteTask={deleteTask}
                        editTask={editTask}
                        handleChecked={handleChecked}
                    />
                </div>
            </main>
        </>
    );
};
