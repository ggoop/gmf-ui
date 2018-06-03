<example src="./examples/BaseUsed.vue" />
<example src="./examples/LineTimeCat.vue" />
<example src="./examples/LineRealTime.vue" />
<example src="./examples/LineMut.vue" />
<example src="./examples/area-mut.vue" />
<template>
  <page-container centered :title="$t('pages.icon.title')">
    <div class="page-container-section">
      <h2 class="md-headline">md-vchart</h2>
    </div>
    <div class="page-container-section">
      <code-example title="基本折线图" :component="examples['base-used']" />
    </div>
    <div class="page-container-section">
      <code-example title="折线图:平滑曲线" :component="examples['line-time-cat']" />
    </div>
    <div class="page-container-section">
      <code-example title="动态数据：实时折线" :component="examples['line-real-time']" />
    </div>
    <div class="page-container-section">
      <code-example title="折线图:对比" :component="examples['line-mut']" />
    </div>
    <div class="page-container-section">
      <code-example title="层叠面积图" :component="examples['area-mut']" />
    </div>
    <div class="page-container-section">
      <h2>md-vchart</h2>
      <api-item>
        <api-table :headings="api.vchart.props.headings" :props="api.vchart.props.props" slot="props" />
        <api-table :headings="api.vchart.events.headings" :props="api.vchart.events.props" slot="events" />
        <api-table :headings="api.vchart.methods.headings" :props="api.vchart.methods.props" slot="methods" />
      </api-item>
    </div>
    <div class="page-container-section">
      <h2>md-vline</h2>
      <api-item>
        <api-table :headings="api.vline.props.headings" :props="api.vline.props.props" slot="props" />
      </api-item>
    </div>
    <div class="page-container-section">
      <h2>md-varea</h2>
      <api-item>
        <api-table :headings="api.varea.props.headings" :props="api.varea.props.props" slot="props" />
      </api-item>
    </div>
    <div class="page-container-section">
      <h2>md-vbar</h2>
      <api-item>
        <api-table :headings="api.vbar.props.headings" :props="api.vbar.props.props" slot="props" />
      </api-item>
    </div>
    <div class="page-container-section">
      <h2>md-vscale</h2>
      <api-item>
        <api-table :headings="api.vscale.props.headings" :props="api.vscale.props.props" slot="props" />
      </api-item>
    </div>
    <div class="page-container-section">
      <h2>md-vaxis</h2>
      <api-item>
        <api-table :headings="api.vaxis.props.headings" :props="api.vaxis.props.props" slot="props" />
      </api-item>
    </div>
    <div class="page-container-section">
      <h2>md-vguide</h2>
      <api-item>
        <api-table :headings="api.vguide.props.headings" :props="api.vguide.props.props" slot="props" />
      </api-item>
    </div>
    <div class="page-container-section">
      <h2>md-vlegend</h2>
      <api-item>
        <api-table :headings="api.vlegend.props.headings" :props="api.vlegend.props.props" slot="props" />
      </api-item>
    </div>
  </page-container>
