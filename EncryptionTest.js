import bcrypt from "bcrypt";

async function test(password) {
    
    const uglyPassword = await bcrypt.hash(password, 10);
    console.log(uglyPassword)
}

test("test");