
const fs = require('fs');
let user = fs.readFileSync('./users.json', 'utf-8');
let users = JSON.parse(user);


///// calculate the avg age 
function findavg_agegender() {
    count = 0;
    avg = 0;
    sum = 0;
    users.forEach(user => {

        if (user.gender === 'Male') {
            sum = sum + Number(user.age);
            count++;
        }
    });
    if (count > 0) {
        avg = sum / count;
        console.log(avg);
    }
    else {
        console.log('there is no male in the file')
    }
}
//findavg_agegender();
//////////// sort the name of the file 
function SortedName() {
    users.sort(function (a, b) {
        var nameA = a.full_name.toLowerCase();
        var nameB = b.full_name.toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }


        return 0;
    });

    //console.log(users);
}
  //SortedName();






