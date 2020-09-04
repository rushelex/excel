import { $ } from "@core/DOM";
import { defaultTitle } from "@/constants";
import { ExcelComponent } from "@/core/ExcelComponent";
import { ActiveRoute } from "@core/routes/ActiveRoute";
import { debounce } from "@core/utils";
import { changeTitle } from "@store/actions";

export class Header extends ExcelComponent {
  static className = "excel__header";

  constructor($root, options) {
    super($root, {
      name: "Header",
      listeners: ["input", "click"],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return `
      <input type="text" class="input" value="${title}" />
      <div>
        <div class="button" data-button="delete">
          <span class="material-icons">delete_outline</span>
        </div>
        <div class="button" data-button="exit">
          <span class="material-icons">exit_to_app</span>
        </div>
      </div>
    `;
  }

  onClick(event) {
    const $target = $(event.target);

    if ($target.data.button === "delete") {
      const desicion = confirm("Вы действительно хотите удалить эту таблицу?");

      if (desicion) {
        localStorage.removeItem(`excel:${ActiveRoute.param}`);
        ActiveRoute.navigate("");
      }
    } else if ($target.data.button === "exit") {
      ActiveRoute.navigate("");
    }
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(changeTitle($target.text()));
  }
}
