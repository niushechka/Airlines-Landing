// Функция для загрузки XML-данных из файла и обновления HTML
function fetchAndUpdateHTML() {
    // Создаем объект XMLHttpRequest
    const xhr = new XMLHttpRequest();

    // Настраиваем запрос для загрузки файла data.xml
    xhr.open('GET', './assets/js/data.xml', true);
    
    // Указываем функцию обратного вызова при загрузке данных
    xhr.onload = function() {
        if (xhr.status === 200) {
            // Получаем XML-данные из ответа
            const xmlData = xhr.responseText;
            
            // Обновляем HTML на основе полученных данных
            updateHTMLWithXML(xmlData);
        } else {
            console.error(`Ошибка загрузки XML: ${xhr.status} ${xhr.statusText}`);
        }
    };

    // Обрабатываем ошибки запроса
    xhr.onerror = function() {
        console.error('Ошибка запроса при загрузке XML');
    };

    // Отправляем запрос
    xhr.send();
}

// Функция для обновления HTML на основе данных из XML
function updateHTMLWithXML(xmlData) {
    // Создаем DOM-парсер для парсинга XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, 'application/xml');
    
    // Проверяем, успешно ли распарсил XML
    if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
        console.error('Ошибка при разборе XML:', xmlDoc.getElementsByTagName('parsererror')[0].textContent);
        return;
    }
    
    // Получаем элементы <item> из XML
    const items = xmlDoc.getElementsByTagName('item');
    
    // Обходим каждый элемент <item> и обновляем HTML
    for (let i = 0; i < items.length; i++) {
        const name = items[i].getElementsByTagName('name')[0].textContent;
        const description = items[i].getElementsByTagName('description')[0].textContent;
        
        // Находим соответствующий элемент HTML
        const htmlItem = document.querySelectorAll('.col-sm-6.col-md-4.item')[i];
        
        // Проверяем, что элемент существует, и обновляем его содержимое
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

// Запускаем функцию для загрузки XML и обновления HTML
fetchAndUpdateHTML();
