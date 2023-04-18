import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet , TouchableOpacity} from "react-native";
import { ScrollView} from "react-native";

export default function Reservar (props){
    const [fechaIni, setFechaIni] = useState(props.dataIni);
    const [fechaFi, setFechaFi] = useState(props.dataFi);
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
    const [desplegableAbierto, setDesplegableAbierto] = useState(false); 
    const [fechasVisibles, setFechasVisibles] = useState([]); 
    const [reservat, setReservat] = useState(false);
    const [acabat, setAcabat] = useState(false);
    const user = 3;
    const esd = props.codi;
    const [fechas, setFechas] = useState([]);

      useEffect(() => {
        const fetchReserves = async () => {
            try {
              const response = await fetch( `http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/assistencies/?user=${user}&esdeveniment=${esd}`, {
                      headers: {
                    'Content-Type': 'application/json', 
                      }});
              if (!response.ok) {
                throw new Error('Error al obtener el likes2');
              }    
              const data = await response.json();
              for (let i = 0; i < data.length; i++) {
                  if (data[i].esdeveniment === esd) {
                    setReservat(true);
                  }
              }
          } catch (error) {
            console.error(error);
          }
        }

        const hoy = new Date();
        const fechas = [];
        let fechaActual = new Date(fechaIni);
        let fechaFinal = new Date(fechaFi);
        if (hoy > fechaFinal) {
          setAcabat(true);
        }
        else {
          if (fechaActual < hoy) {
            fechaActual= new Date();
          }
          if (fechaActual != fechaFinal) {
              while (fechaActual <= fechaFinal) {
                fechas.push(new Date(fechaActual)); 
                fechaActual.setDate(fechaActual.getDate() + 1);
              }
          
          }
        }
        setFechas(fechas);
        console.log(fechas);

      fetchReserves();
      }, []);
    
    const crearReserva = async () => {          
        try {       
          const response = await fetch( 'http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/assistencies/', {
          method: 'POST',
          mode:'no-cors', 
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify({ 
            perfil: user,
            esdeveniment: esd,
            data: fechaSeleccionada,
          }),
        });
      if (!response.ok) {
        throw new Error('Error al enviar solicitud1');
      }  

    setReservat(true);
    } catch (error) {
      console.error(error);
    }
}
  

  const seleccionarFecha = (fecha) => {
    setFechaSeleccionada(fecha);
    setDesplegableAbierto(false);
  };


  const eliminarReserva = async () => {    
      try {
      const response = await fetch( `http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/assistencies/?perfil=${user}&esdeveniment=${esd}`,  {
      method: 'DELETE',
      mode:'no-cors', 
      headers: {
        'Content-Type': 'application/json', 
      },
  
    });
    if (!response.ok) {
      throw new Error('Error al enviar solicitud');
    }  
  setReservat(false);
  } catch (error) {
    console.error(error);
  }
}

if (acabat){
  return(<View style={styles.container}>
        <View style={styles.acabat}>
            <Text style = {styles.buttonText} > Esdeveniment acabat </Text>
        </View>
  </View>)
}

else if(reservat){
    return(<View style={styles.container}>
        <TouchableOpacity style = {styles.buttonEliminar} onPress={eliminarReserva} >
            <View>
                <Text style = {styles.buttonText} > Eliminar Reserva</Text>
            </View>
        </TouchableOpacity>
    </View>)
}
else{
    
return(  
    <View style={styles.container}>
      {fechaFi !== fechaIni ? (

      <TouchableOpacity style={styles.button} onPress={() => setDesplegableAbierto(!desplegableAbierto)}>
      <View>
        <Text style={styles.buttonText}>Seleccionar data</Text>
      </View>
      </TouchableOpacity>
      ) : null}

      {desplegableAbierto && (
        <View style={styles.desplegable}>
        <ScrollView contentContainerStyle={styles.llistat}>
        <View style={styles.llistat}>
          
        {fechas.map((fecha, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.fechaButton,
              fechaSeleccionada === fecha && styles.fechaSeleccionada,
            ]}
            onPress={() => seleccionarFecha(fecha)}
          >
            <Text style={styles.fechaButtonText}>{fecha.getDate()}-{fecha.getMonth()+1 }-{fecha.getFullYear()}</Text>
          </TouchableOpacity>
        ))}
        </View>
        </ScrollView>
       </View>
      )}

    <TouchableOpacity style = {[styles.button, !fechaSeleccionada && styles.disabledButton]} onPress={crearReserva} disabled={!fechaSeleccionada}>
        <View>
            <Text style = {styles.buttonText} > Reservar</Text>
        </View>
    </TouchableOpacity>
   
</View> 
);
}


}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#fff',
      alignItems: "center",
    justifyContent: "center",
    maxHeight: 200,
    },
    button: {
        backgroundColor: 'green',
    padding:10,
    borderRadius: 5,
    shadowOffset: { width: 2 , height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    width: 130,
    justifyContent: 'center', 
    alignItems: 'center',
    },
    buttonEliminar: {
      backgroundColor: 'green',
  padding:10,
  borderRadius: 5,
  shadowOffset: { width: 2 , height: 2 },
  shadowOpacity: 0.5,
  shadowRadius: 5,
  width: 100,
  justifyContent: 'center', 
alignItems: 'center',
  },
    acabat: {
      backgroundColor: 'red',
  padding:10,
  borderRadius: 5,
  shadowOffset: { width: 2 , height: 2 },
  shadowOpacity: 0.5,
  shadowRadius: 5,
  width: 150,
  justifyContent: 'center', 
  alignItems: 'center',
  },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
      },
      disabledButton: {
        opacity: 0.5,
      },
      desplegable: {
        backgroundColor: "white",
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        //flexDirection: "row",
        flexWrap: "wrap",
      },
      fechaButton: {
        backgroundColor: "#f0f0f0",
        padding: 10,
        borderRadius: 5,
        margin: 5,
      },
      fechaSeleccionada: {
        backgroundColor: "blue",
      },
      fechaButtonText: {
        color: "black",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
      },
      llistat: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
  });