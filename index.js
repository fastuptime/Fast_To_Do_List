const db = require('croxydb');
const rl = require('readline-sync');
const moment = require('moment');

////////////////////////////
let komutlar = `Komutlar: Ekle, Sil, Liste, Cikis, Yardim, Cls`;
console.log("Fast To Do List'e Hosgeldiniz!");
console.log(komutlar);
////////////////////////////

//////////////////Functions//////////////////
function randomNum(lenght) {
    let result = '';
    let characters = '0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < lenght; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function re() {
    let command = rl.question('Komut: ');
    if(command.toUpperCase() === "EKLE") {
        console.clear();
        const todo = rl.question('Yapilacak is: ');
        let to_do = {
            is: todo,
            date: moment().format('DD/MM/YYYY'),
            id: randomNum(3)
        };
        db.push("todo", to_do);
        console.log("İs eklendi! İs ID: " + to_do.id);
        re();
    } else if(command.toUpperCase() === "SIL") {
        console.clear();
        const todo = rl.question('Silimek istediginiz is ID: ');
        let to_do = db.get("todo");
        let new_to_do = to_do.filter(x => x.id !== todo);
        db.set("todo", new_to_do);
        console.log("İs silindi!");
        re();
    } else if(command.toUpperCase() === "LISTE") {
        console.clear();
        let to_do = db.get("todo") || [];
        to_do.forEach(x => {
            console.log(`${to_do.indexOf(x) + 1}. Yapilacak is: ${x.is}, Tarih: ${x.date}, ID: ${x.id}`);
        });
        re();
    } else if(command.toUpperCase() === "CIKIS") {
        console.log("Çikis yapiliyor...");
        process.exit();
    } else if(command.toUpperCase() === "YARDIM") {
        console.clear();
        console.log(komutlar);
        re();
    }  else if(command.toUpperCase() === "CLS") {
        re();
    } else {
        console.clear();
        console.log("Böyle bir komut yok!");
        console.log(komutlar);
        re();
    }
}
re();
//////////////////Functions//////////////////
