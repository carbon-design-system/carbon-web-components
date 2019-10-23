/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../polyfills/angular';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import BXInput from '../../src/components/input/input';
import BXInputDirective from '../../src/directives-angular/input';

@Component({
  template: `
    <form>
      <bx-input [(ngModel)]="model.username" name="username"></bx-input>
    </form>
  `,
})
class InputAngularTest {
  model = {
    username: '',
  };
}

describe('Angular directive for bx-input', () => {
  beforeAll(function() {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });

  beforeEach(function() {
    TestBed.configureTestingModule({
      declarations: [BXInputDirective, InputAngularTest],
      imports: [FormsModule],
    });
  });

  it('should send the value to model upon `input` event', async function() {
    const fixture = TestBed.createComponent(InputAngularTest);
    fixture.detectChanges(); // Ensures event handlers are set up
    await Promise.resolve(); // Ensures event handlers are set up
    const debugElement = fixture.debugElement.query(By.css('bx-input'));
    ((debugElement as unknown) as BXInput).value = 'value-foo';
    debugElement.triggerEventHandler('input', { target: debugElement });
    fixture.detectChanges();
    expect(fixture.componentInstance.model.username).toBe('value-foo');
  });
});
