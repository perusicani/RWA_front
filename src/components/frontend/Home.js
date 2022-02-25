import React from 'react';

import login from '../../assets/images/login.png';
import task_create_1 from '../../assets/images/task_create_1.png';
import task_create_2 from '../../assets/images/task_create_2.png';
import profile_edit from '../../assets/images/profile_edit.png';

function Home() {

    // Something like a welcome page
    // Explanation for how anything functions
    // Here to look pretty


    return (
        <div>
            <div className='d-flex justify-content-center p-4'>
                <div>
                    <h1>Welcome to Do my bidding!</h1>
                </div>

            </div>
            <div className='d-flex'>
                <h4 className='profile-caption'>Where you can let other people do your tasks for you!</h4>
            </div>
            <hr />
            <div>If you haven't already, register and log right in and help someone out (and get help in return)!</div>
            <img src={login} />
            <div>You can do so by creating your own task or browsing others' tasks.</div>
            <img src={task_create_1} />
            <img src={task_create_2} />
            <div>We recommend to first fill in your profile description and choose skills that match your own world! This way others can look at your profile and see that someone skilled in that field helped them.</div>
            <img src={profile_edit} />
            <hr />
            <div className='profile-caption'>Loads of features are still a work in progress so please be patient with me, thanky!</div>
        </div>
    );

}

export default Home;