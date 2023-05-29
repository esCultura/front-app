import { useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import ArrowDownUp from "react-native-bootstrap-icons/icons/arrow-down-up";
import ArrowDown from "react-native-bootstrap-icons/icons/arrow-down";
import ArrowUp from "react-native-bootstrap-icons/icons/arrow-up";

export default function Ordenar({ onChange }, props) {
  const [ord, setOrd] = useState(0); // 0: No ord, 1: ord asc, 2: ord desc
  const oAssistents = useRef(false);
  const oLikes = useRef(false);
  const oPuntuacio = useRef(false);

  const cycleOrd = (param) => {
    if (param.current) {
      if (ord == 1) newOrd = 2;
      if (ord == 2) newOrd = 0;
    } else {
      newOrd = 1;
    }
    oAssistents.current = false;
    oLikes.current = false;
    oPuntuacio.current = false;
    if (newOrd != 0) param.current = true;
    if (onChange) onChange(generate());
    else console.error("No 'onChange' function especified.");
    setOrd(newOrd);
  };

  const generate = () => {
    if (ord + 1 == 3) return "";
    let g = `ordering=${ord + 1 == 2 ? "-" : ""}`;
    if (oAssistents.current) g += `assistents`;
    if (oLikes.current) g += `likes`;
    if (oPuntuacio.current) g += `puntuacio`;

    return g;
  };

  return (
    <View style={styles.contentView}>
      <TouchableOpacity
        onPress={() => cycleOrd(oAssistents)}
        style={styles.btn}
      >
        <Text
          style={oAssistents.current ? { color: "green" } : { color: "black" }}
        >
          Assistents
        </Text>
        {oAssistents.current ? (
          ord == 1 ? (
            <ArrowDown name="descOrd" color={"green"} size={10} />
          ) : (
            <ArrowUp name="ascOrd" color={"green"} size={10} />
          )
        ) : (
          <ArrowDownUp name="noOrd" color={"black"} size={10} />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => cycleOrd(oLikes)} style={styles.btn}>
        <Text style={oLikes.current ? { color: "green" } : { color: "black" }}>
          Likes
        </Text>
        {oLikes.current ? (
          ord == 1 ? (
            <ArrowDown name="descOrd" color={"green"} size={10} />
          ) : (
            <ArrowUp name="ascOrd" color={"green"} size={10} />
          )
        ) : (
          <ArrowDownUp name="noOrd" color={"black"} size={10} />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => cycleOrd(oPuntuacio)} style={styles.btn}>
        <Text
          style={oPuntuacio.current ? { color: "green" } : { color: "black" }}
        >
          Puntuació
        </Text>
        {oPuntuacio.current ? (
          ord == 1 ? (
            <ArrowDown name="descOrd" color={"green"} size={10} />
          ) : (
            <ArrowUp name="ascOrd" color={"green"} size={10} />
          )
        ) : (
          <ArrowDownUp name="noOrd" color={"black"} size={10} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contentView: {
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 4,
    paddingVertical: 3,
    color: "#000",
    borderColor: "#666",
    backgroundColor: "#FFF",
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 18,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btn: {
    display: "flex",
    flexDirection: "row",
    gap: 3,
  },
});
