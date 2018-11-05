module.exports = {
    apps : [
        {
            name : "server-production",
            script : "server/index.js",
            watch : true,
            env: {
                "NODE_ENV": "production",
                "PORT": "8080"
            }
        },
        {
            name : "server-test",
            script : "server/index.js",
            watch : true,
            env: {
                "NODE_ENV": "test",
                "PORT": "3000"
            }
        }
    ]
}