import "./modules/address" for Address

// for (i in 1..10) System.print("Counting up %(i)")

var address = Address.new()



address.line1 = "59 Broadway"
address.town = "Exeter"
address.country.name = "United Kingdom"

for (x in address) System.print(x)

System.print("######")

System.print(address.line1)
System.print(address.country.name)

System.print(address.toString())

/*
var list = [1, 2, 3, 4, 5]
var filtered = list.where(Fn.new {|value| value > 3 }) 
System.print(filtered.toList) //> [4, 5]
*/

// Filter uses reference, so adding to numbers alters odds! Use toList to convert to actual values
var numbers = (1..12).toList
var odds = numbers.where{ |n| n % 2 == 1 }
//var odds = numbers.where{ |n| n % 2 == 1 }.toList
numbers.add(13)
System.print(odds.toList) 