<template>
  <md-field class="md-autocomplete" :class="fieldClasses" md-clearable :md-inline="isBoxLayout">
    <md-menu md-direction="bottom-start" :md-dense="mdDense" md-align-trigger md-full-width :md-active.sync="showMenu">
      <md-input v-model="searchTerm" v-bind="$attrs" :id="mdInputId" :name="mdInputName" :maxlength="mdInputMaxlength" :placeholder="mdInputPlaceholder" @focus.stop="openOnFocus" @blur="hideOptions" @input="onInput" @click.stop.prevent="openOnFocus" />
      <md-menu-content :class="contentClasses" v-show="hasScopedEmptySlot || hasFilteredItems">
        <div class="md-autocomplete-loading" v-if="isPromisePending">
          <md-progress-spinner :md-diameter="40" :md-stroke="4" md-mode="indeterminate" />
        </div>
        <div class="md-autocomplete-items" v-if="hasFilteredItems">
          <md-menu-item v-for="(item, index) in getOptions()" :key="index" @click="selectItem(item, $event)">
            <slot name="md-autocomplete-item" :item="item" :term="searchTerm" v-if="$scopedSlots['md-autocomplete-item']" />
            <template v-else>{{ item }}</template>
          </md-menu-item>
        </div>
        <md-menu-item v-else-if="hasScopedEmptySlot">
          <div class="md-autocomplete-empty">
            <slot name="md-autocomplete-empty" :term="searchTerm" />
          </div>
        </md-menu-item>
      </md-menu-content>
    </md-menu>
    <slot />
  </md-field>
</template>
<script>
import valuesFn from 'lodash/values'
import fuzzy from 'fuzzysearch'
import isPromise from 'is-promise'
import MdPropValidator from 'gmf/core/utils/MdPropValidator'

export default {
  name: 'MdAutocomplete',
  props: {
    value: {
      type: null,
      required: true
    },
    mdDense: Boolean,
    mdLayout: {
      type: String,
      default: 'floating',
      ...MdPropValidator('md-layout', [
        'floating',
        'box'
      ])
    },
    mdOpenOnFocus: {
      type: Boolean,
      default: true
    },
    mdFuzzySearch: {
      type: Boolean,
      default: true
    },
    mdOptions: {
      type: [Array, Promise],
      required: true
    },
    mdInputName: String,
    mdInputId: String,
    mdInputMaxlength: [String, Number],
    mdInputPlaceholder: [String, Number]
  },
  data() {
    return {
      searchTerm: this.value,
      showMenu: false,
      triggerPopover: false,
      isPromisePending: false,
      filteredAsyncOptions: []
    }
  },
  computed: {
    isBoxLayout() {
      return this.mdLayout === 'box'
    },
    fieldClasses() {
      if (this.isBoxLayout) {
        return 'md-autocomplete-box'
      }
    },
    contentClasses() {
      if (this.isBoxLayout) {
        return 'md-autocomplete-box-content'
      }
    },
    filteredStaticOptions() {
      if (this.isPromise(this.mdOptions)) {
        return false
      }

      const firstItem = this.mdOptions[0]

      if (this.mdOptions[0] && this.searchTerm) {
        if (typeof firstItem === 'string') {
          return this.filterByString()
        } else if (typeof firstItem === 'object') {
          return this.filterByObject()
        }
      }

      return this.mdOptions
    },
    hasFilteredItems() {
      return this.filteredStaticOptions.length > 0 || this.filteredAsyncOptions.length > 0
    },
    hasScopedEmptySlot() {
      return this.$scopedSlots['md-autocomplete-empty']
    }
  },
  watch: {
    mdOptions: {
      deep: true,
      immediate: true,
      async handler() {
        if (this.isPromise(this.mdOptions)) {
          this.isPromisePending = true
          this.filteredAsyncOptions = await this.mdOptions
          this.isPromisePending = false
        }
      }
    },

    value(val) {
      this.searchTerm = val
    }
  },
  methods: {
    getOptions() {
      if (this.isPromise(this.mdOptions)) {
        return this.filteredAsyncOptions
      }

      return this.filteredStaticOptions
    },
    isPromise(obj) {
      return isPromise(obj)
    },
    isString(obj) {
      return Object.prototype.toString.call(obj) === "[object String]";
    },
    matchText(item) {
      if(!this.isString(item)||!this.isString(this.searchTerm)){
        return false;
      }
      const target = item.toLowerCase()
      const search = this.searchTerm.toLowerCase()

      if (this.mdFuzzySearch) {
        return fuzzy(search, target)
      }

      return target.includes(search)
    },
    filterByString() {
      return this.mdOptions.filter(item => this.matchText(item))
    },
    filterByObject() {
      return this.mdOptions.filter(item => {
        const values = valuesFn(item)
        const valuesCount = values.length

        for (let i = 0; i <= valuesCount; i++) {
          if (typeof values[i] === 'string' && this.matchText(values[i])) {
            return true
          }
        }
      })
    },
    openOnFocus() {
      if (this.mdOpenOnFocus) {
        this.showOptions()
      }
    },
    onInput() {
      if (!this.mdOpenOnFocus) {
        this.showOptions()
      }
      if (this.searchTerm.constructor.name.toLowerCase() !== 'inputevent') {
        this.$emit('md-changed', this.searchTerm)
      }
    },
    async showOptions() {
      this.showMenu = true
      await this.$nextTick()
      this.triggerPopover = true
      this.$emit('md-opened')
    },
    async hideOptions() {
      await this.$nextTick()
      this.showMenu = false
      await this.$nextTick()
      this.triggerPopover = false
      this.$emit('md-closed')
    },
    selectItem(item, $event) {
      const content = $event.target.textContent.trim()

      this.searchTerm = content
      this.$emit('input', item)
      this.$emit('md-selected', item)
      this.hideOptions()
    }
  }
}

</script>
<style lang="scss">
@import "~gmf/components/MdAnimation/variables";
@import "~gmf/components/MdElevation/mixins";
@import "~gmf/components/MdLayout/mixins";

.md-autocomplete {
  .md-menu {
    width: 100%;
    display: flex;
  }
}

.md-autocomplete-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
}

.md-field.md-inline.md-autocomplete-box {
  @include md-elevation(2);
  padding-top: 2px;
  border-radius: 2px;

  &.md-focused {
    z-index: 120;
  }

  &:before,
  &:after {
    display: none;
  }

  .md-toolbar & {
    min-height: 40px;
    height: 40px;
    margin: 0;
    box-shadow: none;
  }

  .md-menu {
    align-items: center;
  }

  .md-input {
    padding-left: 16px;
  }

  &.md-focused label,
  label,
  .md-input-action {
    top: 50%;
    transform: translateY(-50%);
  }

  .md-input-action {
    right: 8px;
  }

  &.md-focused label,
  label {
    margin-top: 2px;
    left: 16px;
  }
}

.md-autocomplete-box-content {
  @include md-layout-xsmall {
    max-width: 100%!important;
    left: 0px!important;
    right: 0px!important;
    width: 100%!important;
  }
}

.md-autocomplete-box-content:after {
  height: 6px;
  position: absolute;
  top: -6px;
  right: 0;
  left: 0;
  z-index: 120;
  border-bottom: 1px solid;
  content: "";
}

</style>
