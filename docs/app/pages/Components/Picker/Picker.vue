<example src="./examples/BaseUsed.vue" />
<example src="./examples/FixPicker.vue" />
<example src="./examples/YearPicker.vue" />
<template>
  <page-container centered :title="$t('pages.icon.title')">
    <div class="page-container-section">
      <h2 class="md-headline">md-picker</h2>
      <p>
        <code>md-picker</code>是指提供多个选项集合供用户选择其中一项的控件。Picker展示区域有限，部分选项会被隐藏，最好是当用户对所有选项都比较熟悉、有预期的时候，才使用Picker。
      </p>
      <ul>
        <li>合理的默认选项能让用户减少操作次数，提升效率。</li>
        <li>选项的排列顺序要依据当前上下文情景而定，例如衣服尺码按从小到大的顺序排列，而不是根据衣服尺码的首字母在字母表的顺序排列。</li>
        <li>滚轮选择器控制在五列以内。为了保证手机屏幕触控精度，以免发生误触，滚轮选择器建议控制在五列以内。</li>
        <li>使用相对概念增强感知。比起绝对的“某年某月日”，用“今天”、“昨天”等相对概念，能更快的激发人对时间的感知。</li>
        <li>如果选项非常多，而且选项本身比较复杂难理解需要辅助的解释，建议用容纳更多的选项的其他形式，例如日历或者新页面。</li>
      </ul>
    </div>
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
    <div class="page-container-section">
      <code-example title="年度选择" :component="examples['year-picker']" />
    </div>
    <div class="page-container-section">
      <code-example title="联动" :component="examples['fix-picker']" />
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
          props: [{
            name: 'value',
            type: 'array',
            description: '表单值，使用 v-model 绑定',
            defaults: 'null'
          }, {
            name: 'md-data',
            type: 'array',
            description: '选项列表数据',
            defaults: 'null'
          }, {
            name: 'md-columns',
            type: 'number',
            description: '指定联动模式下的列数，当不指定时表示非联动',
            defaults: 'null'
          }, {
            name: 'md-fixed-columns',
            type: 'number',
            description: '指定显示多少列，隐藏多余的',
            defaults: 'null'
          }, {
            name: 'md-column-width',
            type: 'array',
            description: '定义每一列宽度，只需要定义除最后一列宽度，最后一列自动宽度， 比如对于3列选择，可以这样：[1/2, 1/5]',
            defaults: 'null'
          }]
        },
        classes: {
          headings: ["Name", "Description", "Example"],
          props: [{
            name: "md-item-class",
            description: "",
            example: "scroller-item"
          }]
        },
        events: {
          headings: ["Name", "Description", "Value"],
          props: [{
            name: "on-change",
            description: "选择值变化时触发",
            value: "(value)"
          }]
        }
      }
    }
  })
};

</script>
