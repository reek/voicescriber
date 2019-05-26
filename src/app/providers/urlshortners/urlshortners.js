// issue cors
export const getTinyURL = (longUrl) => fetch("http://tinyurl.com/api-create.php?url=" + encodeURIComponent(longUrl), {
    headers: {
        "Origin": "http://tinyurl.com",
        "Referer": "http://tinyurl.com"
    }
}).then(response => response.text())


// issue cors
export const getBitlyURL = (longUrl) => fetch("https://api-ssl.bitly.com/v4/shorten", {
    method: "POST",
    body: JSON.stringify({
        long_url: longUrl
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
}).then(response => response.text())


// allow cors
// https://tiny.ph/api/docs/url-create
export const getTinyphURL = (longUrl) => fetch("https://tiny.ph/api/url/create", {
        method: "POST",
        body: 'url=' + longUrl,
        headers: {
            "Origin": "https://tiny.ph/",
            "Content-type": "application/x-www-form-urlencoded"
        }
    }).then(response => response.json())
    .then(json => {
        const {
            data: {
                hash
            },
            ...rest
        } = json
        return "https://tiny.ph/" + hash
    }).catch(err => console.log(err))



// api token bitly
//e629d811382f8d92931af003a3ab9cce51867116
/* 
var xhr = new XMLHttpRequest();
xhr.open("POST", "https://api-ssl.bitly.com/v4/shorten", true);
xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
xhr.setRequestHeader("Origin", "https://api-ssl.bitly.com/");
var params = JSON.stringify({
    long_url: longUrl
})
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            console.log("CORS works!", xhr.responseText);
        } else {
            console.log("Oops", xhr);
        }
    }
}
xhr.send(params); */


/* var xhr = new XMLHttpRequest();
xhr.open("POST", "https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyCiddaudXcUdK4xwnP4fWaW_omcmJNCiUY", true);
xhr.setRequestHeader("Content-type", "application/json");
//xhr.setRequestHeader("Origin", "https://www.googleapis.com/");
var params = JSON.stringify({
    longUrl: longUrl
})
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            console.log("CORS works!", xhr.responseText);
        } else {
            console.log("Oops", xhr);
        }
    }
}
xhr.send(params); */


/* const longUrl = e.target.getAttribute("data-clipboard-text")
Tinyph(longUrl).then(shortUrl => {
    console.log(shortUrl)
    //const shortUrl = e.target.getAttribute("data-sorturl")
    e.target.click()
    const clipboard = new ClipboardJS('.copy', {
        text: (trigger) => {
            return shortUrl;
        }
    });
    clipboard.on('success', (e) => {
        alert('Share link copied!', e.text)
        e.clearSelection();
    });

}).catch(err => console.log(err)) */