const axios = require('axios');
require('dotenv').config();

const URL_GET_COVID19_SUMMARY = `https://api.covid19api.com/summary`;

module.exports.summary = async () => {
    return await axios.get(URL_GET_COVID19_SUMMARY).then( response => {
        return response.data;
    }).catch( error => {
        console.error(`Error:`, error);
    })
}

module.exports.getCovidSummaryAll = async () => {
    const data = await this.summary();
    let responseList = [];
    if(data.Countries==undefined) {
        let response = {
            name: `${data.Message}`,
            value: `ระบบขัดข้องจาก api.covid19api.com`,
            inline: false
        };
        responseList.push(response);
    }else {
        await data.Countries.forEach(element => {
            let response = {
                name: `${element.CountryCode}: ${element.Country}`,
                value: `ผู้ติดเชื้อ: ${element.TotalConfirmed} \n ผู้เสียชีวิต: ${element.TotalDeaths} \n หายป่วย: ${element.TotalRecovered} \n`,
                inline: false
            };
            responseList.push(response);
        });
    }
    return responseList;
}

module.exports.getCovidSummaryByCountry = async (contryCode) => {
    const data = await this.summary();
    let responseList = [];
    if(data.Countries==undefined) {
        let response = {
            name: `${data.Message}`,
            value: `ระบบขัดข้องจาก api.covid19api.com`,
            inline: false
        };
        responseList.push(response);
    }else {
        await data.Countries.forEach(element => {
            if(element.CountryCode===contryCode) {
                let response = {
                    name: `${element.CountryCode}: ${element.Country}`,
                    value: `ผู้ติดเชื้อ: ${element.TotalConfirmed} \n ผู้เสียชีวิต: ${element.TotalDeaths} \n หายป่วย: ${element.TotalRecovered} \n`,
                    inline: false
                };
                responseList.push(response);
            }
        });
    }
    if(responseList.length==0) {
        let response = {
            name: `ไม่พบคำค้นหา`,
            value: `${contryCode}`,
            inline: false
        };
        responseList.push(response);
    }
    return responseList;
}