/**
 * Postrack
 * Created by Nitai J. Perez
 * Nitai.Perez@Gmail.com
 * 19/10/2014
 */
var israelPostAdapter = (function() {
    function getTrackInfoByCode(itemcode, lang, cb) {
        $.ajax({
            url: "http://www.israelpost.co.il/itemtrace.nsf/trackandtraceJSON?openagent",
            type: "GET",
            cache: false,
            dataType: 'json',
            data: {
                "lang": lang,
                "itemcode": itemcode
            },
            success: function (result, status, xhr) {
                cb(null, result.typename, result.itemcodeinfo);
            },
            error: function (xhr, status, error) {
                cb(new Error(xhr, status, error));
            }
        });
    }

    return {
        serviceName: "Israel Post",
        serviceCountry: "Israel",
        // serviceWebsite: "http://www.israelpost.co.il",
        serviceImage: "https://www.aftership.com/assets/common/img/courier/32x32/israel-post.png",
        supportedLanguages: {he: "HE", en: "EN"},
        getItemByCode: getItemByCode
    }
}());










/** RESULT STRUCTURE FOR ILPOST
 result = {
                    "typename": "Registered mail",
                    "hasimage": "",
                    "hasSignimage": "",
                    "data_type": "RASHUM",
                    "itemcodeinfo": "The item was received from the United States of America on 14/10/2014",
                    "sHeader1": "",
                    "sHeader2": ""
                }

 status = "success"

 xhr = {
                    "readyState": 4,
                    "responseText": "{\"typename\" : \"Registered mail\", \"hasimage\":\"\", \"hasSignimage\":\"\", \"data_type\" : \"RASHUM\", \"itemcodeinfo\" : \"The item was received from the United States of America on 14/10/2014\", \"sHeader1\":\"\", \"sHeader2\":\"\" }\n",
                    "responseJSON": {
                        "typename": "Registered mail",
                        "hasimage": "",
                        "hasSignimage": "",
                        "data_type": "RASHUM",
                        "itemcodeinfo": "The item was received from the United States of America on 14/10/2014",
                        "sHeader1": "",
                        "sHeader2": ""
                    },
                    "status": 200,
                    "statusText": "OK"
                }
 */