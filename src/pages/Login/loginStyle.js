import { StyleSheet } from "react-native";


export const loginStyl = StyleSheet.create({
    container: {
        display: "flex",
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: "#6877e8"

    },
    view: {
        width: '80%',
        marginRight: '10%',
        marginLeft:'10%'
    },
    cardTitle: {
        color: "#6877e8"
    },
    cardButton: {
        margin: 2,
        marginLeft: 0,
        marginRight: 0
    }
})