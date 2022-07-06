let cl = console.log;

const tbody = document.getElementById("tbody");
const imgarr = document.getElementById("imgarr");
const  loader = document.getElementById('loader')


let apiUrl = "https://fakestoreapi.com/products";

let newArr = [];
let PushDataArr = [];

function fetchData(methodName, url, tempFun, data) {
    loader.classList.remove('d-none');
  let xhr = new XMLHttpRequest();

  xhr.open(methodName, url);

  xhr.onload = function () {
    cl(xhr.status);
    if ((xhr.status === 200 || xhr.status === 201) && xhr.readyState === 4) {
        loader.classList.add('d-none');
      if (methodName === "GET") {
        newArr = JSON.parse(xhr.response);
        tempFun(newArr);
        /*  cl(newArr) */
      }
    }
    if (xhr.status === 404) {
      alert("page not found");
    }
  };
  xhr.send(data);
}

fetchData("GET", apiUrl, templating);

function templating(arr) {
  let result = "";

  arr.forEach((ele) => {
    /* cl(ele) */
    result += `
                <div class="col-md-3 col-sm-4">
                    <div class="card mb-4" data-id ="${ele.id}">
                        <div class="card-body">
                            <figure class="myCard">
                                <img src="${ele.image}" alt="">   
                            </figure>
                            <div class="mt-2 text-right">
                                <button class="btn btn-primary btn-lg addBtn" onclick="onAddClickHandler(this)">Add</button>
                                <button class="btn btn-danger btn-lg d-none removeBtn" onclick="onRemoveClickHandler(this)">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
        `;
  });
  imgarr.innerHTML = result;
}

function tableData(TableArr) {
  let result = "";
  TableArr.forEach((ele) => {
    result += `
            <tr>
                <td>${ele.id}</td>
                <td><img src="${ele.image}" alt=""></td>
                <td>${ele.title}</td>
            </tr>
        
        `;
  });
 
  tbody.innerHTML = result;
}


const onAddClickHandler = (e) => {
  e.classList.add("d-none");
  e.nextElementSibling.classList.remove("d-none");
  /*  cl(e.closest('.card').dataset.id) */
  let getId = +e.closest(".card").dataset.id;
  cl(getId);
  localStorage.setItem("setId", getId);


  let getObj = newArr.find((o) => {
    return getId === o.id;
  });
  cl(getObj);

  let newObj = {
    id: getObj.id,
    image: getObj.image,
    title: getObj.title,
  };

  cl(newObj);
  PushDataArr.push(newObj);
  cl(PushDataArr);

 /*  localStorage.setItem("storeData", JSON.stringify(PushDataArr));
  let getLocalData = JSON.parse(localStorage.getItem("storeData"));
  cl(getLocalData);
 */
  tableData(PushDataArr);
  /* tableData(getLocalData) */
  e.addEventListener("submit", tableData);

  cl(e);
};

const onRemoveClickHandler = (r) => {
    r.classList.add('d-none');
    r.previousElementSibling.classList.remove('d-none');
  let Id = +r.closest(".card").dataset.id;
  PushDataArr = PushDataArr.filter(ele => ele.id != Id)
  cl(PushDataArr);
  tableData(PushDataArr);

  r.addEventListener("click", tableData);
};
