import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../services/student.service';

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

    const newId = this.students.length > 0 ? Math.max(...this.students.map((s) => s.id)) + 1 : 1;

    this.students.push({
      ...this.newStudent,
      id: newId,
    });

    this.newStudent = {
      id: 0,
      name: '',
      gender: '',
      class: '',
      phone: '',
      status: 'Active',
    };

    this.showForm = false;
  }

  deleteStudent(id: number): void {
    this.students = this.students.filter((student) => student.id !== id);
  }
}
