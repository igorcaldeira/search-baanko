class PassengerValidation {

	static checkPassenger(pax) {
		if(pax.name == '' || pax.name.length < 2)
			return true;
		if(pax.lastName == '' || pax.lastName.length < 2)
			return true;
		if(pax.identification == '' || pax.identification.length < 2)
			return true;
		if(pax.birthdate == '' || pax.birthdate.length < 2)
			return true;
		var birthdate = pax.birthdate.split('/');
		if(birthdate.length != 3)
			return true;
		if(birthdate[0].length != 2) return true;
		if(birthdate[1].length != 2) return true;
		if(birthdate[2].length != 4) return true;
		return false;
	}
}

// var response = PassengerValidation.checkPassenger({name: 'asdasd', lastName:'galoso', identification: '23132', birthdate: '26/0296'});
// console.log(response);

module.exports = PassengerValidation;