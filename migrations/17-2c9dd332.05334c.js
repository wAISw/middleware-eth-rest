
module.exports.id = '17.2c9dd332.05334c';

const _ = require('lodash'),
  config = require('../config');

/**
 * @description flow 2c9dd332.05334c update
 * @param done
 */
   

module.exports.up = function (done) {
  let coll = this.db.collection(`${_.get(config, 'nodered.mongo.collectionPrefix', '')}noderedstorages`);
  coll.update({'path':'2c9dd332.05334c','type':'flows'}, {
    $set: {'path':'2c9dd332.05334c','body':[{'id':'5a35929d.0a716c','type':'http in','z':'2c9dd332.05334c','name':'create addr','url':'/addr','method':'post','upload':false,'swaggerDoc':'','x':110,'y':180,'wires':[['623d7287.8bfe9c']]},{'id':'e4822e75.693fd','type':'http response','z':'2c9dd332.05334c','name':'','statusCode':'','x':1590,'y':180,'wires':[]},{'id':'27b27b8e.9827a4','type':'mongo','z':'2c9dd332.05334c','model':'EthAccount','request':'{}','options':'','name':'mongo create addr','mode':'1','requestType':'1','dbAlias':'primary.accounts','x':810,'y':180,'wires':[['98873605.b05d48','22bbe7b3.529a28']]},{'id':'8ab75856.970bb8','type':'function','z':'2c9dd332.05334c','name':'transform output','func':'\nlet factories = global.get("factories"); \n\nif(msg.payload.error){\n    msg.payload = msg.payload.error.code === 11000 ? \n    factories.messages.address.existAddress :\n    factories.messages.generic.fail;\n    return msg;\n}\n    \n    \nmsg.payload = factories.messages.generic.success;\nreturn msg;','outputs':1,'noerr':0,'x':1380,'y':180,'wires':[['e4822e75.693fd']]},{'id':'65927d71.4e8c44','type':'http in','z':'2c9dd332.05334c','name':'remove addr','url':'/addr','method':'delete','upload':false,'swaggerDoc':'','x':90,'y':640,'wires':[['316484c0.63001c']]},{'id':'d0426981.27e8a8','type':'http response','z':'2c9dd332.05334c','name':'','statusCode':'','x':1390,'y':640,'wires':[]},{'id':'7c68e0a0.c140d','type':'mongo','z':'2c9dd332.05334c','model':'EthAccount','request':'{}','options':'','name':'mongo','mode':'1','requestType':'2','dbAlias':'primary.accounts','x':750,'y':640,'wires':[['422cc948.960ac8']]},{'id':'cdd0bdcd.24b59','type':'function','z':'2c9dd332.05334c','name':'transform output','func':'\nlet factories = global.get("factories"); \n\nif(msg.payload.error){\n    msg.payload = factories.messages.generic.fail;\n    return msg;\n}\n    \n    \nmsg.payload = factories.messages.generic.success;\nreturn msg;','outputs':1,'noerr':0,'x':1160,'y':640,'wires':[['d0426981.27e8a8']]},{'id':'316484c0.63001c','type':'function','z':'2c9dd332.05334c','name':'transform params','func':'const prefix = global.get(\'settings.mongo.accountPrefix\');\n\nmsg.address = msg.payload.address.toLowerCase();\n\nmsg.payload = {\n    model: `${prefix}Account`, \n    request: [{\n       address: msg.address\n   }, {isActive: false}]\n};\n\nreturn msg;','outputs':1,'noerr':0,'x':490,'y':640,'wires':[['7c68e0a0.c140d']]},{'id':'564cd86a.7d34d8','type':'http in','z':'2c9dd332.05334c','name':'add erc20','url':'/addr/:addr/token','method':'post','upload':false,'swaggerDoc':'','x':99,'y':940,'wires':[['4ce9b6d1.fbf3f8','57d1ce3.87e913']]},{'id':'d8755eab.f3e54','type':'http response','z':'2c9dd332.05334c','name':'','statusCode':'','x':1450,'y':940,'wires':[]},{'id':'aa22bc0a.a85cf','type':'mongo','z':'2c9dd332.05334c','model':'EthAccount','request':'{}','options':'','name':'mongo','mode':'1','requestType':'2','dbAlias':'primary.accounts','x':1084,'y':904,'wires':[['48b8b6ef.8ac958']]},{'id':'48b8b6ef.8ac958','type':'function','z':'2c9dd332.05334c','name':'transform output','func':'\nlet factories = global.get("factories"); \n\nif(msg.payload.error){\n    msg.payload = factories.messages.generic.fail;\n    return msg;\n}\n    \n    \nmsg.payload = factories.messages.generic.success;\nreturn msg;','outputs':1,'noerr':0,'x':1262,'y':904,'wires':[['d8755eab.f3e54']]},{'id':'4ce9b6d1.fbf3f8','type':'function','z':'2c9dd332.05334c','name':'transform params','func':'const prefix = global.get(\'settings.mongo.accountPrefix\');\n\nmsg.payload = {\n    model: `${prefix}Account`, \n    request: {\n       address: msg.req.params.addr\n   }\n};\n\nreturn msg;','outputs':1,'noerr':0,'x':298,'y':884,'wires':[['3a688a79.929cb6']]},{'id':'e164e510.1bd768','type':'join','z':'2c9dd332.05334c','name':'','mode':'custom','build':'array','property':'payload','propertyType':'msg','key':'topic','joiner':'\\n','joinerType':'str','accumulate':false,'timeout':'','count':'2','x':623,'y':938,'wires':[['788b81cd.854b9']]},{'id':'3a688a79.929cb6','type':'mongo','z':'2c9dd332.05334c','model':'EthAccount','request':'{}','options':'','name':'mongo','mode':'1','requestType':'0','dbAlias':'primary.accounts','x':504,'y':884,'wires':[['e164e510.1bd768']]},{'id':'57d1ce3.87e913','type':'function','z':'2c9dd332.05334c','name':'query','func':'\n\nmsg.payload = [{\n  address: msg.req.params.addr,\n  erc20tokens: msg.payload.erc20tokens\n}];\n\nreturn msg;','outputs':1,'noerr':0,'x':369,'y':941,'wires':[['e164e510.1bd768']]},{'id':'3b167e6c.86e5e2','type':'function','z':'2c9dd332.05334c','name':'','func':'const prefix = global.get(\'settings.mongo.accountPrefix\');\nlet _ = global.get(\'_\');\n\nlet user = msg.payload[1][0];\nlet query = msg.payload[0][0];\n\n  const toAdd = _.chain(query.erc20tokens)\n    .map(addr=>addr.toLowerCase())\n    .reject(val => _.has(user.erc20token, val))\n    .transform((acc, addr) => {\n      acc[`erc20token.${addr}`] = 0;\n    }, {})\n    .value();\n\n\nmsg.payload = {\n    model: `${prefix}Account`, \n    request: [{address: user.address}, {$set: toAdd}]\n   \n};\n\nreturn msg;','outputs':1,'noerr':0,'x':936,'y':905,'wires':[['aa22bc0a.a85cf']]},{'id':'788b81cd.854b9','type':'switch','z':'2c9dd332.05334c','name':'','property':'payload[1][0]','propertyType':'msg','rules':[{'t':'nnull'},{'t':'null'}],'checkall':'true','outputs':2,'x':778,'y':939,'wires':[['3b167e6c.86e5e2'],['fb5fada6.0738e']]},{'id':'fb5fada6.0738e','type':'function','z':'2c9dd332.05334c','name':'transform output','func':'\nlet factories = global.get("factories"); \n\n    \nmsg.payload = factories.messages.generic.fail;\nreturn msg;','outputs':1,'noerr':0,'x':1186,'y':1048,'wires':[['d8755eab.f3e54']]},{'id':'ab703d2f.3a52f','type':'http in','z':'2c9dd332.05334c','name':'remove erc20','url':'/addr/:addr/token','method':'delete','upload':false,'swaggerDoc':'','x':114,'y':1182.5,'wires':[['7b1a621c.9f0d5c','96bcd2ae.c0006']]},{'id':'6738b594.b1247c','type':'http response','z':'2c9dd332.05334c','name':'','statusCode':'','x':1455,'y':1182.5,'wires':[]},{'id':'89650827.b33e98','type':'mongo','z':'2c9dd332.05334c','model':'EthAccount','request':'{}','options':'','name':'mongo','mode':'1','requestType':'2','dbAlias':'primary.accounts','x':1089,'y':1146.5,'wires':[['15bc7bed.f70844']]},{'id':'15bc7bed.f70844','type':'function','z':'2c9dd332.05334c','name':'transform output','func':'\nlet factories = global.get("factories"); \n\nif(msg.payload.error){\n    msg.payload = factories.messages.generic.fail;\n    return msg;\n}\n    \n    \nmsg.payload = factories.messages.generic.success;\nreturn msg;','outputs':1,'noerr':0,'x':1267,'y':1146.5,'wires':[['6738b594.b1247c']]},{'id':'7b1a621c.9f0d5c','type':'function','z':'2c9dd332.05334c','name':'transform params','func':'\nmsg.payload = {\n    model: \'EthAccount\', \n    request: {\n       address: msg.req.params.addr\n   }\n};\n\nreturn msg;','outputs':1,'noerr':0,'x':303,'y':1126.5,'wires':[['67c7ccc.0094834']]},{'id':'191feca2.b31993','type':'join','z':'2c9dd332.05334c','name':'','mode':'custom','build':'array','property':'payload','propertyType':'msg','key':'topic','joiner':'\\n','joinerType':'str','accumulate':false,'timeout':'','count':'2','x':628,'y':1180.5,'wires':[['70c0d489.250b1c']]},{'id':'67c7ccc.0094834','type':'mongo','z':'2c9dd332.05334c','model':'EthAccount','request':'{}','options':'','name':'mongo','mode':'1','requestType':'0','dbAlias':'primary.accounts','x':509,'y':1126.5,'wires':[['191feca2.b31993']]},{'id':'96bcd2ae.c0006','type':'function','z':'2c9dd332.05334c','name':'query','func':'\n\nmsg.payload = [{\n  address: msg.req.params.addr,\n  erc20tokens: msg.payload.erc20tokens\n}];\n\nreturn msg;','outputs':1,'noerr':0,'x':374,'y':1183.5,'wires':[['191feca2.b31993']]},{'id':'3a6a58b4.444e28','type':'function','z':'2c9dd332.05334c','name':'','func':'\nlet _ = global.get(\'_\');\n\nlet user = msg.payload[1][0];\nlet query = msg.payload[0][0];\n\n  const toRemove = _.chain(query.erc20tokens)\n    .map(addr=>addr.toLowerCase())\n    .filter(val => _.has(user.erc20token, val))\n    .transform((acc, addr) => {\n      acc[`erc20token.${addr}`] = 1;\n    }, {})\n    .value();\n\n\nmsg.payload = {\n    model: \'EthAccount\', \n    request: [{address: user.address}, {$unset: toRemove}]\n   \n};\n\nreturn msg;','outputs':1,'noerr':0,'x':941,'y':1147.5,'wires':[['89650827.b33e98']]},{'id':'70c0d489.250b1c','type':'switch','z':'2c9dd332.05334c','name':'','property':'payload[1][0]','propertyType':'msg','rules':[{'t':'nnull'},{'t':'null'}],'checkall':'true','outputs':2,'x':783,'y':1181.5,'wires':[['3a6a58b4.444e28'],['3e8c8bed.c94f44']]},{'id':'3e8c8bed.c94f44','type':'function','z':'2c9dd332.05334c','name':'transform output','func':'\nlet factories = global.get("factories"); \n\n    \nmsg.payload = factories.messages.generic.fail;\nreturn msg;','outputs':1,'noerr':0,'x':1191,'y':1290.5,'wires':[['6738b594.b1247c']]},{'id':'468de3dc.eb162c','type':'http in','z':'2c9dd332.05334c','name':'balance','url':'/addr/:addr/balance','method':'get','upload':false,'swaggerDoc':'','x':110,'y':1440,'wires':[['6731d0f7.68fb4']]},{'id':'6731d0f7.68fb4','type':'function','z':'2c9dd332.05334c','name':'transform params','func':'\nmsg.payload = {\n    model: \'EthAccount\', \n    request: {\n       address: msg.req.params.addr\n   }\n};\n\nreturn msg;','outputs':1,'noerr':0,'x':312.500003814698,'y':1439.99999809265,'wires':[['a66b89d5.08b868']]},{'id':'a66b89d5.08b868','type':'mongo','z':'2c9dd332.05334c','model':'EthAccount','request':'{}','options':'','name':'mongo','mode':'1','requestType':'0','dbAlias':'primary.accounts','x':502.500003814698,'y':1441.24999904632,'wires':[['36a27ede.06cd52']]},{'id':'36a27ede.06cd52','type':'function','z':'2c9dd332.05334c','name':'transform output','func':'\nconst _ = global.get(\'_\');\n\nmsg.payload = {\n  balance: _.get(msg.payload, \'0.balance\', 0),\n  erc20token: _.get(msg.payload, \'0.erc20token\', {})\n}\n\nreturn msg;','outputs':1,'noerr':0,'x':696.250007629395,'y':1441.24999904632,'wires':[['6e227f25.b210e']]},{'id':'6e227f25.b210e','type':'http response','z':'2c9dd332.05334c','name':'','statusCode':'','x':931.250007629395,'y':1439.99999904632,'wires':[]},{'id':'e859d127.685df','type':'catch','z':'2c9dd332.05334c','name':'','scope':['564cd86a.7d34d8','468de3dc.eb162c','5a35929d.0a716c','3b167e6c.86e5e2','3a6a58b4.444e28','6e227f25.b210e','2e2f80ee.29994','d8755eab.f3e54','6738b594.b1247c','e4822e75.693fd','d0426981.27e8a8','e164e510.1bd768','191feca2.b31993','67c7ccc.0094834','7c68e0a0.c140d','89650827.b33e98','a66b89d5.08b868','aa22bc0a.a85cf','3a688a79.929cb6','8eb922da.30d21','96bcd2ae.c0006','57d1ce3.87e913','65927d71.4e8c44','ab703d2f.3a52f','788b81cd.854b9','70c0d489.250b1c','46a7901e.31b49','d47923c.db3aae','fb5fada6.0738e','8ab75856.970bb8','36a27ede.06cd52','48b8b6ef.8ac958','15bc7bed.f70844','3e8c8bed.c94f44','cdd0bdcd.24b59','316484c0.63001c','6731d0f7.68fb4','4ce9b6d1.fbf3f8','7b1a621c.9f0d5c','2d4e82d1.1d6b1e','d4152e22.23fbb'],'x':120,'y':1620,'wires':[['d47923c.db3aae','82a83666.a276e8']]},{'id':'2e2f80ee.29994','type':'http response','z':'2c9dd332.05334c','name':'','statusCode':'','x':750,'y':1600,'wires':[]},{'id':'d47923c.db3aae','type':'function','z':'2c9dd332.05334c','name':'transform','func':'\nlet factories = global.get("factories"); \nlet error = msg.error.message;\ntry {\n    error = JSON.parse(error);\n}catch(e){}\n\nmsg.payload = error && error.code === 11000 ? \nfactories.messages.address.existAddress :\nfactories.messages.generic.fail;\n   \nreturn msg;','outputs':1,'noerr':0,'x':360,'y':1620,'wires':[['692906ce.c34228']]},{'id':'edc524a.f0b1ed8','type':'catch','z':'2c9dd332.05334c','name':'','scope':['27b27b8e.9827a4'],'x':620,'y':80,'wires':[['46a7901e.31b49']]},{'id':'46a7901e.31b49','type':'function','z':'2c9dd332.05334c','name':'transform','func':'const factories = global.get("factories");\n\nlet error = msg.error.message;\ntry {\n    error = JSON.parse(error);\n}catch(e){}\n\nif(error.code !== 11000)\nthrow new Error(msg.error.message);\n\nmsg.payload = {\n    model: \'EthAccount\', \n    request: [\n        {address: msg.payload.request.address}, \n        {$set: msg.payload.request.nem ? { \n            nem: msg.payload.request.nem,\n            isActive: true\n        } : {\n            isActive: true\n        }\n            \n        }\n        ]\n   \n};\n\nreturn msg;','outputs':1,'noerr':0,'x':820,'y':80,'wires':[['8eb922da.30d21']]},{'id':'8eb922da.30d21','type':'mongo','z':'2c9dd332.05334c','model':'EthAccount','request':'{}','options':'','name':'mongo','mode':'1','requestType':'2','dbAlias':'primary.accounts','x':1030,'y':80,'wires':[['98873605.b05d48']]},{'id':'623d7287.8bfe9c','type':'async-function','z':'2c9dd332.05334c','name':'calc balance','func':'const factories = global.get(\'factories\');\nconst _ = global.get(\'_\');\nconst web3 = global.get(\'web3\');\nconst prefix = global.get(\'settings.mongo.accountPrefix\');\n\nlet balance = 0;\n\ntry {\n  balance = await Promise.promisify(web3.eth.getBalance)(msg.payload.address);\n}catch(err){\n    if(err.toLowerCase().contains(\'connection\'))\n        throw Error(err);\n}\n\nlet erc20token = _.chain(msg.payload.erc20tokens)\n    .transform((acc, addr) => {\n      acc[addr.toLowerCase()] = 0;\n    }, {})\n    .value();\n\nmsg.address = msg.payload.address.toLowerCase();\n\nmsg.payload = {\n    model: `${prefix}Account`, \n    request: {\n       address: msg.payload.address.toLowerCase(),\n       erc20token: erc20token,\n       balance: balance,\n       isActive: true,\n       nem: msg.payload.nem\n       }\n};\n\nreturn msg;','outputs':1,'noerr':1,'x':510,'y':180,'wires':[['27b27b8e.9827a4']]},{'id':'66d9378b.b5ca68','type':'amqp in','z':'2c9dd332.05334c','name':'post addresses','topic':'${config.rabbit.serviceName}.account.create','iotype':'3','ioname':'events','noack':'0','durablequeue':'1','durableexchange':'0','server':'','servermode':'1','x':120,'y':260,'wires':[['e63736fc.ecaf58']]},{'id':'10b75c3d.f32764','type':'function','z':'2c9dd332.05334c','name':'','func':'\nif(msg.amqpMessage)\n    msg.amqpMessage.ackMsg();\n\nmsg.payload = JSON.stringify({address: msg.address})\n\nreturn msg;','outputs':1,'noerr':0,'x':1250,'y':260,'wires':[['e69e2f39.1956d']]},{'id':'e63736fc.ecaf58','type':'function','z':'2c9dd332.05334c','name':'','func':'\nmsg.payload = JSON.parse(msg.payload);\n\nreturn msg;','outputs':1,'noerr':0,'x':310,'y':260,'wires':[['623d7287.8bfe9c']]},{'id':'98873605.b05d48','type':'switch','z':'2c9dd332.05334c','name':'','property':'amqpMessage','propertyType':'msg','rules':[{'t':'null'},{'t':'nnull'}],'checkall':'true','outputs':2,'x':1190,'y':180,'wires':[['8ab75856.970bb8'],['10b75c3d.f32764']]},{'id':'e69e2f39.1956d','type':'amqp out','z':'2c9dd332.05334c','name':'','topic':'${config.rabbit.serviceName}.account.created','iotype':'3','ioname':'events','server':'','servermode':'1','x':1390,'y':260,'wires':[]},{'id':'63ec21e7.0aa9b','type':'amqp in','z':'2c9dd332.05334c','name':'delete addresses','topic':'${config.rabbit.serviceName}.account.delete','iotype':'3','ioname':'events','noack':'0','durablequeue':'1','durableexchange':'0','server':'','servermode':'1','x':100,'y':760,'wires':[['9966b6dc.782878']]},{'id':'9966b6dc.782878','type':'function','z':'2c9dd332.05334c','name':'','func':'\nmsg.payload = JSON.parse(msg.payload);\n\nreturn msg;','outputs':1,'noerr':0,'x':290,'y':760,'wires':[['316484c0.63001c']]},{'id':'422cc948.960ac8','type':'switch','z':'2c9dd332.05334c','name':'','property':'amqpMessage','propertyType':'msg','rules':[{'t':'null'},{'t':'nnull'}],'checkall':'true','outputs':2,'x':910,'y':640,'wires':[['cdd0bdcd.24b59'],['e7d143e1.bb6ec']]},{'id':'e7d143e1.bb6ec','type':'function','z':'2c9dd332.05334c','name':'','func':'\nif(msg.amqpMessage)\n    msg.amqpMessage.ackMsg();\n\nmsg.payload = JSON.stringify({address: msg.address})\n\nreturn msg;','outputs':1,'noerr':0,'x':1050,'y':780,'wires':[['9cbed3f4.973d1']]},{'id':'9cbed3f4.973d1','type':'amqp out','z':'2c9dd332.05334c','name':'','topic':'${config.rabbit.serviceName}.account.deleted','iotype':'3','ioname':'events','server':'','servermode':'1','x':1190,'y':780,'wires':[]},{'id':'13c4d524.b9f57b','type':'catch','z':'2c9dd332.05334c','name':'','scope':['623d7287.8bfe9c'],'x':160,'y':340,'wires':[['cc9a1547.1ab0c8']]},{'id':'cc9a1547.1ab0c8','type':'function','z':'2c9dd332.05334c','name':'','func':'const factories = global.get(\'factories\');\nconst prefix = global.get(\'settings.mongo.accountPrefix\');\nconst _ = global.get(\'_\');\n\nmsg.address = msg.payload.address.toLowerCase();\n\nlet erc20token = _.chain(msg.payload.erc20tokens)\n    .transform((acc, addr) => {\n      acc[addr.toLowerCase()] = 0;\n    }, {})\n    .value();\n    \n\nmsg.fallback = true;\n\nmsg.payload = {\n    model: `${prefix}Account`, \n    request: {\n       address: msg.payload.address.toLowerCase(),\n       erc20token: erc20token,\n       balance: 0,\n       nem: msg.payload.nem\n       }\n};\n\nreturn msg;','outputs':1,'noerr':0,'x':367.07640075683594,'y':340.1319694519043,'wires':[['27b27b8e.9827a4']]},{'id':'2d4e82d1.1d6b1e','type':'amqp in','z':'2c9dd332.05334c','name':'update balance addresses','topic':'${config.rabbit.serviceName}.account.balance','iotype':'3','ioname':'events','noack':'0','durablequeue':'1','durableexchange':'0','server':'','servermode':'1','x':150,'y':440,'wires':[['d4152e22.23fbb']]},{'id':'d4152e22.23fbb','type':'async-function','z':'2c9dd332.05334c','name':'update calc balance','func':'const factories = global.get(\'factories\');\nconst _ = global.get(\'_\');\nconst web3 = global.get(\'web3\');\nconst prefix = global.get(\'settings.mongo.accountPrefix\');\n\n\nmsg.payload = JSON.parse(msg.payload);\n\nlet balance = await Promise.promisify(web3.eth.getBalance)(msg.payload.address);\n\nmsg.address = msg.payload.address.toLowerCase();\n\nmsg.payload = {\n    model: `${prefix}Account`, \n    request: [{\n       address: msg.payload.address.toLowerCase()\n       }, {balance: balance}]\n};\n\nreturn msg;','outputs':1,'noerr':1,'x':400,'y':440,'wires':[['c4cf53cd.a0f66']]},{'id':'c4cf53cd.a0f66','type':'mongo','z':'2c9dd332.05334c','model':'EthAccount','request':'{}','options':'','name':'mongo update balance','mode':'1','requestType':'2','dbAlias':'primary.accounts','x':640,'y':440,'wires':[['28ffab99.8ef4c4']]},{'id':'28ffab99.8ef4c4','type':'function','z':'2c9dd332.05334c','name':'','func':'\nif(msg.amqpMessage)\n    msg.amqpMessage.ackMsg();\n\nmsg.payload = JSON.stringify({address: msg.address})\n\nreturn msg;','outputs':1,'noerr':0,'x':850,'y':440,'wires':[[]]},{'id':'692906ce.c34228','type':'switch','z':'2c9dd332.05334c','name':'','property':'amqpMessage','propertyType':'msg','rules':[{'t':'null'},{'t':'nnull'}],'checkall':'true','outputs':2,'x':530,'y':1620,'wires':[['2e2f80ee.29994'],['20e2bac.5686746','71f5d41.f7d1d2c']]},{'id':'d6077a66.2f39c8','type':'amqp out','z':'2c9dd332.05334c','name':'','topic':'${config.rabbit.serviceName}.account.balance','iotype':'3','ioname':'events','server':'','servermode':'1','x':1290,'y':340,'wires':[]},{'id':'22bbe7b3.529a28','type':'switch','z':'2c9dd332.05334c','name':'','property':'fallback','propertyType':'msg','rules':[{'t':'true'}],'checkall':'true','outputs':1,'x':1013.1875438690186,'y':339.5416946411133,'wires':[['e48893e.f1d5d7']]},{'id':'e48893e.f1d5d7','type':'function','z':'2c9dd332.05334c','name':'','func':'\nif(msg.amqpMessage)\n    msg.amqpMessage.ackMsg();\n\nmsg.payload = JSON.stringify({address: msg.address})\n\nreturn msg;','outputs':1,'noerr':0,'x':1150,'y':340,'wires':[['d6077a66.2f39c8']]},{'id':'20e2bac.5686746','type':'async-function','z':'2c9dd332.05334c','name':'','func':'if(msg.error.message.includes(\'CONNECTION ERROR\')){\n    await Promise.delay(5000);\n    await msg.amqpMessage.nackMsg();\n}else{\n    await msg.amqpMessage.ackMsg();\n}\n    \nmsg.payload = typeof msg.error.message;    \n    \nreturn msg;','outputs':1,'noerr':6,'x':750,'y':1660,'wires':[[]]},{'id':'71f5d41.f7d1d2c','type':'debug','z':'2c9dd332.05334c','name':'','active':true,'console':'false','complete':'error','x':759.0729522705078,'y':1705.895881652832,'wires':[]},{'id':'82a83666.a276e8','type':'debug','z':'2c9dd332.05334c','name':'','active':true,'console':'false','complete':'error','x':303.0833282470703,'y':1774.9063186645508,'wires':[]}]}
  }, {upsert: true}, done);
};

module.exports.down = function (done) {
  let coll = this.db.collection(`${_.get(config, 'nodered.mongo.collectionPrefix', '')}noderedstorages`);
  coll.remove({'path':'2c9dd332.05334c','type':'flows'}, done);
};
