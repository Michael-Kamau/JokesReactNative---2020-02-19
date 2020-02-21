/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import JokeItem from '../jokes/JokeItem';
import PropTypes from 'prop-types';
import {fetchJokes, getJokesCount} from '../../actions/dataActions';
import {
    ToggleButton,
    Button,
    Appbar,
    Provider as PaperProvider,
    Avatar,
    Card,
    Title,
    Paragraph,
    Badge,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();
MaterialCommunityIcons.loadFont();


import {View, Text, TextInput, FlatList, SafeAreaView, ScrollView, TouchableHighlight, StyleSheet} from 'react-native';


class ScreenJokes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            explicit: false,
            status: 'checked',
        };
    }


    componentDidMount(): void {
        this.props.fetchJokes()
        this.props.getJokesCount();
    }


    goToScreen = (screenName) => {
        Navigation.push(this.props.componentId, {
            component: {
                name: screenName,
                options: {
                    topBar: {
                        title: {
                            text: 'Categories',
                        },
                    },
                },
            },
        });
    };

    fetchJokes = () => {
        this.props.fetchJokes(this.state.explicit)
        this.props.getJokesCount();

    };

    toggleExplicit = () => {
        this.setState({
            explicit: !this.state.explicit,
        });
        console.log(this.state);
    };

    render() {
        console.log('ptopd', this.props);
        return (

            // <PaperProvider>
            <SafeAreaView>
                <ScrollView>

                    <View>
                        {/*<Text>Current Jokes Count ({this.props.count})</Text>*/}
                        <Card>
                            <Card.Title title="Chuck Norris Jokes"
                                        left={(props) => <Badge size={30}
                                                                style={{backgroundColor: '#333333'}}>{this.props.count}</Badge>}/>
                            <Card.Content>
                                <Button mode="contained" onPress={() => this.goToScreen('ScreenJokeFilter')}
                                        style={{backgroundColor: '#1e6d42'}}>
                                    Categories
                                </Button>
                            </Card.Content>

                        </Card>
                        <View style={styles.buttonsContainer}>

                            <TouchableHighlight onPress={() => this.fetchJokes()} underlayColor="white">
                                {/*<View style={styles.button}>*/}
                                {/*    <Text style={styles.buttonText}>Generate Jokes</Text>*/}
                                {/*</View>*/}
                                <Button mode="contained"
                                        style={{backgroundColor: '#258551', marginLeft: 15}}>
                                    Generate Jokes
                                </Button>
                            </TouchableHighlight>

                            <View>
                                <TouchableHighlight onPress={() => this.toggleExplicit()} underlayColor="white"
                                                    style={{width: 150}}>
                                    {this.state.explicit ? (

                                        <Card.Title title="Explicit"
                                                    left={(props) => <Avatar.Icon size={30} icon="checkbox-marked"
                                                                                  style={{backgroundColor: '#ff1661'}}/>}/>

                                    ) : (
                                        <Card.Title title="Explicit"
                                                    left={(props) => <Avatar.Icon size={30} icon="checkbox-blank"
                                                                                  onPress={() => this.toggleExplicit()}
                                                                                  style={{backgroundColor: '#3c64ff'}}/>}/>

                                    )}
                                </TouchableHighlight>
                            </View>
                        </View>
                        <FlatList data={this.props.jokes}
                                  renderItem={({item, index}) => <JokeItem componentId={this.props.componentId}
                                                                           index={index}
                                                                           item={item}/>}
                        />

                    </View>
                </ScrollView>
            </SafeAreaView>

            // </PaperProvider>


        );
    }
}

ScreenJokes.propTypes = {
    fetchJokes: PropTypes.func.isRequired,
    getJokesCount: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        jokes: state.data.jokes,
        count: state.data.count,
    };
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        margin: 2,
        padding: 5,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        marginBottom: 3,
        alignItems: 'center',
        shadowColor: '#e6e6e6',
        borderRadius: 20,
        backgroundColor: '#327a28',
    },
    buttonText: {
        padding: 20,
        color: 'white',
        fontSize: 18,
    },
});

export default connect(mapStateToProps, {fetchJokes, getJokesCount})(ScreenJokes);
