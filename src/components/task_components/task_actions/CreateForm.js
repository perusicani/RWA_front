import React, { useState } from 'react';
import { ProgressBar } from 'react-bootstrap';

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from 'react-bootstrap/Button';

import TaskCreate from './TaskCreate';
import CheckpointsCreate from './CheckpointsCreate';
import Loader from 'react-spinners/BeatLoader';

import { useNavigate } from 'react-router-dom';

toast.configure();

function CreateForm() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    // Task Create     
    const [stateTask, setStateTask] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [taskCreateError, setTaskCreateError] = useState('');

    //if submit clicked and step == 0
    const createTask = (event) => {
        setLoading(true);

        // event.preventDefault();

        var task = {
            title: title.title,
            description: description.description,
            status: 0,
        };
        var user_id = localStorage.getItem('user_id');

        axios.post('/api/tasks/create', { task: task, user_id: user_id })
            .then(
                response => {
                    setLoading(false);
                    if (response.status === 200) {
                        toast.success('Task created successfully!');

                        setStateTask({ task: response.data.task });

                        var skillIds = [];

                        skills.forEach((skill) => {
                            // /if skillIds or current skills contains that one, don't add
                            if (!skillIds.some(idSkill => (skill.id === idSkill.id))) {
                                skillIds.push(skill.id)
                            }
                        });

                        //add skills to newly created task
                        addSkills(response.data.task.id, skillIds);

                        //jedino ako je success go to next step
                        setStep((currentStep) => currentStep + 1);
                    }

                    setTitle({ title: response.data.task.title });
                    setDescription({ description: response.data.task.description });
                })
            .catch(error => {
                toast.error('An error occurred while creating the task!');
                // console.log(error.message);
                // setTaskCreateError({ titleError: error.message, descriptionError: error.message['task.description'] })
                // console.log(taskCreateError.title);
                // console.log(taskCreateError.description);
                setLoading(false);
            });
    }

    // Task update 
    const updateTask = (event) => {
        //nothing to update -> safety check
        if (stateTask === null) {
            return;
        }

        setLoading(true);

        // event.preventDefault();

        var task = {
            id: stateTask.task.id,
            title: title.title,
            description: description.description,
            status: 0,
        };

        var user_id = stateTask.task.user_id;

        axios.post('/api/tasks/update', { task: task, user_id: user_id })
            .then(
                response => {
                    setLoading(false);
                    if (response.status === 200) {
                        toast.success('Task updated successfully!');

                        // //if task skills ids is different from skills
                        var skillIds = [];
                        skills.forEach((skill) => {
                            skillIds.push(skill.id)
                        });

                        addSkills(response.data.task.id, skillIds);

                        setStep((currentStep) => currentStep + 1);
                    }

                    setStateTask({ task: response.data.task });
                    setTitle({ title: response.data.task.title });
                    setDescription({ description: response.data.task.description });

                })
            .catch(error => {
                toast.error('An error occurred while updating the task!');
                setLoading(false);
            });
    }

    // Task delete
    const deleteTask = () => {
        if (stateTask == null) return;

        setLoading(true);

        axios.delete('/api/tasks/delete/' + stateTask.task.id)
            .then((response) => {
                setLoading(false);
                toast.success('Task deleted successfully!');

                // on successful delete -> go back
                navigate(-1);
            })
            .catch((error) => {
                toast.error('An error occurred while deleting the task!');
                setLoading(false);
            });
    }

    // skills states
    const [skills, setSkills] = useState([]);

    const addSkills = (taskId, skillIds) => {
        // {
        //     "taskId":31,
        //     "skillIds": [1]
        // }
        // var skillIds = [];

        // skills.forEach((skill) => {
        //     // /if skillIds or current skills contains that one, don't add
        //     if (!skillIds.some(idSkill => (skill.id === idSkill.id))) {
        //         skillIds.push(skill.id)
        //     }
        // });

        axios.post('/api/tasks/add-skills', { taskId: taskId, skillIds: skillIds }
        ).then((skillResponse) => {
            if (skillResponse.status === 200) {
                console.log(skillResponse.data);
            }
        }).catch((error) => {
            console.log(error);
            // toast.error('An error occurred while setting skills!');
        });
    }


    // Checkpoints
    //list of checkpoints -> initially empty
    const [checkpoints, setCheckpoints] = useState([]);

    //loop for creating checkpoints under task_id: stateTask.task.id
    const createCheckpoints = () => {

        if (stateTask === null) return;

        setLoading(true);
        console.log(checkpoints);

        axios.post('/api/checkpoints/create', { checkpoints: checkpoints, task_id: stateTask.task.id })
            .then((response) => {
                setLoading(false);
                toast.success('Successfully created checkpoints!');
                // on successful create -> go back
                navigate(-1);
            })
            .catch((error) => {
                toast.error('An error occurred while creating the checkpoints!');
                setLoading(false);
            });
    }

    // UI STUFF
    const [step, setStep] = useState(0);

    // Form texts by steps
    const FormSteps = ['Step: 1', 'Step: 2'];
    const FormHeaders = ['Define your Task', 'Define your Tasks Checkpoints'];
    const FormSubmitText = ['Next', 'Submit'];
    const FormCancelText = ['Cancel', 'Go back'];

    const StepDisplay = () => {
        if (loading) {
            return (
                <Loader />
            );
        }
        if (step === 0) {
            return <TaskCreate title={title.title} description={description.description} setTitle={setTitle} setDescription={setDescription} skills={skills} setSkills={setSkills} />;
        }
        if (step === 1) {
            return <CheckpointsCreate task={stateTask.task} checkpoints={checkpoints} setCheckpoints={setCheckpoints} />;
        }
    }

    const getProgress = () => {
        if (step === 0) {
            return 0;
        }
        if (step === 1) {
            return 50;
        }
        if (step === 2) {
            return 100;
        }
    }

    var Buttons = '';
    if (!loading) {
        Buttons = <>
            <Button
                className='m-1 btn-primary'
                onClick={() => {
                    // if task == null && step == 0 -> navigate(-1);
                    if (step === 0 && stateTask === null) {
                        //navigate away from page (nothing has been submitted)
                        // console.log('first step + task === null -> navigate(-1)');
                        navigate(-1);
                    }
                    // if task !=== null && step === 0 -> delete task by id and navigate to /tasks
                    if (step === 0 && stateTask != null) {
                        // console.log('step === 0 + task != null -> delete task new task');
                        deleteTask();
                    }
                    //if step === 1 -> jus go back to prev component
                    if (step === 1) {
                        // console.log('step === 1 -> going to previous step');
                        setStep((currentStep) => currentStep - 1);
                    }
                }}>
                {FormCancelText[step]}
            </Button>
            <Button
                className='m-1 btn-primary'
                onClick={() => {
                    // if first step && task not created yet -> create task and wait for response
                    if (step === 0 && stateTask === null) {
                        // console.log('step === 0 + task === null -> creating task');
                        createTask();
                    }
                    if (step === 0 && stateTask !== null) {
                        // console.log('step === 0 + task !== null -> updating task');
                        updateTask();
                    }
                    //if second step and task was created -> submit all checkpoints???? idk how 
                    if (step === 1 && stateTask !== null) {
                        // create checkpoints
                        // console.log('step === 1 + task !== null -> create checkpoints');
                        createCheckpoints();
                    }
                }}>
                {FormSubmitText[step]}
            </Button>

        </>
    }

    return (
        <div className='form'>
            <ToastContainer />
            <h3>{FormSteps[step]}</h3>
            <ProgressBar now={getProgress()} animated ></ProgressBar>
            <div>
                <h2>{FormHeaders[step]}</h2> {/*  header */}
                <div>{StepDisplay()}</div> {/*  body */}
                <div className='d-flex justify-content-end'>
                    {Buttons}
                </div>
            </div> {/*  form */}
        </div>
    );
}

export default CreateForm;