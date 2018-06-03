<example src="./examples/BaseUsed.vue" />
<template>
  <page-container centered :title="$t('pages.icon.title')">
    <div class="page-container-section">
      <h2 class="md-headline">md-popup</h2>
      <p></p>
    </div>
    <div class="page-container-section">
      <h2>md-Popup 选择器</h2>
      <code-example title="md-picker" :component="examples['base-used']" />
      <api-item title="API - md-popup">
        <api-table :headings="api.material.props.headings" :props="api.material.props.props" slot="props" />
        <api-table :headings="api.material.events.headings" :props="api.material.events.props" slot="events" />
      </api-item>
    </div>
  </page-container>
</template>
<script>
import examples from "docs/app/mixins/docsExample";
export default {
  name: "DocPopup",
  mixins: [examples],
  data: () => ({
    api: {
      material: {
        props: {
          headings: ['Name', 'Description', 'Default'],
          props: [{
              name: 'md-active',
              type: 'Boolean',
              description: 'The prop to show/hide the dialog. Should be used with the <code>.sync</code> modifier.',
              defaults: 'false'
            },
            {
              name: 'md-backdrop',
              type: 'Boolean',
              description: 'Enable/disable the dialog overlay',
              defaults: 'true'
            },
            {
              name: 'md-close-on-esc',
              type: 'Boolean',
              description: 'By the default the dialog will close when pressing esc. To disabled that, just set this prop as false',
              defaults: 'true'
            },
            {
              name: 'md-click-outside-to-close',
              type: 'Boolean',
              description: 'By the default the dialog will close when clicking outsite. To disabled that, just set this prop as false',
              defaults: 'true'
            },
            {
              name: 'md-fullscreen',
              type: 'Boolean',
              description: 'The dialog will become fullscreen on mobile screens. This option can disable this behavior.',
              defaults: 'true'
            },
            {
              name: 'md-position',
              type: 'string',
              description: 'The dialog position [top,left,right,bottom]',
              defaults: 'bottom'
            },
          ]
        },
        events: {
          headings: ['Name', 'Description', 'Value'],
          props: [{
              name: 'md-opened',
              description: 'Triggered when a dialog opens',
              value: 'null'
            },
            {
              name: 'md-closed',
              description: 'Triggered when a dialog closes',
              value: 'null'
            },
            {
              name: 'md-clicked-outside',
              description: 'Triggered when clicked outside',
              value: 'null'
            }
          ]
        }
      }
    }
  })
};

</script>
