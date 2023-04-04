import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./stackNavigator";
import Profile from "../screens/profile";
import Logout from "../screens/logOut";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Tela Inicial" component={StackNavigator} />
            <Drawer.Screen name="Perfil" component={Profile} />
            <Drawer.Screen name="Log Out" component={Logout} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;