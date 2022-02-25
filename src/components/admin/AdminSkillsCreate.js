import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Loader from 'react-spinners/BeatLoader';
import { toast } from 'react-toastify';

function SkillCreate() {

    const [skillName, setSkillName] = useState('');
    const [skillDescription, setSkillDescription] = useState('');

    const handleInputName = (event) => {
        setSkillName(event.target.value);
    }
    const handleInputDescription = (event) => {
        setSkillDescription(event.target.value);
    }

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const createSkill = () => {
        setLoading(true);

        var skill = {
            "name": skillName,
            "description": skillDescription,
        }

        axios.post('/api/skills/create', { skill: skill }).then((response) => {
            if (response.status === 200) {
                // console.log(response.data);
                toast.success('Skill created successfully!');
                setLoading(false);

                navigate('/admin/skills');
            }
        }).catch((error) => {
            toast.error('Skill creation failed!');
            // console.log(error.message);
            setLoading(false);
        });
    }

    return <>
        <div>
            <h3>Create skill</h3>
            {
                !loading
                    ? <>
                        <div className="form-group">
                            <label htmlFor="name" className='profile-caption'>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                required
                                value={skillName}
                                onChange={handleInputName}
                                name="name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description" className='profile-caption'>Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                required
                                value={skillDescription}
                                onChange={handleInputDescription}
                                name="name"
                            />
                        </div>
                        <div className='d-flex justify-content-end pt-4'>
                            <Button onClick={createSkill}>Submit</Button>
                        </div>
                    </>
                    : <Loader />
            }
        </div>
    </>
}

export default SkillCreate;


