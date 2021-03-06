<template>
  <div class="container">
    <h1>Polyfill tag generator</h1>
    <p><a href="https://polyfill.io">Polyfill.io</a> is an awesome service by <a href="https://www.ft.com/">financial times</a> team which is providing an end-users only those polyfills their browser need. So you can simply focus on your front-end application logic. Here you can customize the polyfills to even more specify the request.</p>
    <p>Select needed for your app polyfills and your user will get only those of them, which is not supported with their browsers!</p>
    <p>For more info visit <a href="https://polyfill.io">Polyfill.io homepage</a></p>
    <h3 v-show="!allUnchecked">Click to copy script tag:</h3>
    <input id="script-tag-input"
           :data-clipboard-text="scriptTag" v-clipboard
           class="script-tag-input form-control"
           v-show="!allUnchecked"
           type="text" readonly
           :value="scriptTag" />
   <div class="copied"></div>
   <div class="alert alert-warning" v-show="link.length > 2083" role="alert">
     Maximum URL length is 2083 characters in Internet Explorer, the current script' url length is {{link.length}} characters
   </div>
    <h3>Modify script tag selecting only needed polyfills</h3>
    <p class="info">The script tag adress will modify due to your needs</p>
    <div class="controls">
      <button @click="changeConfiguration('set_default')" class="btn btn-success btn-xs" :disabled="onlyDefaultChecked">Set to default everything</button>
      <button @click="changeConfiguration('add_default')" class="btn btn-primary btn-xs" :disabled="defaultChecked">Select all default polyfills</button>
      <button @click="changeConfiguration('uncheck_all')" class="btn btn-warning btn-xs" :disabled="allUnchecked">Deselect everything</button>
      <button @click="changeConfiguration('check_all')" class="btn btn-primary btn-xs" :disabled="allChecked">Select everything</button>
    </div>
    <div class="table-responsive">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>Property name <input v-model="filter" placeholder="Filter features for fast search" /></th>
          <th>IE / Edge</th>
          <th>Firefox</th>
          <th>Chrome</th>
          <th>Safari</th>
          <th class="size-td">Size:</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><input type="checkbox" :checked="defaultChecked" disabled="disabled" /></td>
          <td colspan="5">Default
          </td>
          <td class="size-td">{{defaultSize}}</td>
        </tr>
        <tr @click="features[prop].checked = !features[prop].checked"
            v-show="!filter || isFiltered(prop)"
            v-for="(feature, prop) in features"
            class="feature-row"
            :class="{'checked success':feature.checked}">
          <td><input type="checkbox" v-model="features[prop].checked" /></td>
          <td>{{prop}}
            <span v-if="features[prop].default"
                  class="label label-success">
                  <i class="fa fa-star"></i> Default
            </span>
          </td>
          <td class="support-td ie-support">
            <tag-group browser="ie" :support="feature.support.ie"></tag-group>
          </td>
          <td class="support-td firefox-support">
              <tag-group browser="firefox" :support="feature.support.firefox"></tag-group>
          </td>
          <td class="support-td chrome-support">
              <tag-group browser="chrome" :support="feature.support.chrome"></tag-group>
          </td>
          <td class="support-td safari-support">
              <tag-group browser="safari" :support="feature.support.safari"></tag-group>
          </td>
          <td class="size-td">{{feature.size}}</td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import TagGroup from './TagGroup';
  import features from './../assets/features.json';

  const POLYFILL_LINK = 'https://cdn.polyfill.io/v2/polyfill.min.js';

  const normalizedFeatures = _.forEach(Object.assign({}, features), (_feature) => {
    const feature = _feature;
    if (feature.default) {
      feature.checked = true;
    } else {
      feature.checked = false;
    }
  });

  export default {
    name: 'generator',
    data() {
      return {
        filter: '',
        features: normalizedFeatures,
      };
    },
    components: {
      TagGroup,
    },
    computed: {
      scriptTag() {
        // eslint-disable-next-line
        return `<script src="${this.link}"></sc` + `ript>`;
      },
      allUnchecked() {
        return _.every(this.features, {
          checked: false,
        });
      },
      allChecked() {
        return _.every(this.features, {
          checked: true,
        });
      },
      defaultChecked() {
        return !_.some(this.features, {
          default: true,
          checked: false,
        });
      },
      onlyDefaultChecked() {
        return _.every(this.features, el =>
          (el.default && el.checked) || (!el.default && !el.checked),
        );
      },
      link() {
        let link = POLYFILL_LINK;
        if (!this.onlyDefaultChecked) {
          let featured = '';
          if (this.defaultChecked) {
            featured = 'default';
            _.forEach(this.features, (feature, name) => {
              if (!feature.default && feature.checked) {
                featured += `,${name}`;
              }
            });
          } else {
            _.forEach(this.features, (feature, name) => {
              if (feature.checked) {
                featured += `${name},`;
              }
            });
            // remove ending comma
            featured = featured.slice(0, -1);
          }
          link = `${POLYFILL_LINK}?features=${featured}`;
        }
        return link;
      },
      defaultSize() {
        let size = 0;
        _.forEach(this.features, (feature) => {
          if (feature.default) {
            size += parseFloat(feature.size);
          }
        });
        return `${size.toFixed(2)} KB`;
      },
    },
    methods: {
      isFiltered(_propName) {
        const filterInput = this.filter.toLowerCase().replace(/\.prototype/, '');
        const propName = _propName.toLowerCase().replace(/\.prototype/, '');
        const re = new RegExp(filterInput);
        return !!propName.match(re);
      },
      changeConfiguration(action) {
        _.forEach(this.features, (_feature) => {
          const feature = _feature;
          if (action === 'set_default') {
            if (!feature.default && feature.checked) {
              feature.checked = false;
            } else if (feature.default && !feature.checked) {
              feature.checked = true;
            }
          } else if (action === 'add_default') {
            if (feature.default && !feature.checked) {
              feature.checked = true;
            }
          } else if (action === 'check_all') {
            feature.checked = true;
          } else if (action === 'uncheck_all') {
            feature.checked = false;
          }
        });
      },
    },
    mounted() {
    },
  };

