namespace yt01;
/**
 * the namespaces are written to avoid collision of entities
 */

/**
 * custom data type for the address
 */
type tyAddress {
    street : String(100);
    city   : String(20);
    state  : String(10);
    zip    : String(10)
}

/**
 * custom enum type
 */
type tyGender : String enum {
    Male;
    Female;
}


entity Users {
        /**
         * UUID: for auto generating the ids at the server side
         */
    key id      : Integer;
        name    : String(100);
        email   : String(100);
        phone   : String(100);
        gender  : tyGender;
        address : tyAddress;
        project : Association to Projects
}

entity Projects {
    key Id          : Integer;
        name        : String(100);
        description : String(1024);
        user        : Association to many Users
                          on user.project = $self;
}
