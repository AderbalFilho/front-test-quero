export class Scholarship {
  fullPrice: number;
  priceWithDiscount: number;
  discountPercentage: number;
  startDate: string;
  enrollmentSemester: string;
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
