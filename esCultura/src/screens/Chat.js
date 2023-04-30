import { Text, View, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import TranslateSelector from "../components/TranslateSelector";

export default function Chat(props) {
    return (
        <Screen>
            <View style={styles.margin}>
                <TranslateSelector></TranslateSelector>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    margin: {
        marginLeft: 20,
        marginTop: 20,
    }
});