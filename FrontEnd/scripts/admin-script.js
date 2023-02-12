"use strict";
const sideBarLinks = document.querySelector(".side-bar_links");
const hero = document.querySelector(".hero");
const partner = document.querySelector(".partner-link");
const main = document.querySelector(".main");
const work = document.querySelector(".work-link");
const workDescription = document.querySelector(".work-description-link");
const helpDescription = document.querySelector(".help-description");
const helpSupport = document.querySelector(".help-support");
const helpInvolved = document.querySelector(".help-involved");
const messages = document.querySelector(".message");
const testimonials = document.querySelector(".testimonials");
const users = document.querySelector(".users");
const namePlaceholder = document.getElementById("username");
const logout = document.getElementById("logout-btn");

class App {
    show = false;
    selectedElement;
    constructor() {
        sideBarLinks.addEventListener("click", this.slideDown.bind(this));
        hero.addEventListener("click", this.renderHero.bind(this));
        partner.addEventListener("click", this.renderPartners.bind(this));
        workDescription.addEventListener(
            "click",
            this.renderWorkDescription.bind(this)
        );
        work.addEventListener("click", this.renderworks.bind(this));
        messages.addEventListener("click", this.rendermessages.bind(this));

        users.addEventListener("click", this.renderUser.bind(this));
        logout.addEventListener("click", this.logoutHandler.bind(this));
    }

    logoutHandler(e) {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("currentUser");

        window.location.replace("http://127.0.0.1:5502/FrontEnd/log-in.html");
    }
    slideDown(e) {
        if (e.target.closest(".sub-heading")) {
            const clicked = e.target.closest(".side-bar__item");
            if (!this.show) {
                clicked.classList.add("list-active");
                this.show = true;
                return;
            }

            if (this.show) {
                clicked.classList.remove("list-active");
                this.show = false;
                return;
            }
        }
    }

