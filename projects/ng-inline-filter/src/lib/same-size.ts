import { Directive, effect, ElementRef, input, OnDestroy, Renderer2, signal } from '@angular/core';

@Directive({
    selector: '[filterSameSize]'
})
export class SameSize implements OnDestroy {
    private readonly observer: ResizeObserver;
    private width = signal(0);

    public target = input.required<HTMLElement>({ alias: 'filterSameSize' });

    constructor(element: ElementRef<HTMLElement>, renderer: Renderer2) {
        this.width.set(element.nativeElement.clientWidth);
        
        this.observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
            this.width.set(entries[0].target.clientWidth);
        });

        effect(onCleanUp => {
            const target = this.target();
            this.observer.observe(target);

            onCleanUp(() => {
                this.observer.unobserve(target);
            });
        });

        effect(() => {
            renderer.setStyle(element.nativeElement, 'width', `${this.width()}px`);
        });
    }

    public ngOnDestroy() {
        this.observer.disconnect();
    }
}
