import React, { useState, useEffect } from 'react';
import Select from 'react-select';




function SkillsChipSelection(props) {

    const [skills, setSkills] = useState([]);

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    // useEffect(() => {
    //     return () => {
    //         console.log(skills);
    //     }
    // }, [skills]);

    const handleChange = (newValue) => {
        setSkills(newValue);
    };

    return (
        <Select
            // defaultValue={[colourOptions[2], colourOptions[3]]}
            options={options}
            onChange={handleChange}
            isMulti
            name="colors"
            // options={colourOptions}
            className="basic-multi-select"
            classNamePrefix="select"
        />
    );
}

export default SkillsChipSelection;