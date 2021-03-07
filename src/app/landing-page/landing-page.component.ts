import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

interface SpaceXLauncher {
  year: number;
  checked: boolean;
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})

export class LandingPageComponent implements OnInit, OnDestroy {
  /**
   * Variable storing Space X Launcher data
   */
  public spaceXLauncherData: any;
  /**
   * Array storing launch years starting from 2006 to 2020 
   */
  public launchYears: Array<SpaceXLauncher>;
  /**
   * Stores launch value
   */
  public islaunchTrue: string;
  /**
   * Stores landing value
   */
  public islandedTrue: string;
  /**
   * unsubscribe the subscriptions
   */
  private ngUnsubscribe: Subject<void>;

  constructor(
    private httpservice: HttpService,
    private router: Router,
    private location: Location) {
    this.launchYears = [];
    this.islaunchTrue = '';
    this.islandedTrue = '';
    this.ngUnsubscribe = new Subject<void>();
  }

  /**
   * initializes the component
   * @returns void
   */
  public ngOnInit(): void {
    for (let i = 0; i < 15; i++) {
      this.launchYears.push({ year: i + 2006, checked: false });
    }
    this.getspaceXInfo();
  }

  /**
   * gets the launch success data as per params
   * @param params string value of launch type
   * @returns void
   */
  public getLaunchSuccess(params: string): void {
    this.islaunchTrue = params;
    this.httpservice.filters('launch', params);
    this.getspaceXInfo();
    this.router.navigate([''], { queryParams: { launch_success: params }, queryParamsHandling: 'merge' });
  }

  /**
   * gets the land success data as per params
   * @param params string value of land type
   * @returns void
   */
  public getLandSuccess(params: string): void {
    this.islandedTrue = params;
    this.httpservice.filters('land', params);
    this.getspaceXInfo();
    this.router.navigate([''], { queryParams: { land_success: params }, queryParamsHandling: 'merge' });
  }

  /**
   * gets the filtered year data as per year specified
   * @param params string value of selected year
   * @returns void
   */
  public getFilteredYears(year: SpaceXLauncher): void {
    if (year.year) {
      this.launchYears.filter((data) => {
        if (data.year !== year.year) {
          data.checked = false;
        }
      })
      year.checked = !year.checked;
    }
    if (year.checked) {
      this.httpservice.filters('year', String(year.year));
      this.getspaceXInfo();
      this.router.navigate([''], { queryParams: { launch_year: year.year }, queryParamsHandling: 'merge' });
    } else {
      this.httpservice.filters(null, '');
      this.getspaceXInfo();
      delete this.router['browserUrlTree'].queryParams.launch_year;
      this.location.replaceState(this.router.url);
    }
  }

  /**
   * destroys the component
   * @returns void
   */
  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.ngUnsubscribe.unsubscribe();
  }

  /**
   * gets the initial data of spaceXinfo
   * @returns void
   */
  private getspaceXInfo(): void {
    this.httpservice.getResponse().subscribe((data) => {
      this.spaceXLauncherData = data;
    });
  }
}
