import { ChangeDetectionStrategy, Component, ElementRef, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ValueBase } from '../value-base';

@Component({
    selector: 'filter-date-value',
    templateUrl: './date-value.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule],
})
export class DateValue extends ValueBase<string> {
    input = viewChild<ElementRef<HTMLInputElement>>('input');

    focus() {
        this.input()?.nativeElement.focus();
    }
}
