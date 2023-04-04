import React from "react";
import firebase from "firebase"
import { Text, View, StyleSheet, SafeAreaView, Platform, StatusBar, Image, ScrollView, TextInput, Dimensions } from "react-native"
import { RFValue } from "react-native-responsive-fontsize";
import AppTitle from "../components/appTitle";
import * as Font from "expo-font";
import DropDownPicker from "react-native-dropdown-picker";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

let customFonts = {
    "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class CreateStory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fontsLoaded: false,
            previewImage: "image_1",
            dropDownHeight: 40,
            light_theme: true
        };
    }

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }

    componentDidMount() {
        this._loadFontsAsync();
        this.fetchUser();
    }

    fetchUser = () => {
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
        if (this.state.fontsLoaded) {
            SplashScreen.hideAsync();
            let preview_images = {
                "image_1": require("../assets/story_image_1.png"),
                "image_2": require("../assets/story_image_2.png"),
                "image_3": require("../assets/story_image_3.png"),
                "image_4": require("../assets/story_image_4.png"),
                "image_5": require("../assets/story_image_5.png"),
            }
            return (
                <View style={this.state.light_theme? styles.containerLight: styles.container}>
                    <SafeAreaView style={styles.droidSafeArea} />
                    <AppTitle />
                    <View style={styles.fieldsContainer}>
                        <Image style={styles.previewImage} source={preview_images[this.state.previewImage]} />
                        <View style={{ height: RFValue(this.state.dropDownHeight) }} >
                            <DropDownPicker
                                items={[
                                    { label: "Image 1", value: "image_1" },
                                    { label: "Image 2", value: "image_2" },
                                    { label: "Image 3", value: "image_3" },
                                    { label: "Image 4", value: "image_4" },
                                    { label: "Image 5", value: "image_5" },
                                ]}
                                defaultValue={this.state.previewImage}
                                open={this.state.dropDownHeight == 170 ? true : false}
                                onOpen={() => {
                                    this.setState({ dropDownHeight: 170 });
                                }}
                                onClose={() => {
                                    this.setState({ dropDownHeight: 40 });
                                }}
                                style={{
                                    backgroundColor: "transparent",
                                    borderWidth: 1,
                                    borderColor: "white",
                                }}
                                textStyle={{
                                    color: this.state.dropDownHeight == 170 ? "black" : "white",
                                    fontFamily: "Bubblegum-Sans",
                                }}
                                onSelectItem={(item) =>
                                    this.setState({
                                        previewImage: item.value,
                                    })
                                }
                            />
                        </View>
                        <ScrollView>
                            <TextInput
                                style={this.state.light_theme? styles.inputFontLight: styles.inputFont}
                                onChangeText={(title) => this.setState({ title })}
                                placeholder={"Title"}
                                placeholderTextColor= {this.state.light_theme? "black": "white"}
                            />

                            <TextInput
                                style={[
                                    this.state.light_theme? styles.inputFontLight: styles.inputFont,
                                    styles.inputFontExtra,
                                    styles.inputTextBig,
                                ]}
                                onChangeText={(description) => this.setState({ description })}
                                placeholder={"Description"}
                                multiline={true}
                                numberOfLines={4}
                                placeholderTextColor={this.state.light_theme? "black": "white"}
                            />
                            <TextInput
                                style={[
                                    this.state.light_theme? styles.inputFontLight: styles.inputFont,
                                    styles.inputFontExtra,
                                    styles.inputTextBig,
                                ]}
                                onChangeText={(story) => this.setState({ story })}
                                placeholder={"Story"}
                                multiline={true}
                                numberOfLines={20}
                                placeholderTextColor={this.state.light_theme? "black": "white"}
                            />
                            <TextInput
                                style={[
                                    this.state.light_theme? styles.inputFontLight: styles.inputFont,
                                    styles.inputFontExtra,
                                    styles.inputTextBig,
                                ]}
                                onChangeText={(moral) => this.setState({ moral })}
                                placeholder={"Moral of the story"}
                                multiline={true}
                                numberOfLines={4}
                                placeholderTextColor={this.state.light_theme? "black": "white"}
                            />
                        </ScrollView>
                    </View>
                    <View style={{ flex: 0.08 }} />

                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#15193c"
    },
    containerLight: {
      flex: 1,
      backgroundColor: "white"
    },
    droidSafeArea: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appTitle: {
      flex: 0.07,
      flexDirection: "row"
    },
    appIcon: {
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center"
    },
    iconImage: {
      width: "100%",
      height: "100%",
      resizeMode: "contain"
    },
    appTitleTextContainer: {
      flex: 0.7,
      justifyContent: "center"
    },
    appTitleText: {
      color: "white",
      fontSize: RFValue(28),
      fontFamily: "Bubblegum-Sans"
    },
    appTitleTextLight: {
      color: "black",
      fontSize: RFValue(28),
      fontFamily: "Bubblegum-Sans"
    },
    fieldsContainer: {
      flex: 0.85
    },
    previewImage: {
      width: "93%",
      height: RFValue(250),
      alignSelf: "center",
      borderRadius: RFValue(10),
      marginVertical: RFValue(10),
      resizeMode: "contain"
    },
    inputFont: {
      height: RFValue(40),
      borderColor: "white",
      borderWidth: RFValue(1),
      borderRadius: RFValue(10),
      paddingLeft: RFValue(10),
      color: "white",
      fontFamily: "Bubblegum-Sans"
    },
    inputFontLight: {
      height: RFValue(40),
      borderColor: "black",
      borderWidth: RFValue(1),
      borderRadius: RFValue(10),
      paddingLeft: RFValue(10),
      color: "black",
      fontFamily: "Bubblegum-Sans"
    },
    dropdownLabel: {
      color: "white",
      fontFamily: "Bubblegum-Sans"
    },
    dropdownLabelLight: {
      color: "black",
      fontFamily: "Bubblegum-Sans"
    },
    inputFontExtra: {
      marginTop: RFValue(15)
    },
    inputTextBig: {
      textAlignVertical: "top",
      padding: RFValue(5)
    }
  });