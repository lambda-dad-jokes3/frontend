import React from "react";
import {Card, CardTitle, CardBody, CardText, Container, Row, Col} from "reactstrap";
import JokesData from "./JokesCardDisplay";

const JokeCard = props => {
    console.log(props.user_id);
    console.log(props.question);
    console.log(props.punchline);


    return (
        <div key={props.question}>
            <Container>
                <Row>
                    <Col sm="6">
                        <Card body className="text-center" style={{backgroundColor: "#585370", borderColor: "#333"}}>
                        
                            <CardTitle>Question: {props.question}</CardTitle>

                            <CardText>Punchline: {props.punchline}</CardText>
                       
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default JokeCard;