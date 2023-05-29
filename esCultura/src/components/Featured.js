import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const imagesList = [
  "https://blog.ticketmaster.es/wp-content/uploads/2017/08/billy-elliot-barcelona.jpg",
  "https://los40.com/los40/imagenes/2023/05/23/los40classic/1684832630_115798_1684834048_gigante_normal.jpg",
  "https://dynamicmedia.livenationinternational.com/Media/g/p/o/eb285dd6-45d0-4f98-9ab5-aa7cc8075a98.jpg?auto=webp&width=1507.2",
  "https://llengua.gencat.cat/web/.content/actualitat/2019/imatges/2019.04.10_Planeta-dels-contes.jpg",
];

const rollTime = 5000;

export default function Featured(props) {
  const [destacats, setDestacats] = useState([]);
  const [curr, setCurr] = useState(0);

  const roll = () => {
    setCurr((curr + 1) % imagesList.length);
  };

  useEffect(() => {
    // fetch(
    //   "http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/esdeveniments/?ordering=punts&limit=1"
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     // console.log(data[0].imatges_list);
    //     // setDestacat(data[0]);
    //     // setTimeout(() => roll(), 5000);
    //   })
    //   .catch((err) => console.error(err));
    let mediaArray = imagesList.map((img) => {
      Image.prefetch(img);
      return <Image style={styles.image} source={{ uri: img }} />;
    });
    setDestacats(mediaArray);
  }, []);

  if (destacats.length > 0) {
    setTimeout(() => roll(), rollTime);
  }

  return <View style={styles.container}>{destacats[curr]}</View>;
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
    borderRadius: 13,
  },
});
