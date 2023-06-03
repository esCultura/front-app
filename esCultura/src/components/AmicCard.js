import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Esdeveniment from "./Esdeveniment";
import { simpleFetch } from "../utils/utilFunctions";
import { useEffect, useState } from "react";
import InfoCompleta from "./InfoCompleta";
import XCircleFill from "react-native-bootstrap-icons/icons/x-circle-fill";
import PerfilSimple from "./PerfilSimple";

export default function AmicCard(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPerfil, setModalPerfil] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.userContainer}
          onPress={() => {
            setModalPerfil(true);
          }}
        >
          <Image
            style={styles.profileImage}
            source={
              props.info.p_imatge
                ? { uri: props.info.p_imatge }
                : require("../../assets/profile-base-icon.png")
            }
          />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {props.info.p_nom}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            display: "flex",
            justifyContent: "center",
            padding: 15,
          }}
          onPress={() => setModalVisible(true)}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              maxWidth: 150,
              textAlign: "left",
            }}
          >
            {props.info.e_titol}
          </Text>
          {Number.parseInt(props.info.e_data.slice(0, 4)) < 2050 ? (
            <>
              <Text style={{ fontWeight: "300", textAlign: "left" }}>
                🗓️ {props.info.e_data.slice(0, 10)}
              </Text>
              <Text style={{ fontWeight: "300", textAlign: "left" }}>
                📌 {props.info.e_loc}
              </Text>
            </>
          ) : (
            <Text style={{ fontWeight: "300", textAlign: "left" }}>
              🌐 Online
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <InfoCompleta
        visible={modalVisible}
        back={() => {
          setModalVisible(false);
        }}
        perfil={props.info.e_perfil}
        type={props.info.e_type}
        title={props.info.e_titol}
        preu={props.info.e_preu}
        complet={props.info.e_desc}
        dateIni={props.info.e_data}
        dateFi={props.info.e_dataFi}
        location={props.info.e_loc}
        source={props.info.e_source}
        codi={props.info.e_codi}
      />
      <Modal visible={modalPerfil}>
        <TouchableOpacity
          onPress={() => {
            setModalPerfil(false);
          }}
          style={styles.backperfil}
        >
          <XCircleFill color="red" width={145} height={145} />
        </TouchableOpacity>
        <PerfilSimple id={props.info.p_user}> </PerfilSimple>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 13,
    backgroundColor: "#E9E9E9",
    paddingVertical: 10,
    height: 135,
  },
  userContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "35%",
    shadowColor: "rgba(255, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    borderRightColor: "#44941E",
    borderRightWidth: 1,
  },
  profileImage: {
    width: 75,
    height: 75,
    borderColor: "#44941E",
    borderWidth: 2,
    borderRadius: 40,
  },
});
