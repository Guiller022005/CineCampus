db.createUser({
    user: "karen",
    pwd: "123456789",
    roles: [
        { role: "adminRole", db: "admin" }
    ]
})

// db.createUser({
//     user: "Miguel",
//     pwd: "123456789",
//     roles: [
//         { role: "estandar", db: "cineCampus" }
//     ]
// })

// db.createUser({
//     user: "Miguel",
//     pwd: "123456789",
//     roles: [
//         { role: "VIP", db: "cineCampus" }
//     ]
// })