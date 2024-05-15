function fetchAndUpdateHTML() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', './assets/js/data.xml', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const xmlData = xhr.responseText;
            updateHTMLWithXML(xmlData);
        } else {
            console.error(`Ошибка загрузки XML: ${xhr.status} ${xhr.statusText}`);
        }
    };
    xhr.onerror = function() {
        console.error('Ошибка запроса при загрузке XML');
    };
    xhr.send();
}

function updateHTMLWithXML(xmlData) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, 'application/xml');
    if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
        console.error('Ошибка при разборе XML:', xmlDoc.getElementsByTagName('parsererror')[0].textContent);
        return;
    }
    const items = xmlDoc.getElementsByTagName('item');
    for (let i = 0; i < items.length; i++) {
        const name = items[i].getElementsByTagName('name')[0].textContent;
        const description = items[i].getElementsByTagName('description')[0].textContent;
        const htmlItem = document.querySelectorAll('.col-sm-6.col-md-4.item')[i];
        if (htmlItem) {
            const nameElement = htmlItem.querySelector('h3.name');
            const descriptionElement = htmlItem.querySelector('p.description');
            if (nameElement) {
                nameElement.textContent = name;
            }
            if (descriptionElement) {
                descriptionElement.textContent = description;
            }
        }
    }
}

fetchAndUpdateHTML();
