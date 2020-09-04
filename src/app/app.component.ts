import { Component, OnInit, Inject } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DOCUMENT } from '@angular/common';
import { Router, RouterEvent, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'project-name';

  constructor(
    private swUpdate: SwUpdate,
    private snackBar: MatSnackBar,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        const snackBarRef = this.snackBar.open(
          'A new version of this web app is available',
          'REFRESH'
        );
        snackBarRef
          .onAction()
          .subscribe(() =>
            this.swUpdate
              .activateUpdate()
              .then(() => this.document.location.reload())
          );
      });
    }

    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.snackBar.dismiss();
      }
    });
  }
}
