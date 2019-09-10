$("#prodBtn").click(prodLogin);
$("#sandBtn").click(sandLogin);

const apiVersion = 'v37.0';
const clientId = '3MVG9KsVczVNcM8xlCN5oBUy_t4n2vUT9uktAVRxAR5SblR0fRe1zAbtSSJsWckFQvlJd_NdmEc8IGvaeBN9q';
let loginUrl = 'https://login.salesforce.com/';
const redirectURI = "https://demo-lightning-out2.herokuapp.com/oauthcallback.html";
const proxyURL = 'http://localhost:8080/proxy/';


function prodLogin() {
    loginUrl = 'https://login.salesforce.com/';
    login();
}

function sandLogin() {
    loginUrl = 'https://test.salesforce.com/';
    login();
}

function login() {
    const url = `${loginUrl  }services/oauth2/authorize?display=popup&response_type=token` +
        `&client_id=${  encodeURIComponent(clientId) 
        }&redirect_uri=${  encodeURIComponent(redirectURI)}`;
    popupCenter(url, 'login', 700, 600);
}

function oauthCallback(response) {
    if (response && response.access_token) {
        console.log(response);
        $.cookie("AccToken", response.access_token);
        $.cookie("APIVer", apiVersion);
        $.cookie("InstURL", response.instance_url);
        $.cookie("idURL", response.id);

        strngBrks = response.id.split('/');
        $.cookie("LoggeduserId", strngBrks[strngBrks.length - 1]);

        window.location = 'Main';
    } else {
        alert("AuthenticationError: No Token");
    }
}


function popupCenter(url, title, w, h) {
    // Handles dual monitor setups
    const parentLeft = window.screenLeft ? window.screenLeft : window.screenX;
    const parentTop = window.screenTop ? window.screenTop : window.screenY;
    const left = parentLeft + (window.innerWidth / 2) - (w / 2);
    const top = parentTop + (window.innerHeight / 2) - (h / 2);
    return window.open(url, title, `width=${  w  }, height=${  h  }, top=${  top  }, left=${  left}`);
}