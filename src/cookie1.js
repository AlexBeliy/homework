/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', filter);

 //глобальная переменная для общего доступа


window.addEventListener('load', tableWatch);

function tableWatch() {
  for (var prop in cookie) {
      createRow(prop, cookie[prop]);
      var cookie = getCookie();
  }
}

addButton.addEventListener('click', (e) => {
    var cookieName = addNameInput.value;
    var cookieValue = addValueInput.value;
    var filterValue = filterNameInput.value;
      
    if (cookieName) {
      setCookie(cookieName, cookieValue);
      cookie = getCookie();                    
      }

    if ((isMatching(cookieName, filterValue) || isMatching(cookieValue, filterValue))) {
        createRow(cookieName, cookieValue);
    }

        
        cookiesFilter(cookieName, cookieValue, filterValue);
        
      addNameInput.value = '';
      cookieValue = addValueInput.value = '';
    });

 filterNameInput.addEventListener('keyup', filter); 

//Создание строки таблицы
function createRow(name, value) {
    const tr = document.createElement('tr');
    tr.className = name;
    tr.innerHTML = '<td>'+ name +'</td><td>'+ value +'</td><button class="btn-delete">Удалить</button>';        
    listTable.appendChild(tr);    
    buttonDelete(name);
    console.log(cookie);
  }

//удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
function buttonDelete(name) {
  var btnDel = document.querySelectorAll('.btn-delete') 
    for(var item of btnDel) {     
      item.addEventListener('click', (e) => {
        if (e.target.tagName == 'BUTTON' )
          deleteCookie(name);
          e.target.parentElement.remove();
      });               
    }
  }

//Создаём cookie
function setCookie(name, value, options) {
    options = options || {}; // т.к options необязательный параметр и должен являться объектом, задаем ему значение по-умолчанию

    var expires = options.expires;

    if (typeof expires == 'number' && expires) { //проверяем является ли значение expires числом, и имеется ли вообще значение
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000); //задаём текущее время и прибавляем к ней expires
        expires = options.expires = d; 
    }
    if (expires && expires.toUTCString) { //если expires в UTCS, то и присваимваем его в значение св-ва expires объекта options 
        options.expires.toUTCString();
    }

    value = encodeURIComponent(value); //кодируем значение для передачи его по сети

    //собираем cookie
    var updatedCookie = name + '=' + value;
    
    for (var prop in options) { 
        updatedCookie += ';' + prop; //склеиваем в одну строку
        var propValue = options[prop];

        if(propValue !== true) {
            updatedCookie += '=' + propValue;
        } 
    } 

    document.cookie = updatedCookie; // создаём cookie с получившимся значением
}

//Собираем cookie в отдельный объект, чтобы выполнять с cookie различные манипуляции.
function getCookie() {
  return document.cookie.split('; ').reduce((prev, current) => {
    var arr = current.split('=');


    prev[arr[0]] = arr[1];

    return prev ;
  },{})
}

//Функция сравнения (для сравнений, введённых в поле имени и значения, с именами и значениями имеющих cookie)
function isMatching(full, chunk) {
    return (~full.toLowerCase().indexOf(chunk.toLowerCase())) ? true : false;
}

function buttonDelete(name) {
    var btnDel = document.querySelectorAll('.btn-delete') 
      for(var item of btnDel) {      
        item.addEventListener('click', (e) => {
          if (e.target.tagName == 'BUTTON' )
            deleteCookie(name);
            e.target.parentElement.remove();
        });               
      }
}

function deleteCookie(name) {
    var date = new Date(); // Берём текущую дату
    date.setTime(date.getTime() - 1); // Возвращаемся в "прошлое"
    document.cookie = name += "=; expires=" + date.toGMTString(); // Устанавливаем cookie пустое значение и срок действия до прошедшего уже времени
    //Обновляем объект c cookie
    cookie = getCookie();
}

function filter() {
    var arrayNames =  Object.keys(cookie);
    listTable.innerHTML = '';

    for (var i = 0; i < arrayNames.length; i++) {
      if (arrayNames[i] && cookie[arrayNames[i]]) {
        if (isMatching(arrayNames[i], filterNameInput.value) || isMatching(cookie[arrayNames[i]], filterNameInput.value)) {
          createRow(arrayNames[i], cookie[arrayNames[i]]);
        } 
      } else if (!filterNameInput.value) {
        tableWatch();
      } 
    }
}

function filterList(cookieName, cookieValue, filterValue) {
  var arrayNames = Object.keys(cookie);
    
  if (filterNameInput) {
    for (var i = 0; i < arrayNames.length; i++) {
      if (cookieName == arrayNames[i] && !isMatching(cookieValue, filterValue)) {
        setCookie(cookieName, cookieValue);
        listTable.querySelector('.'+ cookieName)item.remove();
        
      } else if (!isMatching(cookieName, filterValue) && !isMatching(cookieValue, filterValue)) {
             setCookie(cookieName, cookieValue);
      }
    }
  }
     createTable(cookies)                       
}






