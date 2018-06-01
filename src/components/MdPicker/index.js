import material from 'gmf/material'
import MdPicker from './MdPicker'
import MdPickerColumn from './MdPickerColumn'

export default Vue => {
  material(Vue)
  Vue.component(MdPicker.name, MdPicker)
  Vue.component(MdPickerColumn.name, MdPickerColumn)
}
