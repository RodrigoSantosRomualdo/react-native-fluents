import { StyleSheet } from "react-native";
import { theme } from "../../../appStyle";


export const registerStyle = StyleSheet.create({
    container : {
        padding: 15,
        paddingTop: 0
    },
    icon: {
        color: theme.colors.primary
    },
    button : {
        margin: 15,
        marginLeft: 0,
        marginRight: 0
    }
})