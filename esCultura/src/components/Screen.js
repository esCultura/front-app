import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Screen(props) {
    return (
        <SafeAreaView style={{backgroundColor: "#2FDD60", flex: 1}}>
            <View style={styles.topbar}>
                <>
                    <View style={[styles.stripe, {top: -30, left: -20}]}></View>
                    <View style={[styles.stripe, {top: 10, left: -20}]}></View>
                    <View style={[styles.stripe, {top: 50, left: -20}]}></View>
                    <View style={[styles.stripe, {top: 90, left: -20}]}></View>
                </>
                <Image source={require('../../assets/icona-escultura.png')} style={styles.icona} />
                <TouchableOpacity style={styles.perfil}>
                    <Image source={require('../../assets/profile-base-icon.png')} style={styles.perfilimg} />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                {props.children}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    topbar: {
        width: '100%',
        height: 80,
        backgroundColor: "#2FDD60",
        display: 'flex',
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // overflow: 'hidden',
    },
    stripe: {
        position: 'absolute',
        width: 474,
        height: 19,
        backgroundColor: "rgba(107, 107, 107, 0.15)",
        shadowColor: "rgba(251, 251, 251, 0.07)",
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 4,
        shadowOpacity: 1,
        transform: [{rotateZ: '-13deg'}],
    },
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: "#F7F7F7",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: 'hidden'
    },
    icona: {
        height: 60,
        width: 35,
        resizeMode: 'contain',
    },
    perfil: {
        backgroundColor: 'white',
        width: 60,
        height: 60,
        borderRadius: 64,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    perfilimg: {
        width: 58,
        height: 58,
    }
});