import Vue from 'vue'

Vue.directive('autoFocus', {
  inserted: function(el, binding) {
    el.focus()
  }
})