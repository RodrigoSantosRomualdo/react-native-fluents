import React from "react";
import { Appbar } from "react-native-paper";

export const HeaderComponent = (props) => {
    console.log(props.title)
    return (
        <Appbar>
            <Appbar.Content title={props.title}/>
         </Appbar>
    )
}
