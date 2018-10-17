import {Col, Grid} from "react-native-easy-grid";
import Draggable from "./Draggable";
import {Alert, Animated, StyleSheet, View} from "react-native";
import React, {Component} from "react";
import axios from 'axios';
import {Text} from "../App";
export default class MultiCos extends Component {


    constructor(props) {
        super(props);
        this.state = {
            blueTeam: [],
            whiteTeam: [],
            matchObj: {}
        };
    }

    startMatch = () => {

        axios({
            method: 'post',
            url: 'http://172.30.29.33/api/matches/start',
            data: this.state.matchObj
        }).then(()=> this.props.navigation('ScoreTable'));

    }

    checkIfteamAreFull = () => {

        if (this.state.blueTeam.length === 2 && this.state.whiteTeam.length === 2) {
            var obj = {
                "white_forward_player_id": this.state.whiteTeam[0],
                "white_defender_player_id": this.state.whiteTeam[1],
                "blue_forward_player_id": this.state.blueTeam[0],
                "blue_defender_player_id": this.state.blueTeam[1],
            }

            this.setState({
                matchObj: obj
            });
            Alert.alert('Match created!', 'You can now start the game',
                [
                    {
                        text: 'Start Match', onPress: () => {
                            this.startMatch()
                        }
                    },
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                ]
            )
        }

        console.log(obj)


    }

    outOfBlueArea = (player) => {

        let arrayBlue = this.state.blueTeam.slice();
        for (var i = 0; i < arrayBlue.length; i++) {
            if (arrayBlue[i] === player) {
                arrayBlue.splice(i, 1);
            }
        }
        this.setState({
            blueTeam: arrayBlue
        }, () => {
        })
    }
    outOfWhiteArea = (player) => {
        let arrayWhite = this.state.whiteTeam.slice();

        for (var i = 0; i < arrayWhite.length; i++) {
            if (arrayWhite[i] === player) {
                arrayWhite.splice(i, 1);
            }
        }

        this.setState({
                whiteTeam: arrayWhite
            },
            () => {
                console.log("")
            }
        )


    }

    addPlayerToBlueTeam = (player, id) => {


        let newArrayBlue = [...this.state.blueTeam, id];

        if (this.state.blueTeam.length < 2) {
            this.setState({
                blueTeam: newArrayBlue
            }, () => {

                console.log("Po dodaniu do blue teamu", this.state.blueTeam)


                this.checkIfteamAreFull()
            })
        }
        else {
            Alert.alert('Too many players!!', 'You can only add two players')
        }

    }

    addPlayerToWhiteTeam = (player, id) => {

        let newArrayWhite = [...this.state.whiteTeam, id];

        if (this.state.whiteTeam.length < 2) {
            this.setState({
                whiteTeam: newArrayWhite
            }, () => {

                console.log("Po dodaniu do white teamu ", this.state.whiteTeam)

                this.checkIfteamAreFull()

            })
        }
        else {
            Alert.alert('Too many players!!', 'You can only add two players')
        }

    }


    render() {

        return (

            <Grid>

                <Col style={styles.column}>

                    <Draggable name="Adrian" joinToBlue={this.addPlayerToBlueTeam} id="2"
                               joinToWhite={this.addPlayerToWhiteTeam} outOfBlueAreaTest={this.outOfBlueArea}
                               outOfWhiteArea={this.outOfWhiteArea}/>
                    <Draggable name="Jakub" joinToBlue={this.addPlayerToBlueTeam} id="3"
                               joinToWhite={this.addPlayerToWhiteTeam} outOfBlueAreaTest={this.outOfBlueArea}
                               outOfWhiteArea={this.outOfWhiteArea}/>
                    <Draggable name="Bartek J" joinToBlue={this.addPlayerToBlueTeam} id="4"
                               joinToWhite={this.addPlayerToWhiteTeam} outOfBlueAreaTest={this.outOfBlueArea}
                               outOfWhiteArea={this.outOfWhiteArea}/>
                    <Draggable name="Bartek Z" joinToBlue={this.addPlayerToBlueTeam} id="9"
                               joinToWhite={this.addPlayerToWhiteTeam} outOfBlueAreaTest={this.outOfBlueArea}
                               outOfWhiteArea={this.outOfWhiteArea}/>
                    <Draggable name="Paweł" joinToBlue={this.addPlayerToBlueTeam} id="6"
                               joinToWhite={this.addPlayerToWhiteTeam} outOfBlueAreaTest={this.outOfBlueArea}
                               outOfWhiteArea={this.outOfWhiteArea}/>
                </Col>
                <Col>
                </Col>
                <Col style={styles.column}>
                    <Draggable name="Arek" joinToBlue={this.addPlayerToBlueTeam} joinToWhite={this.addPlayerToWhiteTeam}
                               outOfBlueAreaTest={this.outOfBlueArea} outOfWhiteArea={this.outOfWhiteArea} id="1"/>
                    <Draggable name="Agnieszka" joinToBlue={this.addPlayerToBlueTeam} id="5"
                               joinToWhite={this.addPlayerToWhiteTeam} outOfBlueAreaTest={this.outOfBlueArea}
                               outOfWhiteArea={this.outOfWhiteArea}/>
                    <Draggable name="Robert" joinToBlue={this.addPlayerToBlueTeam} id="7"
                               joinToWhite={this.addPlayerToWhiteTeam} outOfBlueAreaTest={this.outOfBlueArea}
                               outOfWhiteArea={this.outOfWhiteArea}/>
                    <Draggable name="Mirek" joinToBlue={this.addPlayerToBlueTeam} id="10"
                               joinToWhite={this.addPlayerToWhiteTeam} outOfBlueAreaTest={this.outOfBlueArea}
                               outOfWhiteArea={this.outOfWhiteArea}/>
                    <Draggable name="Kamil" joinToBlue={this.addPlayerToBlueTeam} id="8"
                               joinToWhite={this.addPlayerToWhiteTeam} outOfBlueAreaTest={this.outOfBlueArea}
                               outOfWhiteArea={this.outOfWhiteArea}/>
                </Col>
                <Col>
                </Col>
            </Grid>

        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    ballContainer: {
        height: 50
    },
    column: {
        flexDirection: "column",
        justifyContent: 'space-between',
        paddingBottom: 40,
    },
    dropZoneBlue: {
        height: "100%",
        backgroundColor: "#0a3ba2"
    },
    dropZoneWhite: {
        height: "100%",
        backgroundColor: "#fff"
    },
    text: {
        marginTop: 25,
        marginLeft: 5,
        marginRight: 5,
        textAlign: "center",
        color: "#fff",
        fontSize: 25,
        fontWeight: "bold"
    },
    textBlue: {
        marginTop: 25,
        marginLeft: 5,
        marginRight: 5,
        textAlign: "center",
        color: "#00334d",
        fontSize: 25,
        fontWeight: "bold"
    },
});