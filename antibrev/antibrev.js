
if (typeof requestURL === 'undefined') {
    var requestURL = 'https://hsuyr.github.io/medtools/antibrev/abbrevs.json';
}
if (typeof request === 'undefined') {
    var request = new XMLHttpRequest();
}

request.open('GET', requestURL);

request.responseType = 'json';
request.send();

request.onload = ()=>{
    let abbrevs = request.response;
    abbrevs = Object.keys(abbrevs).map(key => [new RegExp('(^|[^a-zA-Z\(])'+key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')+'([^a-zA-Z\)]|$)', 'g'), `${abbrevs[key]} (${key})`]);
    abbrevs = new Map(abbrevs);

    let note = document.querySelector('#cke_1_contents iframe').contentDocument;
    let paragraphs = note.querySelectorAll('p');

    paragraphs.forEach(e => {
    console.log(e);
    for (let [re, fullName] of abbrevs) {
        e.textContent = e.textContent.replace(re, `$1${fullName}$2`);
    }
    });
};


