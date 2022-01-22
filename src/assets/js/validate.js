/* Formulartypen ID
*/

const form = document.getElementById('form');
const vorname = document.getElementById('vorname');
const nachname = document.getElementById('nachname');
const email = document.getElementById('email');
const telefon = document.getElementById('telefon')
const strasse = document.getElementById('strasse');
const strassennummer = document.getElementById('strassennummer');
const plz = document.getElementById('plz');
const stadt = document.getElementById('stadt');

// Fehlermeldung 
function showError(input, message) {
  console.log('show error', input, message)
  const formControl = input.parentElement;
  formControl.className = 'form-control error';

  console.log(formControl)
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Rahmen grün
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// E-Mailadresse Gültigkeit überprüfen
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
    return true
  } else {
    showError(input, 'Email ist ungültig');
  }
}


function checkIsNummer(input) {
    if(!isNaN(input.value)) {
      showSuccess(input);
      return true
    } else {
      showError(input, 'Bitte eine Zahl eingeben');
    }
}

// notwendige Felder überprüfen
function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} ist erforderlich`);
      isRequired = true;
    } else {
      showSuccess(input);
    }
  });

  return isRequired;
}

// Zeichenlänge überprüfen
function checkLength(input, min, max) {
  if (input.value.length < min) {
    console.log('jaaa')
    showError(
        input,
        `${getFieldName(input)} muss mindestens ${min} Zeichen haben`
    );
  } else if (input.value.length > max) {
    showError(
        input,
        `${getFieldName(input)} muss weniger als ${max} Zeichen haben`
    );
  } else {
    showSuccess(input);
    return true;
  }
}

// Funktion Feldnamen automatisch übernehmen
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function handleSuccess() {
  console.log('success')
  console.log(JSON.stringify({
    "name": vorname.value,
    "lastname": nachname.value,
    "email": email.value,
    "phonenumber": telefon.value,
    "street": strasse.value,
    "streetnumber": strassennummer.value,
    "zip": plz.value,
    "city": stadt.value
  }))
    fetch('/api/newsletter', {
      method: "put",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "name": vorname.value,
        "lastname": nachname.value,
        "email": email.value,
        "phonenumber": telefon.value,
        "street": strasse.value,
        "streetnumber": strassennummer.value,
        "zip": plz.value,
        "city": stadt.value
      })
    })
    form.innerHTML = '<h1>Vielen Dank, dass Sie sich für unseren Newsletter angemeldet haben. Sie werden in kürze ein Bestätigungs E-Mail von uns erhalten!</h1>'
}

function validateForm(){
  if(!checkRequired([vorname, nachname, email, telefon, strasse, strassennummer, plz, stadt])){
      let statusList = []
      
    statusList.push(checkEmail(email));
    statusList.push(checkIsNummer(telefon))
    statusList.push(checkIsNummer(strassennummer))
    statusList.push(checkIsNummer(plz))
    //Validierung Zeichenlänge
    statusList.push(checkLength(vorname, 3, 50));
    statusList.push(checkLength(nachname, 3, 50));
    statusList.push(checkLength(strasse, 2, 200));
    statusList.push(checkLength(stadt, 2, 200));
    statusList.push(checkLength(telefon, 10, 10));

  //Erfolgsmeldung
      statusList = statusList.filter(x => x !== true)

      if(statusList.length == 0) {
          handleSuccess()
      }
  }
}

form.addEventListener('submit', function(e) {
  //https://www.w3schools.com/jsref/event_preventdefault.asp
  e.preventDefault();
  //First validate form
  validateForm();
});