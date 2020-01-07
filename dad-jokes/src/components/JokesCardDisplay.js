import React, {useState, useEffect} from "react";
import axios from "axios";
import JokesCard from "./jokes";
import {Container, Row} from "reactstrap";

export default function JokesData() {
    const [jokes, setJokes] = useState([]);

    useEffect(() => {
        axios
            .get("https://dad-jokes-7.herokuapp.com/api/jokes")
            .then(response => {
                console.log(response.data.results);
                setJokes(response.data);
            })
            .catch(error => {
                console.log("there is an error", error);
            });
    }, []);

    return (
        <Container>
            <Row>
                {jokes.map(item => {
                    console.log(item.question);

                    return (
                        <div>
                            <JokesCard question={item.question} punchline={item.punchline} />
                        </div>
                    );
                })}
            </Row>
        </Container>
    );
}