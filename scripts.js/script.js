document.addEventListener('DOMContentLoaded', () =>{
    const profileModal = document.getElementById('profileModal');
    const closeModal = document.getElementById('closeModal');
    const editProfileBtn = document.getElementById('editProfileBtn');
    const likeButtons = document.querySelectorAll('.element__like-button');
    const verifiedIcon = document.querySelector('.verified-icon');

    const profileName = document.querySelector('.profile-name');
    const profileOccupation = document.querySelector('.profile-occupation');
    const nameInput = document.getElementById('nameInput');
    const occupationInput = document.getElementById('occupationInput');
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    
    function openModalF(){
        nameInput.value = profileName.textContent.trim();
        occupationInput.value = profileOccupation.textContent.trim();
        profileModal.style.display = 'flex';   
    }
 
    function closeModalF(){
        profileModal.style.display = 'none';
    }

    function likeBtnBlack(event){
        event.target.classList.toggle('black');
    }

    verifiedIcon.addEventListener('click', openModalF);
    closeModal.addEventListener('click', closeModalF);
    
    likeButtons.forEach(button =>{
        button.addEventListener('click', likeBtnBlack);
    });
});