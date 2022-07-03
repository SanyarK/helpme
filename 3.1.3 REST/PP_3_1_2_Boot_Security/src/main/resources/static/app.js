$(async function () {
    await getTableWithUsers();
    getActiveUserInfo();
    await getTableWithUsersForAdmin();
     getDefaultModal();
    addNewUser();
    getNewUserForm()
})

const userFetchService = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },
    findAllUsers: async () => await fetch("http://localhost:8080/api/rest"),
    findOneUser: async (id) => await fetch("http://localhost:8080/api/rest/${id}"),
    getPrincipalInfo: async () => await fetch("http://localhost:8080/api/principal"),
    addNewUser: async (user) => await fetch("http://localhost:8080/api/rest", {method: 'POST', headers: userFetchService.head, body: JSON.stringify(user)}),
    updateUser: async (user, id) => await fetch("http://localhost:8080/api/rest/${id}", {method: 'PUT', headers: userFetchService.head, body: JSON.stringify(user)}),
    deleteUser: async (id) => await fetch("http://localhost:8080/api/rest/${id}", {method: 'DELETE', headers: userFetchService.head})
}

async function getActiveUserInfo() {
    let headInfo = $('#headInfo')

    let principal = await userFetchService.getPrincipalInfo();
    let user = principal.json();
    user.then(user => {
        let userInfoFilling = `
       <h6> <b> ${user.name}</b> with roles: ${user.rolesView}</h6>
    `
        headInfo.append(userInfoFilling)
    })
}

async function getTableWithUsers() {
    let table = $('#tableUsers tbody');
    table.empty();

    await userFetchService.findAllUsers()
        .then(res => res.json())
        .then(users => {
            users.forEach(user => {
                let tableFilling = `$(
                        <tr>
                            <td style='text-align: center'>${user.id}</td>
                            <td style='text-align: center'>${user.name}</td>
                            <td style='text-align: center'>${user.lastName}</td>
                            <td style='text-align: center'>${user.age}</td>
                            <td style='text-align: center'>${user.email}</td>
                            <td style='text-align: center'>${user.roles[0].name}</td>
                        </tr>
                )`;
                table.append(tableFilling);
            })
        })
}

async function getTableWithUsersForAdmin() {
    let table = $('#tableUsersForAdmin tbody');
    table.empty();

    await userFetchService.findAllUsers()
        .then(res => res.json())
        .then(users => {
            users.forEach(user => {
                let tableFilling = `$(
                        <tr>
                            <td style='text-align: center'>${user.id}</td>
                            <td style='text-align: center'>${user.name}</td>
                            <td style='text-align: center'>${user.lastName}</td>
                            <td style='text-align: center'>${user.age}</td>
                            <td style='text-align: center'>${user.email}</td> 
                            <td style='text-align: center'>${user.roles[0].name}</td>
                            <td style='text-align: center'>
                                <button type="button" data-userid="${user.id}" data-action="edit" class="btn btn-info"
                                data-toggle="modal" data-target="#someDefaultModal">Edit</button>
                            </td>
                            <td style='text-align: center'>
                                <button type="button" data-userid="${user.id}" data-action="delete" class="btn btn-danger"
                                data-toggle="modal" data-target="#someDefaultModal">Delete</button>
                            </td>
                        </tr>
                )`;
                table.append(tableFilling);
            })
        })

    $("#tableUsers").find('button').on('click', (event) => {
        let defaultModal = $('#someDefaultModal');

        let targetButton = $(event.target);
        let buttonUserId = targetButton.attr('data-userid');
        let buttonAction = targetButton.attr('data-action');

        defaultModal.attr('data-userid', buttonUserId);
        defaultModal.attr('data-action', buttonAction);
        defaultModal.modal('show');
    })
}


