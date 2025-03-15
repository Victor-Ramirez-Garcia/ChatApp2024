import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UpdateComponent from '../components/UpdateComponent';

export function Update(props) {
    const { user, setUser } = props; // Properties given by component
    const navigate = useNavigate(); // Function that navigates to different routes
    const [errors, setErrors] = useState([]);

    const onSubmitHandler = (e, formInfo) => {
        e.preventDefault();

        formInfo.user = user._id; // Add user id to form info

        axios.post("http://localhost:8000/api/users/update", formInfo)
        .then((post_res) => {
            setUser(post_res.data.user);
            navigate("/main");
        })
        .catch(err => {
            const errorArr = [];

            if (err.response.data.firstNameEmpty)
                errorArr.push(["firstName", "This field is empty"]);

            if (err.response.data.lastNameEmpty)
                errorArr.push(["lastName", "This field is empty"]);

            setErrors(errorArr); // Store the errors
        })
    }

    return (
        <>
            <h1>Update Profile</h1>
            <UpdateComponent onSubmitHandler={onSubmitHandler} onClickHandler={() => {navigate("/main")}} errors={errors} />
        </>
    )
}