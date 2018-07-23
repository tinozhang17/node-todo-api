const {SHA256} = require('crypto-js');



let msg = 'I am user number 3';
let hash = SHA256(msg).toString();

console.log(msg);
console.log(hash.toString());

let data ={
    id: 4
}; // this is the data we want to send back to client. And we need to make sure the client doesn't change this id property, because we will be using this id property to determine the documents belonging to and accessible by this id.

let token = {
    data,
    hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
}; // 'somesecret' is the salt that we will add onto our message so that the user wouldn't be able to rehash the id and get the same hash as the salted one.

token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data) + 'somesecret').toString(); // This is how a malicious client might attempt to change the id and the hash and trying to get access to user number 5's documents.

let resultHash = SHA(JSON.stringify(token.data) + 'somesecret').toString();

if (resultHash === token.hash) {
    console.log('Data was not changed');
} else {
    console.log('Data was changed. Do not trust!');
}

