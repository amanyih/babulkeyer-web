export class user {
  async renderUser(e) {
    if (this.selectedElement) {
      this.selectedElement.classList.remove("active-item-2");
      this.selectedElement.classList.remove("active-item");
    }
    this.selectedElement = e.currentTarget;
    this.renderUserForm_help();
    this.selectedElement.classList.add("active-item-2");
  }
  async renderUserForm_help() {
    const usersPendingData = await fetch(
      "http://localhost:3000/api/users/status/pending"
    );
    const usersApprovedData = await fetch(
      "http://localhost:3000/api/users/status/approved"
    );

    const usersApproved = await usersApprovedData.json();
    const usersPending = await usersPendingData.json();

    let userhtmlApproved = "";
    let userhtmlPending = "";

    if (usersPending) {
      usersPending.forEach((user) => {
        userhtmlPending += ` <tr data-id= "${user._id}">
              <td class="username">${user.userName}</td>
              <td class="email">${user.name}</td>
              <td class="status">PENDING</td>
              </tr>
             `;
      });
    } else {
      userhtmlPending += ` <tr>
              <td class="username">...</td>
              <td class="email">...</td>
              <td class="status">...</td>
              </tr>
             `;
    }

    if (!usersApproved.statusCode == 404) {
      usersApproved.forEach((user) => {
        userhtmlApproved += ` <tr data-id= "${user._id}">
              <td class="username">${user.userName}</td>
              <td class="email">${user.name}</td>
              <td class="status">APPROVED</td>
              </tr>
             `;
      });
    } else {
      userhtmlApproved += ` <tr>
              <td class="username">...</td>
              <td class="email">...</td>
              <td class="status">...</td>
              </tr>
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
    if (!usersApproved.statusCode == 404) {
      document
        .querySelector(".users-table-2")
        .addEventListener("click", this.renderUserForm.bind(this));
    }
  }
  renderUserForm(e) {
    if (e.target.closest("tbody")) {
      console.log("ok");
      const id = e.target.closest("tr").dataset.id;
      const username = e.target
        .closest("tr")
        .querySelector(".username").textContent;
      const email = e.target.closest("tr").querySelector(".email").textContent;
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
      },
      body: JSON.stringify(work),
    });
    this.renderUserForm_help();
  }
}
