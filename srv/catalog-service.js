/** 
this is custom implicit handler
*/

// importing packages
const bcrypt = require("bcryptjs")

module.exports = srv => {
    /**  
     * run this code before the generic handlers
     * definition:-----------------------------> 
     * srv.event_phase("http_req","entity_name", req_object)
     * event_phases: on, before, after
     * http_event: CREATE, READ, UPDATE, DELETE ---> OPTIONAL
     * the last parameter is a function
     * ----------------------------------------
     * here for all the requests & all entities the custom handler will be called
    */
    // custom handler: 01
    srv.before("*", req => {
        // for printing the requests
        console.log(`Method: ${req.method}`);
        // for printing the target entity
        console.log(`Target: ${req.target.name}`);
    });

    // custom handler: 02
    srv.before("CREATE", "Users", async req => {
        // access to the request object 
        console.log(req.data);
        // accessing the email from the request
        const { email } = req.data;
        /**
         * bcryptjs: industry standard library for encrypting data like password
         * 10: stands for the no. of cycles to encrypt
         */
        const salt = await bcrypt.genSalt(10);
        // assigning the encrypted data to the original request
        req.data.email = await bcrypt.hash(email, salt);
    });

    // custom handler: 03
    /** 
     * event_phase: "on" has to parameters: req & next 
     * the custom handler will run before the READ & the next will call the generic handlers to read
     * */
    srv.on("READ", "Users", async (req, next) => {

        let id = req.data.id;
        let customheader = req.headers.customheader;

        // for the display
        console.log(`ID: ${req.data.id}`)
        console.log(`Custom Header: ${req.headers.customheader}`)

        // READ user from db using generic handler
        const user = await next();
        //console.log(`Length: ${Object.keys(users).length}`)

        if (user === null) {
            // if no user is found then return & skip the following lines
            return req.reject(401, "no user found");
        }
        else {
            if (user.email) {
                let match = await bcrypt.compare(customheader, user.email);
                if (!match) {
                    return req.reject(403, "email id not matched");
                }
            }
        }

    });

}