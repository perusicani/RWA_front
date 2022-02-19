import React from 'react';
import SkillsChipSelection from '../chips/SkillsChipSelection';

function TaskCreate(props) {

    const handleInputTitle = (event) => {
        props.setTitle({ [event.target.name]: event.target.value });
    }
    const handleInputDescription = (event) => {
        props.setDescription({ [event.target.name]: event.target.value });
    }

    return <>
        <div>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    required
                    value={props.title}
                    onChange={handleInputTitle}
                    name="title"
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    className="form-control"
                    id="description"
                    required
                    value={props.description}
                    onChange={handleInputDescription}
                    name="description"
                />
            </div>
            <div>
                <SkillsChipSelection />
            </div>
        </div>
    </>
}

export default TaskCreate;














































// function TaskCreate(props) {

//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');

//     const navigate = useNavigate();

//     const handleInputTitle = (event) => {
//         setTitle({ [event.target.name]: event.target.value });
//     }
//     const handleInputDescription = (event) => {
//         setDescription({ [event.target.name]: event.target.value });
//     }

//     const createTask = (event) => {
//         event.preventDefault();

//         var task = {
//             title: title.title,
//             description: description.description,
//             status: 0,
//         };

//         var user_id = localStorage.getItem('user_id');

//         axios.post('/api/tasks/create', { task: task, user_id: user_id })
//             .then(
//                 response => {

//                     if (response.status === 200) {
//                         console.log('Task creation success: ' + JSON.stringify(response.data));

//                         toast.success(response.data.message);

//                         // setTimeout(() => {
//                         //     navigate('/tasks');
//                         // }, 2500);
//                     }

//                     setTitle({ title: response.data.task.title });
//                     setDescription({ description: response.data.task.description });

//                     if (response.status === 422) {
//                         console.log(response);
//                         toast.error(response);
//                     }
//                 })
//             .catch(error => {
//                 console.log(error);
//                 toast.error(error);
//             });
//     }

//     // render() {
//     return <>
//         <div>
//             <ToastContainer />
//             <div className="form-group">
//                 <label htmlFor="title">Title</label>
//                 <input
//                     type="text"
//                     className="form-control"
//                     id="title"
//                     required
//                     value={title.value}
//                     onChange={handleInputTitle}
//                     name="title"
//                 />
//             </div>
//             <div className="form-group">
//                 <label htmlFor="description">Description</label>
//                 <input
//                     type="text"
//                     className="form-control"
//                     id="description"
//                     required
//                     value={description.value}
//                     onChange={handleInputDescription}
//                     name="description"
//                 />
//             </div>
//             {/* <button onClick={createTask} className="btn btn-success">
//                 Submit
//             </button> */}
//         </div>
//     </>
//     // }
// }