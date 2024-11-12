const bcrypt = require('bcrypt');

const password = '1234567'; // Thay bằng password bạn muốn

bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    console.log('Bhashed Password:', hash);
});
