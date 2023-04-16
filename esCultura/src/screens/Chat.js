import { Text, StyleSheet, View , TextInput,Image,TouchableOpacity} from "react-native";
import Screen from "../components/Screen";
import Search from 'react-native-bootstrap-icons/icons/search';
import Plus from 'react-native-bootstrap-icons/icons/plus';
import NewXat from "../components/NewXatButton";
import Xat from "../components/XatComp";

export default function Chat(props) {
    
   
    return (
        <Screen >
            <View style={styles.barra}>
            <View style={styles.search}>
                <TextInput style={styles.input} placeholder={'Cerca...'}/>
                <Search  color={'black'}  style={styles.icono}></Search>
                
            </View>
           <NewXat></NewXat>
           </View>
           <Xat></Xat>
            <Text>CHAT</Text>
        </Screen>
    );
}


const styles = StyleSheet.create({
   
    barra:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    search:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#000',
        height: 45,
        borderRadius: 13,
        margin: 12,
        marginVertical:10,
        width:'75%',
        flex:1
    },
    input:{
        height: 45,
        margin: 12,
        //borderWidth: 1,
        padding: 10,
        borderRadius:13,
        flex:1,
    },
    icono:{
        marginRight:20,
        fontSize:50
        
    },

    info_xat: {
        width: '100%',
        height: 85,
        overflow: 'hidden',
        marginVertical: 10,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor:'#DCDCDC'
    },
    foto: {
        width:60,
        height:60,
        borderRadius:50,
        marginLeft:10,
        marginVertical:12,
        
        //borderColor:'green',
        //borderWidth: 4,
    },
    nom:{
        position: 'absolute',
        right: 230,
        top: 28,
        alignSelf: 'flex-start',
        fontSize: 20,
        fontStyle: "normal",
    }
})