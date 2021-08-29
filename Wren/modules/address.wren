import "./country" for Country

class Address {

	construct new() {
		_line1 = "foo"
		_country = Country.new()
	}

	line1 { _line1 }
	line1 = (value) { _line1 = value }

	line2 { _line2 }
	line2 = (value) { _line2 = value }

	line3 { _line3 }
	line3 = (value) { _line3 = value }

	town { _town }
	town = (value) { _town = value }

	county { _county }
	county = (value) { _county = value }

	post_code { _post_code }
	post_code = (value) { _post_code = value }

	country { _country }
	country = (value) { _country = value }		

	toString() {
		var address = []
		if (_line1 != null) address.add(_line1)
		if (_line2 != null) address.add(_line2)
		if (_line3 != null) address.add(_line3)
		if (_town != null) address.add(_town)
		if (_county != null) address.add(_county)
		if (post_code != null) address.add(post_code)
		if (_country != null) address.add(_country.name)

		return address.join(", ")
	}		
}