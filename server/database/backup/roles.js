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
                    db: "cineCampus", collection: "asiento"
                },
                actions: ["find"]
            },
            {
                resource: {
                    db: "cineCampus", collection:"funcion"
                },
                actions: ["find"]
            },
						{
                resource: {
                    db: "cineCampus", collection:"pelicula"
                },
                actions: ["find"]
            },
						{
                resource: {
                    db: "cineCampus", collection:"movimiento"
                },
                actions: ["find", "update", "insert"]
            },
						{
                resource: {
                    db: "cineCampus", collection:"boleta"
                },
                actions: ["find"]
            },
						{
                resource: {
                    db: "cineCampus", collection:"sala"
                },
                actions: ["find"]
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
                    db: "cineCampus", collection: "asiento"
                },
                actions: ["find"]
            },
            {
                resource: {
                    db: "cineCampus", collection:"funcion"
                },
                actions: ["find"]
            },
						{
                resource: {
                    db: "cineCampus", collection:"pelicula"
                },
                actions: ["find"]
            },
						{
                resource: {
                    db: "cineCampus", collection:"movimiento"
                },
                actions: ["find", "update", "insert"]
            },
						{
                resource: {
                    db: "cineCampus", collection:"boleta"
                },
                actions: ["find"]
            },
						{
                resource: {
                    db: "cineCampus", collection:"sala"
                },
                actions: ["find"]
            },
        ],
        roles: []
    }
)