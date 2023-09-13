let datas = [];

// function for submit handle and get the field values
const handleSubmit = async (event) => {  
  event.preventDefault();

  // validation regular expression for nama ( words and whitespaces only )
  var validasiHuruf = /^[A-Za-z\s]*$/;

  // validation regular expression for nama ( cannot whitespaces only )
  var validasiSpasi = /^\s*$/;

  // validation regular expression for umur and uang saku ( numbers only )
  var validasiAngka = /^[0-9]+$/;
  
  try {
    // wait field filled and get field values from index.html 
    this.valueNama = await document.getElementById("field-nama").value;
    this.valueUmur = await document.getElementById("field-umur").value;
    this.valueUangSaku = await document.getElementById("field-uang-saku").value;

    // check to validate that the nama field input contents are contain word and white spaces only
    if (!valueNama.match(validasiHuruf)) {
      return valuesValidate(
        "error",
        "Registration Failed!",
        "Pengisian field nama hanya boleh huruf dan spasi!"
      );
    }

    // check to validate that the nama field input contents are not contain white spaces only
    if (valueNama.match(validasiSpasi)) {
      return valuesValidate(
        "error",
        "Registration Failed!",
        "Pengisian field nama tidak boleh spasi saja!"
      )
    }

    // check to validate that nama length must more than 10 character
    if (valueNama.length < 10) {
      return valuesValidate(
        "error",
        "Registration Failed!",
        "Karakter dalam pengisian nama kurang dari 10!"
      );
    }

    // check to validate that the umur field input contents are only numbers
    if (!valueUmur.match(validasiAngka)) {
      return valuesValidate(
        "error",
        "Registration Failed",
        "Pengisian field umur hanya boleh angka saja!"
      );
    }

    // check to validate that the umur field have a minimal and maximal values
    if (valueUmur < 25 || valueUmur > 100) {
      return valuesValidate(
        "error",
        "Registration Failed!",
        "Umur minimal adalah 25 dan maximal 100 tahun!"
      );
    }

    // check to validate that the uang saku field input contents are only numbers
    if (!valueUangSaku.match(validasiAngka)) {
      return valuesValidate(
        "error",
        "Registration Failed!",
        "Pengisian uang saku hanya boleh angka!"
      );
    }

    // check to validate that uang saku field have a minimal and maximal values
    if (valueUangSaku < 100000) {
      return valuesValidate(
        "error",
        "Registration Failed!",
        "Minimal uang saku adalah 100.000"
      );
    } else if (valueUangSaku > 1000000) {
      return valuesValidate(
        "error",
        "Registration Failed!",
        "Maximal uang saku adalalah 1.000.000!"
      );
    } else {
      // call the function that handle alert and message
      // send parameters registration status, registration title and registration message
      valuesValidate(
        "success",
        "Registration Successfully!",
        "Berhasil menambahkan data!"
      );
    }
  } catch (error) {
    throw error;
  }
};

// function for handle alert and messages
const valuesValidate = async (status, title, message) => {  
  const alertContainerElement = document.getElementById("alert-box");
  const alertTitleElement = document.getElementById("alert-title");
  const alertTextElement = document.getElementById("alert-text");
  
  try {    
    const statusType = await status;
    const titleText = await title;
    const messageText = await message;

    // error handler
    if (statusType === "error") {
      alertContainerElement.style.display = "block";
      setTimeout(() => {
        alertContainerElement.style.display = "none";
      }, 3000);

      alertContainerElement.classList.add("bg-danger");
      alertContainerElement.classList.remove("bg-success");

      alertTitleElement.innerHTML = await titleText;
      return (alertTextElement.innerHTML = await messageText);
    } else {
      alertContainerElement.style.display = "block";
      setTimeout(() => {
        alertContainerElement.style.display = "none";
      }, 3000);

      alertContainerElement.classList.add("bg-success");
      alertContainerElement.classList.remove("bg-danger");

      alertTitleElement.innerHTML = await titleText;
      alertTextElement.innerHTML = await messageText;

      // call the function for accepted and validated datas
      return acceptedValidate();
    }
  } catch (error) {
    throw error;
  }
};

// function for reset all filled fields after registration successfully
const acceptedValidate = () => {
  document.getElementById("backdrop-box").classList.add("show");

  try {
    // set timeout to make the alert and backdrop show only 3 secconds
    setTimeout(() => {
      document.getElementById("backdrop-box").classList.remove("show");
      document.querySelectorAll("input").forEach((input) => (input.value = ""));
    }, 3000);

    // call function for push validated datas to array
    return pushDatasToArray();
  } catch (error) {
    throw error;
  }
};

// function for push data to array and display them to table registration data list
const pushDatasToArray = () => {
  // unshift method that make validated data in the first order
  datas.unshift({
    nama: this.valueNama,
    umur: this.valueUmur,
    uangSaku: this.valueUangSaku,
  });

  const tableBody = document.getElementById("table-body");
  let number = 0;
  for (var i = number; i < datas.length; i++) {
    number++;
  }

  // inject html tag from javascript, to make table head and table row for new validated data
  tableBody.innerHTML += `<th scope="row">${number}</th>
    <td>${datas[0].nama}</td>
    <td>${datas[0].umur}</td>
    <td>${datas[0].uangSaku}</td>
    `;

  // call function to get average of umur and uang saku
  getAverage();
};

// function for calculate umur average and uang saku average, then display it to table registration data list
const getAverage = () => {
  let totalUmur = 0;
  let totalUangSaku = 0;
  let umurAverage = 0;
  let uangSakuAverage = 0;

  for (var i = 0; i < datas.length; i++) {
    totalUmur += parseInt(datas[i].umur);
    totalUangSaku += parseInt(datas[i].uangSaku);

    umurAverage = totalUmur / datas.length;
    uangSakuAverage = totalUangSaku / datas.length;
  }

  // set average of umur and uang saku
  document.getElementById("umur-average").innerHTML = `${umurAverage} tahun`;
  document.getElementById("uang-saku-average").innerHTML = `Rp. ${uangSakuAverage},00`;
};

// function for change tab to registration list
const changeTabToRegistrationList = () => {
  document.getElementById("registration-entry").style.display = "none";
  document.getElementById("registration-list").style.display = "block";
};

// function for change tab to registration entry
const changeTabToRegistrationEntry = () => {
  document.getElementById("registration-entry").style.display = "block";
  document.getElementById("registration-list").style.display = "none";
};
