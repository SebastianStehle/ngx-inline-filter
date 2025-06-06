import { FocusOrigin } from "@angular/cdk/a11y";
import { CDK_MENU, CdkMenu, CdkMenuGroup, PARENT_OR_NEW_INLINE_MENU_STACK_PROVIDER } from "@angular/cdk/menu";
import { Directive } from "@angular/core";

@Directive({
    selector: '[filterMenu]',
    exportAs: 'filterMenu',
    providers: [
        { provide: CdkMenuGroup, useExisting: CustomMenu },
        { provide: CDK_MENU, useExisting: CustomMenu },
        PARENT_OR_NEW_INLINE_MENU_STACK_PROVIDER('vertical'),
    ],
  })
export class CustomMenu extends CdkMenu {
    focusItem(index: number, focusOrigin: FocusOrigin = 'keyboard') {
        this.keyManager?.setFocusOrigin(focusOrigin);
        this.keyManager?.setActiveItem(index);
    }
}