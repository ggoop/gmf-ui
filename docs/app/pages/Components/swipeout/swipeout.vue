<example src="./examples/BaseUsed.vue" />
<template>
  <page-container centered title="Swipeout">
    <div class="page-container-section">
      <h2 class="md-headline">md-swipeout</h2>
      <p></p>
    </div>
    <div class="page-container-section">
      <h2>md-swipeout</h2>
      <code-example title="md-swipeout" :component="examples['base-used']" />
    </div>
    <div class="page-container-section">
      <h2>md-swipeout-item</h2>
      <api-item title="API - md-swipeout-item">
        <api-table :headings="api.material.props.headings" :props="api.material.props.props" slot="props" />
        <api-table :headings="api.material.events.headings" :props="api.material.events.props" slot="events" />
      </api-item>
    </div>
  </page-container>
</template>
<script>
import examples from "docs/app/mixins/docsExample";
export default {
  name: "DocSwipeout",
  mixins: [examples],
  data: () => ({
    api: {
      material: {
        props: {
          headings: ['Name', 'Description', 'Default'],
          props: [{
              name: 'md-sensitivity',
              type: 'number',
              description: '滑动多少距离后开始触发菜单显示',
              defaults: '0'
            },
            {
              name: 'md-auto-close-on-button-click',
              type: 'Boolean',
              description: '点击按钮后是否收回菜单',
              defaults: 'true'
            },
            {
              name: 'disabled',
              type: 'Boolean',
              description: '是否不可滑动',
              defaults: 'false'
            },
            {
              name: 'md-threshold',
              type: 'number',
              description: '滑动多少距离后自动打开菜单，否则收回。可以为小于1的比例或者宽度值',
              defaults: '0.3'
            },
            {
              name: 'md-transition-mode',
              type: 'string',
              description: '菜单打开方式，reveal表示菜单不动内容滑出，follow表示菜单随内容滑出',
              defaults: 'reveal'
            }
          ]
        },
        events: {
          headings: ['Name', 'Description', 'Value'],
          props: [{
              name: 'md-opened',
              description: '菜单完全打开时触发',
              value: 'null'
            },
            {
              name: 'md-closed',
              description: '菜单完全关闭时触发',
              value: 'null'
            }
          ]
        }
      }
    }
  })
};

</script>
