class CookieBanner extends HTMLElement {
    shadowRoot;

    constructor() {
        super();

        const cookieAccepted = this.getCookie('cookie.banner.accepted');
        let bannerState = '';

        if (cookieAccepted !== null) {
            bannerState = 'hidden';
        }

        this.shadowRoot = this.attachShadow({mode: 'closed'});

        const style = document.createElement('style');
        style.textContent = `
        
        
        .cookie-banner {
            
            position: fixed;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            width: 100%;
            height: 100%;
            z-index: 9999;
            background-color: rgba(0, 0, 0, 0.75);
            transition: opacity 0.5s ease, visibility 0.5s ease;
            font-size: 16px;
            
           
            
          }
          .cookie-banner input {

            width: 16px;
            height: 16px;
          }

          .cookie-banner button {

            padding: 10px;
            
           

          }

          .loeschen{

            float: right;
          }

        

            .Cookie{
                
                border:2px soild black;
            
                height: 450px;
                width: 450px;
            
                padding: 15px;
                border: 4px solid red;
                border-radius: 10px;
                background-color: black;
            
            }
            .hidden{
            display:none;
            }
            .green{
                
                color:green;
                }
            
            button:hover{
            cursor:pointer;
            }

            .line {
                border: 1px solid var(--daten-col);
                margin-bottom: 10px;
              }
              #coocop {
                float: right;
                color: white;
              }
              .line {
                border: 1px solid white;
                margin-bottom: 10px;
              }
              @media screen and (max-width: 580px) {
                .Cookie{
                    width: 350px;
                    height: 500px;
                  }

                  .cookie-banner {

                    align-items:flex-start;
                    padding-top: 50px;
                  }
              }

              
        `;
        this.shadowRoot.appendChild(style.cloneNode(true));

        const template = document.createElement('template');
        template.innerHTML = `
        
        <div id="BannerCC" class="cookie-banner ${bannerState}">
        <div class="Cookie" >

        <slot name="title"><h1>Cookies akzeptieren</h1></slot>
        <slot name="text"><p>Bitte wählen Sie Ihre Cookie-Einstellungen aus!</p></slot>
        <p>Bitte beachten Sie, dass sich Ihre Auswahl auf die Funktion der Website auswirken kann.</p>
        <p class="cookie-sources">
            <label><input type="checkbox" name="required" disabled checked> Notwendige Funktions-Cookies</label>
            <p></p>
            <label><input type="checkbox" name="statistics">Webseiten verbesserung</label>
            <p></p>
            <label><input type="checkbox" name="marketing">Marketing</label>
        </p>
        <div class="line"></div>
        <button class="confirm">&#10004; Speichern</button>
        <button class="green">&#10004;Alle bestätigen</button>
        <button class="loeschen">&#10008; Alle Ablehnen</button>
        <p></p>
        <a href="./Datenschutz.txt" target="_blank" id="coocop">&copy;2023 Unverzagt</a>


        </div>
        </div>
    
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));


    }

    connectedCallback() {
        const element = this;
        this.shadowRoot.querySelector('button.confirm').addEventListener('click', function (event) {
            element.setCookie('cookie.banner.required', true, 30);
            element.setCookie('cookie.banner.accepted', true, 30);

            element.shadowRoot.querySelectorAll('.cookie-sources input[type="checkbox"]:checked').forEach(function (source) {
                element.setCookie(`cookie.banner.${source.name}`, true, 30);
            });
            element.hideCookieBanner();
        });
        this.shadowRoot.querySelector('button.green').addEventListener('click', function (event) {
            element.setCookie('cookie.banner.all', true, 30);
            element.setCookie('cookie.banner.accepted', true, 30);
            element.hideCookieBanner();
        });

        this.shadowRoot.querySelector('button.loeschen').addEventListener('click', function (event) {
            element.setCookie('cookie.banner.required', true, 30);
            element.setCookie('cookie.banner.accepted', true, 30);

            element.shadowRoot.querySelectorAll('.cookie-sources input[type="checkbox"]:checked').forEach(function (source) {
                element.setCookie(`cookie.banner.${source.name}`, true, 30);
            });
            element.hideCookieBanner();
        });

        
    }

    hideCookieBanner() {
        
        this.shadowRoot.querySelector('.cookie-banner').classList.add('hidden');
        
    }

    setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    eraseCookie(name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}

customElements.define('cookie-banner', CookieBanner);




//Cookie 
// Initialer Zustand des Cookie-Banners
var cookieBanner = document.querySelector('cookie-banner');
var cookieButton = document.getElementById("CookieButton");

function showCookieBanner() {
    cookieBanner.style.opacity = "1";
    cookieBanner.style.visibility = "visible";
    updateCookieButtonVisibility();

}

function hideCookieBanner() {
    cookieBanner.style.opacity = "0";
    cookieBanner.style.visibility = "hidden";
    updateCookieButtonVisibility();
}

// Funktion zum Anzeigen des Cookie-Banners beim Aufrufen der Seite, wenn er zuvor durch die Buttons ausgeblendet wurde
function checkCookieBannerStatus() {
    var cookieAccepted = localStorage.getItem("cookieAccepted");

    if (cookieAccepted === null || cookieAccepted === "false") {
        showCookieBanner();
    }
}

// Funktion zum Speichern des Cookie-Status
function setCookieStatus(accepted) {
    localStorage.setItem("cookieAccepted", accepted);
}

// Funktion zum Aktualisieren der Sichtbarkeit des "CookieButton"
function updateCookieButtonVisibility() {
    var cookieAccepted = localStorage.getItem("cookieAccepted");

    if (!cookieAccepted || cookieAccepted === "false") {
        cookieButton.style.display = "block";
    } else {
        cookieButton.style.display = "none";
    }
}

// Funktion zum Umschalten des Cookie-Banners
function toggleCookieBanner() {
    cookieBanner.classList.toggle('hidden');
    if (!cookieBanner.classList.contains('hidden')) {
        cookieBanner.eraseCookie('cookie.banner.accepted');
    }
    location.reload();
}

// Event Listener für den "CookieButton"
cookieButton.addEventListener("click", toggleCookieBanner);

// Überprüfen des Cookie-Banner-Status beim Laden der Seite
document.addEventListener("DOMContentLoaded", function () {
    checkCookieBannerStatus();
});


//--------------------------------------------------------------------------------------------

//GitHub: "https://github.com/Jojo252511"

/*Cookie.css wird zusätzlich benötigt zudem 
folgender Html code:

 <span id="CookieButton" onclick="toggleCookieBanner()"><p> Cookies</p></span>
    <cookie-banner>
   
    </cookie-banner>


    und im head:

    <link rel="stylesheet" href="Cookie.css">
    <script defer src="cookie-banner.js"></script>

    Die Datein MÜSSEN im selben Ordner wie die Index.html (Hauptseite) sein

*/
