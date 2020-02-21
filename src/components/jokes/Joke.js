/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
// import {addUser} from '../actions/dataActions';


import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';

class Joke extends Component {

    constructor(props) {
        super(props);
        this.state = {
            joke: {},
        };
    }


    render() {
        console.log('JOKE_ITEM_PROPS', this.props);

        return (

            <View style={styles.container}>
                <Text>Joke</Text>
                <Text>{this.props.item.joke}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        margin: 1,
        padding: 3,

    },

    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 19,
        fontWeight: 'bold',
    },
});


export default Joke;
