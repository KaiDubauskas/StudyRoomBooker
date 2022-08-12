import React, { useState, useEffect } from "react";
import StudyroomDataService from "../services/studyroom";
import { Link } from "react-router-dom";
import '../App.css';
import {
    Buttrick, Central, Feather, Furman, logo, Peabody, Stevenson
} from '../Images';


const FillReservation = props => {
    const [studyrooms, setStudyRooms] = useState([]);
    const [name, setName] = useState("");
    const [startTime, setStartTime] = useState("");
    const [length, setLength] = useState("");
    const [userId, setUserId] = useState("");

    const studyRoomId = props.location.state.id;
    const building = props.location.state.building;
    const roomNum = props.location.state.room;

    let initialReservationState = ""

    const [reservation, setReservation] = useState(initialReservationState);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);


    const handleInputChange = event => {
        setReservation(event.target.value);
    };

    const onChangeName = e => {
        const n = e.target.value;
        setName(n);
    };
    const onChangeStartTime = e => {
        const n = e.target.value;
        setStartTime(n);
    };
    const onChangeLength = e => {
        const n = e.target.value;
        setLength(n);
    };
    const onChangeUserId = e => {
        const n = e.target.value;
        setUserId(n);
    };

    const saveReservation = () => {

        var data = {
            studyroom_id: studyRoomId,
            name: name,
            start_time: startTime,
            length: length,
            user_id: userId
        };



        StudyroomDataService.createReservation(data)
            .then(response => {
                setSubmitted(true);
                if (response.data.status == 'success')
                    setError(true);
            })
            .catch(e => {
                console.log(e);
            });

    };

    return (
        <div>
            <div class="container-fluid backCol text-center mt-3">
                <div class="justify-content-center">
                    <h3 >Room {roomNum} in {building}</h3>
                    <Link exact to="/studyrooms">
                        <button type="button" class="btn btn-primary card-text">
                            Back To Buildings
                        </button>
                    </Link>
                </div>
            </div>
            {
                (!submitted) ?
                    <form>
                        <div className="container col-6 mt-2">
                            <div class="form-group backCol">
                                <label for="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="form-control"
                                    placeholder="eg: Joe Smith"
                                    value={name}
                                    onChange={onChangeName}
                                />
                            </div>

                            <div class="form-row backCol d-flex justify-content-between">
                                <div class="form-group container m-0 p-0">
                                    <label for="start-time">Start Time</label>
                                    <input
                                        type="text"
                                        id="start-time"
                                        className="form-control"
                                        placeholder="eg: 11"
                                        value={startTime}
                                        onChange={onChangeStartTime}
                                    />
                                </div>
                                <div class="form-group container m-0 p-0">
                                    <label for="end-time">Length</label>
                                    <input
                                        type="text"
                                        id="end-time"
                                        className="form-control"
                                        placeholder="eg: 2"
                                        value={length}
                                        onChange={onChangeLength}
                                    />
                                </div>
                            </div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="user id"
                                value={userId}
                                onChange={onChangeUserId}
                            />
                            <div class="container d-flex justify-content-center my-3">
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={saveReservation}
                                >Reserve</button>
                            </div>

                        </div>
                    </form> :
                    error ?
                        <div class="backCol text-center m-3">
                            <h4>Successfully Reserved Room {roomNum} at {startTime}:00 for {length} hours</h4>
                        </div> :
                        <div class="backCol text-center m-3" >
                            <h4>Failed To Reserve</h4>
                        </div>
            }
        </div>
    );
};

export default FillReservation;
