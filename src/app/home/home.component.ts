import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { faChevronLeft, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { Scholarship } from '../shared/services/scholarship/scholarship';
import { ScholarshipService } from '../shared/services/scholarship/scholarship.service';
import { GroupButtonItem } from '../shared/inputs/input-button-group/group-button-item';

class SemesterItem extends GroupButtonItem {
  constructor(description: string, option: string) {
    super(description, option);
  }
  year?: number;
  semester?: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  addDisabled: boolean = true as boolean;
  cities: Array<{ value: string, label: string }> = [];
  courses: Array<{ value: string, label: string }> = [];
  form: FormGroup;
  formButtonGroup: FormGroup;
  formBreadcrumb: FormGroup;
  modalVisibility: 'none' | 'block' = 'none';
  orderArray: Array<{ value: string, label: string }> = [
    { value: 'name', label: 'Nome da Faculdade' },
    { value: 'lowerPrice', label: 'Menor Preço' },
    { value: 'higherPrice', label: 'Maior Preço' },
    { value: 'higherScore', label: 'Melhor avaliação' }
  ];
  scholarships: Array<Scholarship> = [];
  scholarshipsFavoritesFiltered: Array<Scholarship> = [];
  scholarshipsFiltered: Array<Scholarship> = [];
  scholarshipsList: Array<Scholarship> = [];
  scholarshipsFavorites: Array<Scholarship> = [];
  semesters: Array<GroupButtonItem> = [];

  faChevronLeft = faChevronLeft;
  faPlusCircle = faPlusCircle;

  constructor(private fb: FormBuilder, private scholarshipService: ScholarshipService) {
  }

  ngOnInit() {
    this.scholarshipsFavorites = JSON.parse(localStorage.getItem('favoriteCourses'));
    this.scholarshipsFavorites = this.scholarshipsFavorites ? this.scholarshipsFavorites : [];
    this.scholarshipsFavoritesFiltered = this.scholarshipsFavorites;

    this.formButtonGroup = this.fb.group({
      semester: ['all', []]
    });

    this.formBreadcrumb = this.fb.group({
      breadcrumb: [['Home', 'Minha conta', 'Bolsas favoritas'], []]
    });

    this.form = this.fb.group({
      city: [null, []],
      course: [null, []],
      studyModalityPresential: [true, []],
      studyModalityDistance: [true, []],
      paymentRange: [10000, []],
      order: ['name', []],
      scholarshipList: [[], []],
      cancel: [null, []],
      add: [null, []]
    });

    this.scholarshipService.getScholarships()
      .subscribe(scholarships => {
        this.scholarships = scholarships;
        this.scholarshipsFiltered = scholarships;
        this.scholarshipsList = scholarships;
        this.semesters = this.separateToButtonGroup(this.scholarshipsFiltered, ['enrollment_semester']);
        this.cities = this.separateToSelect(this.scholarshipsFiltered, ['campus', 'city']);
        this.courses = this.separateToSelect(this.scholarshipsFiltered, ['course', 'name']);
      });
  }

  changeModalVisibility() {
    this.modalVisibility === 'none' ? this.modalVisibility = 'block' : this.modalVisibility = 'none';
    if (this.modalVisibility === 'block') {
      // Reset the form
      this.form.get('city').setValue(null);
      this.form.get('course').setValue(null);
      this.form.get('studyModalityPresential').setValue(true);
      this.form.get('studyModalityDistance').setValue(true);
      this.form.get('paymentRange').setValue(10000);
      this.form.get('order').setValue('name');
      this.form.get('scholarshipList').setValue([]);
      this.changeList();
      // Get the cities and courses arrays again, because selects were reseted
      this.cities = this.separateToSelect(this.scholarshipsFiltered, ['campus', 'city']);
      this.courses = this.separateToSelect(this.scholarshipsFiltered, ['course', 'name']);
    }
  }

  semesterChanged(newSemester: string) {
    if (newSemester === 'all') {
      this.scholarshipsFiltered = this.scholarships;
      this.scholarshipsFavoritesFiltered = this.scholarshipsFavorites;
    } else {
      this.scholarshipsFiltered = this.scholarships.filter(scholarship => newSemester === scholarship.enrollment_semester);
      this.scholarshipsList = this.scholarshipsFiltered;
      const semester: string = this.formButtonGroup.get('semester').value;
      if (semester !== 'all') {
        this.scholarshipsFavoritesFiltered = this.scholarshipsFavorites.filter(scholarshipFav => {
          return scholarshipFav.enrollment_semester === semester;
        });
      } else {
        this.scholarshipsFavoritesFiltered = this.scholarshipsFavorites;
      }
    }
  }

  cityChanged(newCity: string) {
    this.courses = this.separateToSelect(this.scholarshipsFiltered, ['course', 'name'],
      { nodes: ['campus', 'city'], conditionalValue: newCity });
    this.changeList();
  }

  changeList() {
    const city: string = this.form.get('city').value;
    const course: string = this.form.get('course').value;
    const studyModalityPresential: boolean = this.form.get('studyModalityPresential').value;
    const studyModalityDistance: boolean = this.form.get('studyModalityDistance').value;
    const paymentRange: number = this.form.get('paymentRange').value;
    this.scholarshipsList = this.scholarshipsFiltered;
    if (city) {
      this.scholarshipsList = this.scholarshipsList.filter(scholarship => scholarship.campus.city === city);
    }
    if (course) {
      this.scholarshipsList = this.scholarshipsList.filter(scholarship => scholarship.course.name === course);
    }
    if (studyModalityPresential && !studyModalityDistance) {
      this.scholarshipsList = this.scholarshipsList.filter(scholarship => scholarship.course.kind === 'Presencial');
    } else if (studyModalityDistance && !studyModalityPresential) {
      this.scholarshipsList = this.scholarshipsList.filter(scholarship => scholarship.course.kind === 'EaD');
    } else if (!studyModalityDistance && !studyModalityPresential) {
      this.scholarshipsList = [];
      return;
    }
    this.scholarshipsList = this.scholarshipsList.filter(scholarship => scholarship.price_with_discount <= paymentRange);
    this.changeOrderList();
  }

  changeOrderList() {
    const order: string = this.form.get('order').value;
    const orderDictionary: object = {
      name: { nodes: ['university', 'name'], type: 'asc' },
      lowerPrice: { nodes: ['price_with_discount'], type: 'asc' },
      higherPrice: { nodes: ['price_with_discount'], type: 'desc' },
      higherScore: { nodes: ['university', 'score'], type: 'desc' }
    };
    const orderType = orderDictionary[order];
    this.scholarshipsList = this.scholarshipsList.sort((a: Scholarship, b: Scholarship) => {
      let aNode = a;
      let bNode = b;
      orderType.nodes.forEach(node => {
        aNode = aNode[node];
        bNode = bNode[node];
      });
      if (orderType.type === 'asc') {
        return (aNode > bNode) ? 1 : ((bNode > aNode) ? -1 : 0);
      }
      return (aNode < bNode) ? 1 : ((bNode < aNode) ? -1 : 0);
    });
  }

  getScholarshipsList(list: Array<any>) {
    if (list.length > 0) {
      this.addDisabled = false;
    } else {
      this.addDisabled = true;
    }
  }

  buttonClicked(key: string) {
    if (key === 'cancel') {
      this.changeModalVisibility();
    }
    if (key === 'add') {
      this.changeModalVisibility();
      const scholarshipList = this.form.get('scholarshipList').value.filter(scholarship => {
        let duplicated: boolean = false as boolean;
        const duplicatedJSON = JSON.stringify(scholarship);
        this.scholarshipsFavorites.forEach(favoriteScholarship => {
          if (duplicatedJSON === JSON.stringify(favoriteScholarship)) {
            duplicated = true;
            return;
          }
        });
        return !duplicated;
      });
      this.scholarshipsFavorites = this.scholarshipsFavorites.concat(scholarshipList);
      const semester: string = this.formButtonGroup.get('semester').value;
      if (semester !== 'all') {
        scholarshipList.forEach(scholarship => {
          if (scholarship.enrollment_semester === semester) {
            this.scholarshipsFavoritesFiltered.concat(scholarship);
          }
        });
      } else {
        this.scholarshipsFavoritesFiltered = this.scholarshipsFavorites;
      }
      localStorage.setItem('favoriteCourses', JSON.stringify(this.scholarshipsFavorites));
    }
  }

  separateToButtonGroup(parentArray: Array<object>, nodes: Array<string>) {
    let options: Array<string | SemesterItem> = [];
    parentArray.forEach(childArray => {
      /**
       * Go through the node to get the string you want and add it to options
       */
      nodes.forEach(node => childArray = childArray[node]);
      options.push(childArray as unknown as string);
    });
    // Remove duplicated elements
    options = options.filter((el, i, a) => i === a.indexOf(el));
    // Change the string Array to the object Array accepted in app-input-button-group
    options = options.map(option => {
      const semesterSplit = (option as string).split('.');
      return {
        option: option as string, year: parseInt(semesterSplit[0], 10), semester: parseInt(semesterSplit[1], 10),
        description: semesterSplit[1] + 'º semestre de ' + semesterSplit[0]
      };
    });
    // Sort by year and then by semester
    options = options.sort((a: SemesterItem, b: SemesterItem) =>
      (a.year > b.year || (a.year === b.year && a.semester > b.semester))
        ? 1 : ((b.year > a.year || (b.year === a.year && b.semester > a.semester))
          ? -1 : 0));
    // Add all option
    return [new GroupButtonItem('Todos os semestres', 'all')].concat(options as Array<GroupButtonItem>);
  }


  separateToSelect(parentArray: Array<object>, nodes: Array<string>, extraCondition?: { nodes: Array<string>, conditionalValue: string }) {
    let objectCondition: string | object | Array<object>;
    let options: Array<string | { value: string, label: string }> = [];
    let validCondition: boolean = true as boolean;
    parentArray.forEach(childArray => {
      /**
       * First of all, you need to see if there is a condition to get the value for select
       * For example, if you need all courses that is from a specific city
       */
      if (extraCondition && extraCondition.nodes) {
        // Get the child Array
        objectCondition = childArray;
        // Then go through the node to get the string to comparison
        extraCondition.nodes.forEach(node => objectCondition = objectCondition[node]);
        // Compare it with the conditional value and set validCondition according to the the result
        validCondition = extraCondition.conditionalValue === objectCondition as unknown as string;
      }
      /**
       * If there is no condition or it's valid, go through the node to get the string you want
       * and add it to options
       */
      if (validCondition) {
        nodes.forEach(node => childArray = childArray[node]);
        options.push(childArray as unknown as string);
      }
    });
    // Remove duplicated elements
    options = options.filter((el, i, a) => i === a.indexOf(el));
    // Change the string Array to the object Array accepted in app-input-select
    return options.map(option => {
      return { value: option, label: option };
    }) as Array<{ value: string, label: string }>;
  }

  deleteScholarship(scholarship: { value: Scholarship, key: string }) {
    const semester: string = this.formButtonGroup.get('semester').value;
    if (semester !== 'all') {
      this.scholarshipsFavorites = this.scholarshipsFavorites.filter(scholarshipFav => {
        return JSON.stringify(scholarshipFav) !== JSON.stringify(scholarship.value);
      });
      this.scholarshipsFavoritesFiltered = this.scholarshipsFavorites.filter(scholarshipFav => {
        return scholarshipFav.enrollment_semester === semester;
      });
    } else {
      this.scholarshipsFavorites.splice(parseInt(scholarship.key.slice(9), 10), 1);
      this.scholarshipsFavoritesFiltered = this.scholarshipsFavorites;
    }
    localStorage.setItem('favoriteCourses', JSON.stringify(this.scholarshipsFavorites));
  }
}
