import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './Interceptor';
import { ClientHelperComponent } from './client-helper/client-helper.component';
import { WelcomeComponent } from './client-helper/welcome/welcome.component';
import { ChoiceConversationOptionComponent } from './client-helper/choice-conversation-option/choice-conversation-option.component';
import { EmailComponent } from './client-helper/email/email.component';
import { ChatComponent } from './client-helper/chat/chat.component';
import { VideoCallComponent } from './client-helper/video-call/video-call.component';
import { SockCreatorComponent } from './sock-creator/sock-creator.component';
import { SaveSockModalComponent } from './sock-creator/save-sock-modal/save-sock-modal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SockCardComponent } from './components/sock-card/sock-card.component';
import { HeaderComponent } from './components/header/header.component';
import { SockViewComponent } from './sock-view/sock-view.component';
import { CanvasComponent } from './components/canvas/canvas.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClientHelperComponent,
    WelcomeComponent,
    ChoiceConversationOptionComponent,
    EmailComponent,
    ChatComponent,
    VideoCallComponent,
    SockCreatorComponent,
    SaveSockModalComponent,
    DashboardComponent,
    SockCardComponent,
    HeaderComponent,
    SockViewComponent,
    CanvasComponent,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, AppRoutingModule, BrowserAnimationsModule, MatDialogModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
