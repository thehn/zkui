/**
 #
 # Copyright (c) 2014, Deem Inc. All Rights Reserved.
 #
 # Licensed under the Apache License, Version 2.0 (the "License");
 # you may not use this file except in compliance with the License.
 # You may obtain a copy of the License at
 #
 # http://www.apache.org/licenses/LICENSE-2.0
 #
 # Unless required by applicable law or agreed to in writing, software
 # distributed under the License is distributed on an "AS IS" BASIS,
 # WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 # See the License for the specific language governing permissions and
 # limitations under the License.
 #
 */
$(document).ready(function () {
    let isJsonFormat = false;

    $("#importFileView").click(function () {
        let scmServer = $("#scmServer").val();
        let scmFilePath = $("#scmFilePath").val();
        let scmFileRevision = $("#scmFileRevision").val();
        $("#importFileView").attr('href', scmServer + scmFileRevision + "@" + scmFilePath);
    });

    //Class based selector 
    $(".href-select").click(function () {
        let propName = $(this).text();
        let propVal = $(this).attr('itemprop');
        $("#newProperty").attr('readonly', true);
        $("#newProperty").val(propName);
        $("#newValue").val(propVal);
        $("#savePropertyBtn").hide();
        $("#updatePropertyBtn").show();
    });

    //Id based selector
    $("#addPropertyBtn").click(function () {
        $("#newProperty").attr('readonly', false);
        $("#updatePropertyBtn").hide();
        $("#savePropertyBtn").show();
    });

    $('#updatePropertyBtn, #savePropertyBtn').click(function () {
        if (isJsonFormat) {
            let jsonVal = $('#prettyJsonDisplay').text();
            if (jsonVal) {
                try {
                    JSON.parse(jsonVal);
                } catch (e) {
                    alert("Wrong JSON format, please check input again.")
                    return false;
                }
            }
            $("#newValue").val(jsonVal);
            console.log("update or save button is just clicked. Data" + jsonVal);
        }
        return true;
    })

    $('#btnFormatJson').click(function () {
        console.log("btnFormatJson was clicked");
        if (makeJsonPretty(isJsonFormat)) {
            isJsonFormat = true;
            $('#prettyJsonDisplay').show();
            $('#newValue').hide();
        }
    })

    $('#addPropertyModal').on('hide.bs.modal', function (e) {
        console.log("addPropertyModal was just closed");
        $('#prettyJsonDisplay').hide();
        $('#newValue').show();
        isJsonFormat = false;
    })
});

// get JSON
function makeJsonPretty(isJsonFormat) {
    try {
        if (isJsonFormat) {
            // already opened
            let jsonVal = JSON.parse($("#prettyJsonDisplay").text())
            new JsonEditor('#prettyJsonDisplay', jsonVal);
        } else {
            let jsonVal = JSON.parse($("#newValue").val())
            new JsonEditor('#prettyJsonDisplay', jsonVal);
        }
        return true;
    } catch (ex) {
        console.log('Wrong JSON Format: ' + ex);
        alert('Wrong JSON Format: ' + ex)
        return false;
    }
}
