const isEmpty = (string) => {
	if (string.trim() === '') return true;
	else return false;
};

exports.validateLoginData = (data) => {
   let errors = {};
   if (isEmpty(data.email)) errors.email = 'Must not be empty';
   if (isEmpty(data.password)) errors.password = 'Must not be  empty';
   return {
       errors,
       valid: Object.keys(errors).length === 0 ? true : false
    };
};


const isEmail = (email) => {
	const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (email.match(emailRegEx)) return true;
	else return false;
};

const validDisplayName = (name) => {
	const nameRegEx = /^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
	if (name.match(nameRegEx)) return true;
	else return false;
}

exports.validateSignUpData = (data) => {
	let errors = {};
	if (!validDisplayName(data.displayName)) {
		errors.displayName = "Contains illigal chars. Only letters and numbers are allowed! (6-20 long)"
	} else if (isEmpty(data.email)) {
		errors.email = 'Must not be empty';
	} else if (!isEmail(data.email)) {
		errors.email = 'Must be valid email address';
	} else if ( isEmpty(data.password)) {
        errors.password = 'Must not be empty!';
    }

	if (isEmpty(data.displayName)) errors.displayName = 'Must not be empty';


	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	};
};