async function editUser(modal, id) {
    let preuser = await userFetchService.findOneUser(id);
    let user = preuser.json();

    modal.find('.modal-title').html('Edit user');

    let editButton = `<button  class="btn btn-primary" id="editButton">Edit</button>`;
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`
    modal.find('.modal-footer').append(editButton);
    modal.find('.modal-footer').append(closeButton);

    user.then(user => {
        let bodyForm = `
            <div align="center">
            <form class="form-group" id="editUser" >
            <div class="col-7">
                <strong><labelfor="id">ID</label></strong>
                <input type="text" class="form-control" id="id" name="id" value="${user.id}" disabled><br>
                <strong><labelfor="firstName">First Name</label></strong>
                <input class="form-control" type="text" id="firstName" value="${user.name}"><br>
                <strong><labelfor="lastName">Last Name</label></strong>
                <input class="form-control" type="text" id="lastName" value="${user.lastName}"><br>
                <strong><labelfor="age">Age</label></strong>
                <input class="form-control" id="age" type="number" value="${user.age}"> <br>
                <strong><labelfor="email">E-mail</label></strong>
                <input class="form-control" type="text" id="email" value="${user.email}"><br>
                <strong><labelfor="password">Password</label></strong>
                <input class="form-control" type="password" id="password" value="${user.password}"><br>
                <strong><labelfor="roles">Roles</label></strong>
                <select class="custom-select"
                        size="3"
                        multiple name="roles"
                        id="roles" required>
                <option value="1">ADMIN</option>
                <option selected value="2">USER</option>
                </select>
                </div>
            </form>
            </div>
        `;
        modal.find('.modal-body').append(bodyForm);
    })

    $("#editButton").on('click', async () => {
        let id = modal.find("#id").val().trim();
        let name = modal.find("#name").val().trim();
        let lastName = modal.find("#lastName").val().trim();
        let age = modal.find("#age").val().trim();
        let email = modal.find("#email").val().trim();
        let password = modal.find("#password").val().trim();
        let roles = modal.find("#roles").val();
        let data = {
            id: id,
            name: name,
            lastName: lastName,
            age: age,
            email: email,
            password: password,
            roles: roles
        }
        const response = await userFetchService.updateUser(data, id);

        if (response.ok) {
            getTableWithUsersForAdmin();
            modal.modal('hide');
        } else {
            let body = await response.json();
            let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="sharaBaraMessageError">
                            ${body.info}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            modal.find('.modal-body').prepend(alert);
        }
    })
}

async function deleteUser(modal, id) {
    let preUser = await userFetchService.findOneUser(id);
    let user = preUser.json();

    modal.find('.modal-title').html('Delete User');

    let deleteButton = `<button  class="btn btn-danger" id="deleteButton">Delete</button>`;
    let closeButtonDelete = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`
    modal.find('.modal-footer').append(deleteButton);
    modal.find('.modal-footer').append(closeButtonDelete);

    user.then(user => {
        let bodyForm = `
            <div align="center">
            <form class="form-group" id="deleteUser" >
            <div class="col-7">
                <strong><labelfor="id">ID</label></strong>
                <input type="text" class="form-control" id="id" name="id" value="${user.id}" disabled><br>
                <strong><labelfor="firstName">First Name</label></strong>
                <input class="form-control" type="text" id="name" value="${user.name} "disabled><br>
                <strong><labelfor="lastName">Last Name</label></strong>
                <input class="form-control" type="text" id="lastName" value="${user.lastName} "disabled><br>
                <strong><labelfor="age">Age</label></strong>
                <input class="form-control" type="text" id="age" value="${user.age} "disabled><br>
                <strong><labelfor="email">E-mail</label></strong>
                <input class="form-control" type="text" id="email" value="${user.email} "disabled><br>
                <strong><labelfor="password">Password</label></strong>
                <input class="form-control" type="password" id="password" value="${user.password} "disabled><br>
                <strong><labelfor="roles">Roles</label></strong>
                <select class="custom-select"
                        size="3"
                        multiple name="roles"
                        id="roles" required disabled>
                <option value="1">ADMIN</option>
                <option value="2">USER</option>
                </select>
                </div>
            </form>
            </div>
        `;
        modal.find('.modal-body').append(bodyForm);
    })

    $("#deleteButton").on('click', async () => {
        let id = modal.find("#id").val().trim();

        const response = await userFetchService.deleteUser(id);

        if (response.ok) {
            getTableWithUsersForAdmin();
            modal.modal('hide');
        } else {
            let body = await response.json();
            let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="sharaBaraMessageError">
                            ${body.info}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            modal.find('.modal-body').prepend(alert);
        }
    })
}

async function getDefaultModal() {
    $('#someDefaultModal').modal({
        keyboard: true,
        backdrop: "static",
        show: false
    }).on("show.bs.modal", (event) => {
        let thisModal = $(event.target);
        let userid = thisModal.attr('data-userid');
        let action = thisModal.attr('data-action');
        switch (action) {
            case 'edit':
                editUser(thisModal, userid);
                break;
            case 'delete':
                deleteUser(thisModal, userid);
                break;

        }
    }).on("hidden.bs.modal", (e) => {
        let thisModal = $(e.target);
        thisModal.find('.modal-title').html('');
        thisModal.find('.modal-body').html('');
        thisModal.find('.modal-footer').html('');
    })
}

async function getNewUserForm() {
    let button = $(`#SliderNewUserForm`);
    let form = $(`#defaultSomeForm`)
    button.on('click', () => {
        if (form.attr("data-hidden") === "true") {
            form.attr('data-hidden', 'false');
            form.show();
            button.text('New User');
        } else {
            form.attr('data-hidden', 'true');
            form.hide();
            button.text('New User');
        }
    })
}


async function addNewUser() {
    $('#addNewUserButton').click(async () =>  {
        let addUserForm = $('#defaultSomeForm')
        let name = addUserForm.find('#AddNewUserFirstName').val().trim();
        let lastName = addUserForm.find('#AddNewUserLastName').val().trim();
        let age = addUserForm.find('#AddNewUserAge').val().trim();
        let email = addUserForm.find('#AddNewUserEmail').val().trim();
        let password = addUserForm.find('#AddNewUserPassword').val().trim();
        let roles = addUserForm.find('#AddNewUserRoles').val()
        let data = {
            name: name,
            lastName: lastName,
            age: age,
            email: email,
            password: password,
            roles: roles
        }
        const response = await userFetchService.addNewUser(data);
        if (response.ok) {
            getTableWithUsersForAdmin();
            addUserForm.find('#AddNewUserFirstName').val('');
            addUserForm.find('#AddNewUserLastName').val('');
            addUserForm.find('#AddNewUserAge').val('');
            addUserForm.find('#AddNewUserEmail').val('');
            addUserForm.find('#AddNewUserPassword').val('');
            addUserForm.find('#AddNewUserRoles').val('');


        } else {
            let body = await response.json();
            let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="sharaBaraMessageError">
                            ${body.info}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            addUserForm.prepend(alert)
        }
    })
}