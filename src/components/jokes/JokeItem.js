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


import {View, Text, TextInput,StyleSheet,} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

Icon.loadFont();
MaterialCommunityIcons.loadFont()


class JokeItem extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }



    render() {
        console.log('JOKE_ITEM_PROPS',this.props);

        return (

            <View style={styles.container}>
                {/*<Text>Joke</Text>*/}
                {/*<Text>{this.props.item.joke}</Text>*/}
                <Card>
                    <Card.Title title="Chuck Norris" subtitle="Please Laugh even if it's not funny" left={(props) => <Avatar.Icon {...props} icon="emoticon-happy" style={{backgroundColor:'#246e50'}}/>} />
                    <Card.Content>
                        <Title>{"Joke " + (this.props.index+1)}</Title>
                        <Paragraph>{this.props.item.joke}</Paragraph>
                    </Card.Content>
                    {/*<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />*/}
                    <Card.Actions>
                        <Avatar.Text size={24} label={this.props.item.id} />

                    </Card.Actions>
                </Card>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        margin:1,
        padding:3

    },

    item:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 19,
        fontWeight: 'bold',
    },
});


export default JokeItem;
