const hash = require("./Encryption")

async function test() {
    
    userId = "testID";
    userPassword = "testPassword";

    const { password, salt } = await hash.createHashedPassword(userPassword);
    const certified_password = await hash.makePasswordHashed(salt, userPassword);
    console.log(password)
    return password
}

console.log(test("test"));