import type {
  AgPromise,
  IAfterGuiAttachedParams,
  IDoesFilterPassParams,
  IFilterComp,
  IFilterParams,
} from '@ag-grid-community/core';

export class BoolFilterSlot implements IFilterComp {
  eGui!: HTMLDivElement;
  rbAll!: HTMLInputElement;
  rbTrue!: HTMLInputElement;
  filterActive!: boolean;
  filterChangedCallback!: (additionalEventAttributes?: unknown) => void;

  init(params: IFilterParams) {
    this.eGui = document.createElement('div');
    this.eGui.innerHTML = `
    <div class="bool-filter">
      <div>Select filter:</div>
      <label>
        <input type="radio" name="boolFilter" checked={true} id="rbAll"/> All
      </label>
      <label>
        <input type="radio" name="boolFilter" id="rbTrue"/> True
      </label>
    </div>`

    this.filterActive = false;
    this.filterChangedCallback = params.filterChangedCallback;
  }

  onRbChanged() {
    this.filterActive = this.rbTrue.checked;
    this.filterChangedCallback();
  }

  getGui() {
    return this.eGui;
  }

  doesFilterPass(params: IDoesFilterPassParams) {
    return params.data.electric === true;
  }

  isFilterActive() {
    return this.filterActive;
  }

  destroy?(): void {
    throw new Error('Method not implemented.');
  }
  getModel() {
    // TODO add behavior
  }
  
  setModel(_model: unknown): void | AgPromise<void> {
    // TODO add behavior
  }
  refresh?(_newParams: IFilterParams<unknown, unknown>): boolean {
    throw new Error('Method not implemented.');
  }
  onNewRowsLoaded?(): void {
    throw new Error('Method not implemented.');
  }
  onAnyFilterChanged?(): void {
    // TODO add behavior
  }
  getModelAsString?(_model: unknown): string {
    throw new Error('Method not implemented.');
  }
  afterGuiAttached?(_params?: IAfterGuiAttachedParams | undefined): void {
    this.rbAll = this.eGui.querySelector('#rbAll')!;
    this.rbTrue = this.eGui.querySelector('#rbTrue')!;

    this.rbAll.addEventListener('change', this.onRbChanged.bind(this));
    this.rbTrue.addEventListener('change', this.onRbChanged.bind(this));
  }
  afterGuiDetached?(): void {
    // TODO add behavior
  }
}
