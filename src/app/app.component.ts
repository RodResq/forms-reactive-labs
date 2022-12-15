import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];
  
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userdata': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmail.bind(this))
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    })
  }

  addHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control)
  }

  getControls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  forbiddenNames(controls: FormControl): {[s:string]: boolean} {
    if (this.forbiddenUsernames.indexOf(controls.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null
  }

  forbiddenEmail(controls: FormControl): Promise<any> | Observable<any> {
    const promisse = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (controls.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null)
        }
      }, 1500)
    });
    return promisse;
  }

  onSubmit() {
    console.log(this.signupForm)
  }
}
