import React, {useState, useEffect} from 'react';
import { StyleSheet, View, TextInput, Text, Modal, Pressable, Button} from 'react-native';
import { CheckBox, Slider} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import FilterLeft from 'react-native-bootstrap-icons/icons/filter-left';
import ArrowDown from 'react-native-bootstrap-icons/icons/arrow-down';

export default function SearchFilter() {

    const [modalVisible, setModalVisible] = useState(false);
    const [slier1, setSlier1] = useState(0.5);
    const [slier2, setSlier2] = useState(0.5);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);


    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
        console.log(date.toUTCString);
      };

    //on change text debounce function
    //filter and call info

    return (
        
        <View style={styles.contetnView}>
            <Pressable 
                title="fil" 
                onPress={() => setModalVisible(true)}
                style={styles.buttonFilter} 
            >
                <FilterLeft name="search" color={'black'} size={30} />
            </Pressable>

            <Modal visible={modalVisible} animationType="slide">
                <View>
                    <Pressable style={styles.closeModal} onPress={() => setModalVisible(false)}>
                        <ArrowDown name="closeModal" color={'black'} size={30} />
                    </Pressable>
                    <View style={styles.contentModal}>
                        <Text style={styles.textModal}>Data ini i fi</Text>
                        <Pressable onPress={() => setShowDatePicker(true)} >
                            <Text>28/03/2023</Text>    
                        </Pressable>
                        {showDatePicker && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode="date"
                                is24Hour={true}
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}
                        <Text style={styles.textModal}>Categoria</Text>
                        <CheckBox
                            title="Teatre"
                        />
                        <CheckBox
                            title="Musical"
                            checked={true}
                        />
                        <CheckBox
                            title="Opera"
                            checked={true}
                        />
                        <CheckBox
                            title="Altres"
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
                </View>
            </Modal>

            <TextInput 
                style={{}} 
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
    buttonFilter: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    closeModal: {
        margin: 15,
    },
    textModal: {
        fontWeight: 'bold',
    },
    contentModal:{
        margin: 10,
    }
  });