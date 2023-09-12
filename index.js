let datas = [];

const handleSubmit = async (event) => {
  var validasiAngka = /^[0-9]+$/;
  event.preventDefault();

  try {
    this.valueNama = await document.getElementById("field-nama").value;
    this.valueUmur = await document.getElementById("field-umur").value;
    this.valueUangSaku = await document.getElementById("field-uang-saku").value;

    if (valueNama.length < 10) {
      return valuesValidate(
        "error",
        "Registration Failed!",
        "Karakter dalam pengisian nama kurang dari 10!"
      );
    }

    if (!valueUmur.match(validasiAngka)) {
      return valuesValidate(
        "error",
        "Registration Failed",
        "Pengisian field umur hanya boleh angka saja!"
      );
    }

    if (valueUmur < 25 || valueUmur > 80) {
      return valuesValidate(
        "error",
        "Registration Failed!",
        "Umur minimal adalah 25 dan maximal 80 tahun!"
      );
    }

    if (!valueUangSaku.match(validasiAngka)) {
      return valuesValidate(
        "error",
        "Registration Failed!",
        "Pengisian uang saku hanya boleh angka!"
      );
    }

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

const valuesValidate = async (status, title, message) => {
  const alertContainerElement = document.getElementById("alert-box");
  const alertTitleElement = document.getElementById("alert-title");
  const alertTextElement = document.getElementById("alert-text");

  try {
    const statusType = await status;
    const titleText = await title;
    const messageText = await message;

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

      return acceptedValidate();
    }
  } catch (error) {
    throw error;
  }
};

const acceptedValidate = async () => {
  document.getElementById("backdrop-box").classList.add("show");

  try {
    setTimeout(() => {
      document.getElementById("backdrop-box").classList.remove("show");
      document.querySelectorAll("input").forEach((input) => (input.value = ""));
    }, 3000);

    return pushDatasToArray();
  } catch (error) {
    throw error;
  }
};

const pushDatasToArray = () => {
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
  tableBody.innerHTML += `<th scope="row">${number}</th>
    <td>${datas[0].nama}</td>
    <td>${datas[0].umur}</td>
    <td>${datas[0].uangSaku}</td>
    `;

  console.log(datas);
};

const changeTabToRegistrationList = () => {
  document.getElementById("registration-entry").style.display = "none";
  document.getElementById("registration-list").style.display = "block";
};

const changeTabToRegistrationEntry = () => {
  document.getElementById("registration-entry").style.display = "block";
  document.getElementById("registration-list").style.display = "none";
};
