import React from "react";
import { Text, View, StyleSheet } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons"
import Feed from "../screens/feed";
import CreateStory from "../screens/createStory";

const Tab = createBottomTabNavigator()

export default class TabNavigator extends React.Component {
    render() {
        return (
            <Tab.Navigator 
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName
                    if (route.name == "Feed") {
                        iconName = focused?'book':'book-outline'
                    } else if (route.name == "Create Story") {
                        iconName = focused?'create':'create-outline'
                    }
                    return(
                        <Ionicons name = {iconName} size = {size} color = {color} />

                    )
                }
            })}
            tabBarOptions = {{
                activeTintColor:"tomato",
                inactiveTintColor:"grey"
            }}
            >
                <Tab.Screen name = "Feed" component={Feed} />
                <Tab.Screen name = "Create Story" component={CreateStory} />
            </Tab.Navigator>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
})