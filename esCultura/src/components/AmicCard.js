import { Image, StyleSheet, Text, View } from "react-native";
import Esdeveniment from "./Esdeveniment";
import { simpleFetch } from "../utils/utilFunctions";
import { useEffect } from "react";

export default function AmicCard(props) {
  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          style={styles.profileImage}
          source={{
            uri: props.info.p_imatge
              ? props.info.p_imatge
              : "https://static.wikia.nocookie.net/amogus/images/4/4d/OBUNGUS.jpg/revision/latest?cb=20220210101127",
          }}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {props.info.p_nom}
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          padding: 15,
        }}
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
      </View>
    </View>
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
    borderColor: "#3347FF",
    borderWidth: 5,
    borderRadius: 40,
  },
});
