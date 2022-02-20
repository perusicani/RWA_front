import React, { useState, useEffect } from 'react';

import axios from 'axios';

import Loader from 'react-spinners/BeatLoader';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';

function SkillsChipSelection(props) {

    const [skillsDB, setSkillsDB] = useState([]);

    useEffect(() => {
        getSkills();
    }, []);

    const getSkills = () => {
        axios.get('/api/skills/all')
            .then(function (response) {
                setSkillsDB(response.data.skills);
            }).catch((error) => {
                console.log(error);
            });
    }

    const skillOnClick = (skill) => {
        //if contains -> remove
        if (props.skills && props.skills.some(arrSkill => (skill.id === arrSkill.id))) {
            props.setSkills(props.skills.filter(propSkill => {
                if (propSkill.id !== skill.id) {
                    return skill;
                }
            }));
        } else {
            //add
            props.setSkills([...props.skills, skill]);
        }
    }

    const Skills = skillsDB.map(function (skill, i) {
        var skillVariant =
            (props.skills && props.skills.some(arrSkill => (skill.id === arrSkill.id)))
                ? null
                : 'outlined';
        return <Tooltip
            key={i}
            title={skill.description}
        >
            <Chip
                style={{ margin: 5 }}
                label={skill.name}
                onClick={() => skillOnClick(skill)}
                variant={skillVariant}
            />
        </Tooltip>;
    });

    return (
        Skills.length > 0 ?
            <>
                {Skills.length > 0 && Skills}
            </>
            :
            <Loader />

    );
}

export default SkillsChipSelection;