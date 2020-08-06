import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [RouterTestingModule],
  });
  let spectator: Spectator<AppComponent>;

  beforeEach(() => (spectator = createComponent()));

  it('should create the app', () => {
    const app = spectator.component;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'project-name'`, () => {
    const app = spectator.component;
    expect(app.title).toEqual('project-name');
  });

  it('should render title', () => {
    spectator.detectChanges();
    const compiled = spectator.element;
    expect(compiled.querySelector('.content span').textContent).toContain(
      'project-name app is running!'
    );
  });
});
