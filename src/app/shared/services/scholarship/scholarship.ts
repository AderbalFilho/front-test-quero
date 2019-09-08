export class Scholarship {
  // tslint:disable-next-line: variable-name
  full_price: number;
  // tslint:disable-next-line: variable-name
  price_with_discount: number;
  // tslint:disable-next-line: variable-name
  discount_percentage: number;
  // tslint:disable-next-line: variable-name
  start_date: string;
  // tslint:disable-next-line: variable-name
  enrollment_semester: string;
  enabled: boolean;
  course: {
    name: string;
    kind: string;
    level: string;
    shift: string
  };
  university: {
    name: string;
    score: number;
    logo_url: string
  };
  campus: {
    name: string;
    city: string
  };
}
