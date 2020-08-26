import { ExcelComponent } from "@core/ExcelComponent";
import { $ } from "@core/DOM";
import { createTable } from "./table.template";
import { resizeHandler } from "./table.resize";
import { shouldResize, isCell, matrix, nextSelector } from "./table.functions";
import { TableSelection } from "./TableSelection";

export class Table extends ExcelComponent {
  static className = "excel__table";

  constructor($root, options) {
    super($root, {
      name: "Table",
      listeners: ["click", "mousedown", "keydown", "input"],
      ...options,
    });
  }

  toHTML() {
    return createTable();
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    this.selectCell(this.$root.find('[data-id="0:0"]'));

    this.$on("formula:input", (text) => {
      this.selection.current.text(text);
    });

    this.$on("formula:done", () => {
      this.selection.current.focus();
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit("table:select", $cell);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);

      if (event.ctrlKey) {
        this.selection.selectGroup($target, "ctrl");
      } else if (event.shiftKey) {
        const $cells = matrix(this.selection.current, $target).map((id) =>
          this.$root.find(`[data-id="${id}"]`)
        );
        this.selection.selectGroup($cells, "shift");
      } else {
        this.selection.select($target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      "Enter",
      "Tab",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
      "ArrowLeft",
    ];

    const { key } = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();

      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      this.selectCell($next);
    }
  }

  onInput(event) {
    this.$emit("table:select", $(event.target));
  }

  onClick(event) {
    this.$emit("table:click", $(event.target));
  }
}
