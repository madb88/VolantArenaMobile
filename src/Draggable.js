import React, {Component} from "react";
import {StyleSheet, View, Text, PanResponder, Animated, Alert} from "react-native";

export default class Draggable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showDraggable: true,
            dropAreaValues: null,
            pan: new Animated.ValueXY(),
            opacity: new Animated.Value(2),
            name: props.name,
        };
    }

    componentWillMount() {
        this._val = {x: 0, y: 0}
        this.state.pan.addListener((value) => this._val = value);

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gesture) => true,
            onPanResponderGrant: (e, gesture) => {
                this.state.pan.setOffset({
                    x: this._val.x,
                    y: this._val.y
                })
                this.state.pan.setValue({x: 0, y: 0})
            },
            onPanResponderMove: Animated.event([
                null, {dx: this.state.pan.x, dy: this.state.pan.y}
            ]),
            onPanResponderRelease: (e, gesture) => {
                if (this.isBlueArea(gesture, e)) {
                    Animated.timing(this.state.opacity, {
                        duration: 1000
                    }).start(() =>
                        this.setState({
                            showDraggable: true
                        })
                    );
                } else if (this.isWhiteArea(gesture, e)) {
                    Animated.timing(this.state.opacity, {
                        toValue: 0,
                        duration: 1000
                    }).start(() =>
                        this.setState({
                            showDraggable: false
                        })
                    );
                }
            }
        });
    }


    isBlueArea(gesture, e) {

        if (gesture.moveY < 300 && gesture.moveX < 200) {
            console.log('Blue Team');

            this.props.joinToBlue(this.props.name, this.props.id)


        } else  {
            this.props.outOfBlueAreaTest(this.props.id)

        }

    }

    isWhiteArea(gesture, e) {
        if (gesture.moveY < 300 && gesture.moveX > 200 && gesture.moveX < 400) {
            console.log('White Team');
            this.props.joinToWhite(this.props.name, this.props.id)
        }
        else  {
            this.props.outOfWhiteArea(this.props.id)

        }
    }

    render() {

        return (
            <View style={styles.players}>
                {this.renderDraggable()}
            </View>
        );
    }

    renderDraggable() {
        const panStyle = {
            transform: this.state.pan.getTranslateTransform()
        }
        if (this.state.showDraggable) {
            return (
                <View>
                    <Animated.View
                        {...this.panResponder.panHandlers}
                        style={[panStyle, styles.circle, {opacity: this.state.opacity}]}
                    >
                        <Text style={styles.name}>{this.state.name}</Text>
                    </Animated.View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    ballContainer: {
        height: 200
    },
    circle: {
        backgroundColor: "#4a4f55",
        width: 150,
        height: 40,
        borderRadius: 10,


    },
    row: {
        flexDirection: "column"

    },
    dropZone: {
        height: 200,
        backgroundColor: "#00334d"
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
    players: {
        width: "10%",
        flexDirection: "column"
    },
    name: {
        flex: 1,
        fontSize: 20,
        color: "#fafafa",
        textAlign: "center",
        justifyContent: "center",
        paddingTop: 5
    }
});