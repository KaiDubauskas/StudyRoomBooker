import React, { useState, useEffect, } from "react";
import '../App.css';
import * as ReactDOM from 'react-dom'
import StudyroomDataService from "../services/studyroom";
import { Link } from "react-router-dom";
import {
    Buttrick, Central, Feather, Furman, logo, Peabody, Stevenson
} from '../Images';

const StudyroomsList = props => {
    return (
        <div class="container-fluid px-4 justify-content-center align-items-center">
            <div class="row justify-content-between p-2">
                <PeabodyCard />
                <CentralCard />
                <FeatheringillCard />
            </div>
        </div>
    )
};

const PeabodyCard = props => {
    const [studyrooms, setStudyrooms] = useState([]);
    const [numPeabody, setNumPeabody] = useState(0);

    useEffect(() => {
        find("Peabody", "building");
        setNumPeabody(studyrooms.length);
    }, [studyrooms]);

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


        <div class="col-lg-4 col-md-6 col-sm-12 py-2">
            <div class="card text-center shadow-sm w-100 backCol">
                <div class="d-flex align-items-end cardImage peabody">
                    <div class="container-fluid backCol slideUpMenu" >
                        <h4 class="card-title pt-1 font-weight-normal">
                            Peabody Library
                        </h4>
                        <h5 class="card-text pb-2 m-2 mb-0">{numPeabody}/7 Rooms Available</h5>
                        <div class="d-inline-flex container-fluid hiddenList justify-content-center">
                            <Link to={{
                                pathname: `/studyrooms/reserve`,
                                state: {
                                    building: "Peabody"
                                }
                            }}>
                                <button type="button" class="btn btn-primary card-text">
                                    Reserve
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>




    )
};


const CentralCard = props => {
    const [studyrooms, setStudyrooms] = useState([]);
    const [numCentral, setNumCentral] = useState(0);

    useEffect(() => {
        find("Central", "building");
        setNumCentral(studyrooms.length);
    }, [studyrooms]);

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


        <div class="col-lg-4 col-md-6 col-sm-12 py-2">
            <div class="card text-center shadow-sm w-100 backCol">
                <div class="d-flex align-items-end cardImage central">
                    <div class="container-fluid backCol slideUpMenu">
                        <h4 class="card-title pt-1 font-weight-normal">
                            Central Library
                        </h4>
                        <h5 class="card-text pb-2 m-2 mb-0">{numCentral}/13 Rooms Available</h5>
                        <div class="d-inline-flex container-fluid hiddenList justify-content-center">
                            <Link to={{
                                pathname: `/studyrooms/reserve`,
                                state: {
                                    building: "Central"
                                }
                            }}>
                                <button type="button" class="btn btn-primary card-text">
                                    Reserve
                                </button>
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </div>




    )
};


const FeatheringillCard = props => {
    const [studyrooms, setStudyrooms] = useState([]);
    const [numCentral, setNumCentral] = useState(0);

    useEffect(() => {
        find("Featheringill", "building");
        setNumCentral(studyrooms.length);
    }, [studyrooms]);

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


        <div class="col-lg-4 col-md-6 col-sm-12 py-2">
            <div class="card text-center shadow-sm w-100 backCol">
                <div class="d-flex align-items-end cardImage feather">
                    <div class="container-fluid backCol slideUpMenu">
                        <h4 class="card-title pt-1 font-weight-normal">
                            Featheringill Hall
                        </h4>
                        <h5 class="card-text pb-2 m-2 mb-0">{numCentral}/5 Rooms Available</h5>
                        <div class="d-inline-flex container-fluid hiddenList justify-content-center">
                            <Link to={{
                                pathname: `/studyrooms/reserve`,
                                state: {
                                    building: "Featheringill"
                                }
                            }}>
                                <button type="button" class="btn btn-primary card-text">
                                    Reserve
                                </button>
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};


export default StudyroomsList;



{/* {studyrooms.map((studyrooms) => {
                    return (
                        
                    )
                })
                } */}





// return (
//     <div className="bg-white">
//         <div className="row">
//             <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Search by "
//                 value={searchBuilding}
//                 onChange={onChangeSearchBuilding}
//             />
//             <button
//                 className="btn btn-outline-secondary"
//                 type="button"
//                 onClick={findByBuilding}
//             >Search By Building</button>

//             {studyrooms.map((studyrooms) => {
//                 return (
//                     <div className="col-lg-4 pb-1">
//                         <div className="card">
//                             <div className="card-body bg-white">
//                                 <h3 class="bg-white">Building: {studyrooms.building}</h3>
//                                 <h3 class="bg-white">Size: {studyrooms.size}</h3>
//                                 <h3 class="bg-white">Room #: {studyrooms.room_num}</h3>
//                                 <h3 class="bg-white">isOpen: {
//                                     studyrooms.isOpen ? (<p class="bg-white">true</p>)
//                                         : (<p class="bg-white" >false</p>)
//                                 }
//                                 </h3>
//                             </div>
//                         </div>
//                     </div>
//                 );
//             })}
//         </div>
//     </div >
// );

