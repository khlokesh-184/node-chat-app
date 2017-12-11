

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

// here we use ES6 class syntax

class Users {
	constructor () {
		this.users = [];
	}

	addUser (id, name, room) {
		var user = {id, name, room};
		this.users.push(user);
		return user;
	}

	removeUser (id) {
		//return user that was removed
		var user = this.getUser(id);

		if(user) {
			this.users = this.users.filter((user) => user.id != id);
		}
		
		return user;
	}

	getUser (id) {
		return this.users.filter((user) => {
			return user.id === id;
		})[0];
	}

	getUsersList (room) {
		var users = this.users.filter((user) => {
			// if following is true than user gets added
			//to users(list) else it donot get added 
			return user.room === room;
		});

		var namesArray = users.map((user) => {
			return user.name;
		});

		return namesArray;
	}

} 

module.exports = {Users};