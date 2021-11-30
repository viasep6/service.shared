const { admin, db } = require('./admin');


/*
	Auth
	checks firebase authentication if the user exists
	based on the provided access token.
	Header: Authentication: Bearer <access token>
*/
module.exports = async(request, response, next) => {
	console.log("Auth module");
	let idToken;
	if (request.headers.authorization && request.headers.authorization.startsWith('Bearer ')) {
		idToken = request.headers.authorization.split('Bearer ')[1];
	} else {
		console.error('No token found');
		return response.res.status(403).json({ error: 'Unauthorized' });
	}

	return admin
		.auth()
		.verifyIdToken(idToken)
		.then((decodedToken) => {
			request.user = decodedToken;
			return db.collection('users').where('idtoken', '==', request.user.uid).limit(1).get();
		})
		.then((data) => {
			// console.log("data from db: ", data.docs[0]);
			request.user = data.docs[0].data()
			return next(request, response);
		})
		.catch((err) => {
			console.error('Error while verifying token', err);
			return response.res.status(403).json(err);
		});
};
