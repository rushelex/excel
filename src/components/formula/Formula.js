import { $ } from "@core/DOM";
import { ExcelComponent } from "@/core/ExcelComponent";

export class Formula extends ExcelComponent {
  static className = "excel__formula";

  constructor($root, options) {
    super($root, {
      name: "Formula",
      listeners: ["input", "keydown"],
      ...options,
    });
  }

  toHTML() {
    return `
      <div class="info">ƒx</div>
      <div id="formulaInput" class="input" contenteditable spellcheck="false"></div>
    `;
  }

  init() {
    super.init();

    this.$formula = this.$root.find("#formulaInput");
    this.$on("table:select", ($cell) => {
      this.$formula.text($cell.text());
    });
    this.$on("table:input", ($cell) => {
      this.$formula.text($cell.text());
    });
    this.$on("table:click", ($cell) => {
      this.$formula.text($cell.text());
    });
  }

  onInput(event) {
    this.$emit("formula:input", $(event.target).text());
  }

  onKeydown(event) {
    if (["Enter", "Tab"].includes(event.key)) {
      event.preventDefault();
      this.$emit("formula:done");
    }
  }
}
