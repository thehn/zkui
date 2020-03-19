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
        new JsonEditor('#prettyJsonDisplay', getJson(propVal));
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
        let jsonVal = $('#prettyJsonDisplay').text();
        $("#newValue").val(jsonVal);
        console.log("update or save button is just clicked. Data" + jsonVal);

        return true;
    })

});

// get JSON
function getJson(jsonVal) {
    try {
        if (jsonVal) {
            return JSON.parse(jsonVal);
        } else {
            return jsonVal;
        }
    } catch (ex) {
        console.log('Wrong JSON Format: ' + ex);
        return jsonVal;
    }
}
