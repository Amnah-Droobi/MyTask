const fs = require('fs');

main();


function main() {
    let content = fs.readFileSync('./data.csv', 'utf-8');
    let { lines, headers, keys } = parseFileToLinesAndHeaders(content);
    let users = parseLinesInToUsers(lines, keys);
    //console.log(JSON.stringify(users));
    let { validUsers, inValidUsers } = validateUsers(users);
    //console.log(JSON.stringify(inValidUsers));
    writeUsersToFile(users);
    printValidUsersToFile(validUsers);
    // deletedItemFromArray(users, pos, No);
}

function parseFileToLinesAndHeaders(content) {
    let lines = content.split("\n");
    let headers = lines.shift();
    let keys = headers.split(",");
    return { lines, headers, keys };
}
function parseLinesInToUsers(lines, keys) {
    let value = [];
    let users = lines.map(line => {
        value = line.split(",");
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
    users.forEach(user => {
        if (IsValid(user, users)) {

            validUsers.push(user);
        }
        else {
            inValidUsers.push(user);
        }
    });
    return {
        validUsers,
        inValidUsers
    }
}


function IsValid(user, users) {
    return (!duplicateId(users, user.id) && isValidEmail(user.email)
        && isValidAge(user.age));
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
    let dup = false;
    users.forEach(user => {
        if (user.id == id) {
            count++;
        }
    });
    if (count > 1) {
        // console.log('duplicate dtected');
        dup = true;
    }
    return dup;
}
function printOfValidUsers(user) {
    console.log(user);
}
function writeUsersToFile(users) {
    let datainjson = JSON.stringify(users);
    fs.writeFileSync("./users.json", datainjson);
}
function printValidUsersToFile(ValidUsers){
    let Valid = JSON.stringify(ValidUsers);
    fs.writeFileSync("./validusers.json", Valid);  
}
