import React from 'react';

import Button from 'react-bootstrap/Button';

function AdminSkill(props) {

    const del = () => {
        props.delete(props.skill.id);
    }

    return (
        <>
            <td>{props.skill.id}</td>
            <td>{props.skill.name}</td>
            <td>{props.skill.description}</td>
            {/* callback to delete */}
            <td><Button className='btn-danger' onClick={del}>Delete?</Button></td>
        </>
    );
}

export default AdminSkill;