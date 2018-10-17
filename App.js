import React, {Component} from "react";
import {StyleSheet, View, Text, PanResponder, Animated, Button} from "react-native";
import {Col, Row, Grid} from "react-native-easy-grid";
import { createStackNavigator } from 'react-navigation';

import Draggable from './src/Draggable';
import MultiCos from './src/MultiCos';
import ScoreScreen from './src/scoreScreen';

class App extends Component {

    static navigationOptions = {
        title: "Volant Arena 1.0.0"
    }

         checkPage = () => {
            this.props.navigation.navigate("ScoreTable")
         }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Grid>
                    <Col>
                        <View style={styles.dropZoneBlue}>
                            <Text style={styles.text}>Blue TEAM</Text>
                            <Text style={styles.text}>0</Text>
                        </View>
                    </Col>
                    <Col>
                        <View style={styles.dropZoneWhite}>
                            <Text style={styles.textBlue}>White TEAM</Text>
                            <Text style={styles.textBlue}>0</Text>
                        </View>
                    </Col>
                </Grid>
                {/*<View style={styles.ballContainer}/>*/}
                <Grid>
                    <Row>
                        <MultiCos navigation={this.props.navigation.navigate} />
                    </Row>
                </Grid>
                <Button onPress={()=>{
                    this.checkPage();
                }}
                title="Watch current match"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    ballContainer: {
        height: "40%",
        backgroundColor: '#a16a2b'

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

export default createStackNavigator({
    Home :{
        screen: App
    },
    ScoreTable: {
        screen: ScoreScreen
    }
})