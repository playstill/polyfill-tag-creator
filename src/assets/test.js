a = {}
temp1.forEach((el) => {
  let support = {}
  if (!el['@data-feature-name']) {
    return
  }
  let _default = (function() {
    try {
      return el.td[0].ul[1].i['@title'] === 'Part of the default set'
    } catch (err) {
      return false
    }
  }())
  let size = (function() {
     try {
       if (el.td[0].ul.li) {
         return el.td[0].ul.li['#text']
       } else {
         return el.td[0].ul[0]['#text']
       }
    } catch (err) {
      return '?'
    }

    
  }())
  
      
    
    //IE: 
    try {
       if (el.td[1].length) {
         support.ie = {
           native: 0,
           polyfill: 0,
           no_support:[]
         }
         
         el.td[1].forEach((el2) => {
           if (el2['@title'] === 'Supported with polyfill service' && !support.ie.polyfill) {
             support.ie.polyfill =  Number(el2['#text'])
           }
           if (el2['@title'] === 'Supported natively' && !support.ie.native) {
             support.ie.native =  Number(el2['#text'])
           }
           if (el2['@title'] === 'Not supported') {
             support.ie.no_support.push( Number(el2['#text']))
           }
         })
       } 
    } catch (err) {
    }
  
  //Firefox: 
    try {
       if (el.td[2].length) {
         support.firefox = {
           native: 0,
           polyfill: 0,
           no_support:[]
         }
         
         el.td[2].forEach((el2) => {
           if (el2['@title'] === 'Supported with polyfill service' && !support.firefox.polyfill) {
             support.firefox.polyfill = Number(el2['#text'])
           }
           if (el2['@title'] === 'Supported natively' && !support.firefox.native) {
             support.firefox.native = Number(el2['#text'])
           }
           if (el2['@title'] === 'Not supported') {
             support.firefox.no_support.push(Number(el2['#text']))
           }
         })
       } 
    } catch (err) {
    }
  
  //Chrome: 
    try {
       if (el.td[3].length) {
         support.chrome = {
           native: 0,
           polyfill: 0,
           no_support:[]
         }
         
         el.td[3].forEach((el2) => {
           if (el2['@title'] === 'Supported with polyfill service' && !support.chrome.polyfill) {
             support.chrome.polyfill = Number(el2['#text'])
           }
           if (el2['@title'] === 'Supported natively' && !support.chrome.native) {
             support.chrome.native = Number(el2['#text'])
           }
           if (el2['@title'] === 'Not supported') {
             support.chrome.no_support.push(Number(el2['#text']))
           }
         })
       } 
    } catch (err) {
    } 
  
  //Safari: 
    try {
       if (el.td[4].length) {
         support.safari = {
           native: 0,
           polyfill: 0,
           no_support:[]
         }
         
         el.td[4].forEach((el2) => {
           if (el2['@title'] === 'Supported with polyfill service' && !support.safari.polyfill) {
             support.safari.polyfill = Number(el2['#text'])
           }
           if (el2['@title'] === 'Supported natively' && !support.safari.native) {
             support.safari.native = Number(el2['#text'])
           }
           if (el2['@title'] === 'Not supported') {
             support.safari.no_support.push(Number(el2['#text']))
           }
         })
       } 
    } catch (err) {
    }
  
  
  let feature = {
    default:_default,
    size,
    support
  }
  a[el['@data-feature-name']] = feature
})
