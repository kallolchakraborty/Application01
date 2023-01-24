/**
 * to make aware the service layer about the schema.cds file
 */
using {yt01} from '../db/schema';

/**
 * the service layer needs to know from which table the data
 * should be read from
 */


// to add explicitly the custom handler:
// service catalogService @(impl: 'path for the custom handler') {
service catalogService {

    /**
     * to expose the entities
     */
    // generic handlers
    entity Users    as select from yt01.Users;
    entity Projects as select from yt01.Projects;
}
