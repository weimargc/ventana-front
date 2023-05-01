import { Directive, ElementRef, Renderer2, HostListener,  HostBinding, Input, Optional} from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector: "[appUppercase]"
})
export class UppercaseDirective {
  textbox: HTMLInputElement;
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Optional() private ngControl: NgControl
  ) {}

  ngAfterViewInit() {
    this.textbox =
      this.el.nativeElement.tagName === "INPUT" ? this.el.nativeElement : this.el.nativeElement.querySelector("input");
  }

  @HostListener("input", ["$event"]) onInput(event) {
    const formattedVal = this.textbox.value.toLowerCase();
    if (this.ngControl) {
      this.ngControl.control.setValue(formattedVal, { emitEvent: false });
    } else {
      this.renderer.setProperty(this.textbox, "value", formattedVal);
    }
  }
}
