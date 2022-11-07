import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';


@Component({
   selector: 'app-home',
   templateUrl: 'home.page.html',
   styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
   scheduledNotifications
   pendingNotifications

   constructor() {
   }
   async ngOnInit() {
      const now = new Date().getMilliseconds()
      const id1 = 1
      const id2 = Number.MAX_SAFE_INTEGER
      await LocalNotifications.schedule(
         {
            notifications: [
               { schedule: { at: new Date(now + 10000)}, title: '', body: '', id: id1 },
               { schedule: { at: new Date(now + 10000)}, title: '', body: '', id: id2 }
            ]
         }
      )
      this.scheduledNotifications = `${id1} and ${id2}`
      this.pendingNotifications = ((await LocalNotifications.getPending()).notifications).map(descriptor => descriptor.id).join(' and ')
   }
}
