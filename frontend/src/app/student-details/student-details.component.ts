import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DetailsService } from '../services/student/details.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
})
export class StudentDetailsComponent implements OnInit {
  studentLists: any = [];
  totalMarks: any = [];
  studentForm: any = FormGroup;
  isHide: any = true;
  isEdit: any = false;
  languageList = [
    {
      name: 'English',
      id: '1',
      disabled: false,
    },
    {
      name: 'Maths',
      id: '2',
      disabled: false,
    },
    {
      name: 'CSE',
      id: '3',
      disabled: false,
    },
    {
      name: 'French',
      id: '4',
      disabled: false,
    },
    {
      name: 'Social',
      id: '5',
      disabled: false,
    },
  ];
  error_messages = {
    studentName: [
      { type: 'required', message: 'Student Name is required.' },
      { type: 'pattern', message: 'Student Name Accept Only Alphabets.' },
    ],
    subjectName: [
      { type: 'required', message: 'Subject Name is required.' },
      { type: 'pattern', message: 'Subject Name Accept Only Alphabets.' },
    ],
    mark: [
      { type: 'required', message: 'Mark is required.' },
      { type: 'pattern', message: 'Mark Only Accept Only Numbers.' },
      { type: 'minlength', message: 'Min 1 Numbers.' },
    ],
  };
  constructor(
    private studentSer: DetailsService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.getStudentLists();
    this.studentFields();
  }

  ngOnInit(): void {}

  /**
   * Getting the Student Details
   */
  async getStudentLists() {
    try {
      const result: any = await this.studentSer.getStudentDetails();
      console.log(result);
      if (result) {
        this.studentLists = [...result.data];
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Start thye creating fields from student detials
   */

  studentFields(data?: any) {
    if (data) {
      const { _id, studentName, percentage, subjectDetails } = data;
      console.log(subjectDetails);
      this.studentForm = this.fb.group({
        _id: new FormControl(_id),
        studentName: new FormControl(
          studentName,
          Validators.compose([
            Validators.required,
            Validators.pattern('[a-zA-Z\\s]*'),
          ])
        ),
        percentage: new FormControl(percentage),
        subjectDetails: this.fb.array(
          subjectDetails.map((x: any, i: any) => this.createSubject(x))
        ),
      });
      return;
    }
    this.studentForm = this.fb.group({
      studentName: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z\\s]*'),
        ])
      ),
      percentage: new FormControl(''),
      subjectDetails: this.fb.array([this.createSubject()]),
    });
  }

  createSubject(data?: any) {
    if (data) {
      const { subjectName, mark } = data;
      return this.fb.group({
        subjectName: new FormControl(
          subjectName,
          Validators.compose([
            Validators.required,
            Validators.pattern('[a-zA-Z\\s]*'),
          ])
        ),
        mark: new FormControl(
          mark,
          Validators.compose([
            Validators.required,
            Validators.pattern('[0-9]*'),
            Validators.minLength(1),
          ])
        ),
      });
    }

    return this.fb.group({
      subjectName: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z\\s]*'),
        ])
      ),
      mark: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[0-9]*'),
          Validators.minLength(1),
        ])
      ),
    });
  }

  get subjectDetailsControls() {
    return this.studentForm.get('subjectDetails') as FormArray;
  }

  addSubjectDetails() {
    if (this.subjectDetailsControls.length > 4) {
      return;
    }
    this.subjectDetailsControls.push(this.createSubject());
  }

  deletedSubjectDetails(i: any) {
    this.subjectDetailsControls.removeAt(i);
    this.languageList.map((el) => {
      el.disabled = false;
    });
    this.studentForm.value.subjectDetails.map((ele: any) => {
      const index = this.languageList.findIndex(
        (el) => el.name === ele.subjectName
      );
      this.languageList[index].disabled = true;
    });
    console.log(this.languageList);
  }

  /**
   * End thye creating fields from student detials
   */

  /**
   * Create and update the Student Details
   */
  async studentDetails() {
    try {
      if (this.isEdit === true) {
        return this.EditStudent();
      }
      console.log(this.studentForm.value, this.studentForm.invalid);
      if (this.studentForm.invalid) {
        Swal.fire({
          icon: 'error',
          title: 'Please Fill all Fields',
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
      console.log(this.studentForm.value.subjectDetails.length);
      if (this.studentForm.value.subjectDetails.length < 5) {
        Swal.fire({
          title: 'Can you please select the Five Subject',
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
      this.studentForm.value.subjectDetails.map((ele: any) => {
        console.log(ele);
        this.totalMarks.push(ele.mark);
      });
      console.log(this.totalMarks);
      const totalMark: any = this.totalMarks.reduce(function (a: any, b: any) {
        return a + b;
      }, 0);
      console.log(totalMark);
      const percenatge: any = (+totalMark / 500) * 100;
      console.log(percenatge);
      this.studentForm.value.percentage = percenatge;
      console.log(this.studentForm.value);
      const result: any = await this.studentSer.postStudentDetails(
        this.studentForm.value
      );
      console.log(result);
      if (result) {
        Swal.fire({
          icon: 'success',
          title: 'Successfully Created',
          showConfirmButton: false,
          timer: 1500,
        });
        this.studentForm.reset();
        this.isHide = true;
        this.getStudentLists();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async EditStudent() {
    try {
      if (this.studentForm.invalid) {
        Swal.fire({
          icon: 'error',
          title: 'Please Fill all Fields',
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
      this.totalMarks = [];
      this.studentForm.value.subjectDetails.map((ele: any) => {
        console.log(ele);
        this.totalMarks.push(ele.mark);
      });
      console.log(this.totalMarks);
      const totalMark: any = this.totalMarks.reduce(function (a: any, b: any) {
        return a + b;
      }, 0);

      const percenatge: any = (+totalMark / 500) * 100;
      console.log(percenatge);
      this.studentForm.value.percentage = percenatge;
      console.log(this.studentForm.value);
      const result: any = await this.studentSer.putStudentDetails(
        this.studentForm.value
      );
      if (result) {
        Swal.fire({
          icon: 'success',
          title: 'Successfully Updated',
          showConfirmButton: false,
          timer: 1500,
        });
        this.studentForm.reset();
        this.getStudentLists();
        this.isHide = true;
      }
    } catch (error) {}
  }

  /**
   * Avoid the sapce
   * @param event
   */

  AvoidSpace(event: any) {
    if (event.which === 32 && !event.target.value.length) {
      event.preventDefault();
      false;
      return;
    }
  }

  slectedLanguage(id: any) {
    const index = this.languageList.findIndex((ele) => ele.id === id);
    console.log(index);
    this.languageList[index].disabled = true;
  }

  addStudent() {
    this.isHide = false;
    this.isEdit = false;
    this.studentFields();
    this.languageList.map((el) => {
      el.disabled = false;
    });
  }

  cancel() {
    this.isHide = true;
    this.studentForm.reset();
  }

  editForm(data: any) {
    this.isHide = false;
    this.isEdit = true;
    this.studentFields(data);
    this.studentForm.value.subjectDetails.map((ele: any) => {
      const index = this.languageList.findIndex(
        (el) => el.name === ele.subjectName
      );
      console.log(index);
      if (index) {
        this.languageList[index].disabled = true;
      }
      if (index === 0) {
        this.languageList[0].disabled = true;
      }
    });
    console.log(this.languageList);
  }

  logout() {
    this.router.navigate(['/']);
  }
}
