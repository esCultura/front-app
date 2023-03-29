import React, {useState, useEffect} from 'react';
import { StyleSheet, View, TextInput, Text, Modal, Pressable, Button} from 'react-native';
import { CheckBox, Slider} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import FilterLeft from 'react-native-bootstrap-icons/icons/filter-left';
import CalendarEvent from 'react-native-bootstrap-icons/icons/calendar-event';
import ArrowDown from 'react-native-bootstrap-icons/icons/arrow-down';

export default function SearchFilter() {

    const [modalVisible, setModalVisible] = useState(false);
    const [slier1, setSlier1] = useState(0.5);
    const [slier2, setSlier2] = useState(0.5);

    const [dateIni, setDateIni] = useState(new Date());
    const [dateFi, setDateFi] = useState(new Date());
    const [showDatePickerIni, setShowDatePickerIni] = useState(false);
    const [showDatePickerFi, setShowDatePickerFi] = useState(false);

    const [checkTeatre, setCheckTeatre] = useState(false);
    const [checkMusical, setCheckMusical] = useState(false);
    const [checkOpera, setCheckOpera] = useState(false);
    const [checkAltres, setCheckAltres] = useState(false);

    const [textSearch, setTextSearch] = useState('');


    /**
     * Catche the value of the TextInput
     * @param {*} value 
     */
    function handleTextChange(value) {
        setTextSearch(value);
        console.log("Fer fetch de: ", value);
    }

    /**
     * Guarda la info obtinguda del filtra,
     * Per enviar o per fer el fetch SHA DE QUESTIONAR
     */
    function saveFilter() {
        setModalVisible(false);
        console.log("filter saved");
        console.log("CheckBoxResult: ", tematiquesArry());
        console.log("Date inicial: ", dateIni.toUTCString());
        console.log("Date final: ", dateFi.toUTCString());
        console.log("Pressupost: ", slier1);
        console.log("Distancia: ", slier2);
    }

    /**
     * Crea i retorna un array de strings de les tematiques seleccionades
     */
    function tematiquesArry() {
        let arr = [];
        if (checkTeatre) {
            arr.push('Teatre');
        }
        if (checkMusical) {
            arr.push('Musical');
        }
        if (checkOpera) {
            arr.push('Opera');
        }
        if (checkAltres) {
            arr.push('Altres');
        }

        return arr;
    }

    const handleDateChangeIni = (event, selectedDate) => {
        const currentDate = selectedDate || dateIni;
        setShowDatePickerIni(false);
        setDateIni(currentDate);
    };

    const handleDateChangeFi = (event, selectedDate) => {
        const currentDate = selectedDate || dateFi;
        setShowDatePickerFi(false);
        setDateFi(currentDate);
    };

    return (
        
        <View style={styles.contetnView}>
            <Pressable 
                title="filter" 
                onPress={() => setModalVisible(true)}
                style={styles.buttonIconFilter} 
            >
                <FilterLeft name="search" color={'black'} size={30} />
            </Pressable>

            <Modal visible={modalVisible} animationType="slide">
                <View>
                    <Pressable style={styles.closeModal} onPress={() => setModalVisible(false)}>
                        <ArrowDown name="closeModal" color={'black'} size={30} />
                    </Pressable>
                    <View style={styles.contentModal}>
                        <Text style={styles.textModal}>Data inici i final</Text>
                        <View style={styles.contentDataPicker}>
                            <Pressable style={styles.datePicker} onPress={() => setShowDatePickerIni(true)} >
                                <Text> {dateIni.toLocaleDateString()} </Text>
                                <CalendarEvent name="calendarDateIni" color={'black'} size={30} />    
                            </Pressable>
                            {showDatePickerIni && (
                                <DateTimePicker
                                    testID="dateTimePickerIni"
                                    value={dateIni}
                                    mode="date"
                                    is24Hour={true}
                                    display="default"
                                    onChange={handleDateChangeIni}
                                />
                            )}

                            <Pressable style={styles.datePicker} onPress={() => setShowDatePickerFi(true)} >
                                <Text> {dateFi.toLocaleDateString()} </Text>
                                <CalendarEvent name="calendarDateFi" color={'black'} size={30} />    
                            </Pressable>
                            {showDatePickerFi && (
                                <DateTimePicker
                                    testID="dateTimePickerFi"
                                    value={dateFi}
                                    mode="date"
                                    is24Hour={true}
                                    display="default"
                                    onChange={handleDateChangeFi}
                                />
                            )}
                        </View>

                        <Text style={styles.textModal}>Categoria</Text>
                        <CheckBox
                            title="Teatre"
                            checkedColor='green'
                            checked={checkTeatre}
                            onPress={() => setCheckTeatre(!checkTeatre)}
                        />
                        <CheckBox
                            title="Musical"
                            checkedColor='green'
                            checked={checkMusical}
                            onPress={() => setCheckMusical(!checkMusical)}
                        />
                        <CheckBox
                            title="Opera"
                            checkedColor='green'
                            checked={checkOpera}
                            onPress={() => setCheckOpera(!checkOpera)}
                        />
                        <CheckBox
                            title="Altres"
                            checkedColor='green'
                            checked={checkAltres}
                            onPress={() => setCheckAltres(!checkAltres)}
                        />
                        <Text style={styles.textModal}>Altres</Text>
                        <CheckBox
                            title="Teatre"
                        />
                        
                        <Text style={styles.textModal}>Pressupost</Text>
                        <Slider 
                            value={slier1}
                            onValueChange={setSlier1}
                            minimumValue={0}
                            maximumValue={1}
                            step={0.1}
                        />
                        <Text style={styles.textModal}>Distancia</Text>
                        <Slider 
                            value={slier2}
                            onValueChange={setSlier2}
                            minimumValue={0}
                            maximumValue={1}
                            step={0.1}
                        />
                        
                    </View>
                    <View style={styles.btnFilter}>
                        <Button
                            onPress={saveFilter}
                            title="Filter"
                            color="#2FDD60"
                        />
                    </View>
                    
                </View>
            </Modal>

            <TextInput 
                value={textSearch}
                onChangeText={handleTextChange}
                placeholder={'Search'}
                placeholderTextColor={'#666'}
            >
            </TextInput>
        </View>
    );
  }

  const styles = StyleSheet.create({
    contetnView: {
        position: 'absolute', 
        top: 10,
        left: 8, 
        width: '90%', 
        borderRadius: 10,
        margin: 10,
        color: '#000',
        borderColor: '#666',
        backgroundColor: '#FFF',
        borderWidth: 1,
        height: 45,
        paddingHorizontal: 10,
        fontSize: 18,
        flexDirection: 'row',
        justifyContent: 'space-between', 
    },
    contentDataPicker: {
        marginLeft: '5%',
        marginRight: '10%',
        marginBottom: '5%',
        marginTop: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between', 
    },
    buttonIconFilter: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    btnFilter: {
        width: '50%',
        marginLeft: '25%',
        marginRight: '25%',
        marginTop: '20%',
    },
    closeModal: {
        margin: 15,
    },
    textModal: {
        fontWeight: 'bold',
    },
    datePicker: {
        width: '35%',
        flexDirection: 'row',
        justifyContent: 'space-between', 
    },
    contentModal:{
        margin: 10,
    }
  });