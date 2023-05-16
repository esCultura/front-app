import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Featured(props) {
  const [destacats, setDestacats] = useState({ imatges_list: "" });

  const roll = () => {
    console.log("roll");
    setDestacats([
      destacats[destacats.length - 1],
      ...destacats.slice(1, destacats.length),
    ]);
  };

  useEffect(() => {
    fetch(
      "http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/esdeveniments/?ordering=punts&limit=1"
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data[0].imatges_list);
        // setDestacat(data[0]);
        setDestacats([
          {
            imatges_list: [
              "https://blog.ticketmaster.es/wp-content/uploads/2017/08/billy-elliot-barcelona.jpg",
            ],
          },
          {
            imatges_list: [
              "https://img2.rtve.es/i/?w=1600&i=1648136252038.jpg",
            ],
          },
          {
            imatges_list: [
              "https://dynamicmedia.livenationinternational.com/Media/g/p/o/eb285dd6-45d0-4f98-9ab5-aa7cc8075a98.jpg?auto=webp&width=1507.2",
            ],
          },
        ]);
      })
      .catch((err) => console.error(err));
  }, []);

  if (destacats.length > 0) {
    setTimeout(() => roll(), 5000);
  }

  return (
    <View style={styles.container}>
      {destacats.length > 0 && (
        <Image
          style={styles.image}
          source={{
            uri: destacats[0].imatges_list[0], //destacat.imatges_list[0].replace("http", "https"),
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 120,
    borderRadius: 15,
    borderStyle: "dashed",
    borderWidth: 5,
    borderColor: "#2FDD60",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "6%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
});
