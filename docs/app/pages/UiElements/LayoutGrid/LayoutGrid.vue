<example src="./examples/BaseUsed.vue" />
<template>
  <page-container centered title="md-layout-grid">
    <div class="page-container-section">
      <h2 class="md-headline">md-layout-grid</h2>
      <p></p>
    </div>
    <div class="page-container-section">
      <h2>md-layout-grid</h2>
      <code-example title="md-layout-grid" :component="examples['base-used']" />
      <api-item title="API - md-layout-grid">
        <api-table :headings="api.material.props.headings" :props="api.material.props.props" slot="props" />
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
              name: 'md-cols',
              type: 'number',
              description: '列数。如果为非单行 Grid，需要设置 cols，否则所有 GridItem 会平均宽度显示在一行。',
              defaults: '3'
            },
            {
              name: 'md-show-lr-borders',
              type: 'Boolean',
              description: '是否显示左右边框',
              defaults: 'true'
            },
            {
              name: 'md-show-vertical-dividers',
              type: 'Boolean',
              description: '是否显示垂直分割线',
              defaults: 'true'
            }
          ]
        },
      }
    }
  })
};

</script>
