import { Page } from "@core/page/Page";
import { StateProcessor } from "@core/page/StateProcessor";
import { createStore } from "@core/store/createStore";
import { rootReducer } from "@store/rootReducer";
import { normalizeInitialState } from "@store/initialState";
import { LocalStorageClient } from '@/shared/LocalStorageClient';
import { Excel } from "@/components/excel/Excel";
import { Header } from "@/components/header/Header";
import { Toolbar } from "@/components/toolbar/Toolbar";
import { Formula } from "@/components/formula/Formula";
import { Table } from "@/components/table/Table";

export class ExcelPage extends Page {
  constructor(param) {
    super(param);

    this.storeSub = null;
    this.proseccor = new StateProcessor(
        new LocalStorageClient(this.params)
    );
  }

  async getRoot() {
    const state = await this.proseccor.get();
    const initialState = normalizeInitialState(state)
    const store = createStore(rootReducer, initialState);

    this.storeSub = store.subscribe(this.proseccor.listen);

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
    this.storeSub.unsubscribe();
  }
}
