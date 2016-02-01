import { Component, Input } from 'angular2/core';
import { Http, Response, Headers } from 'angular2/http';
import { Control, ControlGroup, FormBuilder, Validators } from 'angular2/common';

@Component({
  selector: 'status',
  template: `
  <form [ngFormModel]="form" (ngSubmit)="onSubmit(form.value)">
    <label>Compose new tweet</label>
    <textarea ngControl="status" maxLength="{{tweetLength}}" placeholder="What's happening?"></textarea>
    <div>
      <span>{{remainingChars}}</span>
      <button type="submit" [disabled]="formDisabled">Tweet</button>
    </div>
  </form>
  `,
  styles: [
  ` 
  label {
      display: block;
  }
  `,
  `
  textarea {
      width: 400px;
	    height: 120px;
      resize: none;
  }
  `
  ]
})
export class Status {
  @Input() tweetLength: number = 140;
  public form: ControlGroup;
  public status: Control;

  constructor(private http: Http, private builder: FormBuilder) {
    // Create status form control
    this.status = new Control('', Validators.maxLength(this.tweetLength));

    // Assign control to form control group
    this.form = builder.group({
      status: this.status
    });
  }

  get remainingChars(): number {
    return (this.tweetLength - this.status.value.length);
  }

  get formDisabled(): boolean {
    // Disabled if status control
    return (this.status.value.length < 1);
  }

  onSubmit(value) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post('/api/twitter/update', JSON.stringify(value), { headers: headers })
      .subscribe((res: Response) => {
        if (res.status === 200)
          this.status.updateValue('');
      });
  }
}