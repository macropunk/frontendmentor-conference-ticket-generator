const generateButton = document.getElementById("generate-button");
const avatarImageInput = document.getElementById("avatar-image");
const avatarIcon = document.getElementById("avatar-icon");

/* avatar input validator */
avatarImageInput.addEventListener("change", (event)=>{
    const reader = new FileReader();
    const file = event.target.files[0];
    /* max size that the avatar image can be (500KB) */
    const maxSize = 500 * 1024;

    const infoIcon = document.querySelector(".upload-file-info svg path")
    const avatarUploadInfo = document.querySelector(".upload-avatar-info");

    /* checks if there's a file and if the file's size is acceptable */
    if(file && file.size < maxSize){
        const avatarButtonsContainer = document.querySelector(".upload-avatar-button-container");
        const avatarUploadInfoP = document.querySelector(".image-upload-info");
        avatarButtonsContainer.style.display = "block";
        avatarUploadInfoP.style.display = "none";

        document.querySelector(".upload-avatar img").style.padding = 0;
        document.querySelector(".upload-avatar img").style.border = "1px solid gray";

        reader.onload = (event)=>{
            avatarIcon.src = event.target.result;
        }

        avatarUploadInfo.textContent = "Upload your photo (JPG or PNG, max size: 5MB)";
        avatarUploadInfo.style.color = "white";
        infoIcon.style.stroke = "white";

        avatarImageInput.style.display = "none";
        document.querySelector(".upload-avatar").style.outline = "none";
    }else if(!file){
        /* if the user doesnt select any image when clicking the "change avatar" button */
        avatarUploadInfo.textContent = "Make sure to select a valid image file!";
    }else{
        avatarUploadInfo.textContent = "File too large. Please upload a photo under 500KB";
        avatarUploadInfo.style.color = "hsl(7, 88%, 67%)";
        infoIcon.style.stroke = "hsl(7, 88%, 67%)";
        document.querySelector(".upload-avatar").style.outline = "1px solid red";
        avatarImageInput.value = "";
    }
    
    reader.readAsDataURL(file);
});

const changeAvatar = document.getElementById("change-avatar");
const removeAvatar = document.getElementById("remove-avatar");

changeAvatar.addEventListener("mouseover", ()=>{
    avatarImageInput.style.display = "block";
});
changeAvatar.addEventListener("mouseout", ()=>{
    avatarImageInput.style.display = "none";
});

/* resets the avatar upload input container when the "remove avatar" button is clicked */
removeAvatar.addEventListener("click", ()=>{
    const avatarButtonsContainer = document.querySelector(".upload-avatar-button-container");
    const avatarUploadInfoP = document.querySelector(".image-upload-info");
    avatarButtonsContainer.style.display = "none";
    avatarUploadInfoP.style.display = "block";
    avatarIcon.src = "assets/images/icon-upload.svg"
    document.querySelector(".upload-avatar img").style.padding = "10px";
    document.querySelector(".upload-avatar img").style.border = "none";
    avatarImageInput.style.display = "block";
    avatarImageInput.value = "";
});

/* prevents the page to reload when the form is sent */
const form = document.querySelector("form");
form.addEventListener("submit", function(event){
    event.preventDefault();
})

generateButton.addEventListener("click", ()=>{
    /* functions to check the form inputs validation */
    emailValidation()
    fullNameValidation()
    githubUsernameValidation()

    /* if all the inputs are valid the next page appears */
    if(form.checkValidity()){
        document.querySelector(".titles h2").innerHTML = `Congrats, <span style="background-image: linear-gradient(to right, hsl(7, 86%, 67%), hsl(0, 0%, 100%)); background-clip: text; color: transparent;">${fullName.value}</span>! Your ticket is ready.`;
        document.querySelector(".titles p").innerHTML = `We've emailed your ticket to <span style="color: hsl(7, 88%, 67%);">${email.value}</span> and will send updates in the run up to the event.`;
        form.style.display = "none";
        const ticketContainer = document.querySelector(".ticket-container");
        ticketContainer.style.display = "block";
        document.querySelector(".titles p").style.marginBottom = "60px";

        const userTicketAvatar = document.getElementById("user-ticket-avatar");
        const userFullName = document.getElementById("user-full-name");
        const userGithubAccount = document.getElementById("user-github-account");


        userTicketAvatar.src = avatarIcon.src;
        userFullName.textContent = fullName.value;
        userGithubAccount.textContent = githubUsername.value;

        document.documentElement.scrollTop = 0;
    }else{
        window.alert("Make sure that all the fields are filled in!");
    }
});

const fullName = document.getElementById("full-name");
function fullNameValidation() {
    if(fullName.value === ""){
        fullName.style.outline = "1px solid red";
    }else{
        fullName.style.outline = "none";
    }
}

const email = document.getElementById("email");
function emailValidation() {
    if(email.validity.valid){
        document.querySelector(".invalid-email-alert").style.display = "none";
        email.style.outline = "none";
    }else{
        document.querySelector(".invalid-email-alert").style.display = "flex";
        email.style.outline = "1px solid red";
        email.value = "";
    }
};

const githubUsername = document.getElementById("github-username");
function githubUsernameValidation() {
    if(githubUsername.value === ""){
        githubUsername.style.outline = "1px solid red";
    }else{
        githubUsername.style.outline = "none";
    }
}

/* github.com/macropunk */
