import { Page } from "@core/Page";
import { createStore } from "@core/createStore";
import { debounce, storage } from "@core/utils";
import { rootReducer } from "@store/rootReducer";
import { normalizeInitialState } from "@store/initialState";
import { Excel } from "@/components/excel/Excel";
import { Header } from "@/components/header/Header";
import { Toolbar } from "@/components/toolbar/Toolbar";
import { Formula } from "@/components/formula/Formula";
import { Table } from "@/components/table/Table";

function storageName(param) {
  const id = param ? param : Date.now().toString();
  return "excel:" + id;
}

export class ExcelPage extends Page {
  getRoot() {
    const state = storage(storageName(this.params));
    const store = createStore(rootReducer, normalizeInitialState(state));
    const stateListener = debounce((state) => {
      storage(storageName(this.params), state);
    }, 300);

    store.subscribe(stateListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
