import { Dimensions, StatusBar } from "react-native";


//vd mẫu

const bottombarHeight =
    Dimensions.get("screen").height == Dimensions.get("window").height ?
    Dimensions.get("screen").height -
    Dimensions.get("window").height +
    StatusBar.currentHeight :
    StatusBar.currentHeight;

const Colors = {
    //UI 
    ui_blue_10: "#0380BD",


    ui_grey_10: "#F2F2F2",
    ui_grey_20: "#737373",
    ui_red_10: "#DF0029",
    ui_yellow_10: "#D59B00",
    ui_black_10: "#000000",
    ui_white_10: "#FFFFFF",

    // background
    ui_light_selected_bg: "#FFFFFF",
};
const Fonts = {


};





export default Colors;

///https://github.com/Rushit013/RNProjectStructure/blob/main/src/utils/index.js
///https://dev.to/rushitjivani/ultimate-folder-structure-for-your-react-native-project-1k27