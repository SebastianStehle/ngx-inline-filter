import { ChangeDetectionStrategy, Component, ElementRef, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ValueBase } from '../value-base';

@Component({
    selector: 'filter-number-value',
    templateUrl: './number-value.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule],
})
export class NumberValue extends ValueBase<number> {
    input = viewChild<ElementRef<HTMLInputElement>>('input');

    focus() {
        this.input()?.nativeElement.focus();
    }
}
