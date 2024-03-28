'use strict'

/*----------------------------------- */
/*------------Imported Files--------- */
/*----------------------------------- */

import Subscriber from './subscriber.js';
import { select, listen, getElement, selectAll, create } from './utils.js';


/*----------------------------------- */
/*------------------DOM-------------- */
/*----------------------------------- */

const field = select('textarea');
const backUp = field.getAttribute('placeholder');
const btn = select('.btn');
const clear = getElement('clear');
const submit = select('#submit');
const comments = getElement('comment-box');
const inputFile = getElement('image');
const fileNameDisplay = getElement('file-name-display');
const modal =  getElement('modal');
const profileCard = getElement('profile-card');
const profilePic = getElement('profile-pic');
const closeButton = getElement('close');
const commentBox = getElement('comment-box');

const comments_arr = [];

/*----------------------------------- */
/*-------------TextArea--------------- */
/*----------------------------------- */


const display_comments = () => {
  let list = create('ul');
  comments_arr.slice().reverse().forEach(comment => {
    const commentElement = create('li');
    commentElement.innerHTML = comment;
    const commentsHeader = createCommentsHeader(); 
    commentElement.prepend(commentsHeader);
    list.appendChild(commentElement);
  });
  commentBox.innerHTML = '';
  commentBox.appendChild(list);

  const headers = selectAll('.comments-header');
  headers.forEach(header => {
    header.style.display = 'flex';
  });
}


function handleSubmit(event) {
    event.preventDefault();
    const commentText = getElement('comment').value;
    const imageFile = getElement('image').files[0];
    if (commentText.trim() !== '' || imageFile) {
      let commentHTML = `<p>${commentText}</p>`;
      if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
            commentHTML += `<img src="${event.target.result}" alt="User Image">`;
            comments_arr.push(commentHTML);
            display_comments();
        }
        reader.readAsDataURL(imageFile);
    } else {
        comments_arr.push(commentHTML);
        display_comments();
    }
  
    getElement('comment').value = '';
    getElement('image').value = '';
  
    fileNameDisplay.textContent = 'Choose a file';
  }
}


/*----------------------------------- */
/*-------------Comment-box------------ */
/*----------------------------------- */

const commentsHeader = createCommentsHeader();
comments.insertBefore(commentsHeader, comments.firstChild);


function updateFileNameDisplay() {
    if (inputFile.files.length > 0) {
        fileNameDisplay.textContent = inputFile.files[0].name;
    } else {
        fileNameDisplay.textContent = 'Choose a file';
    }
}
  


function createCommentsHeader() {
  const commentsHeader = create('div');
  commentsHeader.classList.add('comments-header');
  const headerLeft = createHeaderLeft();
  const headerRight = createHeaderRight();
  commentsHeader.appendChild(headerLeft);
  commentsHeader.appendChild(headerRight);

  return commentsHeader;
}


function createHeaderLeft() {
  const headerLeft = create('div');
  headerLeft.classList.add('header-left');
  const imageIcon = create('img');
  imageIcon.src = './assets/img/beautiful-girl-avatar.avif';
  imageIcon.alt = 'Image Icon';
  headerLeft.appendChild(imageIcon);
  const textElement = create('span');
  textElement.textContent = 'Manpreet Kaur';
  headerLeft.appendChild(textElement);

  return headerLeft;
}


function createHeaderRight() {
  const headerRight = create('div');
  headerRight.classList.add('header-right');
  const currentDate = create('span');
  currentDate.id = 'current-date';
  headerRight.appendChild(currentDate);
  const currentDateObj = new Date();
  const dateString = currentDateObj.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric' });
  currentDate.textContent = dateString;

  return headerRight;
}


function setCurrentDate() {
    var currentDate = new Date();
    var dateString = currentDate.toDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    getElement("current-date").textContent = dateString;
    }
    

/*----------------------------------- */
/*-------------Profile-Model--------- */
/*----------------------------------- */


function displayModal() {
    modal.style.display = 'block';
    populateProfileCard();
   }
  
  
  function closeModal() {
    modal.style.display = 'none';
  }


const subscriber = new Subscriber(
    123,
    'Manpreet Dhillon',
    'dhillxnm',
    'manpreet22@gmail.com',
    ['sof. Dev.'],
    ['Code with andre'],
    true
  );
  

  function populateProfileCard() {
    const iconMap = {
        userName: 'fa fa-user',
        email: 'fa fa-envelope',
        pages: 'fa fa-file',
        groups: 'fa fa-users',
        canMonetize: 'fa-solid fa-sack-dollar'
    };

    profileCard.innerHTML = `
    <div class="profile-pic">
      <img src="./assets/img/beautiful-girl-avatar.avif" alt="Profile Picture" class="profile-img">
    </div>
    <h2>${subscriber.name}</h2>
    <p data-field="userName">${subscriber.userName}</p>
    <p data-field="email">${subscriber.email}</p>
    <p data-field="pages">Pages: ${subscriber.pages.join(', ')}</p>
    <p data-field="groups">Groups: ${subscriber.groups.join(', ')}</p>
    <p data-field="canMonetize" class="money">Can Monetize: ${subscriber.canMonetize ? 'Yes' : 'No'}</p>
    `;

    const paragraphs = profileCard.querySelectorAll('p');
    paragraphs.forEach(p => {
    const fieldName = p.dataset.field;
    const icon = document.createElement('i');
    icon.className = iconMap[fieldName];
    p.prepend(icon);
    });
}



/*----------------------------------- */
/*---------------Event-Listner------- */
/*----------------------------------- */

listen('click', getElement('submit'), handleSubmit);
listen('change', inputFile, updateFileNameDisplay);
listen("DOMContentLoaded", document, setCurrentDate);
listen('click', profilePic, displayModal);
listen('click', closeButton, closeModal);