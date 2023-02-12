class work {
  async renderWorkDescription(e) {
    if (this.selectedElement) {
      this.selectedElement.classList.remove("active-item");
      this.selectedElement.classList.remove("active-item-2");
    }

    this.selectedElement = e.currentTarget;
    let resData;
    const res = await fetch("http://localhost:3000/api/description");
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
    const res = await fetch("http://localhost:3000/api/card/page/work");
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
}
