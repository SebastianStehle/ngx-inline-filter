import { ChangeDetectionStrategy, Component, ElementRef, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ValueBase } from '../value-base';

@Component({
    selector: 'filter-boolean-value',
    templateUrl: './boolean-value.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule],
})
export class BooleanValue extends ValueBase<boolean> {
    input = viewChild<ElementRef<HTMLInputElement>>('input');

    focus() {
        this.input()?.nativeElement.focus();
    }
}
