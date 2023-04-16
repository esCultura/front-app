import { Text, StyleSheet, View , TextInput,Image,TouchableOpacity} from "react-native";
import Screen from "../components/Screen";
import Search from 'react-native-bootstrap-icons/icons/search';
import Plus from 'react-native-bootstrap-icons/icons/plus';

export default function Chat(props) {
    
   
    return (
        <Screen >
            <View style={styles.barra}>
            <View style={styles.search}>
                <TextInput style={styles.input} placeholder={'Cerca...'}/>
                <Search  color={'black'}  style={styles.icono}></Search>
                
            </View>
           <TouchableOpacity style={styles.plus}>
            <Text style={styles.icono_plus}>+</Text>
           
           </TouchableOpacity>
           </View>
            <View style={styles.info_xat} >
                <Image 
                    style={styles.foto}
                    source={{
                        uri:'https://reactnative.dev/img/tiny_logo.png'
                    }}/>
                <Text style={styles.nom}>PATATA</Text>
            </View>
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
        height: 50,
        borderRadius: 13,
        margin: 12,
        marginVertical:20,
        width:'75%',
        flex:1
    },
    input:{
        height: 50,
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
    plus:{
        marginRight:20,
        width:50,
        height:50,
        borderRadius:13,
        backgroundColor:"#DCDCDC"
    },
    icono_plus:{
       fontSize:30,
       marginLeft:16.5,
       marginVertical:3.5,
       
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