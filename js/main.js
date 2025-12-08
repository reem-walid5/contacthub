// inputs
var fullname = document.getElementById("fullname");
var phoneNumber = document.getElementById("phoneNumber");
var emailAddress = document.getElementById("emailAddress");
var Address = document.getElementById("Address");
var Group = document.getElementById("Group");
var Notes = document.getElementById("Notes");
var fav = document.getElementById("fav");
var eme = document.getElementById("eme");
var editbtn = document.getElementById("editbtn");
var updatebtn = document.getElementById("updatebtn");
var Search = document.getElementById("Search");
// initial the list of contacts
var contactsList = JSON.parse(localStorage.getItem("contacts")) || [];
// variables
var favCount = 0;
var emecount = 0;
var myIndex;
// card body
var cardbody = document.getElementById("cardBody");
var total = document.getElementById("Total");
var favcontact = document.getElementById("favbody");
var emecontact = document.getElementById("emebody");
// add contacts
function saveinfo(){
    // check name input is true
    if (fullname.classList.contains("is-valid")) {
    // check phone number input is true
        if (phoneNumber.classList.contains("is-valid")){
            var contacts ={
                name:fullname.value,
                phone:phoneNumber.value,
                email:emailAddress.value,
                address:Address.value,
                group:Group.value,
                notes:Notes.value,
                fav:fav.checked,
                eme:eme.checked,
                search:Search.value,
                image:userImagePreview.src.includes("data:image") ? userImagePreview.src : "",
            }
    // close form 
    var modal = bootstrap.Modal.getInstance(document.getElementById("exampleModal"));
    // call functions
    contactsList.push(contacts)
    localStorage.setItem("contacts", JSON.stringify(contactsList));
    updateFavSection(); 
    updateFavCount();
    updateemesection();
    updateemecount();
    displayContacts();
    totalContacts();
    modal.hide();
    resetContacts()
    success();
        }else{
        Swal.fire({
        icon: "error",
        title: "Missing phone",
        text: "Please enter a phone number!",
    });
        }
    }else{
        Swal.fire({
        icon: "error",
        title: "Missing Name",
        text: "Please enter a name for the contact!",
    });
    }
}
// display contacts
function displayContacts() {
    console.log("contacts",contactsList);
    var card = ''
    for (let i = 0; i < contactsList.length; i++) {
        console.log(contactsList[i]);
        card +=`
        <div class="col-12 col-sm-6">
                                <div class="p-2 rounded-3 card">
                                <div class="card-body d-flex flex-column gap-3">
                                    <div class="d-flex align-items-center gap-3">${contactsList[i].image? `<img src="${contactsList[i].image}" class="rounded-circle" style="width:40px; height:40px; object-fit:cover;">`: `<div class="d-flex align-items-center justify-content-center mix-colors text-white item position-relative">${contactsList[i].name.split(' ').map(n => n[0]).join('').toUpperCase()}</div>`}
                                        <div class="d-flex flex-column gap-2">
                                            <h6 class="m-0">${contactsList[i].name}</h6>
                                            <div class="d-flex align-items-center gap-1">
                                                <div class="d-flex align-items-center justify-content-center item-icon">
                                                    <i class="fa-solid fa-phone"></i>
                                                </div>
                                                <span class="grey meduim-font fw-medium">${contactsList[i].phone}</span>
                                            </div>
                                        </div>
                                        <div class="${contactsList[i].fav ? `fav d-flex align-items-center justify-content-center`: `d-none`}">
                                            <i class="fa-solid fa-star small-font text-white"></i>
                                        </div>
                                        <div class="${contactsList[i].eme ? `fav emergency d-flex align-items-center justify-content-center`:`d-none`}">
                                            <i class="fa-solid fa-heart-pulse small-font text-white"></i>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center gap-2">
                                        <div class="d-flex align-items-center justify-content-center item-icon item-icon2 lighr-purple ${contactsList[i].email ? '' : 'd-none'}">
                                            <i class="fa-solid fa-envelope purple"></i>
                                        </div>
                                        <span class="grey meduim-font fw-medium ">${contactsList[i].email}</span>
                                    </div>
                                    <div class="d-flex align-items-center gap-2">
                                        <div class="d-flex align-items-center justify-content-center item-icon item-icon2 lighr-green ${contactsList[i].address ? '' : 'd-none'}">
                                            <i class="fa-solid fa-location-dot green"></i>
                                        </div>
                                        <span class="grey meduim-font fw-medium ">${contactsList[i].address}</span>
                                    </div>
                                    <div class="d-flex align-items-center gap-2">
                                        <div class="d-flex align-items-center gap-2">
                                        <div class="d-flex align-items-center justify-content-center px-2 rounded-2 lighr-purple">
                                            <span class="purple fw-semibold small-font">${contactsList[i].group}</span>
                                        </div>
                                        </div>
                                        <div class="${contactsList[i].eme ? `d-flex align-items-center gap-2`:`d-none`}">
                                        <div class="d-flex align-items-center justify-content-center px-2 rounded-2 lighr-red">
                                            <span class="text-danger fw-semibold small-font"><i class="fa-solid fa-heart-pulse"></i>Emergency</span>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer d-flex align-items-center justify-content-between">
                                    <div class="d-flex align-items-center gap-2">
                                        <a href="tel:${contactsList[i].phone}">
                                        <div class="small-icons light-green d-flex align-items-center justify-content-center">
                                            <i class="fa-solid fa-phone green"></i>
                                        </div>
                                        </a>
                                        <a href="mailto:${contactsList[i].phone}">
                                        <div class="small-icons b-purple d-flex align-items-center justify-content-center">
                                            <i class="fa-solid fa-envelope purple"></i>
                                        </div>
                                        </a>
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <div class="d-flex align-items-center">
                                        <div class="d-flex align-items-center justify-content-center b-icon star" onclick="toggleFav(${i})">
                                        <i class="${contactsList[i].fav ? 'fa-solid fa-star text-warning' : 'fa-regular fa-star grey'}"></i>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <div class="d-flex align-items-center justify-content-center b-icon" onclick="toggleeme(${i})">
                                        <i class="${contactsList[i].eme ? `fa-solid fa-heart-pulse text-danger` : `fa-regular fa-heart grey`}"></i>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <div class="d-flex align-items-center justify-content-center b-icon">
                                        <i class="fa-solid fa-pen-alt grey" onclick="editcontact(${i})"></i>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <div class="d-flex align-items-center justify-content-center b-icon red" onclick="removecontact(${i})">
                                        <i class="fa-solid fa-trash grey "></i>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                    
                                </div>
                            </div>`
    }
    cardbody.innerHTML =card;
}
//total contacts
function totalContacts() {
    total.innerHTML =`
                    <div class="d-flex align-items-center bg-white rounded-4 p-4 small-card gap-3">
                        <div class="d-flex align-items-center justify-content-center box">
                            <i class="fa-solid fa-users text-white"></i>
                        </div>
                        <div class="d-flex flex-column">
                            <p class="grey m-0">Total</p>
                            <h3 class="m-0">${contactsList.length}</h3>
                        </div>
                    </div>
    `
    
}
// message success
function success() {
    Swal.fire({
  title: "Added",
  icon: "success",
  draggable: true
}); 
}
// reset contacts
function resetContacts() {
    fullname.value =""
    phoneNumber.value =""
    emailAddress.value =""
    Address.value =""
    Group.value =""
    Notes.value =""
    fav.checked =false
    eme.checked =false  
    userImagePreview.src = "";
    userImageInput.value = "";
}
// remove contact
function removecontact(index) {
// sweet alert
    Swal.fire({
        title: "Delete Contact?",
        text: `Are you sure you want to delete ${contactsList[index].name}? This action cannot be undone.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
// remove contact
        if (result.isConfirmed) {
            contactsList.splice(index, 1);
            localStorage.setItem("contacts", JSON.stringify(contactsList));
            displayContacts();
            totalContacts();
            updateFavSection();
            updateFavCount();
            updateemesection();
            updateemecount();
//message remove 
            Swal.fire({
                title: "Deleted!",
                text: "The contact has been deleted.",
                icon: "success"
            });
        }
    });
}
// update favourite section 
function updateFavSection() {
    favcontact.innerHTML = ''; 
    for (let i = 0; i < contactsList.length; i++) {
        if (contactsList[i].fav === true) {
            favcontact.innerHTML += `
            <div class="w-100">
                <div class="d-flex align-items-center justify-content-between b-light p-2 rounded-2 mb-3">
                    <div class="d-flex align-items-center gap-2">
                        ${contactsList[i].image? `<img src="${contactsList[i].image}" class="rounded-circle style-image2">`: `<div class="d-flex align-items-center justify-content-center small-icons mix-red text-white fw-semibold">${contactsList[i].name.split(' ').map(n => n[0]).join('').toUpperCase()}</div>`}
                        <div class="d-flex flex-column">
                            <h6 class="m-0">${contactsList[i].name}</h6>
                            <span class="grey small-font">${contactsList[i].phone}</span>
                        </div>
                    </div>
                    <a href="tel:${contactsList[i].phone}">
                        <div class="small-icons light-green d-flex align-items-center justify-content-center">
                            <i class="fa-solid fa-phone green"></i>
                        </div>
                    </a>
                </div>
            </div>`;
        }
    }
}
// update favourite count
function updateFavCount() {
    let count = 0;
    for (let i = 0; i < contactsList.length; i++) {
        if (contactsList[i].fav) count++;
    }
    favCount = count;
    document.getElementById("favCount").innerHTML = favCount;
}
// favourite contact
function toggleFav(index) {
    contactsList[index].fav = !contactsList[index].fav;
    localStorage.setItem("contacts", JSON.stringify(contactsList));
    updateFavCount();
    displayContacts();
    updateFavSection();
}
// update emergency section
function updateemesection() {
    emecontact.innerHTML=``;
    for (let i = 0; i < contactsList.length; i++) {
        if (contactsList[i].eme === true) {
            emecontact.innerHTML +=`
            <div class="w-100">
                                    <div class="d-flex align-items-center justify-content-between b-light-red p-2 rounded-2 mb-2">
                                        <div class="d-flex align-items-center gap-2">
                                            ${contactsList[i].image? `<img src="${contactsList[i].image}" class="rounded-circle style-image2">`: `<div class="d-flex align-items-center justify-content-center small-icons mix-red text-white fw-semibold">${contactsList[i].name.split(' ').map(n => n[0]).join('').toUpperCase()}</div>`}
                                            <div class="d-flex flex-column">
                                                <h6 class="m-0">${contactsList[i].name}</h6>
                                                <span class="grey small-font">${contactsList[i].phone}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span class="grey"></span>
                                        </div>
                                        <a href="tel:${contactsList[i].phone}">
                                        <div class="small-icons light-red d-flex align-items-center justify-content-center">
                                            <i class="fa-solid fa-phone red"></i>
                                        </div>
                                        </a> 
                                    </div>
                                </div>
            `;   
        }
    }
    
}
// update emergency count
function updateemecount() {
    let count = 0;
    for (let i = 0; i < contactsList.length; i++) {
        if(contactsList[i].eme) count++;    
    }
    emecount = count;
    document.getElementById("emecount").innerHTML = emecount;
}
// emergency contact
function toggleeme(index) {
    contactsList[index].eme = !contactsList[index].eme;
    localStorage.setItem("contacts", JSON.stringify(contactsList));
    updateemecount();
    displayContacts();
    updateemesection();
}
// search contact 
function searchinput(){
    var word =Search.value;
    var card = ''
    for (let i = 0; i < contactsList.length; i++) {
        if (contactsList[i].name.toLowerCase().includes(word.toLowerCase())||contactsList[i].phone.toLowerCase().includes(word.toLowerCase())||contactsList[i].email.toLowerCase().includes(word.toLowerCase())) {
            console.log(contactsList[i]);
        card +=`
        <div class="col-12 col-sm-6">
                                <div class="p-2 rounded-3 card">
                                <div class="card-body d-flex flex-column gap-3">
                                    <div class="d-flex align-items-center gap-3">
                                        <div class="d-flex align-items-center justify-content-center mix-colors text-white item position-relative">MM</div>
                                        <div class="d-flex flex-column gap-2">
                                            <h6 class="m-0">${contactsList[i].name}</h6>
                                            <div class="d-flex align-items-center gap-1">
                                                <div class="d-flex align-items-center justify-content-center item-icon">
                                                    <i class="fa-solid fa-phone"></i>
                                                </div>
                                                <span class="grey meduim-font fw-medium">${contactsList[i].phone}</span>
                                            </div>
                                        </div>
                                        <div class="${contactsList[i].fav ? `fav d-flex align-items-center justify-content-center`: `d-none`}">
                                            <i class="fa-solid fa-star small-font text-white"></i>
                                        </div>
                                        <div class="${contactsList[i].eme ? `fav emergency d-flex align-items-center justify-content-center`:`d-none`}">
                                            <i class="fa-solid fa-heart-pulse small-font text-white"></i>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center gap-2">
                                        <div class="d-flex align-items-center justify-content-center item-icon item-icon2 lighr-purple">
                                            <i class="fa-solid fa-envelope purple"></i>
                                        </div>
                                        <span class="grey meduim-font fw-medium ">${contactsList[i].email}</span>
                                    </div>
                                    <div class="d-flex align-items-center gap-2">
                                        <div class="d-flex align-items-center justify-content-center item-icon item-icon2 lighr-green">
                                            <i class="fa-solid fa-location-dot green"></i>
                                        </div>
                                        <span class="grey meduim-font fw-medium ">${contactsList[i].address}</span>
                                    </div>
                                    <div class="d-flex align-items-center gap-2">
                                        <div class="d-flex align-items-center gap-2">
                                        <div class="d-flex align-items-center justify-content-center px-2 rounded-2 lighr-purple">
                                            <span class="purple fw-semibold small-font">${contactsList[i].group}</span>
                                        </div>
                                        </div>
                                        <div class="${contactsList[i].eme ? `d-flex align-items-center gap-2`:`d-none`}">
                                        <div class="d-flex align-items-center justify-content-center px-2 rounded-2 lighr-red">
                                            <span class="text-danger fw-semibold small-font"><i class="fa-solid fa-heart-pulse"></i>Emergency</span>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer d-flex align-items-center justify-content-between">
                                    <div class="d-flex align-items-center gap-2">
                                        <a href="tel:${contactsList[i].phone}">
                                        <div class="small-icons light-green d-flex align-items-center justify-content-center">
                                            <i class="fa-solid fa-phone green"></i>
                                        </div>
                                        </a>
                                        <a href="mailto:${contactsList[i].phone}">
                                        <div class="small-icons b-purple d-flex align-items-center justify-content-center">
                                            <i class="fa-solid fa-envelope purple"></i>
                                        </div>
                                        </a>
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <div class="d-flex align-items-center">
                                        <div class="d-flex align-items-center justify-content-center b-icon star" onclick="toggleFav(${i})">
                                        <i class="${contactsList[i].fav ? 'fa-solid fa-star text-warning' : 'fa-regular fa-star grey'}"></i>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <div class="d-flex align-items-center justify-content-center b-icon" onclick="toggleeme(${i})">
                                        <i class="${contactsList[i].eme ? `fa-solid fa-heart-pulse text-danger` : `fa-regular fa-heart grey`}"></i>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <div class="d-flex align-items-center justify-content-center b-icon">
                                        <i class="fa-solid fa-pen-alt grey" onclick="editcontact(${i})"></i>
                                        </div> 
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <div class="d-flex align-items-center justify-content-center b-icon red" onclick="removecontact(${i})">
                                        <i class="fa-solid fa-trash grey "></i>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                    
                                </div>
                            </div>`
            
        }
    }
    if (card ==="") {
        cardbody.innerHTML =`
        <div class="col-12">
                        <div class="d-flex flex-column align-items-center justify-content-center">
                            <h2 class="fw-semibold text-secondary m-0">No contacts found</h2>
                            <p class="grey m-0">Click "Add Contact" to get started</p>
                        </div>
                    </div>
        `
        return; 
    }
    cardbody.innerHTML =card;

}
// regix input
function validateinput(element) {
    var regex ={
        fullname:/^[a-zA-Z ]{2,50}$/,
        phoneNumber:/^(01|201|\+201)(1|2|0|5)[0-9]{8}$/,
        emailAddress:/^[a-zA-Z]\w{2,20}@[a-zA-Z]{2,10}\.com$/
    }
    if (regex[element.id].test(element.value) == true) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        element.nextElementSibling.classList.add("d-none");
        
    }else{
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        element.nextElementSibling.classList.remove("d-none");
    }
}
// edit contact
function editcontact(index) {
    myIndex = index;
    fullname.value = contactsList[index].name;
    phoneNumber.value = contactsList[index].phone;
    emailAddress.value = contactsList[index].email;
    Address.value = contactsList[index].address;
    Group.value = contactsList[index].group;
    Notes.value = contactsList[index].notes;
    fav.checked = contactsList[index].fav;
    eme.checked = contactsList[index].eme;
    editbtn.classList.add("d-none");
    updatebtn.classList.remove("d-none");  
    var modal = new bootstrap.Modal(document.getElementById("exampleModal"));
    modal.show(); 
}
// update contact
function updatecontact() {
    contactsList[myIndex].name = fullname.value;
    contactsList[myIndex].phone = phoneNumber.value;
    contactsList[myIndex].email = emailAddress.value;
    contactsList[myIndex].address = Address.value;
    contactsList[myIndex].group = Group.value;
    contactsList[myIndex].notes = Notes.value;
    contactsList[myIndex].fav = fav.checked;
    contactsList[myIndex].eme = eme.checked;
    localStorage.setItem("contacts", JSON.stringify(contactsList));
    editbtn.classList.remove("d-none");
    updatebtn.classList.add("d-none");
    displayContacts();
    updateFavSection();
    updateFavCount();
    updateemesection();
    updateemecount();
    resetContacts();
    var modalEl = document.getElementById("exampleModal");
    var modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.hide();
    Swal.fire({
    title: "Updated",
    icon: "success",
    draggable: true
    });
}
// call functions for local storage
displayContacts();
totalContacts();
updateFavSection();
updateFavCount();
updateemesection();
updateemecount();



