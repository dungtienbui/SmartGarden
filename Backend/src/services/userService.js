import db from '../models'

class userService {
    async getAllValue(fname, lname, email) {
        try{
            await db.User.create({
                firstName: fname,
                lastName: lname,
                email: email
            })
        } catch (err){
            console.error(err);
        }
    }
}

module.exports = new userService();