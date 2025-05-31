import { Directionality } from "@angular/cdk/bidi";
import { hasModifierKey, DOWN_ARROW, UP_ARROW } from "@angular/cdk/keycodes";
import { MENU_TRIGGER, PARENT_OR_NEW_MENU_STACK_PROVIDER, CdkMenuTriggerBase, Menu } from "@angular/cdk/menu";
import { OverlayConfig, FlexibleConnectedPositionStrategy, STANDARD_DROPDOWN_BELOW_POSITIONS, Overlay } from "@angular/cdk/overlay";
import { _getEventTarget } from "@angular/cdk/platform";
import { Directive, OnChanges, OnDestroy, ElementRef, inject, ChangeDetectorRef, Injector, SimpleChanges } from "@angular/core";
import { takeUntil } from "rxjs";

@Directive({
    selector: '[filterManualMenuTriggerFor]',
    exportAs: 'filterManualMenuTriggerFor',
    host: {
        'class': 'cdk-menu-trigger',
        '(focusin)': '_setHasFocus(true)',
        '(focusout)': '_setHasFocus(false)',
        '(keydown)': '_toggleOnKeydown($event)',
    },
    inputs: [
        { name: 'menuTemplateRef', alias: 'filterManualMenuTriggerFor' },
        { name: 'menuPosition', alias: 'filterMenuPosition' },
        { name: 'menuData', alias: 'filterMenuTriggerData' },
    ],
    outputs: ['opened: filterMenuOpened', 'closed: filterMenuClosed'],
    providers: [
        { provide: MENU_TRIGGER, useExisting: ManualMenuTrigger },
        PARENT_OR_NEW_MENU_STACK_PROVIDER,
    ],
})
export class ManualMenuTrigger extends CdkMenuTriggerBase implements OnChanges, OnDestroy {
    private readonly _elementRef: ElementRef<HTMLElement> = inject(ElementRef);
    private readonly _overlay = inject(Overlay);
    private readonly _changeDetectorRef = inject(ChangeDetectorRef);;
    private readonly _directionality = inject(Directionality, { optional: true });
    private readonly _injector = inject(Injector);

    constructor() {
        super();
        this._registerCloseHandler();
    }

    open() {
        if (!this.isOpen() && this.menuTemplateRef != null) {
            this.opened.next();
            this.overlayRef = this.overlayRef || this._overlay.create(this._getOverlayConfig());
            this.overlayRef.attach(this.getMenuContentPortal());
            this._subscribeToOutsideClicks();
            this._changeDetectorRef.markForCheck();
        }
    }

    close() {
        if (this.isOpen()) {
            this.closed.next();
            this.overlayRef!.detach();
            this._changeDetectorRef.markForCheck();
        }
    }

    getMenu(): Menu | undefined {
        return this.childMenu;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['menuPosition'] && this.overlayRef) {
            this.overlayRef.updatePositionStrategy(this._getOverlayPositionStrategy());
        }
    }

    _toggleOnKeydown(event: KeyboardEvent) {
        switch (event.keyCode) {
            case DOWN_ARROW:
            case UP_ARROW:
                if (!hasModifierKey(event)) {
                    event.preventDefault();
                    this.open();
                    event.keyCode === DOWN_ARROW
                        ? this.childMenu?.focusFirstItem('keyboard')
                        : this.childMenu?.focusLastItem('keyboard');
                }
                break;
        }
    }

    _setHasFocus(hasFocus: boolean) {
        this.menuStack.setHasFocus(hasFocus);
    }

    private _getOverlayConfig() {
        return new OverlayConfig({
            positionStrategy: this._getOverlayPositionStrategy(),
            scrollStrategy: this.menuScrollStrategy(),
            direction: this._directionality || undefined,
        });
    }

    private _getOverlayPositionStrategy(): FlexibleConnectedPositionStrategy {
        return this._overlay
            .position()
            .flexibleConnectedTo(this._elementRef)
            .withLockedPosition()
            .withFlexibleDimensions(false)
            .withPositions(this.menuPosition ?? STANDARD_DROPDOWN_BELOW_POSITIONS);
    }

    private _registerCloseHandler() {
        this.menuStack.closed.pipe(takeUntil(this.destroyed)).subscribe(({ item }) => {
            if (item === this.childMenu) {
                this.close();
            }
        });
    }

    private _subscribeToOutsideClicks() {
        if (this.overlayRef) {
            this.overlayRef
                .outsidePointerEvents()
                .pipe(takeUntil(this.stopOutsideClicksListener))
                .subscribe(event => {
                    const target = _getEventTarget(event) as Element;
                    const element = this._elementRef.nativeElement;

                    if (target !== element && !element.contains(target)) {
                        if (!this.isElementInsideMenuStack(target)) {
                            this.menuStack.closeAll();
                        }
                    }
                });
        }
    }
}