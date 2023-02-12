class Hero {
  async renderHero(e) {
    this.selectedElement = e.currentTarget;
    if (this.selectedElement) {
      this.selectedElement.classList.remove("active-item");
      this.selectedElement.classList.remove("active-item-2");
    }
    let resData;
    const res = await fetch("http://localhost:3000/api/card/page/home");
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
    const res = await fetch("http://localhost:3000/api/partners");
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
    const response = await fetch(`http://localhost:3000/api/partners/${id}`, {
      method: `PATCH`,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parnter),
    });
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
    const response = await fetch(`http://localhost:3000/api/partners/${id}`, {
      method: `DELETE`,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parnter),
    });
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
}
