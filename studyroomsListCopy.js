import React, { useState, useEffect, } from "react";

import '../App.css';
import * as ReactDOM from 'react-dom'
import StudyroomDataService from "../services/studyroom";
import { Link } from "react-router-dom";
import {
    Buttrick, Central, Feather, Furman, logo, Peabody, Stevenson
} from '../Images';

const StudyroomsList = props => {
    const [studyrooms, setStudyrooms] = useState([]);
    const [searchBuilding, setSearchBuilding] = useState("");
    const [numPeabody, setNumPeabody] = useState(0);



    useEffect(() => {
        find("Central", "building");
        setNumPeabody(studyrooms.length);
    }, [studyrooms]);



    const retrieveStudyrooms = () => {
        StudyroomDataService.getAll()
            .then(response => {
                //console.log(response.data);
                setStudyrooms(response.data.studyRooms);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveStudyrooms();
    };

    const onChangeSearchBuilding = e => {
        const searchBuilding = e.target.value;
        setSearchBuilding(searchBuilding);
    };

    const findByBuilding = () => {
        find(searchBuilding, "building");
        //find("Peabody", "building")
    };

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
        <div className="bg-white">
            <div className="row">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by "
                    value={searchBuilding}
                    onChange={onChangeSearchBuilding}
                />
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={findByBuilding}
                >Search By Building</button>


                <div class="col-lg-4 col-md-6 col-sm-12 py-2">
                    <div class="card text-center shadow-sm w-100 backCol">
                        <div class="d-flex align-items-end cardImage peabody">
                            <div class="container-fluid backCol slideUpMenu" >
                                <h4 class="card-title pt-1 font-weight-normal">
                                    Peabody Library
                                </h4>
                                <h5 class="card-text pb-2 m-0">{numPeabody}/26 Rooms Available</h5>
                                <div class="container hiddenList">
                                    <button type="button" class="btn btn-lg btn-block btn-primary">

                                        <Link to={"/studyrooms/reserve"}>
                                            Reserve
                                        </Link>


                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}
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

