import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';

function ProfileUpdate() {

    const [id, setId] = useState('');
    const [user, setUser] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    const handleInputName = (event) => {
        setName({ [event.target.name]: event.target.value });
    }
    const handleInputEmail = (event) => {
        setEmail({ [event.target.name]: event.target.value });
    }
    const handleInputDescription = (event) => {
        setDescription({ [event.target.name]: event.target.value });
    }

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id');
        setId({ id: id });

        axios.get('/api/users/' + id)
            .then((response) => {
                console.log(response);
                setUser({ user: response.data.user });
                setName({ name: response.data.user.name });
                setEmail({ email: response.data.user.email });
                setDescription({ description: response.data.user.description });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const updateUser = (event) => {
        event.preventDefault();

        var user = {
            id: id.id,
            name: name.name,
            email: email.email,
            description: description.description,
        };

        axios.post('/api/users', { user: user })
            .then(
                response => {
                    if (response.status === 200) {
                        console.log('User update success: ' + JSON.stringify(response.data));
                        toast.success(response.data.message);

                        setTimeout(() => {
                            navigate(-1);   //https://stackoverflow.com/questions/65948671/how-to-go-back-to-previous-route-in-react-router-dom-v6
                        }, 2500);
                    }
                    setName({ name: response.data.user.name });
                    setEmail({ email: response.data.user.email });
                    setDescription({ description: response.data.user.description });

                    if (response.status === 422) {
                        console.log(response);
                        toast.error(response);
                    }
                })
            .catch(error => {
                console.log(error);
                toast.error(error);
            });
    }

    return <>
        <ToastContainer />
        <div>
            <h1>{id.id}</h1>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    value={name.name ?? ''}
                    onChange={handleInputName}
                    name="name"
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    className="form-control"
                    id="email"
                    required
                    value={email.email ?? ''}
                    onChange={handleInputEmail}
                    name="email"
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    className="form-control"
                    id="description"
                    required
                    value={description.description ?? ''}
                    onChange={handleInputDescription}
                    name="description"
                />
            </div>
            <button onClick={updateUser} className="btn btn-success">
                Submit
            </button>
        </div>
    </>
    // }
}

export default ProfileUpdate;