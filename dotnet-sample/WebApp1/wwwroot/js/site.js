// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

function markDisabled(objectId) {

    $('#markDisabled').prop('disabled', true);

    invokeMark("/User?handler=MarkDisabled", objectId, markDisabledSuccess, markDisabledUnauthorized, markDisabledForbidden, markDisabledUnhandledException);

}

function invokeMark(endpoint, objectId, successFunction, unauthorizedFunction, forbiddenFunction, unhandledError) {

    // Get the anti-forgery token from the page
    var token = $('input[name="__RequestVerificationToken"]').val();

    $.ajax({
        url: endpoint,
        type: 'POST',
        data: {
            objectId: objectId,
            __RequestVerificationToken: token
        },
        success: function () {
            // Handle the successful response data here
            setTimeout(successFunction, 1000);
        },
        error: function (jqXHR) {
            // Handle different types of errors
            switch (jqXHR.status) {
                case 401:
                    setTimeout(unauthorizedFunction, 1000);
                    break;
                case 403:
                    setTimeout(forbiddenFunction, 1000);
                    break;
                default:
                    setTimeout(unhandledError, 1000);
                    break;
            }
        }
    });

}

function updateTextAndDisplay(panelId, errorText) {

    let $failurePanel = $("#" + panelId);

    let closeButtonHTML = $failurePanel.find(".close")[0].outerHTML;

    let divText = $failurePanel.contents().filter(function () {
        return this.nodeType === 3; // Filter for text nodes
    }).text();

    divText += errorText;
    $failurePanel.html(divText + closeButtonHTML);

    $failurePanel.show(1000);
}

function markDisabledUnauthorized() {
    updateTextAndDisplay("disabledFailure", unauthorisedText);
}

function markDisabledForbidden() {
    updateTextAndDisplay("disabledFailure", forbiddenText);
}

function markDisabledUnhandledException() {
    updateTextAndDisplay("disabledFailure", "");
}


function markDisabledSuccess() {
    // Update form field
    $('#accountEnabled').html('False');

    // Show Success Alert
    $("#disabledSuccess").show(1000);
}