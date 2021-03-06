<template>
  <textarea
    class="md-textarea"
    :style="textareaStyles"
    v-model="model"
    v-bind="attributes"
    v-on="listeners"
    @focus="onFocus"
    @blur="onBlur">
  </textarea>
</template>

<script>
  import MdComponent from 'gmf/core/MdComponent'
  import MdUuid from 'gmf/core/utils/MdUuid'
  import MdFieldMixin from '../MdFieldMixin'

  function calculateContentHeight (el, lineHeight) {
    const origHeight = el.style.height
    const height = el.offsetHeight
    const scrollHeight = el.scrollHeight

    el.style.overflow = 'hidden'

    if (height >= scrollHeight) {
      el.style.height = (height + lineHeight) + 'px'

      if (scrollHeight < el.scrollHeight) {
        el.style.height = origHeight

        return height
      }
    }

    return scrollHeight
  }

  export default new MdComponent({
    name: 'MdTextarea',
    mixins: [MdFieldMixin],
    inject: ['MdField'],
    props: {
      id: {
        type: String,
        default: () => 'md-textarea-' + MdUuid()
      },
      mdAutogrow: Boolean
    },
    computed: {
      listeners () {
        return {
          ...this.$listeners,
          input: event => this.$emit('input', event.target.value)
        }
      },
      textareaStyles () {
        return {
          height: this.textareaHeight
        }
      }
    },
    methods: {
      getTextAreaLineSize () {
        const style = window.getComputedStyle(this.$el)

        return parseInt(style.lineHeight, 10)
      },
      setTextAreaSize (height) {
        let newHeight = height

        if (!height) {
          const size = this.getTextAreaLineSize()

          newHeight = calculateContentHeight(this.$el, size)
        }

        this.textareaHeight = newHeight + 'px'
      },
      async applyStyles () {
        if (this.mdAutogrow) {
          this.setTextAreaSize(32)
          await this.$nextTick()
          this.setTextAreaSize()
          window.setTimeout(() => {
            this.$el.style.overflow = 'auto'
          }, 10)
        }
      },
      setTextarea () {
        this.MdField.textarea = true
      },
      setAutogrow () {
        this.MdField.autogrow = this.mdAutogrow
      },
      onInput () {
        this.setFieldValue()
        this.applyStyles()
      }
    },
    created () {
      this.setTextarea()
      this.setAutogrow()
    },
    async mounted () {
      await this.$nextTick()
      this.applyStyles()
    },
    beforeDestroy () {
      this.setTextarea(false)
    }
  })
</script>
