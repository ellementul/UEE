# UEE
United Events Environment
TODO: Added ticker module
TODO: Ping between Managers by ServerTime, there are list modules in ping for checking avalibility modules
TODO: event faster then running module(accamulate events)
TODO: Added TestDispatcher and TestTransport

```javascript
class YourModule extends UEEModule {
  constructor (yourModuleParams) {

  }

  defEvents () {
    return [{
      // Define event signature 
      name: 'YourEvent', 
      payloadType: { 
        system: "YourSystemName(Or empty)", 
        entity: "NameObject(Or empty)"
      } 
    }]
  }
}
```

And your module send UEEManager to run
```javascript
import { UEE } from 'uee'
import YourModule from 'your-module.js'
import YourTransport from 'your-transport.js'
new UEE({
  transport: new YourTransport(transportParams),
  modules: [new YourModule(yourModuleParams)],
  isRun: true,
})
```