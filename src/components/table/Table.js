import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from '@/components/Table/table.template'
import { resizeHandler } from './table.resize'
import { shouldResize } from './table.functions'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['click', 'mousedown', 'mousemove', 'mouseup'],
    })
  }

  toHTML() {
    return createTable()
  }

  onClick() {}

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    }
  }

  onMousemove(event) {}

  onMouseup(event) {}
}
