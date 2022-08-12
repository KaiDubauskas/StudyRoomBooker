import React, { useState, useEffect } from "react";
import StudyroomDataService from "../services/studyroom";
import { Link } from "react-router-dom";


const Studyroom = props => {
    const initialStudyroomState = {
        id: null,
        building: "",
        isOpen: true,
        floor: {},
        room_num: {},
        size: {},
        open_time: {},
        end_time: {},
        reviews: []
    };
    const [studyroom, setStudyroom] = useState(initialStudyroomState);

    // const getRestaurant = id => {
    //     RestaurantDataService.get(id)
    //         .then(response => {
    //             setRestaurant(response.data);
    //             console.log(response.data);
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         });
    // };

    // useEffect(() => {
    //     getRestaurant(props.match.params.id);
    // }, [props.match.params.id]);

    // const deleteReview = (reviewId, index) => {
    //     RestaurantDataService.deleteReview(reviewId, props.user.id)
    //         .then(response => {
    //             setRestaurant((prevState) => {
    //                 prevState.reviews.splice(index, 1)
    //                 return ({
    //                     ...prevState
    //                 })
    //             })
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         });
    // };

    return (
        <div>
            {/* //{Studyroom ? ( */}
            <div>
                <h5>{studyroom.building}</h5>
                <p>
                    <strong>Size: </strong>{studyroom.size}<br />
                    <strong>Room Num: </strong>{studyroom.room_num}<br />
                </p>
                <Link to={"/studyrooms/review"} className="btn btn-primary">
                    Add Review
                </Link>
                <h4> Reviews </h4>
                <div className="row">
                    kjdnfkjsdnf
                    {/* {restaurant.reviews.length > 0 ? ( */}
                    {/* restaurant.reviews.map((review, index) => {
                                return (
                                    <div className="col-lg-4 pb-1" key={index}>
                                        <div className="card">
                                            <div className="card-body">
                                                <p className="card-text">
                                                    {review.text}<br />
                                                    <strong>User: </strong>{review.name}<br />
                                                    <strong>Date: </strong>{review.date}
                                                </p>
                                                {props.user && props.user.id === review.user_id &&
                                                    <div className="row">
                                                        <a onClick={() => deleteReview(review._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</a>
                                                        <Link to={{
                                                            pathname: "/restaurants/" + props.match.params.id + "/review",
                                                            state: {
                                                                currentReview: review
                                                            }
                                                        }} className="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                );
                             };
                    ) */}
                    {/* ) : (
                            <div className="col-sm-4">
                                <p>No reviews yet.</p>
                            </div>
                        )} */}

                </div>

            </div>
            {/* ) : (
                <div>
                    <br />
                    <p>No restaurant selected.</p>
                </div>
            )} */}
        </div>
    );
};

export default Studyroom;
