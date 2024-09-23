db.createRole({
    role: "adminRole",
    privileges: [
        {
            resource: {
                db: "admin", collection: "user"
            },
            actions: ["find", "insert", "update"]
        }
    ],
    roles: [
        { role: "userAdminAnyDatabase", db: "admin"},
        { role: "dbAdminAnyDatabase", db: "admin"}
    ]
})

db.createRole(
    {
        role: "estandar",
        privileges: [
            {
                resource: {
                    db: "cineCampus", collection: "user"
                },
                actions: ["find", "insert", "update"]
            },
            {
                resource: {
                    db: "cineCampus", collection:"funcion"
                },
                actions: ["find", "update", "insert", "remove"]
            },
        ],
        roles: []
    }
)


db.createRole(
    {
        role: "VIP",
        privileges: [
            {
                resource: {
                    db: "cineCampus", collection: "user"
                },
                actions: ["find", "insert", "update"]
            },
            {
                resource: {
                    db: "cineCampus", collection:"funcion"
                },
                actions: ["find", "update", "insert", "remove"]
            },
        ],
        roles: []
    }
)