import React, { useState, useEffect } from "react";
import StudyroomDataService from "../services/studyroom";
import FillReservation from "./fill-reservation";
import { MemoryRouter, Switch, Route, Link } from "react-router-dom";
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Buttrick, Central, Feather, Furman, logo, Peabody, Stevenson
} from '../Images';


const StartReservation = props => {
    const searchBuilding = props.location.state.building;
    return (
        <div>
            <div class="backCol container-fluid text-center">
                <h2>{searchBuilding}</h2>
                <Link exact to="/studyrooms">
                    <button type="button" class="btn btn-lg btn-primary card-text">
                        Back To Buildings
                    </button>
                </Link>
            </div>
            <div class="backCol">
                <h4 class="backCol">Open Right Now:</h4>
                <OpenRightNow building={searchBuilding} />
                <h4 class="backCol">Reserve For Later:</h4>
                <NotOpenRightNow building={searchBuilding} />
            </div >
        </div >


    )
};

const OpenRightNow = (props) => {
    const [studyrooms, setStudyrooms] = useState([]);

    const searchBuilding = props.building;

    useEffect(() => {
        find(searchBuilding, "building");
    }, [studyrooms])

    const find = (query, by) => {
        StudyroomDataService.find(query, by)
            .then(response => {
                setStudyrooms(response.data.studyRooms);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (

        <div>
            {
                studyrooms.map((studyrooms) => {
                    return (
                        <div class="row my-2 mx-0 backCol pr-4">
                            <div class="backCol container-fluid d-inline-flex my-3 pl-0 align-items-center">
                                <div class="container-fluid col-xl-2 col-md-3 col-sm-4 justify-content-start d-inline-flex p-0">
                                    <div class="d-flex container-fluid p-0 m-0 justify-content-end roomInfo">
                                        <div>
                                            <h4 class="text-justify m-0 p-0">Room {studyrooms.room_num}</h4>
                                            <h6 class="text-justify m-0 p-0">Capacity: {studyrooms.size}</h6>
                                            <h6 class="text-justify m-0 p-0">Floor: {studyrooms.floor}</h6>
                                        </div>
                                    </div>
                                    <div class="container-fluid p-0 mx-2 d-inline-flex align-items-center justify-content-center reserveButtonMinWidth">

                                        <Link to={{
                                            pathname: `/studyrooms/reserve/new`,
                                            state: {
                                                id: studyrooms._id,
                                                room: studyrooms.room_num,
                                                building: studyrooms.building,
                                            }
                                        }} >
                                            <button type="button" class="btn btn-primary card-text">
                                                Reserve
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                <div class="container-fluid d-inline-flex  col-xl-10 col-md-9 col-sm-8 h-100 p-0">
                                    <TimeGraph
                                        times={studyrooms.avail_times}
                                        open={studyrooms.open_time}
                                        close={studyrooms.end_time} />
                                </div>
                            </div>
                        </div >
                    );
                })
            }
        </div >
    )

};


const NotOpenRightNow = (props) => {
    const [studyrooms, setStudyrooms] = useState([]);
    const searchBuilding = props.building;

    useEffect(() => {
        find(searchBuilding, "building");
    }, [studyrooms])

    const find = (query, by) => {
        StudyroomDataService.findNotOpen(query, by)
            .then(response => {
                setStudyrooms(response.data.studyRooms);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {
                studyrooms.map((studyrooms) => {
                    return (
                        <div class="row m-2 mx-0 backCol pr-3">
                            <div class="backCol container-fluid d-inline-flex my-3 pl-0 align-items-center">
                                <div class="container-fluid col-xl-2 col-md-3 col-sm-4 col-5 justify-content-start d-inline-flex p-0">

                                    <div class="d-flex container-fluid p-0 m-0 justify-content-end roomInfo">
                                        <div>
                                            <h4 class="text-justify m-0 p-0">Room {studyrooms.room_num}</h4>
                                            <h6 class="text-justify m-0 p-0">Capacity: {studyrooms.size}</h6>
                                            <h6 class="text-justify m-0 p-0">Floor: {studyrooms.floor}</h6>
                                        </div>
                                    </div>
                                    <div class="container-fluid p-0 mx-2 d-inline-flex align-items-center justify-content-center reserveButtonMinWidth">

                                        <Link to={{
                                            pathname: `/studyrooms/reserve/new`,
                                            state: {
                                                id: studyrooms._id,
                                                room: studyrooms.room_num,
                                                building: studyrooms.building,
                                            }
                                        }} >
                                            <button type="button" class="btn btn-primary card-text">
                                                Reserve
                                            </button>
                                        </Link>

                                    </div>


                                </div>
                                <div class="container-fluid d-inline-flex col-xl-10 col-md-9 col-sm-8 col-7 h-100 p-0">
                                    <TimeGraph
                                        times={studyrooms.avail_times}
                                        open={studyrooms.open_time}
                                        close={studyrooms.end_time} />
                                </div>
                            </div>
                        </div >
                    );
                })
            }
        </div>
    );
};

const TimeGraph = props => {
    let times = props.times;

    let date = new Date();
    let open = props.open;
    let close = props.close;

    let intervals = (close - open) * 2;

    let remaining = intervals - times.length;

    for (let i = 0; i < remaining; i++) {
        times.push([true]);
    }
    let toRemove = 0;


    if (date.getHours() >= open) {
        toRemove = (date.getHours() - open) * 2;

        if (date.getMinutes() >= 30)
            toRemove++;

        for (let i = 0; i < toRemove; i++) {
            times.shift();
        }
    }


    return (
        <div class="container-fluid d-inline-flex m-0 p-0 align-items-center">
            {
                times.map((e, index) => {
                    return (
                        <div class="row d-inline-flex container-fluid bg-white m-0 px-0">
                            {
                                (e || e == null) ?
                                    <div class="container true p-1 m-0 text-center">
                                        {(index * 0.5) + open + (toRemove / 2)}
                                    </div> :
                                    <div class="container false p-1 text-center">
                                        {(index * 0.5) + open + (toRemove / 2)}
                                    </div>
                            }
                        </div>
                    );
                })
            }
        </div >
    );
};



export default StartReservation;






// {
//     studyrooms.map((studyrooms) => {
//         return (
//             <div className="col-lg-4 pb-1">
//                 <div className="card">
//                     <div className="card-body bg-white">
//                         <h3 class="bg-white">Building: {studyrooms.building}</h3>
//                         <h3 class="bg-white">Size: {studyrooms.size}</h3>
//                         <h3 class="bg-white">Room #: {studyrooms.room_num}</h3>
//                         <h3 class="bg-white">ID #: {studyrooms._id}</h3>
//                         <h3 class="bg-white">isOpen: {
//                             studyrooms.isOpen ? (<p class="bg-white">true</p>)
//                                 : (<p class="bg-white" >false</p>)
//                         }
//                         </h3>

//                         <button type="button" class="btn btn-lg btn-block btn-primary">

//                             <button type="button" class="btn btn-lg btn-block btn-primary">
//                                 <Link to={{
//                                     pathname: `/studyrooms/reserve/new`,
//                                     state: {
//                                         id: studyrooms._id
//                                     }
//                                 }}>
//                                     Reserve
//                                 </Link>
//                             </button>
//                         </button>

//                     </div>
//                 </div>
//             </div>
//         );
//     })
// }












// import React, { useState, useEffect } from "react";
// import StudyroomDataService from "../services/studyroom";
// import { Link } from "react-router-dom";
// import '../App.css';
// import {
//     Buttrick, Central, Feather, Furman, logo, Peabody, Stevenson
// } from '../Images';


// const AddReservation = props => {
//     const [studyrooms, setStudyRooms] = useState([]);
//     const [name, setName] = useState("");
//     const [startTime, setStartTime] = useState("");
//     const [length, setLength] = useState("");
//     const [userId, setUserId] = useState("");
//     const [studyRoomId, setStudyRoomId] = useState("");

//     const building = props.location.state.building;

//     let initialReservationState = ""


//     useEffect(() => {
//         console.log(props.location.state.building);
//     })

//     const [reservation, setReservation] = useState(initialReservationState);
//     const [submitted, setSubmitted] = useState(false);

//     const handleInputChange = event => {
//         setReservation(event.target.value);
//     };


//     const onChangeStudyRoomId = e => {
//         const n = e.target.value;
//         setStudyRoomId(n);
//     };
//     const onChangeName = e => {
//         const n = e.target.value;
//         setName(n);
//     };
//     const onChangeStartTime = e => {
//         const n = e.target.value;
//         setStartTime(n);
//     };
//     const onChangeLength = e => {
//         const n = e.target.value;
//         setLength(n);
//     };
//     const onChangeUserId = e => {
//         const n = e.target.value;
//         setUserId(n);
//     };

//     const saveReservation = () => {

//         var data = {
//             studyroom_id: studyRoomId,
//             name: name,
//             start_time: startTime,
//             length: length,
//             user_id: userId
//         };



//         StudyroomDataService.createReservation(data)
//             .then(response => {
//                 setSubmitted(true);
//                 console.log(response.data);
//             })
//             .catch(e => {
//                 console.log(e);
//             });

//     };

//     return (
//         <div>

//             <div className="submit-form">
//                 <input
//                     type="text"
//                     className="form-control"
//                     placeholder={props.location.state.building}
//                     value={studyRoomId}
//                     onChange={onChangeStudyRoomId}
//                 />
//                 <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Name"
//                     value={name}
//                     onChange={onChangeName}
//                 />
//                 <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Start Time"
//                     value={startTime}
//                     onChange={onChangeStartTime}
//                 />
//                 <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Length"
//                     value={length}
//                     onChange={onChangeLength}
//                 />
//                 <input
//                     type="text"
//                     className="form-control"
//                     placeholder="user id"
//                     value={userId}
//                     onChange={onChangeUserId}
//                 />
//                 <button
//                     className="btn btn-outline-secondary"
//                     type="button"
//                     onClick={saveReservation}
//                 >Reserve!</button>

//                 <Link to={"/studyrooms"}>
//                     StudyRooms
//                 </Link>
//             </div>



//         </div>
//     );
// };

// export default AddReservation;
