/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Navigation} from 'react-native-navigation';
import {View, Text, Button,} from 'react-native';
import {connect} from 'react-redux'

class Main extends Component {


    goToScreen = (screenName) => {
        Navigation.push(this.props.componentId, {
            component: {
                name: screenName,
            },
        });
    };

    render(){
        console.log("this.propd",this.props)
        return(

            <View>
                <Text>Welcome to the future {this.props.counter}</Text>
                <Button title='Increase' onPress={this.props.increaseCounter}/>

                <Button title='Decrease' onPress={this.props.decreaseCounter}/>
                <Button title='Register' onPress={() => this.goToScreen('Register')}/>
                <Button title='Login' onPress={() => this.goToScreen('Login')}/>
            </View>
        )
    }
    ;
}

function mapStateToProps(state){
    return{
        counter:state.data.counter,
        users:state.data.users
    }
}

function mapDispatchToProps(dispatch){
    return{
        increaseCounter:()=>dispatch({type:'INCREASE_COUNTER'}),
        decreaseCounter:()=>dispatch({type:'DECREASE_COUNTER'}),

    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Main);
