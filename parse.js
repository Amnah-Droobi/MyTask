
const fs = require('fs');

main();


function main() {

    var datafromcsv = fs.readFileSync('./data.csv', 'utf-8');
    let { lines, headers, keys } = parseFileToLinesAndHeaders(datafromcsv);

    let users = parseLinesToUsers(lines, keys);

    ////////// storthefileinJosn
    let arr = {};
    arr = validateUsers(users);
    //validateEmail(users.email);
    writeUsersToFile(users);
    PrintInvalidUser(arr.validUsers);
    //printUsers(invalidUsers) ==>

    //deleteUser(5)
    //updateUserName(6,newName)
}

function PrintInvalidUser(validUsers) {
    console.log(validUsers);
}
function parseFileToLinesAndHeaders(fileContent) {
    let lines = fileContent.split("\n")
    //console.log(lines);
    let headers = lines.shift();
    let keys = headers.split(",");
    return { lines, headers, keys }
}

function parseLinesToUsers (lines, keys) {
    let users = lines.map(line => {
        let obj = {};
        value = line.split(',');
        keys.forEach((item, index) => {
            obj[item] = value[index];
        });

        return obj;
    });
    return users;
}


function validateUsers(users) {
    let validUsers = [];
    let invalidUsers = [];

    users.forEach((user, index) => {
        if (IsValidUser(user) && !testDuplicatid(user.id, users)) {
            validUsers.push [user,index];
        }
        else {
            invalidUsers.push(user);
        }
    })
    return {
        validUsers,
        invalidUsers
    };
}

function IsValidUser(user, users) {
    return user && isValidId(user.id, users) && isValidEmail(user.email) && isValidAge(user.age);
}
function writeUsersToFile(users) {
    let dataainjson = JSON.stringify(users);
    fs.writeFileSync("./users.json", dataainjson);
}

//////////////// validate age of user 
function isValidAge(age) {
    return age > 0;
}

function strContains(str, sub) {
    return str.indexOf(sub) > -1
}

///////
function isValidEmail(email) {
    return !!email && strContains(email, '@');
}

function isValidId(id) {
    return id == true;
}


///// 

///////////// validate dupplicate id 
function testDuplicatid(id, users) {

    let count = 0;
    users.forEach(user => {
        if (user.id == id) {
            count++;
        }
    });
    if (count > 1) {
        console.log('duplicate dtected');
        return true;
    }
    else {
        console.log('not duplicated');
        return false;
    }
}

///////////// 
//testDuplicatid(101)
//validateage() 

//////// ValidationEmail 


//)}

