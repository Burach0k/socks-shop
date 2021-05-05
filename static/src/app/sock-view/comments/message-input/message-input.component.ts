import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss'],
})
export class MessageInputComponent {
  @ViewChild('commentField') commentField!: ElementRef;
  @Output() onSend = new EventEmitter();
  @Input('ngModel') message: string = '';

  public isShowFinalMessage: boolean = false;
  public templateText: string = '';

  public send(): void {
    this.onSend.emit(this.templateText);
    this.message = '';
    this.templateText = '';
  }

  public changeVisibleFinalMessage(): void {
    this.isShowFinalMessage = !this.isShowFinalMessage;
  }

  public addBoldTemplate(): void {
    this.message += ' <b></b>';
    this.commentField.nativeElement.focus();
  }

  public addItalicTemplate(): void {
    this.message += ' <i></i>';
    this.commentField.nativeElement.focus();
  }

  public addUnderlineTemplate(): void {
    this.message += ' <u></u>';
    this.commentField.nativeElement.focus();
  }

  public addQuoteTemplate(): void {
    this.message += ' <blockquote></blockquote>';
    this.commentField.nativeElement.focus();
  }

  public addLinkTemplate(): void {
    this.message += ' <a href=""></a>';
    this.commentField.nativeElement.focus();
  }

  public onChangeMessage(text: string): void {
    this.templateText = text.split('\n').join('<br>');
  }
}
