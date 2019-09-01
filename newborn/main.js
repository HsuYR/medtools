window.onload = function() {
    let params = (new URL(document.location)).searchParams;
    params.forEach((value, key) => {
        let element = document.getElementById(key);
        if (element == null) {
            element = document.getElementById(value);
        }

        console.log("setting element of type", element.type, element.tagName);
        
        if (element.type == 'checkbox') {
            document.getElementById(key).checked = true;
        }
        else if (element.type == 'radio') { 
            document.getElementById(value).checked = true;
        }
        else { 
            document.getElementById(key).value = value;
        }
    });
};