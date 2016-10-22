const AtomName = 'Name';

module.exports = {
	type: String, 
  validate: require('./../_hadrons/'+AtomName.toLowerCase()+'MongooseValidade'),
  required: true
}
