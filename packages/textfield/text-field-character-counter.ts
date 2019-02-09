import {
  Directive,
  ElementRef,
  OnDestroy
} from '@angular/core';

import { MDCTextFieldCharacterCounterFoundation } from '@material/textfield/character-counter/index';

@Directive({
  selector: '[mdcTextFieldCharacterCounter]',
  exportAs: 'mdcTextFieldCharacterCounter',
  host: { 'class': 'mdc-text-field-character-counter' }
})
export class MdcTextFieldCharacterCounter implements OnDestroy {
  private _createAdapter() {
    return {
      setContent: (content: string) => this.elementRef.nativeElement.textContent = content
    };
  }

  private _foundation: {
    destroy(): void,
    setCounterValue(currentLength: number, maxLength: number): void
  } = new MDCTextFieldCharacterCounterFoundation(this._createAdapter());

  constructor(public elementRef: ElementRef<HTMLElement>) { }

  get foundation(): any {
    return this._foundation;
  }

  ngOnDestroy(): void {
    this._foundation.destroy();
  }
}