    /////////////////////home//////////////////////////////////////////////
    async renderHero(e) {
        this.selectedElement = e.currentTarget;
        if (this.selectedElement) {
            this.selectedElement.classList.remove("active-item");
            this.selectedElement.classList.remove("active-item-2");
        }
        let resData;
        const res = await fetch("http://localhost:3000/api/card/page/home", {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}`,
            },
        });
        if (res.status != "404") {
            const resDataSet = await res.json();
            resData = resDataSet[0];
        }
        if (!resData) {
            resData = {
                _id: "",
                header: "",
                image: "",
                description: "",
            };
        }
        const html = ` <div class="edit-hero">
    <h2>Edit hero</h2>
    <form method="post" action="http//127.0.0.1:3000/api/message" data-id = ${resData._id}>
       <label class="label" for="heading">Hero heading</label>
        <input id="heading" type="text" name="header" class="input hero-header" required value=${resData.header}></input>
        <label class="label"  for="imageLink">Hero Image link</label>
        <input id="imageLink" type="text" name="description" class="input hero-img" required value=${resData.image}></input>
        <label class="label"  for="hero-description">Hero Description</label>
        <textarea  name="image" id="hero-description" required class="textarea">${resData.description}</textarea>
        <button class="btn btn-fill btn-hero">Change hero</button>
    </form>
  </div>`;
        main.innerHTML = html;
        this.selectedElement.classList.add("active-item");
        document
            .querySelector(".btn-hero")
            .addEventListener("click", this.submitHero.bind(this));
    }
    async submitHero(e) {
        e.preventDefault();

        const header = document.querySelector(".hero-header");
        const description = document.getElementById("hero-description");
        const image = document.querySelector(".hero-img");
        let method;

        const home = {
            page: "home",
            header: header.value,
            description: description.value,
            image: image.value,
        };
        if (!header.parentElement.dataset.id) {
            method = "POST";
        } else {
            method = "PATCH";
        }
        const response = await fetch(
            `http://localhost:3000/api/card/${header.parentElement.dataset.id}`,
            {
                method: `${method}`,
                mode: "cors",
                // cache: "no-cache",
                // credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${TOKEN}`,
                },
                body: JSON.stringify(home),
            }
        );
        // console.log(hero);
        location.reload();
        // document.querySelector(".side-bar__item").click();
        // hero.click();
    }

    async renderpartner_helper() {
        const res = await fetch("http://localhost:3000/api/partners", {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}`,
            },
        });
        const dataSet = await res.json();
        console.log(dataSet);
        let html;
        html = `
    `;
        dataSet.forEach((data) => {
            html += `<div class="partner" data-id="${data._id}">
               <h3 class="partners-name">${data.name}</h3>
               <img class="partners-img" src="${data.image}" width="200px"srcset="">
          </div>`;
        });

        main.innerHTML = `<div class="edit-partner">
      <h2>Edit partner</h2>
      <div class="grid grid-col-2">
        <div  class="partners-list  grid grid-col-3">
          ${html}

        </div>
        <div  class="partner-form-box" >
        <div class="form-card partner-form">
          <h2 class="partner-heading">Add partner</h2>
        <form action="" class="form-partner" data-id="${dataSet._id}">
          <label class="label" for="heading">Partner name</label>
          <input id="heading" type="text" name="" class="input parnter-name" required></input>
           <label class="label"  for="imageLink">Partner logo image link</label>
           <input id="imageLink" type="text" name="" class="input partner-img" required></input>
           <button class="btn btn-fill partner-add">Add</button>
       </form>
      </div>
      </div>
      </div>

      
    </div>`;
        document
            .querySelector(".partner-add")
            .addEventListener("click", this.postPartner);
        document
            .querySelector(".partners-list")
            .addEventListener("click", this.renderpartner.bind(this));
    }

    async renderPartners(e) {
        if (this.selectedElement) {
            this.selectedElement.classList.remove("active-item");
            this.selectedElement.classList.remove("active-item-2");
        }

        this.selectedElement = e.currentTarget;
        let html;
        this.renderpartner_helper();
        this.selectedElement.classList.add("active-item");
    }

    renderpartner(e) {
        if (e.target.closest(".partner")) {
            const id = e.target.closest(".partner").dataset.id;
            console.log(id);
            const partnerName = e.target
                .closest(".partner")
                .querySelector(".partners-name").textContent;
            const partnerimageLink = e.target
                .closest(".partner")
                .querySelector(".partners-img").src;
            console.log(partnerName, partnerimageLink);
            const partnerForm = document.querySelector(".partner-form-box");
            const html = ` <div class="form-card partner-form">

      <div class="top-box">  
      <h2 class="partner-heading">Delete or Edit partner</h2>
      <button class="btn btn-fill btn-add">Add</button>
     </div>
   
  <form action="" class="form-partner" data-id="${id}" >
    <label class="label" for="heading">Partner name</label>
    <input id="heading" type="text" name="" value = "${partnerName}" class="input partner-name" required></input>
     <label class="label"  for="imageLink">Partner logo image link </label>
     <input id="imageLink" type="text" name="" value = "${partnerimageLink}" class="input partner-img" required></input>
     <button class="btn btn-fill partner-edit">Edit</button>   <button class="btn btn-fill partner-delete" style="background-color:orangeRed">Delete</button>
 </form>
</div>`;
            partnerForm.innerHTML = html;
            document
                .querySelector(".btn-add")
                .addEventListener("click", this.addPartner.bind(this));
            document
                .querySelector(".partner-edit")
                .addEventListener("click", this.editPartner.bind(this));
            document
                .querySelector(".partner-delete")
                .addEventListener("click", this.deletePartner.bind(this));
        }
    }
    async postPartner(e) {
        e.preventDefault();
        const name = document.querySelector(".parnter-name");

        const image = document.querySelector(".partner-img");
        let method;

        const partner = {
            name: name.value,
            image: image.value,
        };

        const response = await fetch(`http://localhost:3000/api/partners`, {
            method: `POST`,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}`,
            },
            body: JSON.stringify(partner),
        });
        this.renderworks(e);
    }
    async editPartner(e) {
        e.preventDefault();
        const name = document.querySelector(".partner-name");
        const id = name.parentElement.dataset.id;
        console.log(id);
        const image = document.querySelector(".partner-img");
        let method;

        const parnter = {
            name: name.value,
            image: image.value,
        };

        console.log(parnter);
        const response = await fetch(
            `http://localhost:3000/api/partners/${id}`,
            {
                method: `PATCH`,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${TOKEN}`,
                },
                body: JSON.stringify(parnter),
            }
        );
        this.renderpartner_helper();
    }
    async deletePartner(e) {
        e.preventDefault();
        const name = document.querySelector(".partner-name");
        const id = name.parentElement.dataset.id;
        console.log(id);
        const image = document.querySelector(".partner-img");
        let method;

        const parnter = {
            name: name.value,
            image: image.value,
        };

        console.log(parnter);
        const response = await fetch(
            `http://localhost:3000/api/partners/${id}`,
            {
                method: `DELETE`,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${TOKEN}`,
                },
                body: JSON.stringify(parnter),
            }
        );
        this.renderpartner_helper();
    }
    addPartner() {
        const html = `<div class="form-card partner-form">
    <h2 class="partner-heading">Add partner</h2>
  <form action="">
    <label class="label" for="heading">Partner name</label>
    <input id="heading" type="text" name="" class="input" required></input>
     <label class="label"  for="imageLink">Partner logo image link</label>
     <input id="imageLink" type="text" name="" class="input" required></input>
     <button class="btn btn-fill">Add</button>
 </form>
</div>`;
        const partnerForm = document.querySelector(".partner-form-box");
        partnerForm.innerHTML = html;
    }

    /////////////////////work//////////////////////////////////////////////

    async renderWorkDescription(e) {
        if (this.selectedElement) {
            this.selectedElement.classList.remove("active-item");
            this.selectedElement.classList.remove("active-item-2");
        }

        this.selectedElement = e.currentTarget;
        let resData;
        const res = await fetch("http://localhost:3000/api/description", {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}`,
            },
        });
        if (res.status != "404") {
            const resDataSet = await res.json();
            resData = resDataSet[0];
        }
        if (!resData) {
            resData = {
                _id: "",
                description: "",
            };
        }
        console.log(resData);
        const html = `<div class="edit-hero">
    <h2>Edit work description</h2>
    <form action="" data-id = ${resData._id}>
        <label class="label"  for="description">Description</label>
        <textarea  name="" id="work-description" required class="textarea">${resData.description}</textarea>
        <button class="btn btn-fill btn-change-work">Change work Description</button>
    </form>
  </div>`;

        main.innerHTML = html;
        this.selectedElement.classList.add("active-item");
        document
            .querySelector(".btn-change-work")
            .addEventListener("click", this.changeDescWork.bind(this));
    }
    async changeDescWork(e) {
        e.preventDefault();
        const description = document.getElementById("work-description");
        let method;

        const work = {
            page: "work",
            description: description.value,
        };
        if (!description.parentElement.dataset.id) {
            method = "POST";
        } else {
            method = "PATCH";
        }
        const response = await fetch(
            `http://localhost:3000/api/description/${description.parentElement.dataset.id}`,
            {
                method: `${method}`,
                mode: "cors",
                // cache: "no-cache",
                // credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${TOKEN}`,
                },
                body: JSON.stringify(work),
            }
        );
        // console.log(hero);
        location.reload();
        // document.querySelector(".side-bar__item").click();
        // hero.click();
    }
    async renderworks_helper() {
        console.log("in helper");
        const res = await fetch("http://localhost:3000/api/card/page/work", {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}`,
            },
        });
        const works = await res.json();
        console.log(works);

        let newhtml = "";
        works.forEach((work) => {
            newhtml += `<div class="card" data-id="${work._id}">
          <img class="card-img" src="${work.image}" width="200px"srcset="">
          <div class="card-text">
            <h3 class="card-title">${work.header}</h3>
             <p class="card-description">${work.description}</p>
          </div>
        </div>
      `;
        });
        const html = ` <div class="edit-card">
    <h2> Edit-card </h2>
    <div class="grid grid-col-2">
      <div  class="cards-list  grid grid-col-3">
        ${newhtml}
      </div>
      <div  class="card-form-box" >
      <div class="form-card card-form">
        <h2 class="card-heading">Add work</h2>
      <form action="">
        <label class="label" for="heading">Work name</label>
        <input id="heading" type="text" name="" class="input work-header" required></input>
         <label class="label"  for="imageLink">Work image link</label>
         <input id="imageLink" type="text" name="" class="input work-img" required></input>
         <label class="label"  for="description">Work Description</label>
         <textarea  name="" id="work-description" required class="textarea "></textarea>
         <button class="btn btn-fill btn-works">Add</button>
     </form>
    </div>
    </div>
    </div>
    
  </div>`;

        main.innerHTML = html;
        document
            .querySelector(".cards-list")
            .addEventListener("click", this.renderwork.bind(this));

        document
            .querySelector(".btn-works")
            .addEventListener("click", this.postWork.bind(this));
    }

    async renderworks(e) {
        if (this.selectedElement) {
            this.selectedElement.classList.remove("active-item");
            this.selectedElement.classList.remove("active-item-2");
        }
        this.selectedElement = e.currentTarget;
        this.renderworks_helper();
        this.selectedElement.classList.add("active-item");
    }
    async postWork(e) {
        e.preventDefault();
        const header = document.querySelector(".work-header");
        const description = document.getElementById("work-description");
        console.log(description);
        const image = document.querySelector(".work-img");
        let method;

        const work = {
            page: "work",
            header: header.value,
            description: description.value,
            image: image.value,
        };

        const response = await fetch(`http://localhost:3000/api/card`, {
            method: `POST`,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}`,
            },
            body: JSON.stringify(work),
        });
        this.renderworks(e);
    }

    renderCard(e) {
        const id = e.target.closest(".card").dataset.id;
        console.log(id);
        const cardTitle = e.target
            .closest(".card")
            .querySelector(".card-title").textContent;
        const cardImageLink = e.target
            .closest(".card")
            .querySelector(".card-img").src;
        const cardDescription = e.target
            .closest(".card")
            .querySelector(".card-description").textContent;

        const cardForm = document.querySelector(".card-form-box");

        return { cardTitle, cardImageLink, cardDescription, cardForm, id };
    }
    renderwork(e) {
        if (e.target.closest(".card")) {
            const card = this.renderCard(e);
            const html = ` <div class="form-card card-form">
     <div class="top-box"> <h2 class="card-heading">Delate or Edit work</h2>
     <button class="btn btn-fill btn-add">Add</button></div>

  <form action="" data-id = "${card.id}">
    <label class="label" for="heading">Work name</label>
    <input id="heading" type="text" name="" value = "${card.cardTitle}" class="input work-header" required></input>
     <label class="label"  for="imageLink">work image link </label>
     <input id="imageLink" type="text" name="" value = "${card.cardImageLink}" class="input work-img" required></input>
     <label class="label"  for="description">Work Description</label>
         <textarea  name="" id="work-description"  class="textarea"  required>${card.cardDescription}</textarea>
     <button class="btn btn-fill btn-edit">Edit</button>   <button class="btn btn-fill btn-delete" style="background-color:orangeRed">Delete</button>
 </form>
</div>`;
            card.cardForm.innerHTML = html;
            document
                .querySelector(".btn-add")
                .addEventListener("click", this.addWork.bind(this));
            document
                .querySelector(".btn-edit")
                .addEventListener("click", this.editWork.bind(this));
            document
                .querySelector(".btn-delete")
                .addEventListener("click", this.deleteWork.bind(this));
        }
    }
    async editWork(e) {
        e.preventDefault();
        console.log("object");
        const header = document.querySelector(".work-header");
        const id = header.parentElement.dataset.id;
        const description = document.getElementById("work-description");
        console.log(id);
        const image = document.querySelector(".work-img");
        let method;

        const work = {
            page: "work",
            header: header.value,
            description: description.value,
            image: image.value,
        };
        const response = await fetch(`http://localhost:3000/api/card/${id}`, {
            method: `PATCH`,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}`,
            },
            body: JSON.stringify(work),
        });
        this.renderworks_helper();
    }
    async deleteWork(e) {
        e.preventDefault();
        console.log("object");
        const header = document.querySelector(".work-header");
        const id = header.parentElement.dataset.id;
        const description = document.getElementById("work-description");
        console.log(id);
        const image = document.querySelector(".work-img");
        let method;

        const work = {
            page: "work",
            header: header.value,
            description: description.value,
            image: image.value,
        };
        const response = await fetch(`http://localhost:3000/api/card/${id}`, {
            method: `DELETE`,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}`,
            },
            body: JSON.stringify(work),
        });
        this.renderworks_helper();
    }

    addWork() {
        console.log("ok");
        const html = `<div class="form-card card-form">
     <h2 class="card-heading">Add work</h2>
   <form action="">
     <label class="label" for="heading">Work name</label>
     <input id="heading" type="text" name="" class="input" required></input>
      <label class="label"  for="imageLink">Work image link</label>
      <input id="imageLink" type="text" name="" class="input" required></input>
      <label class="label"  for="description">Work Description</label>
      <textarea  name="" id="description" required class="textarea"></textarea>
      <button class="btn btn-fill btn-works">Add</button>
  </form>
 </div>`;
        const cardForm = document.querySelector(".card-form-box");
        cardForm.innerHTML = html;
        document
            .querySelector(".btn-works")
            .addEventListener("click", this.postWork.bind(this));
    }

    async rendermessages(e) {
        console.log("ok");
        if (this.selectedElement) {
            this.selectedElement.classList.remove("active-item-2");
            this.selectedElement.classList.remove("active-item");
        }
        this.selectedElement = e.currentTarget;

        const response = await fetch("http://127.0.0.1:3000/api/message", {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}`,
            },
        });
        // console.log(response);
        const data = await response.json();
        // console.log(data);
        let messageHtml = "";
        data.forEach((message) => {
            messageHtml += `<div class="message-card">
      <p class="message-card-title "> client Name: <span class="contact-name">${message.name}</span></p>
      <p class="message-card-title"> client email: <span class="contact-email">${message.email}</span></p>
      <p class="message-card-title">client address: <span class="contact-address">${message.address}</span></p>
      <p class="message-card-title">client subject: <span class="contact-subject"> ${message.subject}</span></p>
       <p class="message-card-title">
        client statement:
        <blockquote class="contact-statement">${message.statement}</blockquote>
      </p>
  </div>`;
        });
        const html = ` <div class="messages-box">
    <h2> Messages </h2>
    <div class="messages grid grid-col-2-equal">${messageHtml}</div>
    </div>
`;
        main.innerHTML = html;
        this.selectedElement.classList.add("active-item-2");
    }

    async renderUser(e) {
        const currentUser = await fetch(
            `http://localhost:3000/api/users/${localStorage.getItem(
                "currentUserId"
            )}`,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        );

        if (currentUser.adminType === "admin") {
            return alert("You are Not Authorized");
        }
        if (this.selectedElement) {
            this.selectedElement.classList.remove("active-item-2");
            this.selectedElement.classList.remove("active-item");
        }
        this.selectedElement = e.currentTarget;
        this.renderUserForm_help();
        this.selectedElement.classList.add("active-item-2");
    }
    async renderUserForm_help() {
        let usersApprovedData;
        let usersPendingData;

        try {
            usersPendingData = await fetch(
                "http://localhost:3000/api/users/status/pending",
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${TOKEN}`,
                    },
                }
            );
            usersApprovedData = await fetch(
                "http://localhost:3000/api/users/status/approved",
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${TOKEN}`,
                    },
                }
            );
        } catch (error) {
            console.log(error);
        }
        let userhtmlApproved = "";

        if (usersApprovedData) {
            const usersApproved = await usersApprovedData.json();

            usersApproved.forEach((user) => {
                userhtmlApproved += ` <tr data-id= "${user._id}">
            <td class="username">${user.userName}</td>
            <td class="email">${user.name}</td>
            <td class="status">APPROVED</td>
            </tr>
           `;
            });
        } else {
            userhtmlApproved = `
       <tr data-id= "...">
            <td class="username">...</td>
            <td class="email">...</td>
            <td class="status">...</td>
            </tr>
           ;
      `;
        }

        let userhtmlPending = "";
        if (usersPendingData) {
            const usersPending = await usersPendingData.json();

            usersPending.forEach((user) => {
                userhtmlPending += ` <tr data-id= "${user._id}">
            <td class="username">${user.userName}</td>
            <td class="email">${user.name}</td>
            <td class="status">PENDING</td>
            </tr>
           `;
            });
        } else {
            userhtmlPending = `
       <tr data-id= "...">
            <td class="username">...</td>
            <td class="email">...</td>
            <td class="status">...</td>
            </tr>
           ;
      `;
        }
        const html = ` <div class="messages-box">
      <h2> Messages </h2>
      <div class="users-box grid grid-col-3">
        <table class="users-table-1">
            <thead>
            <th class=""> Username</th>
            <th class="">Email</th>
            <th class="">status</th>
            </thead>
              <tbody>
               ${userhtmlPending}
              </tbody>
            </table>
          
            <table class="users-table-2">
            <thead>
            <th class=""> Username</th>
            <th class="">Email</th>
            <th class="">status</th>
            </thead>
              <tbody>
               ${userhtmlApproved}
              </tbody>
            </table>
  
            <div class="userform">
  
            </div>
          </div>
        </div> `;

        main.innerHTML = html;
        document
            .querySelector(".users-table-1")
            .addEventListener("click", this.renderUserForm.bind(this));

        document
            .querySelector(".users-table-2")
            .addEventListener("click", this.renderUserForm.bind(this));
    }
    renderUserForm(e) {
        if (e.target.closest("tbody")) {
            console.log("ok");
            const id = e.target.closest("tr").dataset.id;
            const username = e.target
                .closest("tr")
                .querySelector(".username").textContent;
            const email = e.target
                .closest("tr")
                .querySelector(".email").textContent;
            const html = `
      <div class="form-card">
      <h2 class="card-heading">Edit status</h2>

       <form class="user-form" data-id="${id}">

       <label class="label" for="name">name:</label>
    <input id="name" type="text" name="" value="${username}" class="input-user" disabled ></input> </br>
     <label class="label"  for="email">Email:</label>
     <input id="email" type="text" name="" value="${email}" class="input-user " disabled></input>
     </br>
       <label class="label" for="status">Status:</label>
       <select class="select" name="" id="status">
       <option value="">Select Status</option>
        <option value="Approve">Approve</option>
        <option value="Reject">Reject</option>
       </select>

       <button class="btn btn-fill status-change-btn">Change</button>  

   </form>
   </div>
   `;
            document.querySelector(".userform").innerHTML = html;

            document
                .querySelector(".status-change-btn")
                .addEventListener("click", this.changeStaus.bind(this));
        }
    }
    async changeStaus(e) {
        e.preventDefault();
        console.log("change");
        const id = e.target.closest(".user-form").dataset.id;
        const option = document.querySelector(".select").value;
        let method;
        if (!option) {
            return;
        }

        if (option == "Approve") {
            method = "PATCH";
        } else {
            method = "DELETE";
        }

        const response = await fetch(`http://localhost:3000/api/users/${id}`, {
            method: `${method}`,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}`,
            },
            body: JSON.stringify(),
        });
        this.renderUserForm_help();
    }
}

var TOKEN;

function load() {
    const user = localStorage.getItem("currentUser");
    const jwtToken = localStorage.getItem("jwtToken");
    const userId = localStorage.getItem("currentUserId");
    TOKEN = jwtToken;
    console.log(user, jwtToken, userId);
    if (user && jwtToken) {
        namePlaceholder.innerText = user;
        const app = new App();
    } else {
        return window.location.replace(
            "http://127.0.0.1:5502/FrontEnd/log-in.html"
        );
    }
}

load();
