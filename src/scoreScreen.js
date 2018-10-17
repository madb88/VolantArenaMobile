import React, {Component} from "react";
import {StyleSheet, View, Text, PanResponder, Animated, Button, Alert} from "react-native";
import {Col, Row, Grid} from "react-native-easy-grid";
import Pusher from 'pusher-js/react-native';
import axios from 'axios';

export default class ScoreScreen extends Component {
    // static navigationOptions = {
    //     title: "Score Table"
    // }

    constructor(props) {
        super(props);

        this.state = {
            whiteScore: 0,
            blueScore: 0,
        };
    }

    winnerListener() {
        if (this.state.blueScore === 10 || this.state.whiteScore === 10) {

            Alert.alert("Winner!!", "Congratulations!!",
                [
                    {
                        text: 'Start New Match', onPress: () => {

                        }
                    },
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                ]
            )
        }
    }

    scoreListener() {
        Pusher.logToConsole = true;

        var pusher = new Pusher('c75d04908d321c91cc15', {
            cluster: 'eu',
            forceTLS: true
        });

        var channel = pusher.subscribe('football');
        channel.bind('goal.scored', (data) => {
            this.setState({
                whiteScore: data.result.white,
                blueScore: data.result.blue
            }, () => {
                this.winnerListener()
            })

        });
    }

    addScore(team) {
        axios({
            method: 'get',
            url: 'http://172.30.29.33/api/goal/' + team
        }).catch((e) => {
            console.log(e)
        });

    }

    removeScore(team) {
        axios({
            method: 'get',
            url: 'http://172.30.29.33/api/minus/' + team
        }).catch((e) => {
            console.log(e)
        });
    }

    componentDidMount() {
        this.scoreListener();
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Grid>
                    <Row style={styles.blueScore}>
                        <Col size={1}>
                            <Button
                                color="#008000"
                                onPress={() => {
                                    this.addScore("blue")
                                }}
                                title="+"
                            />
                        </Col>
                        <Col size={4}>
                            <Text style={styles.textWhite}>12</Text>

                        </Col>
                        <Col size={1}>
                            <Button
                                color="#ff0000"
                                onPress={() => {
                                    this.removeScore("blue")
                                }}
                                height='100%'
                                title=" - "
                            />
                        </Col>
                    </Row>
                    <Row style={styles.whiteScore}>
                        <Col size={1}>
                            <Button
                                color="#008000"
                                onPress={() => {
                                    this.addScore("white")
                                }}
                                title="+"
                            />
                        </Col>
                        <Col size={4}>
                            <Text style={styles.text}>{this.state.whiteScore}</Text>
                        </Col>
                        <Col size={1}>
                            <Button
                                color="#ff0000"
                                onPress={() => {
                                    this.removeScore("white")
                                }}
                                height='100%'
                                title=" - "
                            />
                        </Col>
                    </Row>
                </Grid>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    blueScore: {
        backgroundColor: "#3f4aff",
        transform: [{rotate: '180deg'}]

    },
    whiteScore: {
        backgroundColor: "#fff"

    },
    text: {
        flex: 1,
        fontSize: 200,
        textAlign: "center",
        justifyContent: "center"
    },
    textWhite: {
        flex: 1,
        fontSize: 200,
        color: "#fff",
        textAlign: "center",
        justifyContent: "center"

    },
    addGoalButton: {
        color: "red"
    }
});

