"use strict";
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const myForm = document.querySelectorAll("form");
const healthyBtn = document.getElementById("healthy-btn");
let tableBodyEl = document.getElementById("tbody");
const btnCalculateBMI = document.getElementById("bmi-btn");

let data;
const petArr = [];

const data1 = {
  id: "P001",
  petName: "Tom",
  age: 3,
  type: "Cat",
  weight: 5,
  petLength: 50,
  breed: "Tabby",
  color: "#f7d54b",
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  bmi: "?",
  // date: new Date("2022-03-01"),
};

const data2 = {
  id: "P002",
  petName: "Tyke",
  age: 5,
  type: "Dog",
  weight: 3,
  petLength: 40,
  breed: "Mixed Breed",
  color: "#5C5C5C",
  vaccinated: false,
  dewormed: false,
  sterilized: false,
  bmi: "?",
  // date: new Date("2022-03-02"),
};
petArr.push(data1);
petArr.push(data2);
renderTableData(petArr);

function renderTableData(petArr) {
  let tableData = document.getElementById("tbody");
  tableData.innerHTML = "";

  for (let j = 0; j < petArr.length; j++) {
    let row = document.createElement("tr");

    // Lấy thông tin
    let dateGet = new Date();
    let dateAdded = `${
      dateGet.getDate() < 10 ? `0${dateGet.getDate()}` : `${dateGet.getDate()}`
    }/${
      dateGet.getMonth() + 1 < 10
        ? `0${dateGet.getMonth() + 1}`
        : `${dateGet.getMonth() + 1}`
    }/${dateGet.getFullYear()}`;

    // Đưa thông tin vào bảng
    row.innerHTML = `
      <th scope="row">${petArr[j].id}</th>
      <td>${petArr[j].petName}</td>
      <td>${petArr[j].age}</td>
      <td>${petArr[j].type}</td>
      <td>${petArr[j].weight} kg</td>
      <td>${petArr[j].petLength} cm</td>
      <td>${petArr[j].breed}</td>
      <td><i class="bi bi-square-fill" style="color: ${
        petArr[j].color
      }"></i></td>
      <td><i class = ${
        petArr[j].vaccinated === true
          ? `"bi bi-check-circle-fill"`
          : `"bi bi-x-circle-fill"`
      }></i></td>
      <td><i class = ${
        petArr[j].dewormed === true
          ? `"bi bi-check-circle-fill"`
          : `"bi bi-x-circle-fill"`
      }></i></td>
      <td><i class = ${
        petArr[j].sterilized === true
          ? `"bi bi-check-circle-fill"`
          : `"bi bi-x-circle-fill"`
      }></i></td>

      <td>${petArr[j].bmi ?? "?"} </td>
      <td>${dateAdded}</td>
      <td>
      <button class="btn btn-danger" onclick="deletePet('${
        petArr[j].id
      }')">Delete</button>
    </td>
      `;
    tableData.appendChild(row);
  }
}
//Nút submit
submitBtn.addEventListener("click", function () {
  data = {
    id: idInput.value,
    petName: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    petLength: parseInt(lengthInput.value),
    breed: breedInput.value,
    color: colorInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };
  console.log(data);
  // Xác thực dữ liệu
  function validateData(data) {
    //Kiểm tra id
    for (let i = 0; i < petArr.length; i++) {
      if (data.id === petArr[i].id) {
        alert("ID must be unique!");
        return false;
      }
    }
    //không hộp trống
    if (
      data.id === "" ||
      data.petName === "" ||
      !data.age ||
      !data.weight ||
      !data.petLength
    ) {
      alert("Please fill the blank!");
      return false;
    }
    //Tuổi, cân nặng , chiều dài
    else if (isNaN(data.age) || data.age < 1 || data.age > 15) {
      alert("Age must be a number and  between 1 and 15!");
      return false;
    } else if (isNaN(data.weight) || data.weight < 1 || data.weight > 15) {
      alert("Weight must be a number and between 1 and 15!");
      return false;
    } else if (
      isNaN(data.petLength) ||
      data.petLength < 1 ||
      data.petLength > 100
    ) {
      alert("Length  must be a number and between 1 and 100!");
      return false;
    } else if (data.type === "Select Type") {
      alert("Please select type");
      return false;
    } else if (data.breed === "Select Type") {
      alert("Please select breed");
      return false;
    } else {
      return true;
    }
  }

  if (validateData(data)) {
    petArr.push(data);
    renderTableData(petArr);
    // Xóa input khi submit
    document.getElementById("myForm").reset();
  }
});

// Xóa thông tin
function deletePet(x) {
  if (confirm("Are you sure?")) {
    for (let k = 0; k < petArr.length; k++) {
      if (petArr[k].id === x) {
        petArr.splice(k, 1);
        renderTableData(petArr);
      }
    }
  }
}

// Hiển thị các thú cưng khỏe mạnh
let healthyCheck = false;
let healthyPetArr = [];
healthyBtn.addEventListener("click", function () {
  tableBodyEl.innerHTML = "";
  if (!healthyCheck) {
    healthyBtn.textContent = "Show All Pet";
    healthyCheck = true;
    healthyPetArr = petArr.filter(function (pet) {
      return pet && pet.vaccinated && pet.dewormed && pet.sterilized;
    });
    renderTableData(healthyPetArr);
    console.log(healthyPetArr);
  } else {
    healthyBtn.textContent = "Show Healthy Pet";
    healthyCheck = false;
    renderTableData(petArr);
  }
});
// tính chỉ số BMI
btnCalculateBMI.addEventListener("click", calculateBMI);
function calculateBMI() {
  for (let i = 0; i < petArr.length; i++) {
    petArr[i].bmi =
      petArr[i].type === "Dog"
        ? ((petArr[i].weight * 703) / petArr[i].petLength ** 2).toFixed(2) //bmi chó
        : ((petArr[i].weight * 886) / petArr[i].petLength ** 2).toFixed(2); //bmi mèo
  }
  renderTableData(petArr);
}
