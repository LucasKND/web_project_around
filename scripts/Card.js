export default class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._handleLikeClick();
        });

        this._deleteButton.addEventListener('click', () => {
            this._handleDeleteClick();
        });

        this._cardImage.addEventListener('click', () => {
            this._handleImageClick();
        });
    }

    _handleLikeClick() {
        this._likeButton.classList.toggle('element__like-button_active');
    }

    _handleDeleteClick() {
        this._element.remove();
        this._element = null;
    }

    _handleImageClick() {
        const imageModal = document.getElementById('imageModal');
        const modalImage = imageModal.querySelector('.modal-image');
        const modalImageCaption = imageModal.querySelector('.modal-image-caption');

        modalImage.src = this._link;
        modalImage.alt = this._name;
        modalImageCaption.textContent = this._name;

        imageModal.style.display = 'flex';
        document.addEventListener('keydown', this._handleEscapeKey);
    }

    _handleEscapeKey(evt) {
        if (evt.key === 'Escape') {
            const openedModal = document.querySelector('.modal-overlay[style*="flex"]');
            if (openedModal) {
                openedModal.style.display = 'none';
                document.removeEventListener('keydown', this._handleEscapeKey);
            }
        }
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.element__image');
        this._cardTitle = this._element.querySelector('.element__title');
        this._likeButton = this._element.querySelector('.element__like-button');
        this._deleteButton = this._element.querySelector('.element__delete-button');

        this._setEventListeners();

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardTitle.textContent = this._name;

        return this._element;
    }
}
