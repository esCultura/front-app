import { useEffect, useRef, useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import Esdeveniment from "../components/Esdeveniment";
import SearchFilter from "../components/SearchFilter";
import Screen from "../components/Screen";

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};

export default function Search(props) {
    return (
        <Screen>
            <ScrollView 
            onScroll={({nativeEvent}) => {
                if (isCloseToBottom(nativeEvent)) {
                    loadMore();
                }}
            }
            scrollEventThrottle={400}
            contentContainerStyle={styles.llistat}>
                <SearchFilter onVariableChange={onQueryChange} isList={false} />
                {
                    esdeveniments.map((esd) => {
                        return (<Esdeveniment key={esd.codi} title={esd.nom}
                            source={"http://agenda.cultura.gencat.cat"+esd.imatges_list[0]} brief="---"
                            date={esd.dataIni} location={esd.espai} type={esd.tematiques} />)})
                }
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    llistat: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
})