import { StyleSheet, View, TextInput, TouchableOpacity, Text} from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../components/Screen";
import Search from "react-native-bootstrap-icons/icons/search";
import NewXat from "../components/NewXatButton";
import Xat from "../components/XatComp";
import { simpleFetch } from "../utils/utilFunctions";
import { useTranslation } from "react-i18next";
//import FileSaver from 'file-saver';

export default function Chat(props) {
  const [xats, setXats] = useState([]);
  const [resultXats, setResultXats] = useState([]);
  const [idUser, setIdUser] = useState([]);
  const [update, setUpdate] = useState([]);
  const [searchText, setSearchText] = useState([]);
  const [texto, setTexto] = useState([]);

  const { t } = useTranslation();

  //Saber el teu usuari
  useEffect(() => {
    const getUserId = async () => {
      let endPoint = "usuaris/perfils/jo";
      await simpleFetch(endPoint, "GET", "").then((data) => setIdUser(data));
    };
    getUserId();
  }, []);

  //GET xats
  useEffect(() => {
    const fetchXats = async () => {
      let endPoint = "xats/";
      await simpleFetch(endPoint, "GET", "").then((data) => {
        setXats(data);
        setResultXats(data);
      });
      //console.log("fetchXats");
      //console.log(xats);
    };
    fetchXats();
  }, [update]);

  //Update pantalla
  function recarrega() {
    setUpdate((prevState) => !prevState);
  }

  function filterSearch() {
    let newXats;
    if (searchText != "") {
      newXats = xats.filter((xat) => xat.nom == searchText);
      console.log("xats: ", newXats);
    } else {
      newXats = xats;
    }
    setResultXats(newXats);
  }

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
            const r = await response.text();
            console.log(r);
            const blob = await response.blob();
            //console.log(blob); // Obtener los datos de la respuesta como un objeto Blob
            FileSaver.saveAs(blob, 'entrada.pdf');
            //const filePath = RNFS.DocumentDirectoryPath + '/archivo.pdf'; // Ruta donde se guardará el archivo
      
            // Guardar el archivo en el dispositivo
            //await writeFile(filePath, blob, 'utf8');
      
            //console.log('Archivo guardado correctamente:', filePath);
          } else {
            console.error('Error en la respuesta del servidor:', response.status);
          }
    } catch (error) {
      console.error(error);
    }
  }
    
  
  /*const convertToPDF = async (r) => {
      const page1 = PDFPage
      .create()
      .setMediaBox(200, 200)
      .drawText(r , {
        x: 5,
        y: 235,
        color: '#007386',
      });
      console.log(page1);

      //const docsDir = await PDFLib.getDocumentsDirectory();
      const pdfPath = `/home/tania/pes/sample.pdf`;
      PDFDocument
        .create(pdfPath)
        .addPages(page1)
        .write() // Returns a promise that resolves with the PDF's path
        .then(path => {
          console.log('PDF created at: ' + path);
          // Do stuff with your shiny new PDF!
        });

    }*/

    /*const convertToPDF = async (r) => {
      //console.log("r", r);
      const pdfDoc = await PDFDocument.create();
      console.log("pdfDoc", pdfDoc);
      const page = pdfDoc.addPage();
      console.log("page", page);
      const text = page.drawText(r, {
        x: 10,
        y: page.getHeight() - 50,
        size: 12,
      });
  
      // Guardar el archivo PDF en la ruta deseada
      const pdfBytes = await pdfDoc.save();

      const filePath = RNFS.DocumentDirectoryPath + '/archivo.pdf';

      try {
        await RNFS.writeFile(filePath, pdfBytes, 'base64');
        console.log('Archivo PDF guardado correctamente en:', filePath);
      } catch (error) {
        console.error('Error al guardar el archivo PDF:', error);
      }
    };**/


  return (
    <Screen navigation={props.navigation}>
      <View style={styles.barra}>
        <View style={styles.search}>
          <TextInput
            style={styles.input}
            value={searchText}
            onBlur={filterSearch}
            onChangeText={setSearchText}
            placeholder={t("search")}
          />
          <Search color={"black"} style={styles.icono}></Search>
        </View>

        <NewXat user={idUser} xats={xats} canvia={recarrega}></NewXat>
      </View>
      <View>
        {resultXats.map((xat, i) => {
          return (
            <View key={i}>
              <Xat
                user={idUser}
                nom={xat.nom}
                part={xat.participants}
                id={xat.id}
                miss={xat.ultim_missatge}
                canvia={recarrega}
              ></Xat>
            </View>
          );
        })}
      </View>
      <View> 
      <TouchableOpacity style={styles.editButton} onPress={() => { fetchEntrades()}}>
                <Text > {t('pdf')} </Text>
            </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  barra: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  search: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#000",
    height: 45,
    borderRadius: 13,
    margin: 12,
    marginVertical: 10,
    width: "75%",
    flex: 1,
  },
  input: {
    height: 45,
    margin: 12,
    //borderWidth: 1,
    padding: 10,
    borderRadius: 13,
    flex: 1,
  },
  icono: {
    marginRight: 20,
    fontSize: 50,
  },

  info_xat: {
    width: "100%",
    height: 85,
    overflow: "hidden",
    marginVertical: 10,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#DCDCDC",
  },
  foto: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginLeft: 10,
    marginVertical: 12,

    //borderColor:'green',
    //borderWidth: 4,
  },
  nom: {
    position: "absolute",
    right: 230,
    top: 28,
    alignSelf: "flex-start",
    fontSize: 20,
    fontStyle: "normal",
  },
});
