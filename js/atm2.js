
const validationError = 'INCORRECT VALUE, TRY AGAIN';
const menu = '</br></br>-----MENU-----</br></br> D - DEPOSITE MONEY</br></br>' +
' W - WITHDRAW MONEY </br></br> C - CHECK YOUR BALANCE </br></br> Q -  QUIT  '

user_1 = {   
    Name: 'user 1',
    pin: 1111,
    amount: 1000,
    isActive: false
}; 

user_2 = {   
    Name: 'user 2',
    pin: 2222,
    amount: 1000,
    isActive: false
}; 

user_3 = {   
    Name: 'user 3',
    pin: 3333,
    amount: 1000,
    isActive: false
};

let users = JSON.parse(localStorage.getItem('users')) || [user_1, user_2, user_3];


function welcome(){
    let index = users.findIndex((item) => item.isActive == true);
    if(index >= 0){
        userNameForm.setAttribute("style", "display:none;");
        pinCodeForm.setAttribute("style", "display:none;");
        printMessages('HELLO  ' + users[index].Name + 
        ',</br></br> PLEASE CHOOSE YOUR ACTION AND PRESS: </br></br> D - DEPOSITE MONEY</br></br>' +
        ' W - WITHDRAW MONEY </br></br> C - CHECK YOUR BALANCE </br></br> Q -  QUIT  ') 
    }
    else{
        userNameForm.setAttribute("style", "display:block;");
    }
    // let image = document.getElementById('image')    
    // card.style.animationName='example';
    // content.innerHTML ='<form><h2>WELCOME, ' + 
    // user_1.Name + '<br> PLEASE ENTER YOUR PIN.</h2><input id="number" type=number max="9999">'
}

//welcome();

let currentUserName = ""

function checkUserName() {
    let userName = document.getElementById("userName").value;
    let index = users.findIndex((item) => item.Name == userName);
    if(index >= 0){
        currentUserName = userName;
        userNameForm.setAttribute("style", "display:none;");
        pinCodeForm.setAttribute("style", "display:block;");
        printMessages('WELCOME ' + userName);
    }
    else{
        printMessages("WRONG USER NAME, TRY AGAIN")
    }
}

function checkUser(pinCode){
    var pinCode = document.getElementById("pinCode").value;
    let index = users.findIndex((item) => item.Name == currentUserName & item.pin == pinCode);
    if(index >= 0){
        users[index].isActive = true;
        dataSave();
        welcome()
    }
    else{
        printMessages('PIN CODE IS INCORRECT, TRY AGAIN');
    }
}

function getActiveUser() {
    let index = users.findIndex((item) => item.isActive == true);
    return index
}

function checkBalance() {
    clear()
    let index = getActiveUser()
    if(index >= 0){
        printMessages('YOUR BALANCE IS: </br></br>' + users[index].amount + ' ILS </br></br>' + menu) 
    } else {
       printMessages('PLEASE LOG IN BEFORE USING')
       welcome() 
    }
}

function afkada(afkada) {   // DEPOSIT
    let index = getActiveUser()
    console.log(index)
    if(index >= 0){
        if (validateValue(afkada)){
            users[index].amount += Number(afkada)
            dataSave()
            dOtherInput.value = ''
            printMessages('YOUR BALANCE UPDATED TO: </br></br> ' + users[index].amount + ' ILS </br></br>' + menu ) 
        } else {
            dOtherInput.value = ''
            printMessages(validationError)
            dOtherDiv.setAttribute("style", "display:block;")    
    }
    } else {
        dOtherInput.value = ''
        printMessages('PLEASE LOG IN BEFORE USING') 
        welcome()
    }
}

function mashiha(mashiha) {  // WITHRAWAL
    let index = getActiveUser()
    if(index >= 0){
        if (validateValue(mashiha)){
            if (users[index].amount >= mashiha) {
                users[index].amount -= mashiha
                dataSave()
                printMessages('PLEASE TAKE YOUR MONEY </br></br> YOUR BALANCE UPDATED TO: </br></br> ' + users[index].amount + ' ILS </br></br>' + menu )
                wView.setAttribute("style", "display:none;")
            }
            else {
                wOtherInput.value = ''
                // content.innerHTML ='<form><h2>YOU DON`T HAVE ENOUGH MONEY FOR IT, ' +
                // 'TRY ANOTHER SUM </br></br> YOUR BALANCE IS:  ' + users[index].amount
                printMessages('<form><h2>YOU DON`T HAVE ENOUGH MONEY FOR IT, ' +
                'TRY ANOTHER SUM </br></br> YOUR BALANCE IS:  ' + users[index].amount + ' ILS')
                wOtherDiv.setAttribute("style", "display:block;");
            } }
    else {
        wOtherInput.value = ''
        printMessages(validationError)
        wOtherDiv.setAttribute("style", "display:block;")
    }
    } else {
        printMessages('PLEASE LOG IN BEFORE USING') 
        wView.setAttribute("style", "display:none;")
        welcome()
    } 
}

function validateValue(sumForCheck) {
    if (sumForCheck % 20 == 0 || sumForCheck % 50 == 0 || sumForCheck % 100 == 0) {
        return true
    }
    return false
}

function dataSave() {
    localStorage.setItem("users",JSON.stringify(users))
}

function printMessages(message) {
    messages.innerHTML = message;
}

function w() {
    clear()
    wView.setAttribute("style", "display:block;");
}

function wOther(){
    clear()
    wOtherDiv.setAttribute("style", "display:block;");
}

function wOtherAction(){
    clear()
    mashiha(wOtherInput.value);
}

function dOther(){
    clear()
    dOtherDiv.setAttribute("style", "display:block;");
}

function dOtherAction(){
    clear()
    afkada(dOtherInput.value);
}

function clear() {
    userNameForm.setAttribute("style", "display:none;");
    pinCodeForm.setAttribute("style", "display:none;");
    wView.setAttribute("style", "display:none;");
    wOtherDiv.setAttribute("style", "display:none;");
    dOtherDiv.setAttribute("style", "display:none;");
    pinChangeDiv.setAttribute("style", "display:none;")
    printMessages("");
} 
// --------------------pinCodeChange
function pinCodeChange() {
    clear()
    pinChangeDiv.setAttribute("style", "display:block;");
}
function pinCodeChangeAction() {
    let index = getActiveUser()
    if(index >= 0){
        users[index].pin = pinChangeInput.value
        dataSave();
        printMessages('YOUR PIN CHANGED </br></br>' + menu )
        pinChangeDiv.setAttribute("style", "display:none;")
        pinChangeInput.value = ''
        
    } else {
        pinChangeInput.value = ''
        pinChangeDiv.setAttribute("style", "display:none;")
        printMessages('PLEASE LOG IN BEFORE USING') 
        welcome()
    }
}
// ----------------------

function exit() {
    clear()
    userNameForm.setAttribute("style", "display:block;");
    let index = getActiveUser()
    
    if(index >= 0)
        users[index].isActive = false

    dataSave()
    welcome()
    userName.value = ''
    pinCode.value = ''
    wOtherInput.value = ''
    dOtherInput.value = ''
}
