//достаем всех пользователей
async function getUsers() {
    let response = await fetch('http://localhost:8080/api/rest');
    if (response.ok) {
        let data = await response.json();
        return data
    }
}
// достаем пользователя для заполнения модального окна
async function userForModal(id) {
    let response = await fetch('http://localhost:8080/api/rest/' + id);
    if (response.ok) {
        let data = await response.json();
        return data
    }
}
// получаем роли из базы
async function allRoles() {
    let response = await fetch('http://localhost:8080/api/roles');
    if (response.ok) {
        let data = await response.json();
        return data
    }
}
// форма для модального окна edit
function edit(id) {
    userForModal(id).then(function (value) {

        let form = document.querySelector('#editDiv1');

        let html =
            `<div class="form-group">
                    <label for="name">First name</label>
                    <input type="text" class="form-control" id="name" value="${value.name}" name="name">
                 </div>
                 <div class="form-group">
                    <label for="lastName">Last name</label>
                    <input type="text" class="form-control" id="lastName" value="${value.lastName}" name="lastName">
                 </div>
                 <div class="form-group">
                     <label for="age">Age</label>
                     <input type="number" class="form-control" id="age" value="${value.age}" name="age">
                 </div>
                 <div class="form-group">
                     <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" value="${value.email}" name="email">
                 </div>
                 <div class="form-group">
                    <label for="Password">Password</label>
                    <input type="password" class="form-control" id="Password" name="password">
                 </div>`;

        form.innerHTML = html;

        let button = document.querySelector('#editBut');

        let buttonHtml = `<button class="btn btn-secondary" data-dismiss="modal">Close</button>
                              <button type="button" onclick="upDateUser(${id})" data-dismiss="modal" class="btn btn-primary" form="editForm">Edit</button>`;

        button.innerHTML = buttonHtml;
    });

    allRoles().then(function (valueRole) {
        let select = `<div class="form-group">
                               <label for="role">Role</label>
                               <select multiple class="form-control" id="role" name="rolesFromModalEdit" >`;

        for (let role of valueRole) {
            select += `<option value="${role.authority}" label="${role.authority}"></option>`;
        }
        select +=  `</select></div>`;

        let html = document.querySelector('#editDiv2');
        html.innerHTML = select;

    });
}

