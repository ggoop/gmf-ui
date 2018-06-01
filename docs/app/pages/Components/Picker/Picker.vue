<example src="./examples/BaseUsed.vue" />
<template>
  <page-container centered :title="$t('pages.icon.title')">
   

    <div class="page-container-section">
      <h2>md-picker 选择器</h2>
      <p> 选择器组件通常与<code>弹出层</code>组件配合使用</p>

      <code-example title="md-picker" :component="examples['base-used']" />

      <api-item title="API - md-picker">
        <p>The following options can be applied to all icons:</p>
        <api-table :headings="api.material.props.headings" :props="api.material.props.props" slot="props" />
        <api-table :headings="api.material.classes.headings" :props="api.material.classes.props" slot="classes" />
        <api-table :headings="api.material.events.headings" :props="api.material.events.props" slot="events" />
      </api-item>
    </div>
  </page-container>
</template>
<script>
import examples from "docs/app/mixins/docsExample";

export default {
  name: "DocPicker",
  mixins: [examples],
  data: () => ({
    api: {
      material: {
        props: {
          headings: ["Name", "Description", "Example"],
          props: [
            {
              name: "md-size-[dimension]",
              description:
                "Increases the size of the icon. It accepts 2x, 3x, 4x or 5x",
              example: "md-size-3x"
            }
          ]
        },
        classes: {
          headings: ["Name", "Description", "Example"],
          props: [
            {
              name: "md-size-[dimension]",
              description:
                "Increases the size of the icon. It accepts 2x, 3x, 4x or 5x",
              example: "md-size-3x"
            }
          ]
        },
        events: {
          headings: ["Name", "Description", "Value"],
          props: [
            {
              name: "md-loaded",
              description: "Triggered right after fetch of the SVG icon",
              example: "null"
            }
          ]
        }
      }
    }
  })
};
</script>
