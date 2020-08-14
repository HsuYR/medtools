var requestURL = 'https://hsuyr.github.io/medtools/antibrev/abbrevs.json';

var request = new XMLHttpRequest();

request.open('GET', requestURL);

request.responseType = 'json';
request.send();

request.onload = ()=>{
    let abbrevs = request.response;
    let abbrevsList = Object.entries(abbrevs).map(a => a[0] + ": " + a[1]).sort();
    for (i in abbrevsList) {
        if (abbrevsList[i].includes('--')) {continue;}
        let li = document.createElement('li');
        li.textContent = abbrevsList[i];
        document.getElementById('results').appendChild(li);
    }

    const input = document.querySelector('input');

    input.addEventListener('input', updateResults);

    function updateResults(e) {
        document.querySelectorAll('#results li').forEach(li => {
            if (li.textContent.toLowerCase().includes(e.target.value.toLowerCase())) {
                li.style.display = 'list-item';
            } else {
                li.style.display = 'none';
            }
        })
    }
};

