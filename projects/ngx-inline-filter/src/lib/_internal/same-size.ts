import { Directive, effect, ElementRef, input, OnDestroy, Renderer2, signal } from '@angular/core';

@Directive({
    selector: '[filterSameSize]'
})
export class SameSize implements OnDestroy {
    private readonly observer: ResizeObserver;
    private width = signal(0);

    public target = input.required<HTMLElement>({ alias: 'filterSameSize' });

    constructor(element: ElementRef<HTMLElement>, renderer: Renderer2) {
        renderer.setStyle(element.nativeElement, 'display', 'none');
        
        this.observer = new ResizeObserver(() => {
            this.width.set(this.target().offsetWidth);
        });

        effect(onCleanUp => {
            const target = this.target();
            
            this.width.set(target.offsetWidth);

            this.observer.observe(target);
            onCleanUp(() => {
                this.observer.unobserve(target);
            });
        });

        effect(() => {
            const width = this.width();
            if (width > 0) {
                renderer.setStyle(element.nativeElement, 'display', 'block');
                renderer.setStyle(element.nativeElement, 'width', `${width}px`);
            }
        });
    }

    public ngOnDestroy() {
        this.observer.disconnect();
    }
}
