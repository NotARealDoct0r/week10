// created a class with 2 parameters to be able to create one of the super heroes - name & superpower
class Hero {
    constructor(name, superpower) {
        this.name = name;
        this.superpower = superpower;
    }
}

// created another class called group with 2 parameters- assign unique 'id's' + name then create an array with them
class Group {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.heroes = [];
    }

    // adding a method to add the created hero to the array
    addHero(hero) {
        this.heroes.push(hero);
    }

    // another method to be able to delete the specific/selected hero based on their index
    deleteHero(hero) {
        let index = this.heroes.indexOf(hero);
        this.heroes.splice(index, 1);
    }
}

// similar as above, created 2 variables - an array to organize + add heroes and 'groupId' to be able to increment
let groups = [];
let groupId = 0;

// function to add to the 'groups' array + making an instance of the class Group + increment the groupId # + target 'new-group-name'
onClick('new-group', () => {
    groups.push(new Group(groupId++, getValue('new-group-name')));
    drawDOM();
});

// function to define what happens when user clicks the specific id
function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

// created this function to prevent having to repetitively write the 2 lines of code above
function getValue(id) {
    return document.getElementById(id).value;
}

// function to create the 'DOM', in this case table within the div called 'groups' on the html file
function drawDOM() {
    let groupDiv = document.getElementById('groups');
    // clear out the group div
    clearElement(groupDiv);
    // using for loop to iterate through every element to draw each group from groups
    for (group of groups) {
        // the variable below is to create the new super heroes group
        let table = createGroupTable(group);
        let title = document.createElement('h2');
        title.innerHTML = group.name;
        title.appendChild(createDeleteGroupButton(group));
        groupDiv.appendChild(title);
        groupDiv.appendChild(table);
        // adding each hero that is created
        for (hero of group.heroes) {
            createHeroRow(group, table, hero);
        }
    }
}

// function to create a new hero - 3 parameters to specify the group, table, & hero
function createHeroRow(group, table, hero) {
    // start at index '2' since there will be data displayed above
    let row = table.insertRow(2);
    //first 2 rows will display the hero's name + superpower that the user chooses
    row.insertCell(0).innerHTML = hero.name;
    row.insertCell(1).innerHTML = hero.superpower;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(group, hero));
}

// function to be able to delete the row of hero that is created within the group
function createDeleteRowButton(group, hero) {
    let btn = document.createElement('button');
    // classname is to specify the blue color & innerHTML is what will be displayed
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete';
    // defining what will happen when user clicks the button (delete the specific 1 element)
    btn.onclick = () => {
        let index = group.heroes.indexOf(hero);
        group.heroes.splice(index, 1);
        drawDOM();
    };
    return btn;
}

// similar as above except this will delete the entire group instead of deleting individual rows
function createDeleteGroupButton(group) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete Group';
    btn.onclick = () => {
        let index = groups.indexOf(group);
        groups.splice(index, 1);
        drawDOM();
    };
    return btn;
}

// create button that will add a new hero the user creates 
function createNewHeroButton(group) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        group.heroes.push(new Hero(getValue(`name-input-${group.id}`), getValue(`superpower-input-${group.id}`)));
        drawDOM();
    };
    return btn;
}

// verbose way of creating a table + form using JavaScript - specifying each attributes of classes, where to display/insert element, 
// what will be displayed on the HTML server side (i.e. 'th' - table headers), and button(s)  
function createGroupTable(group) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let superpowerColumn = document.createElement('th');
    nameColumn.innerHTML = 'Name';
    superpowerColumn.innerHTML = 'Superpower';
    row.appendChild(nameColumn);
    row.appendChild(superpowerColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let superpowerTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${group.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let superpowerInput = document.createElement('input');
    superpowerInput.setAttribute('id', `superpower-input-${group.id}`);
    superpowerInput.setAttribute('type', 'text');
    superpowerInput.setAttribute('class', 'form-control');
    let newHeroButton = createNewHeroButton(group);
    nameTh.appendChild(nameInput);
    superpowerTh.appendChild(superpowerInput);
    createTh.appendChild(newHeroButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(superpowerTh);
    formRow.appendChild(createTh);
    return table;
}

// clear out everything, only targeting the firstChild element (without deleting everything)
function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}