// форма для модального окна delete
function remove(id) {
    userForModal(id).then(function (value){

        let roles = value.roles;
        let option = '';
        for(let i = 0; i < roles.length; i++) {
            let role = roles[i].authority;
            option += `<option>${role}</option>`;
        }

        let form = document.querySelector('#deleteDiv1');
        let html =
            `<div class="form-group">
                    <label for="firstname2">First name</label>
                    <input id="firstname2" class="form-control" value="${value.name}" type="text" disabled>
                </div>
            <div class="form-group">
                <label for="lastname2">Last name</label>
                <input type="text" class="form-control" value="${value.lastName}" id="lastname2" disabled>
            </div>
            <div class="form-group">
                <label for="age2">Age</label>
                <input type="number" class="form-control" value="${value.age}" id="age2" disabled>
            </div>
            <div class="form-group">
                <label for="email2">Email</label>
                <input type="email" class="form-control" value="${value.email}" id="email2" disabled>
            </div>
            <div class="form-group">
                <label for="Password2">Password</label>
                <input type="password" class="form-control" value="${value.password}" id="Password2" disabled>
            </div>
            <div class="form-group">
                <label for="role2">Role</label>
                <select multiple class="form-control" id="role2" disabled>
                   ${option}
                </select>
            </div>`;

        form.innerHTML = html;

        let footer = document.querySelector('#footer');
        let footerHtml = `<button class="btn btn-secondary" data-dismiss="modal">Close</button>
                              <button type="button" class="btn btn-danger" onclick="removeFromBD(${id})" form="deleteForm" data-dismiss="modal"> Delete</button>`;

        footer.innerHTML = footerHtml;

    });
}
// получаем всех пользователей и записываем в таблицу
function tableFull() {
    getUsers().then(function (value){

        let html = '';
        let table;
        table = document.querySelector('#users tbody');

        for (let user of value) {

            let roles = user.roles;
            let printRoles = '';

            for (let k = 0; k < roles.length; k++) {
                printRoles += roles[k].authority;
                if (k != (roles.length-1)) {
                    printRoles += ' ';
                }
            }
            html += `<tr>
                        <th>${user.id}</th>
                        <th>${user.name}</th>
                        <th>${user.lastName}</th>
                        <th>${user.age}</th>
                        <th>${user.email}</th>
                        <th>${printRoles}</th>
                        <th><button class="btn btn-info" onclick="edit(${user.id});" data-target="#edit" data-toggle="modal">Edit</button></th>
                        <th><button class="btn btn-danger" onclick="remove(${user.id});" data-target="#delete" data-toggle="modal">Delete</button></th>
                     </tr>`;
        }
        table.innerHTML = html;
    });
}
// вызываем метод при стпрте странички
tableFull();
// достаем аутентифицированного пользователя
async function getAuthenticatedUser() {
    let response = await fetch('http://localhost:8080/authenticatedUser');
    if (response.ok) {
        let data = await response.json();
        return data;
    } else {
        alert('error', response.status);
    }
}
// заполням данными бар и таблицу в вкладке USER
getAuthenticatedUser().then(function (value) {

    let roles = value.roles;
    let rolesValue = '';

    for (let i = 0; i < roles.length; i++) {
        rolesValue += roles[i].authority;
        console.log(roles[i]);
        if (i != (roles.length-1)) {
            rolesValue += ' ';
        }
    }

    let bar = document.querySelector("#barEmail");
    let barHtml = `<span>${value.name}</span>`;
    bar.innerHTML = barHtml;

    let barRoles = document.querySelector("#barRoles");
    let barRolesHtml = `<span>${rolesValue}</span>`;
    barRoles.innerHTML = barRolesHtml;

    let tbodyUserTable = document.querySelector("#tableUser tbody");

    let html = `<tr>
                        <th>${value.id}</th>
                        <th>${value.name}</th>
                        <th>${value.lastName}</th>
                        <th>${value.age}</th>
                        <th>${value.email}</th>
                        <th><span class="ml-2">${rolesValue}</span></th>
                     </tr>`;

    tbodyUserTable.innerHTML = html;

});
// заполняем форму New User ролями
allRoles().then(function (valueRole) {  //
    let select = `<div class="form-group">
                           <label for="role1">Role</label>
                           <select multiple class="form-control" id="role1" name="rolesNew">`;

    for (let role of valueRole) {
        select += `<option value="${role.authority}" label="${role.authority}"></option>`;
    }

    select +=  '</select></div>';

    let html = document.querySelector('#rolesNewUser');
    html.innerHTML = select;

});
// добавление нового пользователя
async function addNewUser() {
    let form = document.getElementById('formNewUser');

    let name_ = form.getElementsByTagName('input').name.value;
    let lastName_ = form.getElementsByTagName('input').lastName.value;
    let age_ = form.getElementsByTagName('input').age.value;
    let email_ = form.getElementsByTagName('input').email.value;
    let password_ = form.getElementsByTagName('input').password.value;
    let roles = form.getElementsByTagName('select').role.selectedOptions;

    let arrRoles = new Array();

    for (let role of roles) {
        arrRoles.push({authority : role.value});
    }

    let user = {
        name: name_,
        lastName: lastName_,
        age: age_,
        email: email_,
        password: password_,
        roles: arrRoles
    };

    let response = await fetch('http://localhost:8080/api/rest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    });

    let userId = await response.json();
    let id_;
    userId.then(function (value) {
        id_ = value.id;
    });

    console.log(id_)

    let printRoles = '';
    for (let i = 0; i < arrRoles.length; i++) {
        printRoles += arrRoles[i].authority;
        if (i != (arrRoles.length-1)) {
            printRoles += ' ';
        }
    }

    // переключаются панели
    document.getElementById('user-table').getAttributeNode('class').value = 'tab-pane active';
    document.getElementById('new-user').getAttributeNode('class').value = 'tab-pane';

    document.getElementById('navTabNU').getAttributeNode('class').value = 'nav-link';
    document.getElementById('navTabUT').getAttributeNode('class').value = 'nav-link active';

    //tableFull();

    let tbody = document.querySelector('#users tbody');
    let count = tbody.childNodes.length;
    let tr = `<tr>
                  <th>${id_}</th>
                  <th>${name_}</th>
                  <th>${lastName_}</th>
                  <th>${age_}</th>
                  <th>${email_}</th>
                  <th>${printRoles}</th>
                  <th><button class="btn btn-info" onclick="edit(${id_});" data-target="#edit" data-toggle="modal">Edit</button></th>
                  <th><button class="btn btn-danger" onclick="remove(${id_});" data-target="#delete" data-toggle="modal">Delete</button></th>
              </tr>`;
    let node = new Node();
    node.textContent = id_;
    node.
    tbody.appendChild()
}
// Удаление пользователя
async function removeFromBD(id) {
    await fetch('http://localhost:8080/api/rest/' + id, {
        method: 'DELETE'
    });

    let tbody = document.querySelector('#users tbody');

    for (let tr of tbody.childNodes) {

        let userId = tr.childNodes[0].nextSibling.textContent;
        if (id == userId) {
            tr.remove();
        }
    }
}

async function upDateUser(id) {
    let form = document.getElementById('editForm');

    let name_ = form.getElementsByTagName('input').name.value;
    let lastName_ = form.getElementsByTagName('input').lastName.value;
    let age_ = form.getElementsByTagName('input').age.value;
    let email_ = form.getElementsByTagName('input').email.value;
    let password_ = form.getElementsByTagName('input').password.value;
    let roles = form.getElementsByTagName('select').role.selectedOptions;

    let arrRoles = new Array();

    for (let role of roles) {
        arrRoles.push({authority : role.value});
    }

    let user = {
        id: id,
        name: name_,
        lastName: lastName_,
        age: age_,
        email: email_,
        password: password_,
        roles: arrRoles
    };

    let response = await fetch('http://localhost:8080/api/rest', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    });

    let result = await response.json();
    console.log(result);

    tableFull();
}