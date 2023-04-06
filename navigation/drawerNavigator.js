import React, { Component } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import firebase from "firebase";
import StackNavigator from "./stackNavigator";
import Profile from "../screens/profile";
import Logout from "../screens/logOut";
import CustomSidebarMenu from "../screens/customSideBarMenu";

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            light_theme: true
        };
    }
    componentDidMount() {
        let theme;
        firebase
            .database()
            .ref("/users/" + firebase.auth().currentUser.uid)
            .on("value", function (snapshot) {
                theme = snapshot.val().current_theme;
            });
        this.setState({ light_theme: theme === "light" ? true : false });
    }
    render() {
        return (
            <Drawer.Navigator drawerContentOptions={{
                activeTintColor: "#e91e63",
                inactiveTintColor: this.state.light_theme? "black": "white",
                itemStyle:{marginVertical:5}
            }}
            drawerContent={props => {
                <CustomSidebarMenu 
                {...props}/>
            }}
            >
                <Drawer.Screen name="Tela Inicial" component={StackNavigator} options={{ unmountOnBlur: true }} />
                <Drawer.Screen name="Perfil" component={Profile} options={{ unmountOnBlur: true }} />
                <Drawer.Screen name="Log Out" component={Logout} options={{ unmountOnBlur: true }} />
            </Drawer.Navigator>
        );
    };
};