import "../properties/category.tsp";
import "../properties/tag.tsp";

model Pet {
  id: int64;
  category: Category;
  name: string;
  photoUrls: string[];
  tags: Tag[];

  /** pet status in the store */
  status: Status;
}