</script>

<style scoped>
  .feature-row {
    cursor: pointer;
  }
  
  .feature-row input[type="checkbox"] {
    pointer-events: none
  }
  
  .info {
    color: #666;
    font-style: italic;
  }
  
  #script-tag-input {
    margin-bottom: 20px;
    cursor: pointer;
    padding: 10px;
    width: 100%;
    border: 1px solid #333;
    transition: 0.1s all ease-in;
  }
  
  .copied:before {
    content: 'Copy to clipboard';
    transition: 0.5s content ease-in;
    color: #fff;
  }
  
  #script-tag-input:active {
    background: #6f6d6d;
    color: #fff;
  }
  
  .copied {
    position: absolute;
    background: #000;
    opacity: 0;
    transition: 0.3 opacity ease-in;
    padding: 10px;
    border-radius: 2px;
    margin-top: -110px;
    left: 50%;
    transform: translate(-50%, 0);
  }
  
  .copied:after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -8px;
    width: 0;
    height: 0;
    border-top: 8px solid #000000;
    border-right: 8px solid transparent;
    border-left: 8px solid transparent;
  }
  
  #script-tag-input:hover+.copied {
    opacity: 1;
    transition: 0.3 opacity ease-in;
  }
  
  #script-tag-input:active+.copied:before {
    content: 'Copied';
  }
  
  tr.checked td {
    font-weight: 700;
  }
  
  .size-td {
    text-align: right
  }
  
  .container {
    max-width: 100%;
  }
  
  h1,
  h2 {
    font-weight: normal;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    display: inline-block;
    margin: 0 10px;
  }
  
  a {
    color: #42b983;
  }

</style>
