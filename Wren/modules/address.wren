import "./country" for Country

class Address {

	construct new() {
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

	[index] {
		this.updateArray()
		return index < _array.count ? _array[index] : null 	
	}
	//[index]=(value) { _array[index] = value }

	iterate(value) {
		if (value == null) {
			_next = 0
			this.updateArray()
		} else {
			_next = value + 1
		}
		//System.print("count is %(_array.count)")
		if (_next == _array.count) return false
		//System.print("iterate")
		//System.print(_next)
		return _next
	}

	iteratorValue(value) {
		//System.print("iteratorValue")
		//System.print(value)
		return _array[value]
	}

	updateArray() {
		_array = []
		if (_line1 != null) _array.add(_line1)
		if (_line2 != null) _array.add(_line2)
		if (_line3 != null) _array.add(_line3)
		if (_town != null) _array.add(_town)
		if (_county != null) _array.add(_county)
		if (post_code != null) _array.add(post_code)
		if (_country.name != null) _array.add(_country.name)
		//System.print(_array.join("#"))
		return _array
	}

	toString() {
		this.updateArray()
		return _array.join(", ")
	}		
}