import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { simpleFetch } from "../utils/utilFunctions";

export default function Reservar(props) {
  const [fechaIni, setFechaIni] = useState(props.dataIni);
  const [fechaFi, setFechaFi] = useState(props.dataFi);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [desplegableAbierto, setDesplegableAbierto] = useState(false);
  const [fechasVisibles, setFechasVisibles] = useState([]);
  const [reservat, setReservat] = useState(false);
  const [acabat, setAcabat] = useState(false);
  const esd = props.codi;
  const [fechas, setFechas] = useState([]);
  const [jo, setJo] = useState(props.id);
  console.log("reserva", props.id);
  useEffect(() => {
    /*  const fetchJo = async () => {
          let endPoint = `usuaris/perfils/jo/`;
          const data = await simpleFetch(endPoint, "GET", "")
          setJo(data.user);
      }*/

    const fetchReserves = async () => {
      let endPoint = `assistencies/?perfil=${jo}&esdeveniment=${esd}`;
      const data = await simpleFetch(endPoint, "GET", "");
      for (let i = 0; i < data.length; i++) {
        if (data[i].esdeveniment === esd) {
          setReservat(true);
        }
        setFechas(fechas);
      }
    };
    setFechas(fechas);

    //fetchJo();
    fetchReserves();
  }, []);

  const crearReserva = async () => {
    console.log("entra aqui1");
    let endPoint = "assistencies/";
    if (fechaIni == fechaFi) {
      const data = await simpleFetch(endPoint, "POST", {
        perfil: jo,
        esdeveniment: esd,
        data: fechaFi,
      });
    } else {
      const data = await simpleFetch(endPoint, "POST", {
        perfil: jo,
        esdeveniment: esd,
        data: fechaSeleccionada,
      });
    }
    setReservat(true);
  };

  const seleccionarFecha = (fecha) => {
    setFechaSeleccionada(fecha);
    setDesplegableAbierto(false);
  };

  const eliminarReserva = async () => {
    console.log("entra aqui 2");
    let endPoint = `assistencies/?perfil=${jo}&esdeveniment=${esd}`;
    const data = await simpleFetch(endPoint, "DELETE", "");
    setReservat(false);
  };

  if (acabat) {
    return (
      <View style={styles.container}>
        <View style={styles.acabat}>
          <Text style={[styles.buttonText, { color: "#c9000d" }]}>
            Esdeveniment acabat
          </Text>
        </View>
      </View>
    );
  }
  if (fechaIni == "Online") {
    return (
      <View style={styles.container}>
        <View style={styles.acabat}>
          <Text style={[styles.buttonText, { color: "#c9000d" }]}>
            Esdeveniment online
          </Text>
        </View>
      </View>
    );
  } else if (reservat) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          testID="eliminarButton"
          style={styles.buttonEliminar}
          onPress={() => {
            eliminarReserva;
            console.log("entraaqui0");
          }}
        >
          <View>
            <Text style={styles.buttonText}>Eliminar Reserva</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  } else if (!reservat & (fechaFi === fechaIni)) {
    console.log("data", fechaIni);
    return (
      <View style={styles.container}>
        <TouchableOpacity
          testID="reservarButton"
          style={styles.button}
          onPress={crearReserva}
        >
          <View>
            <Text style={styles.buttonText}>Reservar</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        {fechaFi !== fechaIni ? (
          <TouchableOpacity
            testID="seleccionarData"
            style={styles.button}
            onPress={() => setDesplegableAbierto(!desplegableAbierto)}
          >
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
                    <Text style={styles.fechaButtonText}>
                      {fecha.getDate()}-{fecha.getMonth() + 1}-
                      {fecha.getFullYear()}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        )}

        <TouchableOpacity
          style={[styles.button, !fechaSeleccionada && styles.disabledButton]}
          onPress={crearReserva}
          disabled={!fechaSeleccionada}
        >
          <View>
            <Text style={styles.buttonText}>Reservar</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    maxHeight: 200,
  },
  button: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    width: 130,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonEliminar: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  acabat: {
    backgroundColor: "transparent",
    color: "#c9000d",
    borderColor: "#c9000d",
    borderWidth: 3,
    padding: 10,
    borderRadius: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: "green",
  },
  fechaButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  llistat: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
