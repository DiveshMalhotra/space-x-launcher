import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingPageComponent } from './landing-page.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { HttpService } from '../http.service';
import { FakeHttpService } from '../fake-http.service';
import { Location } from '@angular/common';
import { of } from 'rxjs';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LandingPageComponent],
      imports: [HttpClientModule, RouterModule],
      providers: [{ provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } },
      { provide: HttpService, useClass: FakeHttpService },
      { provide: Location, useClass: class { replaceState = jasmine.createSpy("replaceState"); } } ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    let service = fixture.debugElement.injector.get(HttpService);
    spyOn(service, 'getResponse');
    expect(component).toBeTruthy();
  });

  it('getLaunchSuccess', () => {
    let service = fixture.debugElement.injector.get(HttpService);
    spyOn(service, 'getResponse').and.returnValue(of());
    component.getLaunchSuccess('true');
    expect(component.islaunchTrue).toEqual('true');
  });

  it('getLandSuccess', () => {
    let service = fixture.debugElement.injector.get(HttpService);
    spyOn(service, 'getResponse').and.returnValue(of());
    component.getLandSuccess('true');
    expect(component.islandedTrue).toEqual('true');
  });

  it('getFilteredYears', () => {
    let service = fixture.debugElement.injector.get(HttpService);
    spyOn(service, 'getResponse').and.returnValue(of());
    component.getFilteredYears({year: 2006, checked: false});
  });
});
