import { Text } from "react-native";
import Screen from "../components/Screen";

export default function Chat(props) {
    return (
        <Screen navigation={props.navigation}>
            <Text>CHAT</Text>
        </Screen>
    );
}