## VK API with promises 

**Dependencies:** 

* request 
* bluebird 

Install 

```
npm install --save git+https://git@github.com/artsoroka/vk-then.git
```

Usage 
```js
var VK  = require('vk-then'); 
var api = new VK({accessToken: 'VK_ACCESS_TOKEN'}); 

api
  .call('groups.get',{
      user_id: 1,
      extended: 1, 
      count: 100
  })
  .then(function(data){
      console.log(data); 
  })
  .catch(function(err){
      console.log(err); 
  }); 

```

