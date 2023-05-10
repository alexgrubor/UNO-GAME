import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {AiFillCloseSquare} from 'react-icons/ai'

const Profile = ({ isLoading, setIsloading }) => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            localStorage.removeItem("token");
            navigate("/");
            return;
        }

        axios
            .get(`http://localhost:8000/users/${user._id}`, {
                headers: {
                    token: token,
                },
            })
            .then((res) => {
                setUser(res.data.data);
            })
            .catch(() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/");
            });
    }, []);

    const deleteUser = () => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        axios
            .delete(`http://localhost:8000/users/${user._id}`, {
                headers: {
                    token: token,
                },
            })
            .then(() => {
                setUser({});
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const editHandler = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        axios
            .patch(`http://localhost:8000/users/${user._id}`, updatedUser, {
                headers: {
                    token: token,
                },
            })
            .then((res) => {
                setUser(res.data.data);
                setIsEditing(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className="bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-600 h-screen flex flex-col  p-6" >
            <h1 className="text-4xl font-bold mb-4">Profile</h1>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Points: {user.points}</p>
            <img src={user.Avatar} alt={user.name} style={{ width: "150px", height: "150px" }} />
            <p>Status: {user.status}</p>
            <p> Number of played games {user.numOfPlayedGames} </p>
            <div className="position: absolute right-2 flex gap-2 mx-2">
            <button
                className="
                bg-gradient-to-br from-green-300 via-green-500 to-green-700
                text-white
                font-bold
                py-2
                px-4
                rounded
                my-3
                border-radius-2

                "
                onClick={() => {
                    setIsEditing(true);
                }}
            >
                Edit Profile
            </button>
            <button
             className="bg-gradient-to-br from-blue-300 via-blue-500 to-blue-700
             text-white
             font-bold
             py-2
             px-4
             rounded
             my-3
             border-radius-2"
                onClick={() => {
                    setIsloading((prev) => !prev);
                    localStorage.removeItem("token");

                    navigate("/");
                }}
            >
                Logout
            </button>
            <button
            className="bg-gradient-to-br from-red-300 via-red-500 to-red-700
            text-white
            font-bold
            py-2
            px-4
            rounded
            my-3
            border-radius-2"
                onClick={() => {
                    deleteUser();
                }}
            >
                Delete Profile
            </button>
            </div>

            {isEditing && (
                <form onSubmit={editHandler} className="bg-white shadow-md  rounded px-8 pt-6 pb-8 mb-2">
                <div className=" flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                    }}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none focus:underline"
                  >
                    <AiFillCloseSquare size={30}/>
                  </button>
                </div>
                <div className="mb-4">
                  <label className=" text-gray-700 font-bold mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    onChange={(e) => {
                      setUpdatedUser({ ...updatedUser, name: e.target.value });
                    }}
                  />
                </div>
                <div className="mb-4">
                  <label className=" text-gray-700 font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    onChange={(e) => {
                      setUpdatedUser({ ...updatedUser, email: e.target.value });
                    }}
                  />
                </div>
                <div className="mb-4">
                  <label className=" text-gray-700 font-bold mb-2" htmlFor="status">
                    Status
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="status"
                    name="status"
                    type="text"
                    placeholder="Enter your new status"
                    onChange={(e) => {
                      setUpdatedUser({ ...updatedUser, status: e.target.value });
                    }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}
        </div>
    );
};

export default Profile;
