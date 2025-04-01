const profileModal = document.getElementById('profileModal');
const closeModal = document.getElementById('closeModal');
const editProfileBtn = document.getElementById('editProfileBtn');
const editIcon = document.getElementById('editIcon'); // Alterado de verifiedIcon para editIcon
const likeButtons = document.querySelectorAll('.element__like-button');

const profileName = document.querySelector('.profile-name');
const profileOccupation = document.querySelector('.profile-occupation');
const nameInput = document.getElementById('nameInput');
const occupationInput = document.getElementById('occupationInput');
const saveProfileBtn = document.getElementById('saveProfileBtn');
    
function openModalProfile(){
    const nameText = profileName.childNodes[0].nodeValue.trim();
    nameInput.value = nameText;
    occupationInput.value = profileOccupation.textContent.trim();
    profileModal.style.display = 'flex';  
}
 
function closeModalProfile(){
    profileModal.style.display = 'none';
}

function likeBtnBlack(event){
    event.target.classList.toggle('black');
}

function saveNewProfile(){
    const newName = nameInput.value.trim(); // Corrigido: nameInput, não nameImput
    const newOccupation = occupationInput.value.trim();
    
    if (newName !== ''){
        localStorage.setItem('profileName', newName);
        profileName.childNodes[0].nodeValue = newName + ' ';
    }
    
    if(newOccupation !== ''){
        localStorage.setItem('profileOccupation', newOccupation);
        profileOccupation.textContent = newOccupation; // Corrigido: profileOccupation, não newOccupation
    }
    closeModalProfile();
}

function loadSavedProfileInfo() {
    const savedName = localStorage.getItem('profileName');
    const savedOccupation = localStorage.getItem('profileOccupation');
        
    if (savedName) {
        profileName.childNodes[0].nodeValue = savedName + ' ';
    }
        
    if (savedOccupation) {
        profileOccupation.textContent = savedOccupation;
    }
}

// Alterado o event listener para o novo editIcon
editIcon.addEventListener('click', openModalProfile);
closeModal.addEventListener('click', closeModalProfile);
saveProfileBtn.addEventListener('click', saveNewProfile);
    
likeButtons.forEach(button => {
    button.addEventListener('click', likeBtnBlack);
});

document.addEventListener('DOMContentLoaded', loadSavedProfileInfo);