</template>
<script>
import examples from "docs/app/mixins/docsExample";
const vchart = {
  props: {
    headings: ['Name', 'Description', 'Default'],
    props: [{
        name: 'md-data',
        type: 'Array',
        description: '数据',
        defaults: ''
      }, {
        name: 'md-shape',
        type: 'string',
        description: '图形类型',
        defaults: 'line'
      }, {
        name: 'md-prevent-render',
        type: 'Boolean',
        description: '是否自定义渲染逻辑',
        defaults: 'false'
      },
      {
        name: 'md-prevent-default',
        type: 'Boolean',
        description: '是否阻止默认行为',
        defaults: 'false'
      },
    ]
  },
  events: {
    headings: ['Name', 'Description', 'Value'],
    props: [{
      name: 'md-render',
      description: '渲染前触发，一般用于配合 prevent-render 自定义渲染逻辑',
      value: '({ chart })'
    }]
  },
  methods: {
    headings: ['Name', 'Description', 'Value'],
    props: [{
        name: 'rerender',
        description: '清除并重新渲染',
        value: ' '
      },
      {
        name: 'repaint',
        description: '重新渲染',
        value: ' '
      },
      {
        name: 'destroy',
        description: '销毁图表，canvas dom 元素不会销毁',
        value: ' '
      }
    ]
  }
};
const vline = {
  props: {
    headings: ['Name', 'Description', 'Default'],
    props: [{
        name: 'md-shape',
        type: 'string',
        description: '线条形状，可选值 line(默认), smooth(平滑线), dash(虚线)',
        defaults: ''
      },
      {
        name: 'md-series-field',
        type: 'string',
        description: '用于绘制多组线条时的分组字段名。该属性相当于 F2 里的 color，出于理解和设置方便使用 series-field',
        defaults: ''
      }, {
        name: 'md-colors',
        type: 'string|array',
        description: '线条颜色，可以为单个颜色或者颜色列表。不指定时使用默认颜色。',
        defaults: ''
      }
    ]
  }
};
const varea = {
  props: {
    headings: ['Name', 'Description', 'Default'],
    props: [{
      name: 'md-series-field',
      type: 'string',
      description: '用于绘制多组线条时的分组字段名。该属性相当于 F2 里的 color，出于理解和设置方便使用 series-field',
      defaults: ''
    }, {
      name: 'md-colors',
      type: 'string|array',
      description: '线条颜色，可以为单个颜色或者颜色列表。不指定时使用默认颜色。',
      defaults: ''
    }]
  }
};
const vbar = {
  props: {
    headings: ['Name', 'Description', 'Default'],
    props: [{
      name: 'md-colors',
      type: 'string|array',
      description: '线条颜色，可以为单个颜色或者颜色列表。不指定时使用默认颜色。',
      defaults: ''
    }]
  }
};
const vscale = {
  props: {
    headings: ['Name', 'Description', 'Default'],
    props: [{
      name: 'md-field',
      type: 'string',
      description: '[组件属性]指定 坐标轴 字段。对于简单数据，VChart 可以判断使用哪个字段，但是如果顺序不确定或者多字段的数据，最好手动指定。',
      defaults: ''
    }, {
      name: 'md-x',
      type: 'boolean',
      description: '[组件属性]是否为 x轴 配置。',
      defaults: ''
    }, {
      name: 'md-y',
      type: 'boolean',
      description: '[组件属性]是否为 y轴 配置。',
      defaults: ''
    }, {
      name: 'md-type',
      type: 'string',
      description: '指定不同的度量类型，支持的 type 为 identity、linear、cat、timeCat。',
      defaults: ''
    }, {
      name: 'md-formatter',
      type: 'function',
      description: '回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴 axis、图例 legend、提示信息 tooltip 上的显示',
      defaults: ''
    }, {
      name: 'md-range',
      type: 'array',
      description: '输出数据的范围，默认[0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。',
      defaults: '[0, 1]'
    }, {
      name: 'md-alias',
      type: 'string',
      description: '该数据字段的显示别名，一般用于将字段的英文名称转换成中文名(tooltip 中显示)。',
      defaults: ' '
    }, {
      name: 'md-tick-count',
      type: 'number',
      description: '坐标轴上刻度点的个数，设为 0 时表示全部显示。',
      defaults: '5'
    }, {
      name: 'md-ticks',
      type: 'array',
      description: '用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。如 [ 0, 50, 100, 150, 200, 300, 500 ]',
      defaults: ''
    }]
  }
};
const vaxis = {
  props: {
    headings: ['Name', 'Description', 'Default'],
    props: [{
      name: 'disabled',
      type: 'boolean',
      description: '禁用当前坐标轴。',
      defaults: ''
    }, {
      name: 'md-x',
      type: 'boolean',
      description: '[组件属性]是否为 x轴 配置。',
      defaults: ''
    }, {
      name: 'md-y',
      type: 'boolean',
      description: '[组件属性]是否为 y轴 配置。',
      defaults: ''
    }]
  }
};

const vguide = {
  props: {
    headings: ['Name', 'Description', 'Default'],
    props: [{
      name: 'md-type',
      type: 'string',
      description: '辅助元素类型，可以为 line, text, tag, rect, html, arc',
      defaults: ''
    }, {
      name: 'md-options',
      type: 'object',
      description: '辅助元素属性对象。你也可以在 template 里将属性分开写，不需要使用该 prop，同时使用时属性会被合并。',
      defaults: ''
    }]
  }
};
const vtooltip = {
  props: {
    headings: ['Name', 'Description', 'Default'],
    props: [{
      name: 'disabled',
      type: 'boolean',
      description: '[快捷属性，非 F2 原有属性]是否禁用 tooltip, 相当于调用chart.tooltip(false)',
      defaults: ''
    }, {
      name: 'md-show-x-value',
      type: 'boolean',
      description: '[快捷属性，非 F2 原有属性]用于单折线的情况，设定是否将 x 轴值显示在 tooltip 里，默认是 xLabel:yValue 的形式(value:23)，启用将变成 xValue:yValue 的形式(2017-01-01:23)，建议在 tickCount 无法完全显示时启用。该设置会覆盖原有 onShow 设置。',
      defaults: ''
    }, {
      name: 'md-show-value-in-legend',
      type: 'boolean',
      description: '[快捷属性，非 F2 原有属性]是否禁用默认 tooltip 而是显示在 legend 里。适用于有分组(series-field)情况。',
      defaults: ''
    }]
  }
};
const vlegend = {
  props: {
    headings: ['Name', 'Description', 'Default'],
    props: [{
      name: 'disabled',
      type: 'boolean',
      description: '[快捷属性，非 F2 原有属性]是否禁用 legend, 相当于调用chart.legend(false)',
      defaults: 'false'
    }]
  }
};
export default {
  name: "DocPopup",
  mixins: [examples],
  data: () => ({
    api: {
      vchart,
      vline,
      varea,
      vbar,
      vscale,
      vaxis,
      vguide,
      vlegend
    }
  })
};

</script>
