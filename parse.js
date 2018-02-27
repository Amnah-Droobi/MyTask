const fs = require('fs');

main();



function main() {
    let content = fs.readFileSync('./data.csv', 'utf-8');
    let { lines, headers, keys } = parseFileToLinesAndHeaders(content);
    let users = parseLinesInToUsers(lines, keys);
    let validation = validateUsers(users);
    console.log(users) 
    //console.log(validuser) ;
    // printOfValidUsers(validation.inValidUsers);
    writeUsersToFile(users);
    // deletedItemFromArray(users, pos, No);



}


function parseFileToLinesAndHeaders(content) {
    let lines = content.split('\n');
    let headers = lines.shift();
    let keys = headers.split(",");
    return { lines, headers, keys };
}
function parseLinesInToUsers(lines, keys) {
    let users = lines.map(line => {
        value = line.split(',');
        let obj = {};
        keys.forEach((item, index) => {
            obj[item] = value[index];

        });
        return obj;

    });
    return users;

}


function validateUsers(users) {

    let validUsers = [];
    let inValidUsers = [];
    users.forEach((user, index) => {
        if (IsValid(user) && !(duplicateId(users, users.id))) {

            validUsers.push[user];
        }
        else {
            inValidUsers.push[user];

        }
    });
    return
    { validUsers, inValidUsers }


}
function IsValid(user, users) {
    return (user && isValidId(user.id, users) && isValidEmail(user.email) && isValidAge(user.age) == true);


}
function isValidId(id) {
    return id == true;
}
function isValidEmail(email) {
    return !!email && strConatin(email, '@');

}
function strConatin(str, sub) {
    return str.indexOf(sub) > -1

}
function isValidAge(age) {
    return age > 0;

}
function duplicateId(users, id) {

    let count = 0;
    users.forEach(user => {
        if (user.id == id) {
            count++;
        }
    });
    if (count > 1) {
        // console.log('duplicate dtected');
        return true;
    }
    else {
        // console.log('not duplicated');
        return false;
    }
}

function printOfValidUsers(user) {
    console.log(user);
}
function writeUsersToFile(users) {
    let dataainjson = JSON.stringify(users);
    fs.writeFileSync("./users.json", dataainjson);
}
