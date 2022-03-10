import axios from 'axios';
import convert from 'xml-js';
import qs from 'qs';


const parser = new DOMParser();

// Data
const EMAIL = "juniorov.dev@gmail.com",
    TOKEN = "IO22ABVO2N",
    BCCRurl = 'https://gee.bccr.fi.cr/Indicadores/Suscripciones/WS/wsindicadoreseconomicos.asmx/ObtenerIndicadoresEconomicos',
    payload = {
        Nombre: "N",
        SubNiveles: "N",
        Indicador: 317,
        CorreoElectronico: EMAIL,
        Token: TOKEN,
    },
    optFetch = {
        url: BCCRurl,
        baseURL: BCCRurl,
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, *cors, same-origin
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            // "Access-Control-Allow-Origin": "*",
            // 'Access-Control-Allow-Credentials': true,
            // 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    };

const getDayToConsult = (date) => {
    var todayDate = new Date();
    return date ? date : todayDate.getDate() + "/" + (todayDate.getMonth() + 1) + "/" + todayDate.getFullYear();
}

const getFetchData = (params) => {
    return axios.post(BCCRurl, params);
}

const getBuyBCCR = (fechaInicio, fechaFinal) => {
    try {
        payload.FechaInicio = getDayToConsult(fechaInicio);
        payload.FechaFinal = getDayToConsult(fechaFinal);
        optFetch.body = qs.stringify(payload);

        var postCompra = fetch(BCCRurl, optFetch)
            .then(function (response) {
                // console.log('response', response);
                var parse = parser.parseFromString(response, 'application/xml');
                const errorNode = parse.querySelector("parsererror");
                if (errorNode) {
                    console.log("error while parsing", errorNode);
                } else {
                    console.log(doc.documentElement.nodeName);
                }
            })
            .catch(function (error) {
                console.log('error', error);
            });

        // console.log(postCompra);

    }catch (error) {
        throw new Error(error);
    }
}

const getSellBCCR = () => {
    console.log('getSellBCCR');
}

export default {
    getBuyBCCR,
    getSellBCCR,
}