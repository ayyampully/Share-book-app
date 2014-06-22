module.exports = function(mongoose) {
	
	var crypto = require('crypto');
	
	var BookSchema = new mongoose.Schema({
		title: { type: String, unique: true },
		author: { type: String },
		tags: { type: String },
		photoUrl: { type: String },
		description: { type: String }
	});
	
	var Book = mongoose.model('Book', BookSchema);
	
	/*
	var addBook = function(){
		var book = new Book({
			title: 'Angels & Demons',
			author: 'Dan Brown',
			tags: 'action, horror',
			photoUrl: 'angelanddeaons.jpg',
			description: 'Proin aliquet elementum conditum. Donec tempus vel velit sed sodales. Morbi adipiscing erat.'
		});
		book.save();
	};
	
	var getSingle = function(username, callback) {
		var user = BookSchema.findOne({username: username}, function getSingle(err, doc){
			if (err) {
				// No valid user
				callback(false);
			} else {
				var details = {
					title: doc.title,
					author: doc.author,
					tags: doc.tags,
					photoUrl: doc.photoUrl,
					description: doc.description
				}
				callback(details);
			}
		});
	};
*/
	var getAllItems = function(callback) {

		var user = Book.find({}, function getAll(err, doc){
			if (err) {
				callback(false);
			} else {
				var details = [];
				for(var i=0; doc.length>i; i++){
					details.push({
						bookid: doc[i]._id,
						title: doc[i].title,
						author: doc[i].author,
						tags: doc[i].tags,
						photoUrl: doc[i].photoUrl,
						description: doc[i].description
					})
				}
				callback(details);
			}
		});
	};
	
	return {
		getAllItems: getAllItems,
		Book: Book
	}
}