import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { openModal, closeModal, handleOverlayClick } from './utils.js';

const initialCards = [
    {
        name: "Vale de Yosemite",
        link: "./assets/kirill-pershin-1088404-unsplash.jpg"
    },
    {
        name: "Lago Louise",
        link: "./assets/kirill-pershin-1404681-unsplash.png"
    },
    {
        name: "Montanhas Carenadas",
        link: "./assets/kirill-pershin-1556355-unsplash.png"
    },
    {
        name: "Latemar",
        link: "./assets/kirill-pershin-1404681-unsplash (1).png"
    },
    {
        name: "Parque Nacional de Vanoise",
        link: "./assets/kirill-pershin-1556355-unsplash (1).png"
    },
    {
        name: "Lago di Braies",
        link: "./assets/kirill-pershin-1088404-unsplash.png"
    }
];

const validationConfig = {
    formSelector: ".modal-form",
    inputSelector: ".form-input",
    submitButtonSelector: ".save-button",
    inactiveButtonClass: "save-button_disabled",
    inputErrorClass: "form-input_type_error",
    errorClass: "form-input-error_visible"
};

const profileModal = document.getElementById('profileModal');
const addCardModal = document.getElementById('addCardModal');
const imageModal = document.getElementById('imageModal');
const closeModalButton = document.getElementById('closeModal');
const closeAddCardModalButton = document.getElementById('closeAddCardModal');
const closeImageModalButton = document.getElementById('closeImageModal');
const editProfileBtn = document.getElementById('editProfileBtn');
const editIcon = document.getElementById('editIcon');
const elementsListContainer = document.querySelector('.elements__list');

const profileName = document.querySelector('.profile-name');
const profileOccupation = document.querySelector('.profile-occupation');
const nameInput = document.getElementById('nameInput');
const occupationInput = document.getElementById('occupationInput');
const profileForm = document.getElementById('profileForm');

const addCardForm = document.getElementById('addCardForm');
const cardTitleInput = document.getElementById('cardTitleInput');
const cardImageInput = document.getElementById('cardImageInput');

const profileFormValidator = new FormValidator(validationConfig, profileForm);
const addCardFormValidator = new FormValidator(validationConfig, addCardForm);

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

function renderCard(cardData) {
    const card = new Card(cardData, '#card-template');
    const cardElement = card.generateCard();
    elementsListContainer.prepend(cardElement);
}

function openProfileModal() {
    const nameText = profileName.childNodes[0].nodeValue.trim();
    nameInput.value = nameText;
    occupationInput.value = profileOccupation.textContent.trim();
    profileFormValidator.resetValidation();
    openModal(profileModal);
}

function openAddCardModal() {
    addCardForm.reset();
    addCardFormValidator.resetValidation();
    openModal(addCardModal);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const newName = nameInput.value.trim();
    const newOccupation = occupationInput.value.trim();
    
    if (newName !== '') {
        localStorage.setItem('profileName', newName);
        profileName.childNodes[0].nodeValue = newName + ' ';
    }
    
    if (newOccupation !== '') {
        localStorage.setItem('profileOccupation', newOccupation);
        profileOccupation.textContent = newOccupation;
    }
    closeModal(profileModal);
}

function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    const newCard = {
        name: cardTitleInput.value.trim(),
        link: cardImageInput.value.trim()
    };
    renderCard(newCard);
    closeModal(addCardModal);
}

function loadSavedProfileInfo() {
    const savedName = localStorage.getItem('profileName');
    const savedOccupation = localStorage.getItem('profileOccupation');
        
    if (savedName) {
        profileName.childNodes[0].nodeValue = savedName + ' ';
        nameInput.value = savedName;
    }
        
    if (savedOccupation) {
        profileOccupation.textContent = savedOccupation;
        occupationInput.value = savedOccupation;
    }
}

editIcon.addEventListener('click', openProfileModal);
editProfileBtn.addEventListener('click', openAddCardModal);
closeModalButton.addEventListener('click', () => closeModal(profileModal));
closeAddCardModalButton.addEventListener('click', () => closeModal(addCardModal));
closeImageModalButton.addEventListener('click', () => closeModal(imageModal));

profileForm.addEventListener('submit', handleProfileFormSubmit);
addCardForm.addEventListener('submit', handleAddCardFormSubmit);

profileModal.addEventListener('click', (evt) => {
    handleOverlayClick(profileModal, evt);
});

addCardModal.addEventListener('click', (evt) => {
    handleOverlayClick(addCardModal, evt);
});

imageModal.addEventListener('click', (evt) => {
    handleOverlayClick(imageModal, evt);
});

initialCards.forEach(renderCard);
loadSavedProfileInfo();