const AtomName = 'Password'

module.exports = {
	type: String, 
  set: require('./../_quarks/toCrypted'), 
  validate: require('./../_hadrons/'+AtomName.toLowerCase()+'MongooseValidade')
}
