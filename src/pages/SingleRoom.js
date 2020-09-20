import React, { Component } from "react";
import { Link } from "react-router-dom";

import { RoomContext } from "../context";
import Hero from "../components/Hero/Hero";
import StyledHero from "../components/Hero/StyledHero";
import "../components/Rooms/SingleRoom.scss";

export default class SingleRoom extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            slug: this.props.match.params.slug,
        };
    }
    static contextType = RoomContext;
    componentDidMount() {}

    render() {
        const { getRoom } = this.context;
        const room = getRoom(this.state.slug);
        console.log(room);
        if (!room) {
            return (
                <div className="error">
                    <Hero
                        title={"OOP !!!"}
                        subTitle={"No such room could be found...!!"}
                        hero={"hero-room"}
                    >
                        <Link
                            to="/rooms"
                            exact="true"
                            className="btn btn-gradient"
                        >
                            Back To Rooms
                            <span className="dots">
                                <i className="fa fa-ellipsis-h"></i>
                            </span>
                        </Link>
                    </Hero>
                </div>
            );
        }

        const {
            name,
            description,
            capacity,
            size,
            price,
            extras,
            breakfast,
            pets,
            images,
        } = room;
        const [mainImg, ...defaultImg] = images;
        return (
            <>
                <StyledHero img={mainImg}>
                    <Hero
                        title={"Our Rooms"}
                        subTitle={`${name} room`}
                        hero={"hero-room"}
                    >
                        <Link
                            to="/rooms"
                            exact="true"
                            className="btn btn-gradient"
                        >
                            Back To Rooms
                            <span className="dots">
                                <i className="fa fa-ellipsis-h"></i>
                            </span>
                        </Link>
                    </Hero>
                </StyledHero>
                <section className="single-room">
                    <div className="single-room-images">
                        {defaultImg.map((item, index) => {
                            return <img key={index} src={item} alt={name} />;
                        })}
                    </div>
                    <div className="single-room-info">
                        <article className="desc">
                            <h3>details</h3>
                            <p>{description}</p>
                        </article>
                        <article className="info">
                            <h3>info</h3>
                            <h6>price : ${price}</h6>
                            <h6>size : ${size} SQFT</h6>
                            <h6>
                                max capacity :{" "}
                                {capacity > 1
                                    ? `${capacity} people`
                                    : `${capacity} person `}
                            </h6>
                            <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
                            <h6>{breakfast && "free breakfast included"}</h6>
                        </article>
                    </div>
                </section>
                <section className="room-extras">
                    <h6>extras</h6>
                    <ul className="extras">
                        {extras.map((item, index) => {
                            return <li key={index}>- {item}</li>;
                        })}
                    </ul>
                </section>
            </>
        );
    }
}
