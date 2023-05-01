import { Button, Text } from "react-native";

export default function Settings(props) {
    return (
        <>
            <Button title={"ENRERE"} onPress={() => props.navigation.goBack()} />
            <Text>SETINGSLETSGOBA</Text>
        </>
    )
}