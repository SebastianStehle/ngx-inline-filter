import { ChangeDetectionStrategy, Component, ElementRef, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ValueBase } from '../value-base';

@Component({
    selector: 'filter-string-value',
    templateUrl: './string-value.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule],
})
export class StringValue extends ValueBase<string> {
    input = viewChild<ElementRef<HTMLInputElement>>('input');

    focus() {
        this.input()?.nativeElement.focus();
    }
}
