# Atomic Module Generator

Como o conceito de Atomic Design que se desenvolvi para o *backend* preza pelo reuso dos componentes atômicos logo o desenvolvedor não precisará de um gerador de código para iniciar seu sistema com Atomic Design.

No Atomic Design qualquer módulo/entidade é tratado como um organismo, porém **beeeeeem pequenininho** pois o sistema será uma composição de vários micro-organismos desses, que aqui são chamados de `Cell`(célula) pois ela é composta de:

- organelles/actions;
- molecule/schema;
- atoms/fields;
- quarks/validators;
- routes;

Levando isso em consideração a base **crua**, CRUD, de qualquer sistema já está pronta, você precisará apenas criar o que ainda não existir e isso significa o quê?

Significa criar:

- fields/atoms;
- validators/quarks;
- actions/organelles;

Então vamos imaginar um módulo simples de `User`, iniciando pelos seus campos:

```js
// Molecule / Schema
const mongoose = require('mongoose')

const name = require('atomic-modules/fields/name')
const email = require('atomic-modules/fields/email')
const username = require('atomic-modules/fields/name')
const password = require('atomic-modules/fields/password')
const created_at = { type: Date, default: Date.now }

const Structure = {
  name, 
  email, 
  password, 
  created_at
}

const Molecule = mongoose.Schema(Structure)

module.exports = Molecule
```

Nesse caso cada campo já foi pré-criado:

```js
const AtomName = 'Name'

module.exports = {
  type: String, 
  validate: require('atomic-modules/hadrons/'+AtomName.toLowerCase()+'MongooseValidade'),
  required: false
}
```

```js
const AtomName = 'Email'

module.exports = {
  type: String, 
  set: require('atomic-modules/quarks/toLower'), 
  validate: require('atomic-modules/hadrons/'+AtomName.toLowerCase()+'MongooseValidade'), 
  required: true
}
```

```js
const AtomName = 'Password'

module.exports = {
  type: String, 
  set: require('atomic-modules/quarks/toCrypted'), 
  validate: require('atomic-modules/hadrons/'+AtomName.toLowerCase()+'MongooseValidade'),
  required: true
}
```

E como você deve ter percebido ainda usamos os: `quarks` e `hadrons`. Mas não entrarei em detalhes agora.

Após definir esse Schema/Molecule é que iremos gerar nosso Organism:

```js
const DNA = {
  name: 'Users',
  organelles: ['findOneLogin']
};

const Cell = require('atomic-modules/organism/factory')(DNA);
module.exports = Cell;
``` 

*ps: Esse `factory` também poderia ser chamado de `SteamCell` por ser uma célula básica que se transforma em qualquer outra!* :p

```js
const express = require('express')
const router = express.Router()
const Cell = require("./organism")

// Create
router.post('/', Cell.create)
router.get('/', Cell.find)
router.get('/last', Cell.findOneLastUser)

module.exports = router
```

Nesse caso estamos utilizando 1 função nova que não existe ainda no nosso padrão básico que são:

- create;
- find;
- findOne;
- findById;
- findByIdParam;
- update;
- remove.

Para fazermos isso de forma automática utilizamos esse gerador da seguinte forma:



