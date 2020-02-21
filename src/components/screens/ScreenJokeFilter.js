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
import PropTypes from 'prop-types';
import {toggleFilter, fetchCategories} from '../../actions/dataActions';


import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Modal,
    Picker,
    TouchableHighlight,
    FlatList,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import {
    ToggleButton,
    Appbar,
    Provider as PaperProvider,
    Avatar,
    Card,
    Title,
    Paragraph,
    Badge,
    Button,
} from 'react-native-paper';
import {FETCH_JOKES} from '../../actions/types';
import JokeItem from '../jokes/JokeItem';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();
MaterialCommunityIcons.loadFont();

class ScreenJokeFilter extends Component {

    componentDidMount(): void {
        this.props.fetchCategories();
    }

    constructor(props) {
        super(props);
        this.state = {
            category: null,
            joke: null,
            pickerDisplayed: false,
            loading: false,
        };
    }

    generateJoke() {
        console.log('called');
        let link = '';
        // this.setState({
        //     loading:true
        // })

        if (this.state.category === null) {
            alert('Please Select a category to choose from');
            this.setState({
                loading: false,
            });
        } else {
            link = 'https://api.chucknorris.io/jokes/random?category=' + this.state.category;
            fetch(link)
                .then(res => res.json())
                .then(joke => this.setState({
                    loading: false,
                    joke,
                })).catch(error => {
                alert(error);
                this.setState({
                    loading: false,
                });
            });
        }

    }

    setPickerValue(newValue) {
        this.setState({
            category: newValue,
        });

        this.togglePicker();
    }

    togglePicker() {
        this.setState({
            pickerDisplayed: !this.state.pickerDisplayed,
        });
    }


    render() {
        console.log('SCREEN_JOKE_FILTER', this.state);

        return (

            <View>
                <Card>
                    <Card.Content>
                        <Title>Select a Category</Title>
                        <Paragraph>Which category do you want the joke from?</Paragraph>
                        {this.state.category ? (
                            <Paragraph>Category Selected - {this.state.category}</Paragraph>
                        ) : (
                            <Paragraph>No Category selected</Paragraph>
                        )}
                        <View style={styles.container}>
                            <Button mode="contained" onPress={() => this.togglePicker()}
                                    style={{backgroundColor: '#1e6d42', width: 150}}>
                                Categories
                            </Button>
                            <Button mode="contained" onPress={() => this.generateJoke()}
                                    style={{backgroundColor: '#1e6d42', width: 150}}
                                    disabled={this.state.category === null ? true : false}>
                                Get Joke
                                {this.state.loading && <ActivityIndicator size="small" color="#ffffff"/>}
                            </Button>
                        </View>

                    </Card.Content>
                </Card>
                {/*<View style={styles.container}>*/}

                {/*<Button*/}
                {/*    title="Generate Joke"*/}
                {/*    onPress={() => this.generateJoke()}*/}
                {/*/>*/}
                {/*</View>*/}
                {/*<Button onPress={() => this.togglePicker()} title={'Select a Category'}/>*/}
                <ScrollView>
                    <Modal visible={this.state.pickerDisplayed} animationType={'slide'} transparent={true}>
                        <View style={{
                            margin: 20, padding: 20,
                            backgroundColor: '#efefef',
                            bottom: 20,
                            left: 20,
                            right: 20,
                            alignItems: 'center',
                            position: 'absolute',
                        }}>
                            <Title>Please pick a value</Title>
                            {/*{ this.props.categories.map((value, index) => {*/}
                            {/*    return <TouchableHighlight key={index} onPress={() => this.setPickerValue(value)} style={{ paddingTop: 4, paddingBottom: 4 }}>*/}
                            {/*        <Title>{ value }</Title>*/}
                            {/*    </TouchableHighlight>*/}
                            {/*})}*/}

                            <FlatList data={this.props.categories}
                                      renderItem={({item, index}) => <TouchableHighlight key={index}
                                                                                         onPress={() => this.setPickerValue(item)}
                                                                                         style={{
                                                                                             paddingTop: 4,
                                                                                             paddingBottom: 4,
                                                                                         }}>
                                          <Text>{item}</Text>
                                      </TouchableHighlight>
                                      }
                            />
                            <TouchableHighlight onPress={() => this.togglePicker()}
                                                style={{paddingTop: 4, paddingBottom: 4}}>
                                <Text style={{color: '#ad1843'}}>Cancel</Text>
                            </TouchableHighlight>


                        </View>
                    </Modal>
                </ScrollView>

                {this.state.joke &&
                <View style={styles.jokeContainer}>
                    <Card.Cover style={{flex: 1, width: '100%', height: 100, borderRadius: 10}}
                                source={{uri: this.state.joke.icon_url}}/>

                    <Paragraph
                        style={{flex: 3, width: '100%', height: 100, paddingTop: 5,paddingLeft:5}}>{this.state.joke.value}</Paragraph>

                </View>
                }

            </View>
        );
    }
}


ScreenJokeFilter.propTypes = {
    toggleFilter: PropTypes.func.isRequired,
    fetchCategories: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        jokes: state.data.jokes,
        categories: state.data.categories,
    };
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    jokeContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 5,
    },


});


export default connect(mapStateToProps, {toggleFilter, fetchCategories})(ScreenJokeFilter);
