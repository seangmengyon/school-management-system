import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateStudent, StudentService } from '../services/student.service';

interface Student {
  id: number;
  name: string;
  gender: string;
  class: string;
  phone: string;
  status: string;
}

@Component({
  selector: 'app-students',
  imports: [CommonModule, FormsModule],
  templateUrl: './students.html',
  styleUrl: './students.css',
})
export class Students implements OnInit {
  searchText = '';
  selectedClass = '';
  showForm = false;

  students: Student[] = [];

  newStudent: Student = {
    id: 0,
    name: '',
    gender: '',
    class: '',
    phone: '',
    status: 'Active',
  };

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data.map((student) => ({
          id: student.studentId,
          name: `${student.firstName} ${student.lastName}`,
          gender: student.gender,
          class: student.className,
          phone: student.phone,
          status: student.status,
        }));
      },
      error: (error) => {
        console.error('Error loading students:', error);
        alert('Could not connect to the Student API.');
      },
    });
  }

  get filteredStudents(): Student[] {
    return this.students.filter((student) => {
      const matchesSearch = student.name.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesClass = this.selectedClass === '' || student.class === this.selectedClass;

      return matchesSearch && matchesClass;
    });
  }

  addStudent(): void {
    if (!this.newStudent.name || !this.newStudent.gender || !this.newStudent.class) {
      alert('Please fill in all required fields.');
      return;
    }

    const nameParts = this.newStudent.name.trim().split(/\s+/);
    const studentToCreate: CreateStudent = {
      firstName: nameParts[0],
      lastName: nameParts.slice(1).join(' ') || nameParts[0],
      gender: this.newStudent.gender,
      className: this.newStudent.class,
      phone: this.newStudent.phone,
      status: 'Active',
    };

    this.studentService.createStudent(studentToCreate).subscribe({
      next: () => {
        this.resetForm();
        this.showForm = false;
        this.loadStudents();
      },
      error: (error) => {
        console.error('Error saving student:', error);
        alert('Could not save the student to the database.');
      },
    });
  }

  private resetForm(): void {
    this.newStudent = {
      id: 0,
      name: '',
      gender: '',
      class: '',
      phone: '',
      status: 'Active',
    };
  }

  deleteStudent(id: number): void {
    if (!confirm('Delete this student permanently from the database?')) {
      return;
    }

    this.studentService.deleteStudent(id).subscribe({
      next: () => {
        this.students = this.students.filter((student) => student.id !== id);
      },
      error: (error) => {
        console.error('Error deleting student:', error);
        alert('Could not delete the student from the database.');
      },
    });
  }
}
