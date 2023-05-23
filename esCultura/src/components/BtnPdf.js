import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {shareAsync} from 'expo-sharing';
import * as FileSystem from 'expo-file-system';


export default function BtnPdf({ navigation, children }) {
    const { t } = useTranslation();
      
    const saveBlob = async (blob, filename) => {
        try {
          const reader = new FileReader();
          reader.onloadend = async () => {
            const base64 = reader.result.split(',')[1];
            const fileUri = FileSystem.documentDirectory + filename;
            await FileSystem.writeAsStringAsync(fileUri, base64, { encoding: FileSystem.EncodingType.Base64 });
            await shareAsync(fileUri);
            console.log('PDF file saved successfully!');
          };
          reader.readAsDataURL(blob);
          console.log('Blob saved successfully!');
        } catch (error) {
          console.log('Error saving blob:', error);
        }
    };

    const fetchEntrades = async () => {
        try {
            const response = await fetch('https://us-central1-apilicicat.cloudfunctions.net/generatePDF', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  qr: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZoAAAGaAQAAAAAefbjOAAADDUlEQVR4nO2cS27bShBFT6UJeEgBbwFeCrUzI0vKDsilaAEGmkMDFO4bdHWTjkeJDEqhigODHx2oGyrU51bRJv74mH78OQMBBRRQQAEFFNAxIfOjw87lssPsBHaeO2CuHzjfZXkB7Q8NkqQMTCfQCGjkahrL8yRJ0mdov+UFtD80NwfA1c+GnGT2+mGA+427LS+gu0FSTmLIHkk0zh5Jvv2bAvo3oJI4TK8fBv2CnUlfFYt/bE8B/Q3US2v2wHDpAJLKJYCk5X7LC2hvaDIzLy6KU0hiuHTYW04CrqXUuNfyAtoPKtniGhgES40am3ufI8eD7ymgWyBKVTmsIaFfSjG6eUqvkm2WKnV88D0FdAvEqjNo7CU3hn7xxMHtwM+KKhEWcWSo+ohcswf6hWIRYyszytNqL2ERh4aaj/DfXGP5s6Cxr55hxIWK8BHHh2ogaE5hyOBRo2pVGklyAwmLODrUcsdlaxvKqXoLoDiP8BHPAVU7IHmnq1UdUqb5jeQpRFjE00C9y9b6ecKbXGeS7C1fzZ/O0Q1/Imi4vIjJOmDta7Rjsg6m11CxnwcyOwH0kr1J0rgxi+TJREk577K8gHZXsaF/N4aLocnSwqBrJ+YOwYeVy2n1Gg++p4BugZqKrSpOfc4xi1KZkzzHjMzy6FCrOVsjI9MiRNKqYrtMFRZxdGjT6fK+Rv5Nkqodjo1k8eB7CugWqM1OJhl0i2DpoM/A/CImA6YzMPzqsGHcd3kB7Q61ThfeyGh5hKtW+tIcDx9xaGg7AVEShxo/vK/RBic8foRFHBxCn49yc2MW+m1mIizi4FDJI6rUkBaG0bUHGy4G9O8dzP8tsE5lP/ieAvoGqLSxMuWdLnvL4PN17Sz6Gs8B1VpjPsHwC2B+kQGI+eQTt0Wu7HP1JQ++p4Bugbqvt67G9CqMfukoZWn/3om5ydgPvqeAvhPyOZnZX/ArrVBI8mbYnZcX0G5Qm5casr/EtTY7i21E7/M5oM10PrRelitU67t9dS43qs/DQxb/mSyggAIKKKCAAvpL6H8z7GIAtV7FHAAAAABJRU5ErkJggg==",
                  foto: "https://www.atrapalo.com/houdinis/wp-content/uploads/2021/06/billyelliot-cartel.jpg",
                  esdeveniment: "Cicle de conferències",
                  data: "23 / 03 / 2023",
                  hora: "00:00h",
                  nom: "Pauuuuu!!!"
                }),
            });
            if (response.ok) {
                //const r = await response.text();
                //console.log("text: ",r);
                const pdfBlob = await response.blob();
                console.log("blob: ", pdfBlob);
                await saveBlob(pdfBlob, "entrada.pdf");
                
            } else {
              console.error('Error en la respuesta del servidor:', response.status);
            }
        } catch (error) {
          console.error(error);
        }
    }

    /*
    const downloadPDF = async () => {
        const filename = "entrada.pdf";
        const host = 'https://us-central1-apilicicat.cloudfunctions.net/generatePDF';
        const result = await FileSystem.downloadAsync(
            host, 
            FileSystem.documentDirectory + filename,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    qr: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZoAAAGaAQAAAAAefbjOAAADDUlEQVR4nO2cS27bShBFT6UJeEgBbwFeCrUzI0vKDsilaAEGmkMDFO4bdHWTjkeJDEqhigODHx2oGyrU51bRJv74mH78OQMBBRRQQAEFFNAxIfOjw87lssPsBHaeO2CuHzjfZXkB7Q8NkqQMTCfQCGjkahrL8yRJ0mdov+UFtD80NwfA1c+GnGT2+mGA+427LS+gu0FSTmLIHkk0zh5Jvv2bAvo3oJI4TK8fBv2CnUlfFYt/bE8B/Q3US2v2wHDpAJLKJYCk5X7LC2hvaDIzLy6KU0hiuHTYW04CrqXUuNfyAtoPKtniGhgES40am3ufI8eD7ymgWyBKVTmsIaFfSjG6eUqvkm2WKnV88D0FdAvEqjNo7CU3hn7xxMHtwM+KKhEWcWSo+ohcswf6hWIRYyszytNqL2ERh4aaj/DfXGP5s6Cxr55hxIWK8BHHh2ogaE5hyOBRo2pVGklyAwmLODrUcsdlaxvKqXoLoDiP8BHPAVU7IHmnq1UdUqb5jeQpRFjE00C9y9b6ecKbXGeS7C1fzZ/O0Q1/Imi4vIjJOmDta7Rjsg6m11CxnwcyOwH0kr1J0rgxi+TJREk577K8gHZXsaF/N4aLocnSwqBrJ+YOwYeVy2n1Gg++p4BugZqKrSpOfc4xi1KZkzzHjMzy6FCrOVsjI9MiRNKqYrtMFRZxdGjT6fK+Rv5Nkqodjo1k8eB7CugWqM1OJhl0i2DpoM/A/CImA6YzMPzqsGHcd3kB7Q61ThfeyGh5hKtW+tIcDx9xaGg7AVEShxo/vK/RBic8foRFHBxCn49yc2MW+m1mIizi4FDJI6rUkBaG0bUHGy4G9O8dzP8tsE5lP/ieAvoGqLSxMuWdLnvL4PN17Sz6Gs8B1VpjPsHwC2B+kQGI+eQTt0Wu7HP1JQ++p4Bugbqvt67G9CqMfukoZWn/3om5ydgPvqeAvhPyOZnZX/ArrVBI8mbYnZcX0G5Qm5casr/EtTY7i21E7/M5oM10PrRelitU67t9dS43qs/DQxb/mSyggAIKKKCAAvpL6H8z7GIAtV7FHAAAAABJRU5ErkJggg==",
                    foto: "https://www.atrapalo.com/houdinis/wp-content/uploads/2021/06/billyelliot-cartel.jpg",
                    esdeveniment: "Cicle de conferències",
                    data: "23 / 03 / 2023",
                    hora: "00:00h",
                    nom: "Pauuuuu!!!"
                }),
            }
        );
        console.log("result: ", result);
        save(result.uri, filename, result.headers["Content-Type"]);
    }
    const save = async (uri, filename, mimetype) => {
        console.log("Plataform: ", Platform.OS);
        if (Platform.OS === "android") {
            const base64 = await FileSystem.readAsStringAsync(uri, {encoding: FileSystem.EncodingType.Base64});
            const fileUri = FileSystem.cacheDirectory + 'entrada.pdf';
            await shareAsync(fileUri);
            console.log("file saved to Downloads folders successfully!");
            //const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
            
           if (permissions.granted) {
                console.log("Permissions: granted");    
                await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype)
                    .then(async () => {
                        await FileSystem.writeAsStringAsync(fileUri, base64, {encoding: FileSystem.EncodingType.Base64}); 
                    })
                    .catch(e => console.log("error: ", e));
                    
            }
            else {
                shareAsync(uri);
            }
        }
        else {
            shareAsync(uri);
        }
    };
    */


    return (
        <View>
            <TouchableOpacity style={styles.editButton} onPress={() => { fetchEntrades()}}>
                <Text > {t('Descarrega pdf')} </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    editButton: {
        backgroundColor: 'aqua',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginVertical: 10,
        padding: 20,
    }
});