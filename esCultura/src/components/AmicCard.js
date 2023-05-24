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
            uri: "https://i.kym-cdn.com/entries/icons/mobile/000/027/879/yobammarere.jpg",
          }}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Yobama</Text>
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
          Paolo Fresu & Omar Sosa
        </Text>
        {Number.parseInt(props.info.data.slice(0, 4)) < 2050 ? (
          <>
            <Text style={{ fontWeight: "300", textAlign: "left" }}>
              🗓️ {props.info.data.slice(0, 10)}
            </Text>
            <Text style={{ fontWeight: "300", textAlign: "left" }}>
              📌 Nova Jazz Cava, Terrassa
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
