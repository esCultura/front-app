import React from 'react';
import MarkersMap from '../src/components/MarkersComp';
import {render, cleanup, fireEvent} from 'react-native-testing-library';

afterEach(cleanup);

describe('<MarkersMap />', () => {

    //representa que es lo que retorna el fetch
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(
            [
                {
                  "codi": 20191011001,
                  "enllacos_list": [
                    "https://www.livenation.es/artist-elton-john-5",
                    "https://agenda.cultura.gencat.cat/content/agenda/ca/results.html?c=eyJrZXl3b3JkcyI6IiIsImRhdGFPcHRpb24iOiIiLCJkYXRhRGVzZGUiOiIiLCJkYXRhRmluc2EiOiIiLCJlc3BhaSI6IiIsInBvYmxhY2lvIjoiQmFyY2Vsb25hIiwiYW1iaXRzIjpbXSwiY2F0ZWdvcmllcyI6WyJhZ2VuZGE6Y2F0ZWdvcmllcy9jb25jZXJ0cyJdfQ__&page=0",
                    "https://agenda.cultura.gencat.cat"
                  ],
                  "imatges_list": [
                    "http://agenda.cultura.gencat.cat/content/dam/agenda/articles/2019/10/11/001/20201002-1r-elton-john.jpg",
                    "http://agenda.cultura.gencat.cat/content/dam/agenda/articles/2019/10/11/001/20201002-2-elton-john.JPG",
                    "http://agenda.cultura.gencat.cat/content/dam/agenda/articles/2019/10/11/001/20201002-3-mirror-eltton-john.jpg",
                    "http://agenda.cultura.gencat.cat/content/dam/agenda/articles/2019/10/11/001/20201002-4-elton-john.jpg"
                  ],
                  "url_list": [
                    "https://www.palausantjordi.cat/es/"
                  ],
                  "num_reports": 0,
                  "tematiques": [
                    {
                      "nom": "Musica",
                      "descripcio": null
                    },
                    {
                      "nom": "Concerts",
                      "descripcio": null
                    }
                  ],
                  "punts": 202,
                  "descompte": 20,
                  "nom": "Elton John",
                  "dataIni": "2023-05-22T00:00:00Z",
                  "dataFi": "2023-05-23T00:00:00Z",
                  "descripcio": "Més informació del concert d'Elton John al web del Palau Sant Jordi.",
                  "entrades": "Venda d'entrades online",
                  "horari": "21 h",
                  "enllacos": "https://www.livenation.es/artist-elton-john-5,https://agenda.cultura.gencat.cat/content/agenda/ca/results.html?c=eyJrZXl3b3JkcyI6IiIsImRhdGFPcHRpb24iOiIiLCJkYXRhRGVzZGUiOiIiLCJkYXRhRmluc2EiOiIiLCJlc3BhaSI6IiIsInBvYmxhY2lvIjoiQmFyY2Vsb25hIiwiYW1iaXRzIjpbXSwiY2F0ZWdvcmllcyI6WyJhZ2VuZGE6Y2F0ZWdvcmllcy9jb25jZXJ0cyJdfQ__&page=0,https://agenda.cultura.gencat.cat",
                  "imatges": "/content/dam/agenda/articles/2019/10/11/001/20201002-1r-elton-john.jpg,/content/dam/agenda/articles/2019/10/11/001/20201002-2-elton-john.JPG,/content/dam/agenda/articles/2019/10/11/001/20201002-3-mirror-eltton-john.jpg,/content/dam/agenda/articles/2019/10/11/001/20201002-4-elton-john.jpg",
                  "provincia": "barcelona",
                  "comarca": "barcelones",
                  "municipi": "barcelona",
                  "latitud": 41.36337169999999,
                  "longitud": 2.1525930000000244,
                  "espai": "Palau Sant Jordi",
                  "email": null,
                  "telefon": null,
                  "url": "https://www.palausantjordi.cat/es/",
                  "reports": "",
                  "organitzador": null
                },
                {
                  "codi": 20200411001,
                  "enllacos_list": [
                    "https://biblioteques.gencat.cat/ca/detalls/Noticia/Joemquedoacasa-pero-no-marxem-del-tot-Ens-trobaras-a-la-xarxa",
                    "http://ebiblio.cat/",
                    "https://www.facebook.com/bibliotequescat/",
                    "https://www.instagram.com/bibliotequescat/",
                    "https://agenda.cultura.gencat.cat/content/agenda/ca/results.html?c=eyJrZXl3b3JkcyI6IiIsImRhdGFPcHRpb24iOiIiLCJkYXRhRGVzZGUiOiIiLCJkYXRhRmluc2EiOiIiLCJlc3BhaSI6IiIsInBvYmxhY2lvIjoiIiwiYW1iaXRzIjpbXSwiY2F0ZWdvcmllcyI6WyJhZ2VuZGE6Y2F0ZWdvcmllcy9hY3Rpdml0YXRzLXZpcnR1YWxzIl19&page=0",
                    "https://agenda.cultura.gencat.cat"
                  ],
                  "imatges_list": [
                    "http://agenda.cultura.gencat.cat/content/dam/agenda/articles/2020/04/11/001/Bilioteques-publiques-1.jpg",
                    "http://agenda.cultura.gencat.cat/content/dam/agenda/articles/2020/04/11/001/prova-biblioteques-1.jpg"
                  ],
                  "url_list": null,
                  "num_reports": 0,
                  "tematiques": [
                    {
                      "nom": "Llibres i lletres",
                      "descripcio": null
                    },
                    {
                      "nom": "Activitats virtuals",
                      "descripcio": null
                    }
                  ],
                  "punts": 191,
                  "descompte": 50,
                  "nom": "Biblioteques públiques de Catalunya",
                  "dataIni": "2222-02-02T00:00:00Z",
                  "dataFi": "2222-02-02T00:00:00Z",
                  "descripcio": "El Servei de Biblioteques del Departament de Cultura de la Generalitat de Catalunya us ofereix diferents propostes online, tant al seu web com a les xarxes socials:  #Joemquedoacasa però no marxem del tot! Ens trobaràs a la xarxa eBiblio Catalunya - Préstec de llibres electrònics Facebook de Biblioteques Instagram de Biblioteques  &nbsp; &nbsp; NOTES DE L'AGENDA CULTURAL:  El caràcter virtual d'aquesta activitat fa que la informació que es mostra en aquest article pel que fa a les dates d'inici i fi no sigui rellevant, sinó que es tracta simplement d'un recurs tècnic del programa de l'Agenda Cultural, ja que l'activitat no té un límit temporal definit per l'organitzador. En el mateix sentit, la informació de l'apartat \"Espai\", així com la geolocalització al mapa, és merament orientativa en relació a l'entitat que us ofereix aquesta activitat digital.",
                  "entrades": null,
                  "horari": null,
                  "enllacos": "https://biblioteques.gencat.cat/ca/detalls/Noticia/Joemquedoacasa-pero-no-marxem-del-tot-Ens-trobaras-a-la-xarxa,http://ebiblio.cat/,https://www.facebook.com/bibliotequescat/,https://www.instagram.com/bibliotequescat/,https://agenda.cultura.gencat.cat/content/agenda/ca/results.html?c=eyJrZXl3b3JkcyI6IiIsImRhdGFPcHRpb24iOiIiLCJkYXRhRGVzZGUiOiIiLCJkYXRhRmluc2EiOiIiLCJlc3BhaSI6IiIsInBvYmxhY2lvIjoiIiwiYW1iaXRzIjpbXSwiY2F0ZWdvcmllcyI6WyJhZ2VuZGE6Y2F0ZWdvcmllcy9hY3Rpdml0YXRzLXZpcnR1YWxzIl19&page=0,https://agenda.cultura.gencat.cat",
                  "imatges": "/content/dam/agenda/articles/2020/04/11/001/Bilioteques-publiques-1.jpg,/content/dam/agenda/articles/2020/04/11/001/prova-biblioteques-1.jpg",
                  "provincia": null,
                  "comarca": null,
                  "municipi": null,
                  "latitud": 41.6196276,
                  "longitud": 0.6180097999999999,
                  "espai": "Biblioteques públiques",
                  "email": null,
                  "telefon": null,
                  "url": null,
                  "reports": "",
                  "organitzador": null
                }
              ]
        )
    }))

    //every it is a test
    it('should match snapshot with queryFilter empty', () => {
        const onVarChange = jest.fn();
        const comp = render(<MarkersMap  
            queryFilter={""}
            longitudeDivice = {41.389324}
            latitudeDivice = {2.113703}/>);
        let component = comp.toJSON();
        expect(component).toMatchSnapshot();
    });  
    
    it('should match snapshot with queryFilter search', () => {
        const onVarChange = jest.fn();
        const comp = render(<MarkersMap  
            queryFilter={"search='a"}
            longitudeDivice = {41.389324}
            latitudeDivice = {2.113703}/>);
        let component = comp.toJSON();
        expect(component).toMatchSnapshot();
    });  

});